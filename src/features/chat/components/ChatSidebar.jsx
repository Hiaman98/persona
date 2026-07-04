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
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      className={`glass-panel border-r border-[var(--border-color)] flex flex-col shrink-0 transition-all duration-300 z-20 ${
        isSidebarOpen ? "w-72" : "w-0 -translate-x-full lg:w-0"
      } relative h-full`}
    >
      {/* Sidebar Header */}
      <div className="h-16 border-b border-[var(--border-color)] flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-accent-dynamic shadow-accent-glow flex items-center justify-center font-black text-white text-xs select-none">
            DM
          </div>
          <span className="text-xs font-bold font-mono tracking-widest text-[var(--text-main)]">
            DEV MENTOR CHAT
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="text-gray-400 hover:text-[var(--text-main)] transition-colors cursor-pointer lg:hidden p-1 rounded hover:bg-black/5"
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
          className="w-full bg-white/40 hover:bg-white/80 border border-[var(--border-color)] hover:border-accent-dynamic text-xs font-semibold text-gray-700 hover:text-gray-900 py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          title="Start a new chat session"
        >
          <svg className="w-4 h-4 text-accent-dynamic" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>New Session</span>
        </button>
      </div>

      {/* History Log Items */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar space-y-1">
        <span className="block text-[10px] font-mono text-gray-400 tracking-widest uppercase px-3 py-2 select-none">
          History Logs
        </span>
        {chats.length === 0 ? (
          <p className="text-[10px] text-gray-400 font-mono italic px-3 py-1 select-none">
            No history logs found.
          </p>
        ) : (
          chats.map((c) => (
            <div
              key={c.id}
              className="group/item relative w-full flex items-center px-1"
            >
              <button
                onClick={() => setActiveChatId(c.id)}
                className={`w-full text-left rounded-xl py-2.5 pl-3 pr-8 transition-all flex flex-col gap-0.5 cursor-pointer border ${
                  activeChatId === c.id
                    ? "sidebar-item-active border-transparent"
                    : "sidebar-item-hover text-gray-600 border-transparent"
                }`}
              >
                <span className="text-xs font-medium truncate">{c.title}</span>
                <span className="text-[9px] font-mono opacity-65">{c.date}</span>
              </button>

              {/* Session Delete Trigger */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat?.(c.id);
                }}
                className="absolute right-3.5 opacity-0 group-hover/item:opacity-100 p-1.5 text-gray-400 hover:text-red-600 transition-all rounded hover:bg-black/5 cursor-pointer"
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

      {/* Footer System Toggle - Switch between Light & Dark Modes */}
      <div className="p-3 border-t border-[var(--border-color)] bg-black/5 shrink-0">
        <button
          onClick={toggleTheme}
          className="w-full bg-white/10 hover:bg-white/20 border border-[var(--border-color)] text-[10px] font-mono font-bold text-[var(--text-main)] py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
        >
          {theme === "light" ? (
            <>
              {/* Moon Icon for Dark Mode Suggestion */}
              <svg className="w-3.5 h-3.5 text-accent-dynamic" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
              <span>DARK SCHEME</span>
            </>
          ) : (
            <>
              {/* Sun Icon for Light Mode Suggestion */}
              <svg className="w-3.5 h-3.5 text-accent-dynamic" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.94-8.94h-2.25M4.125 12h-2.25m14.593-9.184l-1.591 1.591M4.996 17.004l-1.591 1.591m12.966 0l1.591-1.591M4.996 4.996L3.405 3.405M12 7.875a4.125 4.125 0 100 8.25 4.125 4.125 0 000-8.25z" />
              </svg>
              <span>LIGHT SCHEME</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
