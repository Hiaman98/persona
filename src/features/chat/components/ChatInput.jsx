export default function ChatInput({
  value,
  onChange,
  onSubmit,
  isGenerating,
  activePersona,
}) {
  const handleKeyDown = (e) => {
    // Send message on Enter, allow shift+Enter for multiline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isGenerating) {
        onSubmit(e);
      }
    }
  };

  return (
    <footer className="p-4 bg-gradient-to-t from-white/40 to-transparent shrink-0 bg-[#fbfaf7]">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim() && !isGenerating) {
              onSubmit(e);
            }
          }}
          className="bg-white border border-[#e6e2d8] focus-within:border-accent-dynamic rounded-full px-5 py-1.5 flex items-center gap-2 transition-all shadow-sm"
        >
          {/* Text Input area matching screenshot placeholder */}
          <textarea
            rows="1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isGenerating ? "Awaiting connection stream..." : "Type a message..."}
            className="flex-1 bg-transparent border-0 focus:outline-none text-sm text-[#37312d] resize-none max-h-32 py-2.5 font-sans placeholder-gray-400 custom-scrollbar"
            disabled={isGenerating}
          />

          {/* Circular sending badge with terracotta background */}
          <button
            type="submit"
            disabled={isGenerating || !value.trim()}
            className="h-8 w-8 rounded-full bg-accent-dynamic hover:opacity-90 disabled:opacity-20 text-white flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shrink-0 shadow-sm"
            title="Send Message"
          >
            <svg className="w-3.5 h-3.5 transform rotate-45 mr-0.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>

        {/* Screenshot Style Footer metadata details */}
        <div className="flex items-center gap-3 mt-2 px-3 text-[10px] font-mono text-gray-400 select-none">
          <div className="bg-white border border-[#e6e2d8] px-2.5 py-1 rounded-full text-gray-500 shadow-sm font-semibold">
            {activePersona?.name || "Antigravity-Coder"}
          </div>
          <span>Shift + Enter for new line</span>
        </div>
      </div>
    </footer>
  );
}
