import { useTheme } from "@/context/ThemeContext";

export default function ChatSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  chats = [],
  activeChatId,
  setActiveChatId,
  onNewChat,
}) {
  const { theme, setTheme } = useTheme();

  return (
    <aside
      className={`glass-panel border-r border-white/5 flex flex-col shrink-0 transition-all duration-300 z-20 ${
        isSidebarOpen ? "w-72" : "w-0 -translate-x-full lg:w-0"
      } relative h-full`}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-accent-dynamic shadow-accent-glow flex items-center justify-center font-black text-black text-xs">
            P
          </div>
          <span className="text-xs font-bold font-mono tracking-widest text-white">
            PERSONA CHAT
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-400 hover:text-white transition-colors cursor-pointer lg:hidden p-1 rounded hover:bg-white/5"
          title="Collapse Sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* New Session Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full glass-panel-light hover:border-accent-dynamic text-xs font-semibold text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/5"
          title="Start a new chat session"
        >
          <svg className="w-4 h-4 text-accent-dynamic" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>New Session</span>
        </button>
      </div>

      {/* History Log Items */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar space-y-1">
        <span className="block text-[10px] font-mono text-gray-500 tracking-widest uppercase px-3 py-2 select-none">
          History Logs
        </span>
        {chats.length === 0 ? (
          <p className="text-[10px] text-gray-600 font-mono italic px-3 py-1 select-none">
            No history logs found.
          </p>
        ) : (
          chats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChatId(c.id)}
              className={`w-full text-left rounded-xl py-2.5 px-3 transition-all flex flex-col gap-0.5 cursor-pointer ${
                activeChatId === c.id
                  ? "bg-white/5 border border-white/5 text-accent-dynamic shadow-sm"
                  : "hover:bg-white/5 text-gray-400 border border-transparent"
              }`}
            >
              <span className="text-xs font-medium truncate text-white">{c.title}</span>
              <span className="text-[10px] font-mono text-gray-500">{c.date}</span>
            </button>
          ))
        )}
      </div>

      {/* Footer Accent Theme Switcher */}
      <div className="p-4 border-t border-white/5 bg-black/10 flex items-center justify-between shrink-0">
        <span className="text-[10px] font-mono text-gray-500 select-none">ACCENT THEME</span>
        <div className="glass-panel p-1 rounded-lg border border-white/10 flex items-center gap-1">
          {["purple", "green", "pink", "blue"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`h-5 w-5 rounded flex items-center justify-center transition-all ${
                theme === t ? "bg-white/15" : "hover:bg-white/5"
              }`}
              title={`Switch theme: ${t}`}
            >
              <span className={`h-2 w-2 rounded-full ${
                t === "purple" ? "bg-purple-400" :
                t === "green" ? "bg-green-400" :
                t === "pink" ? "bg-pink-400" : "bg-blue-400"
              }`}></span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
