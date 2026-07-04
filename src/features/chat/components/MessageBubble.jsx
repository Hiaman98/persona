export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 max-w-[85%] ${
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      }`}
    >
      {/* Avatar Icon */}
      <div
        className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center font-mono font-bold text-xs select-none ${
          isUser
            ? "bg-white/10 border border-white/15 text-white"
            : "bg-accent-dynamic text-black shadow-accent-glow"
        }`}
      >
        {isUser ? "U" : "A"}
      </div>

      {/* Bubble text and meta */}
      <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser ? "user-bubble text-white" : "assistant-bubble text-gray-300"
          }`}
        >
          {message.text}
        </div>
        <span className="text-[9px] font-mono text-gray-500 px-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
