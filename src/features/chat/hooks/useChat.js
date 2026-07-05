import { useState, useEffect, useRef } from "react";
import { PERSONAS } from "../api/mockChatApi";
import { streamClaudeResponse } from "../api/claudeApi";

// Synchronize state with URL search parameters
function getChatIdFromUrl() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("chat");
}

function setChatIdInUrl(id) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (id) {
    url.searchParams.set("chat", id);
  } else {
    url.searchParams.delete("chat");
  }
  window.history.pushState({}, "", url.toString());
}

export function useChat(activePersonaId) {
  // Load initial chats from LocalStorage, fallback to empty array
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("persona-chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChatId, setActiveChatIdState] = useState(() => {
    const urlId = getChatIdFromUrl();
    if (urlId) return urlId;
    return chats.length > 0 ? chats[0].id : "";
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // Track dynamic abort controllers to cancel active requests
  const abortControllerRef = useRef(null);

  const abortActiveGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsGenerating(false);
  };

  // Sync state back to LocalStorage whenever chats update
  useEffect(() => {
    localStorage.setItem("persona-chats", JSON.stringify(chats));
  }, [chats]);

  // Sync URL search params when activeChatId changes
  const setActiveChatId = (id) => {
    setActiveChatIdState(id);
    setChatIdInUrl(id);
    
    // Clear any running generation if we swap channels
    abortActiveGeneration();
  };

  // Sync back if user uses browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlId = getChatIdFromUrl();
      if (urlId && urlId !== activeChatId) {
        setActiveChatIdState(urlId);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeChatId]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const currentChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const messages = currentChat ? currentChat.messages : [];

  // Start new chat session
  const createNewChat = (personaId) => {
    const newId = `chat_${Date.now()}`;

    const newChat = {
      id: newId,
      title: "New chat session",
      date: "Just now",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newId);
    setInputValue("");
  };

  // Clear current active chat history
  const resetChat = (personaId) => {
    if (!activeChatId) return;

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            title: `Cleared session`,
            messages: [],
          };
        }
        return c;
      })
    );
    setInputValue("");
    abortActiveGeneration();
  };

  const formatMessagesForClaude = (chatMessages) => {
    const formatted = chatMessages
      .filter((m) => m.text && m.text.trim()) // skip empty text/placeholders
      .map((m) => ({
        role: m.role,
        content: m.text,
      }));

    // Claude API requires that the first message must be a user message
    if (formatted.length > 0 && formatted[0].role === "assistant") {
      formatted.shift();
    }
    return formatted;
  };

  const runApiStream = async (targetChatId, assistantMsgId, personaId, apiMessages) => {
    setIsGenerating(true);
    abortActiveGeneration();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const stream = await streamClaudeResponse(personaId, apiMessages, controller.signal);
      let streamedText = "";

      for await (const chunk of stream) {
        streamedText += chunk;
        setChats((prev) =>
          prev.map((c) => {
            if (c.id === targetChatId) {
              return {
                ...c,
                messages: c.messages.map((m) =>
                  m.id === assistantMsgId ? { ...m, text: streamedText } : m
                ),
              };
            }
            return c;
          })
        );
      }
    } catch (error) {
      if (error.name === "AbortError" || (error.message && error.message.includes("abort"))) {
        // Ignored, user canceled/reset the generation
        return;
      }
      console.error("Claude API Error:", error);
      const errorMessage = `Error: ${error.message || "Failed to generate response. Please check your CLAUDE_API_KEY in your .env file."}`;
      
      setChats((prev) =>
        prev.map((c) => {
          if (c.id === targetChatId) {
            return {
              ...c,
              messages: c.messages.map((m) =>
                m.id === assistantMsgId ? { ...m, text: errorMessage } : m
              ),
            };
          }
          return c;
        })
      );
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setIsGenerating(false);
      }
    }
  };

  // Submit prompt and trigger live Claude API stream
  const sendMessage = (text, personaId) => {
    if (!text.trim() || isGenerating) return;

    const targetChatId = activeChatId || chats[0]?.id;
    if (!targetChatId) return;

    const chatIndex = chats.findIndex((c) => c.id === targetChatId);
    if (chatIndex === -1) return;

    const timestamp = new Date().toTimeString().split(" ")[0].slice(0, 5);
    const userMsg = {
      id: `u_${Date.now()}`,
      role: "user",
      text: text.trim(),
      timestamp,
    };

    const assistantMsgId = `a_${Date.now()}`;
    const assistantMsg = {
      id: assistantMsgId,
      role: "assistant",
      text: "",
      avatar: PERSONAS[personaId]?.avatar || "HC",
      timestamp,
    };

    // Calculate dynamic title based on the first few words of the prompt if it was a default title
    const activeChat = chats[chatIndex];
    let newTitle = activeChat.title;
    if (activeChat.title === "New chat session" || activeChat.title === "Cleared session") {
      newTitle = text.length > 30 ? `${text.slice(0, 30)}...` : text;
    }

    // Set immediate state for user prompt & loading assistant block
    setChats((prev) =>
      prev.map((c) => {
        if (c.id === targetChatId) {
          return {
            ...c,
            title: newTitle,
            messages: [...c.messages, userMsg, assistantMsg],
          };
        }
        return c;
      })
    );

    setInputValue("");

    // Gather history and format for Claude API
    const apiMessages = formatMessagesForClaude([...activeChat.messages, userMsg]);
    runApiStream(targetChatId, assistantMsgId, personaId, apiMessages);
  };

  const editMessage = (messageId, newText, personaId) => {
    if (!newText.trim() || isGenerating) return;

    const targetChatId = activeChatId || chats[0]?.id;
    if (!targetChatId) return;

    const chatIndex = chats.findIndex((c) => c.id === targetChatId);
    if (chatIndex === -1) return;

    const activeChat = chats[chatIndex];
    const messageIndex = activeChat.messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;

    const updatedUserMsg = {
      ...activeChat.messages[messageIndex],
      text: newText.trim(),
    };

    const assistantMsgId = `a_${Date.now()}`;
    const timestamp = new Date().toTimeString().split(" ")[0].slice(0, 5);
    const assistantMsg = {
      id: assistantMsgId,
      role: "assistant",
      text: "",
      avatar: PERSONAS[personaId]?.avatar || "HC",
      timestamp,
    };

    // Slice history at the edited user message and append the new assistant placeholder
    const truncatedMessages = [
      ...activeChat.messages.slice(0, messageIndex),
      updatedUserMsg,
      assistantMsg,
    ];

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === targetChatId) {
          return {
            ...c,
            messages: truncatedMessages,
          };
        }
        return c;
      })
    );

    // Format truncated history plus the updated user message for Claude API
    const apiMessages = formatMessagesForClaude([
      ...activeChat.messages.slice(0, messageIndex),
      updatedUserMsg,
    ]);
    runApiStream(targetChatId, assistantMsgId, personaId, apiMessages);
  };

  const regenerateMessage = (messageId, personaId) => {
    if (isGenerating) return;

    const targetChatId = activeChatId || chats[0]?.id;
    if (!targetChatId) return;

    const chatIndex = chats.findIndex((c) => c.id === targetChatId);
    if (chatIndex === -1) return;

    const activeChat = chats[chatIndex];
    const assistantIndex = activeChat.messages.findIndex((m) => m.id === messageId);
    if (assistantIndex === -1) return;

    // Retrieve preceding user prompt
    const userIndex = assistantIndex - 1;
    if (userIndex < 0 || activeChat.messages[userIndex].role !== "user") return;

    const assistantMsgId = `a_${Date.now()}`;
    const timestamp = new Date().toTimeString().split(" ")[0].slice(0, 5);
    const assistantMsg = {
      id: assistantMsgId,
      role: "assistant",
      text: "",
      avatar: PERSONAS[personaId]?.avatar || "HC",
      timestamp,
    };

    // Slices history up to the assistant response to regenerate
    const truncatedMessages = [
      ...activeChat.messages.slice(0, assistantIndex),
      assistantMsg,
    ];

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === targetChatId) {
          return {
            ...c,
            messages: truncatedMessages,
          };
        }
        return c;
      })
    );

    // Format history up to the user query for Claude API
    const apiMessages = formatMessagesForClaude(
      activeChat.messages.slice(0, assistantIndex)
    );
    runApiStream(targetChatId, assistantMsgId, personaId, apiMessages);
  };

  const deleteChat = (chatId) => {
    abortActiveGeneration();

    setChats((prev) => {
      const filtered = prev.filter((c) => c.id !== chatId);
      
      // If active chat is deleted, swap active selection to fallback chat or spawn a fresh session
      if (chatId === activeChatId) {
        if (filtered.length > 0) {
          setTimeout(() => setActiveChatId(filtered[0].id), 0);
        } else {
          setTimeout(() => createNewChat(activePersonaId), 0);
        }
      }
      return filtered;
    });
  };

  // Auto-initialize a chat session on first load if history is empty
  useEffect(() => {
    if (chats.length === 0) {
      createNewChat(activePersonaId);
    }
  }, []);

  return {
    chats,
    activeChatId,
    setActiveChatId,
    messages,
    isGenerating,
    inputValue,
    setInputValue,
    createNewChat,
    resetChat,
    sendMessage,
    editMessage,
    regenerateMessage,
    deleteChat,
  };
}
