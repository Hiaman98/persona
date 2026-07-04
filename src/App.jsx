import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useChat } from "@/features/chat/hooks/useChat";
import { PERSONAS } from "@/features/chat/api/mockChatApi";
import ChatSidebar from "@/features/chat/components/ChatSidebar";
import ChatHeader from "@/features/chat/components/ChatHeader";
import MessageFeed from "@/features/chat/components/MessageFeed";
import ChatInput from "@/features/chat/components/ChatInput";
import "./App.css";

export default function App() {
  const { theme } = useTheme();
  
  // Model state (activePersonaId): hitesh | piyush
  const [activePersonaId, setActivePersonaId] = useState("hitesh");

  // Custom hook manages database states, streaming callbacks, and routing
  const {
    chats,
    activeChatId,
    setActiveChatId,
    messages,
    isGenerating,
    inputValue,
    setInputValue,
    createNewChat,
    sendMessage,
    editMessage,
    regenerateMessage,
    deleteChat,
  } = useChat(activePersonaId);

  // Local shell UI state (not tied to logic)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activePersona = PERSONAS[activePersonaId] || PERSONAS.hitesh;

  return (
    <div className={`theme-${theme} persona-${activePersonaId} h-screen w-full bg-[var(--bg-primary)] flex overflow-hidden relative text-[var(--text-main)] font-sans`}>
      {/* Soft Purple Background Glowing Disk */}
      <div className="absolute top-10 left-10 w-96 h-96 accent-glow-bg opacity-40"></div>

      {/* Collapsible history sidebar */}
      <ChatSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        onNewChat={() => createNewChat(activePersonaId)}
        onDeleteChat={deleteChat}
      />

      {/* Main chat execution feed */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activePersonaId={activePersonaId}
          onPersonaChange={setActivePersonaId}
        />

        <MessageFeed
          messages={messages}
          onEditMessage={(msgId, newText) => editMessage(msgId, newText, activePersonaId)}
          onRegenerateMessage={(msgId) => regenerateMessage(msgId, activePersonaId)}
        />

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => sendMessage(inputValue, activePersonaId)}
          isGenerating={isGenerating}
          activePersona={activePersona}
        />
      </div>
    </div>
  );
}
