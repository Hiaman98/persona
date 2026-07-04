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
    resetChat,
    sendMessage,
    editMessage,
    regenerateMessage,
    deleteChat,
  } = useChat(theme);

  // Local shell UI state (not tied to logic)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const activePersona = PERSONAS[theme] || PERSONAS.purple;

  return (
    <div className={`theme-${theme} h-screen w-full bg-gradient-to-br from-[#06060c] via-[#090912] to-[#010103] cyber-grid flex overflow-hidden relative`}>
      {/* Dynamic Glowing Accent Background Circles */}
      <div className="absolute top-10 left-10 w-96 h-96 accent-glow-bg opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 accent-glow-bg opacity-20"></div>

      {/* Collapsible history sidebar */}
      <ChatSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        onNewChat={() => createNewChat(theme)}
        onDeleteChat={deleteChat}
      />

      {/* Main chat execution feed */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activePersona={activePersona}
          onReset={() => resetChat(theme)}
        />

        <MessageFeed
          messages={messages}
          onEditMessage={(msgId, newText) => editMessage(msgId, newText, theme)}
          onRegenerateMessage={(msgId) => regenerateMessage(msgId, theme)}
        />

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={() => sendMessage(inputValue, theme)}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}
