export default function ChatHeader({
  isSidebarOpen,
  setIsSidebarOpen,
  activePersonaId,
  onPersonaChange,
  onReset,
}) {
  return (
    <header className="h-16 border-b border-[var(--border-color)] flex items-center justify-between px-4 sm:px-6 bg-[var(--header-bg)] backdrop-blur-md shrink-0 z-10">
      <div className="flex items-center gap-3">
        {/* Toggle Sidebar when collapsed */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-[var(--text-main)] transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-black/5 border border-[var(--border-color)] mr-1"
            title="Expand History"
          >
            <svg className="w-5 h-5 text-accent-dynamic" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        )}

        {/* Persona Identity Details */}
        <div>
          <h3 className="text-sm font-bold text-[var(--text-main)] font-mono tracking-wide uppercase">
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
          className="bg-[var(--input-bg)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-main)] rounded-full px-4 py-1.5 focus:outline-none cursor-pointer shadow-sm hover:border-accent-dynamic transition-all"
          title="Switch AI model persona"
        >
          <option value="coder">🤖 Antigravity-Coder</option>
          <option value="shell">💻 Cyber-Shell Console</option>
          <option value="creative">✍️ Aero-Creative Writer</option>
          <option value="generalist">🧠 Nexus Knowledge Engine</option>
        </select>

        <button
          onClick={onReset}
          className="text-[10px] font-mono text-[var(--text-main)] hover:opacity-85 bg-[var(--reset-bg)] border border-[var(--border-color)] hover:border-accent-dynamic px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-sm"
          title="Reset conversation log"
        >
          RESET SYSTEM
        </button>
      </div>
    </header>
  );
}
