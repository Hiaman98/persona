import MessageBubble from "./MessageBubble";

export default function MessageFeed({
  messages = [],
  onEditMessage,
  onRegenerateMessage,
}) {
  // Empty state handling matching the reference screenshot
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-lg mx-auto h-full select-none animate-pulse-slow">
        {/* Minimalist Robot Icon from screenshot */}
        <div className="h-14 w-14 mb-5 flex items-center justify-center text-accent-dynamic">
          <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
            {/* Robot Head */}
            <rect x="12" y="18" width="24" height="18" rx="4" className="stroke-accent-dynamic" />
            {/* Robot Ears */}
            <rect x="8" y="24" width="4" height="6" rx="1" className="fill-accent-dynamic stroke-accent-dynamic" />
            <rect x="36" y="24" width="4" height="6" rx="1" className="fill-accent-dynamic stroke-accent-dynamic" />
            {/* Robot Antenna */}
            <line x1="24" y1="18" x2="24" y2="12" className="stroke-accent-dynamic" />
            <circle cx="24" cy="10" r="3" className="fill-accent-dynamic stroke-accent-dynamic" />
            {/* Robot Eyes */}
            <circle cx="19" cy="25" r="2.5" className="fill-accent-dynamic stroke-accent-dynamic" />
            <circle cx="29" cy="25" r="2.5" className="fill-accent-dynamic stroke-accent-dynamic" />
            {/* Robot Mouth */}
            <path d="M19 31h10" strokeLinecap="round" className="stroke-accent-dynamic" />
          </svg>
        </div>

        {/* Reference Screen Typography */}
        <h4 className="text-xl font-bold text-[#37312d] tracking-tight mb-2">
          How can I help you today?
        </h4>
        <p className="text-xs text-gray-400 font-sans tracking-wide leading-relaxed">
          Start a conversation and the AI will respond in real time.
        </p>
      </div>
    );
  }

  return (
    <section className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-[#fbfaf7]">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            onEdit={onEditMessage}
            onRegenerate={onRegenerateMessage}
          />
        ))}
      </div>
    </section>
  );
}
