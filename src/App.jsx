import { useState } from "react";
import "./App.css";

export default function App() {
  // Theme state: purple | green | pink | blue
  const [theme, setTheme] = useState("purple");
  const [copied, setCopied] = useState(false);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('git commit -m "first commit"');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`theme-${theme} relative min-h-screen w-full bg-gradient-to-br from-[#06060c] via-[#090912] to-[#010103] cyber-grid flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 overflow-hidden`}>
      {/* Dynamic Glowing Accent Background Circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] accent-glow-bg opacity-30"></div>
      
      {/* Header bar */}
      <header className="relative z-10 max-w-4xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-accent-dynamic shadow-accent-glow flex items-center justify-center font-black text-black text-sm">
            P
          </div>
          <span className="text-sm font-bold tracking-wider text-white font-mono">PERSONA</span>
        </div>

        {/* Accent Theme Switcher */}
        <div className="glass-panel p-1 rounded-lg border border-white/10 flex items-center gap-1">
          {["purple", "green", "pink", "blue"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`h-5 w-5 rounded-md flex items-center justify-center transition-all ${
                theme === t ? "bg-white/15" : "hover:bg-white/5"
              }`}
              title={`Switch to ${t} theme`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${
                t === "purple" ? "bg-purple-400" :
                t === "green" ? "bg-green-400" :
                t === "pink" ? "bg-pink-400" : "bg-blue-400"
              }`}></span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-xl w-full mx-auto my-auto py-8">
        <div className="glass-panel rounded-2xl p-8 border border-white/10 relative overflow-hidden flex flex-col items-center text-center gap-6 shadow-2xl animate-float">
          {/* Sci-Fi Decorative Corner Lines */}
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-accent-dynamic opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-accent-dynamic opacity-40"></div>

          {/* Micro Pulsing Status Tag */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest text-accent-dynamic bg-white/5 border border-white/5 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-dynamic animate-ping"></span>
            WORKSPACE ACTIVE
          </span>

          {/* Title */}
          <h2 className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-white/70 bg-clip-text text-transparent">
            Hello <span className="text-accent-dynamic drop-shadow-sm font-serif italic">world!</span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-sans max-w-sm">
            Welcome to your sleek developer canvas. Clean build, premium design tokens, and hot reloading are active and ready.
          </p>

          {/* Git Commit Command Box (Helper for the user's task) */}
          <div className="w-full bg-[#030307]/80 rounded-xl p-3.5 border border-white/5 flex items-center justify-between gap-3 font-mono text-xs text-gray-300">
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <span className="text-accent-dynamic select-none font-bold">&gt;</span>
              <span>git commit -m "first commit"</span>
            </div>
            <button
              onClick={handleCopyCommand}
              className="shrink-0 text-[10px] uppercase font-bold text-white hover:text-accent-dynamic bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent-dynamic px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? "COPIED!" : "COPY"}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl w-full mx-auto flex items-center justify-between text-[10px] font-mono text-gray-600">
        <span>DEV_PORT: 5173</span>
        <span>READY FOR FIRST COMMIT</span>
      </footer>
    </div>
  );
}
