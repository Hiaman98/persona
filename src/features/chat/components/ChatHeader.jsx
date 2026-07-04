export default function ChatHeader({
  isSidebarOpen,
  setIsSidebarOpen,
  activePersona,
  onReset,
}) {
  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 sm:px-6 bg-black/20 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-3">
        {/* Toggle Sidebar when collapsed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-white/5 border border-white/5 mr-1"
            title="Expand History"
          >
            <svg className="w-5 h-5 text-accent-dynamic" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        )}

        {/* Persona Identity Details */}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              {activePersona?.name || "Antigravity-Coder"}
            </h3>
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="text-[10px] text-gray-500 font-mono">
            {activePersona?.title || "ACTIVE SYSTEM PERSONA"}
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="text-[10px] font-mono text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          title="Reset conversation log"
        >
          RESET SYSTEM
        </button>
      </div>
    </header>
  );
}
