import MessageBubble from "./MessageBubble";

export default function MessageFeed({
  messages = [],
  onEditMessage,
  onRegenerateMessage,
}) {
  // Empty state handling
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500 max-w-md mx-auto h-full select-none animate-pulse-slow">
        <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-4 text-accent-dynamic">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h4 className="text-sm font-semibold text-white font-mono uppercase tracking-wider mb-1">System Idle</h4>
        <p className="text-xs text-gray-500 leading-relaxed font-sans">
          No logs found in this channel. Send a prompt to establish a connection and begin streaming responses.
        </p>
      </div>
    );
  }

  return (
    <section className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
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
