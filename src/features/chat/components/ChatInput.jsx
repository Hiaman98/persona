export default function ChatInput({ value, onChange, onSubmit, isGenerating }) {
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
    <footer className="p-4 bg-gradient-to-t from-black/40 to-transparent shrink-0">
      <div className="max-w-3xl mx-auto">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim() && !isGenerating) {
              onSubmit(e);
            }
          }}
          className="glass-panel rounded-2xl border border-white/10 p-2 focus-within:border-accent-dynamic transition-colors flex gap-2"
        >
          <textarea
            rows="1"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isGenerating ? "Awaiting connection stream..." : "Submit instructions to AI..."}
            className="flex-1 bg-transparent border-0 focus:outline-none text-sm text-white resize-none max-h-32 px-3 py-2.5 font-sans placeholder-gray-500 custom-scrollbar"
            disabled={isGenerating}
          />
          
          <button 
            type="submit"
            disabled={isGenerating || !value.trim()}
            className="h-10 w-10 rounded-xl bg-accent-dynamic hover:opacity-90 disabled:opacity-20 text-black flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
            title="Send Message"
          >
            <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
        <p className="text-[10px] text-center text-gray-600 font-mono mt-2 uppercase tracking-wider">
          Persona Socket Console • Press Enter to Transmit
        </p>
      </div>
    </footer>
  );
}
