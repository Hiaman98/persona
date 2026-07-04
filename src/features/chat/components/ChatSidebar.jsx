import { useTheme } from "@/context/ThemeContext";

export default function ChatSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  chats = [],
  activeChatId,
  setActiveChatId,
  onNewChat,
  onDeleteChat,
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
            <div
              key={c.id}
              className="group/item relative w-full flex items-center"
            >
              <button
                onClick={() => setActiveChatId(c.id)}
                className={`w-full text-left rounded-xl py-2.5 pl-3 pr-8 transition-all flex flex-col gap-0.5 cursor-pointer border ${
                  activeChatId === c.id
                    ? "bg-white/5 border-white/5 text-accent-dynamic shadow-sm"
                    : "hover:bg-white/5 text-gray-400 border-transparent"
                }`}
              >
                <span className="text-xs font-medium truncate text-white">{c.title}</span>
                <span className="text-[10px] font-mono text-gray-500">{c.date}</span>
              </button>

              {/* Session Delete Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat?.(c.id);
                }}
                className="absolute right-2.5 opacity-0 group-hover/item:opacity-100 p-1.5 text-gray-500 hover:text-red-400 transition-all rounded hover:bg-white/10 cursor-pointer"
                title="Delete chat session"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
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
