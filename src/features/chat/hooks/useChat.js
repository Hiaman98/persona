import { useState, useEffect, useRef } from "react";
import { getMockResponse, PERSONAS } from "../api/mockChatApi";

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

const INITIAL_CHATS = [
  {
    id: "chat_1",
    title: "Mastering Closures (Chai aur Code)",
    date: "Just now",
    messages: [
      {
        id: "m1",
        role: "user",
        text: "Hey Hitesh, I always get confused with closures. Can you explain in simple terms?",
        timestamp: "18:24",
      },
      {
        id: "m2",
        role: "assistant",
        text: "Hey what's up everyone, Hitesh here! Grab a hot cup of chai ☕ and let's break it down.\n\nA closure is simply a function that remembers its outer variables (lexical scope) even after the outer function has finished executing. Think of it like a memory capsule that the function carries around.\n\nLet's write a simple example:\n\n```javascript\nfunction makeChaiCounter() {\n  let count = 0; // local variable\n  return function() {\n    count++;\n    return `You have had ${count} cups of chai ☕`;\n  };\n}\n\nconst counter = makeChaiCounter();\nconsole.log(counter()); // \"You have had 1 cups of chai ☕\"\nconsole.log(counter()); // \"You have had 2 cups of chai ☕\"\n```\nSee? The inner function retains access to `count` even though `makeChaiCounter` has returned. Simple and clean! Go ahead and test it out.",
        avatar: "HC",
        timestamp: "18:25",
      },
    ],
  },
  {
    id: "chat_2",
    title: "Node.js Rate Limiter (Piyush Garg)",
    date: "2 hours ago",
    messages: [
      {
        id: "m3",
        role: "user",
        text: "Piyush, how do we implement a robust rate-limiting middleware in Express?",
        timestamp: "16:10",
      },
      {
        id: "m4",
        role: "assistant",
        text: "Hey guys, welcome back. Rate limiting is crucial for preventing DDoS and brute force attacks in production. In Express, we can use `express-rate-limit` or write a custom middleware powered by Redis for distributed systems.\n\nHere is a clean custom middleware snippet using memory cache:\n\n```javascript\nconst rateLimit = {};\n\nexport const rateLimiter = (limit, windowMs) => {\n  return (req, res, next) => {\n    const ip = req.ip;\n    if (!rateLimit[ip]) {\n      rateLimit[ip] = { count: 0, startTime: Date.now() };\n    }\n\n    const data = rateLimit[ip];\n    if (Date.now() - data.startTime > windowMs) {\n      data.count = 1;\n      data.startTime = Date.now();\n      return next();\n    }\n\n    data.count++;\n    if (data.count > limit) {\n      return res.status(429).json({\n        error: 'Too many requests. Please try again later.'\n      });\n    }\n    next();\n  };\n};\n```\n\nFor high-scale apps, we'd replace the in-memory object `rateLimit` with Redis commands like `MULTI`, `INCR`, and `EXPIRE`. Let me know if you want to implement the Redis approach!",
        avatar: "PG",
        timestamp: "16:11",
      },
    ],
  },
];

export function useChat(activePersonaId) {
  // Load initial chats from LocalStorage, fallback to standard mock chats
  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("persona-chats");
    return saved ? JSON.parse(saved) : INITIAL_CHATS;
  });

  const [activeChatId, setActiveChatIdState] = useState(() => {
    const urlId = getChatIdFromUrl();
    if (urlId) return urlId;
    return chats.length > 0 ? chats[0].id : "";
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // Track dynamic intervals to prevent layout memory leaks
  const streamIntervalRef = useRef(null);

  // Sync state back to LocalStorage whenever chats update
  useEffect(() => {
    localStorage.setItem("persona-chats", JSON.stringify(chats));
  }, [chats]);

  // Sync URL search params when activeChatId changes
  const setActiveChatId = (id) => {
    setActiveChatIdState(id);
    setChatIdInUrl(id);
    
    // Clear any running generation if we swap channels
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      setIsGenerating(false);
    }
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

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  const currentChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const messages = currentChat ? currentChat.messages : [];

  // Start new chat session
  const createNewChat = (personaId) => {
    const newId = `chat_${Date.now()}`;
    const persona = PERSONAS[personaId] || PERSONAS.hitesh;
    const timestamp = new Date().toTimeString().split(" ")[0].slice(0, 5);

    const newChat = {
      id: newId,
      title: "New chat session",
      date: "Just now",
      messages: [
        {
          id: `welcome_${Date.now()}`,
          role: "assistant",
          text: persona.welcomeMessage,
          avatar: persona.avatar,
          timestamp,
        },
      ],
    };

    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newId);
    setInputValue("");
  };

  // Clear current active chat history
  const resetChat = (personaId) => {
    if (!activeChatId) return;

    const persona = PERSONAS[personaId] || PERSONAS.hitesh;
    const timestamp = new Date().toTimeString().split(" ")[0].slice(0, 5);

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            title: `Cleared session`,
            messages: [
              {
                id: `welcome_${Date.now()}`,
                role: "assistant",
                text: persona.welcomeMessage,
                avatar: persona.avatar,
                timestamp,
              },
            ],
          };
        }
        return c;
      })
    );
    setInputValue("");
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      setIsGenerating(false);
    }
  };

  // Submit prompt and trigger word-by-word streaming animation
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

    setIsGenerating(true);
    setInputValue("");

    // Simulate thinking delay before streaming
    setTimeout(() => {
      const fullResponse = getMockResponse(personaId, text);
      const words = fullResponse.split(" ");
      let currentWordIndex = 0;
      let streamedText = "";

      streamIntervalRef.current = setInterval(() => {
        if (currentWordIndex < words.length) {
          streamedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
          
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
          currentWordIndex++;
        } else {
          clearInterval(streamIntervalRef.current);
          setIsGenerating(false);
        }
      }, 50); // 50ms per word streaming speed
    }, 600); // 600ms latency simulation
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

    setIsGenerating(true);

    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    setTimeout(() => {
      const fullResponse = getMockResponse(personaId, newText);
      const words = fullResponse.split(" ");
      let currentWordIndex = 0;
      let streamedText = "";

      streamIntervalRef.current = setInterval(() => {
        if (currentWordIndex < words.length) {
          streamedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
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
          currentWordIndex++;
        } else {
          clearInterval(streamIntervalRef.current);
          setIsGenerating(false);
        }
      }, 50);
    }, 600);
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

    const userPrompt = activeChat.messages[userIndex].text;

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

    setIsGenerating(true);

    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    setTimeout(() => {
      const fullResponse = getMockResponse(personaId, userPrompt);
      const words = fullResponse.split(" ");
      let currentWordIndex = 0;
      let streamedText = "";

      streamIntervalRef.current = setInterval(() => {
        if (currentWordIndex < words.length) {
          streamedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
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
          currentWordIndex++;
        } else {
          clearInterval(streamIntervalRef.current);
          setIsGenerating(false);
        }
      }, 50);
    }, 600);
  };

  const deleteChat = (chatId) => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      setIsGenerating(false);
    }

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
