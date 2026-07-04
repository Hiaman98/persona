import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import ChatSidebar from "@/features/chat/components/ChatSidebar";
import ChatHeader from "@/features/chat/components/ChatHeader";
import MessageFeed from "@/features/chat/components/MessageFeed";
import ChatInput from "@/features/chat/components/ChatInput";
import "./App.css";

// Mock data for shell layout rendering
const MOCK_CHATS = [
  { id: "chat_1", title: "React 19 Server Components", date: "Just now" },
  { id: "chat_2", title: "Glassmorphism CSS Design", date: "2 hours ago" },
  { id: "chat_3", title: "Tailwind v4 Setup Checklist", date: "Yesterday" },
];

const MOCK_MESSAGES = [
  {
    id: "m1",
    role: "user",
    text: "Can you explain the main benefits of React 19's Server Actions?",
    timestamp: "18:24",
  },
  {
    id: "m2",
    role: "assistant",
    text: "React 19 Server Actions allow you to define server-side asynchronous operations and bind them directly to UI forms. Key benefits include:\n\n1. **Zero Endpoint Boilerplate**: You no longer need to write manual REST or GraphQL endpoints for simple form actions.\n2. **Pending States**: Native hook integrations like `useActionState` manage pending transitions and loading indicators automatically.\n3. **Optimistic Updates**: Using `useOptimistic`, you can predictively update the client state before the server response completes, creating a snappy user experience.",
    timestamp: "18:25",
  },
];

export default function App() {
  const { theme } = useTheme();
  
  // Layout and navigational shell states
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState("chat_1");
  const [inputValue, setInputValue] = useState("");

  const handleReset = () => {
    console.log("Mock action: Reset conversation logs");
  };

  const handleNewChat = () => {
    console.log("Mock action: Create new session");
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log("Mock action: Submit query", inputValue);
  };

  return (
    <div className={`theme-${theme} h-screen w-full bg-gradient-to-br from-[#06060c] via-[#090912] to-[#010103] cyber-grid flex overflow-hidden relative`}>
      {/* Background Glowing Blurs */}
      <div className="absolute top-10 left-10 w-96 h-96 accent-glow-bg opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 accent-glow-bg opacity-20"></div>

      {/* Collapsible history sidebar */}
      <ChatSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        chats={MOCK_CHATS}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        onNewChat={handleNewChat}
      />

      {/* Conversation panel */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <ChatHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activePersona={{
            name: "Antigravity-Coder",
            title: "ACTIVE SYSTEM PERSONA",
          }}
          onReset={handleReset}
        />

        <MessageFeed messages={MOCK_MESSAGES} />

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          isGenerating={false}
        />
      </div>
    </div>
  );
}
