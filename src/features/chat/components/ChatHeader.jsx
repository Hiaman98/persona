export default function ChatHeader({
  isSidebarOpen,
  setIsSidebarOpen,
  activePersonaId,
  onPersonaChange,
  onReset,
}) {
  return (
    <header className="h-16 border-b border-[#e2d5f0] flex items-center justify-between px-4 sm:px-6 bg-white/60 backdrop-blur-md shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Toggle Sidebar when collapsed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-[#2e1065] transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-black/5 border border-[#e2d5f0] mr-1"
            title="Expand History"
          >
            <svg className="w-5 h-5 text-accent-dynamic" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        )}

        {/* Persona Identity Details */}
        <div>
          <h3 className="text-sm font-bold text-[#2e1065] font-mono tracking-wide uppercase">
            Active Workspace
          </h3>
          <p className="text-[10px] text-gray-400 font-mono">
            SECURE CLIENT CHANNEL
          </p>
        </div>
      </div>

      {/* Model Selection Dropdown & System Reset */}
      <div className="flex items-center gap-3">
        {/* Screenshot Styled Model Selector Pill */}
        <select
          value={activePersonaId}
          onChange={(e) => onPersonaChange(e.target.value)}
          className="bg-white border border-[#e2d5f0] text-xs font-semibold text-[#2e1065] rounded-full px-4 py-1.5 focus:outline-none cursor-pointer shadow-sm hover:border-accent-dynamic transition-all"
          title="Switch AI model persona"
        >
          <option value="coder">🤖 Antigravity-Coder</option>
          <option value="shell">💻 Cyber-Shell Console</option>
          <option value="creative">✍️ Aero-Creative Writer</option>
          <option value="generalist">🧠 Nexus Knowledge Engine</option>
        </select>

        <button
          onClick={onReset}
          className="text-[10px] font-mono text-gray-500 hover:text-gray-900 bg-white/40 hover:bg-white/80 border border-[#e2d5f0] hover:border-accent-dynamic px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-sm"
          title="Reset conversation log"
        >
          RESET SYSTEM
        </button>
      </div>
    </header>
  );
}
