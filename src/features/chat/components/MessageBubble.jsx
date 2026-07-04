import { useState } from "react";

export default function MessageBubble({ message, onEdit, onRegenerate }) {
  const isUser = message.role === "user";
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.text);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (editText.trim() && editText.trim() !== message.text) {
      onEdit?.(message.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(message.text);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex gap-4 max-w-[85%] relative group/bubble ${
        isUser ? "ml-auto flex-row-reverse" : "mr-auto"
      }`}
    >
      {/* Avatar Indicator */}
      <div
        className={`h-8 w-8 rounded-lg shrink-0 flex items-center justify-center font-mono font-bold text-xs select-none shadow-sm ${
          isUser
            ? "bg-white/10 border border-white/15 text-white"
            : "bg-accent-dynamic text-black shadow-accent-glow"
        }`}
      >
        {isUser ? "U" : "A"}
      </div>

      {/* Message Body & Controls */}
      <div className={`flex flex-col gap-1.5 ${isUser ? "items-end" : "items-start"} max-w-[calc(100%-3rem)]`}>
        {isEditing ? (
          /* Inline Editing Textarea Form */
          <form onSubmit={handleSaveEdit} className="w-full flex flex-col gap-2 min-w-[280px] sm:min-w-[400px]">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full bg-[#08080f] border border-accent-dynamic/40 focus:border-accent-dynamic rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-accent-dynamic/30 transition-all font-sans resize-none min-h-[80px]"
              autoFocus
            />
            <div className="flex gap-2 justify-end text-xs font-mono">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 text-gray-400 hover:text-white bg-white/5 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={!editText.trim() || editText.trim() === message.text}
                className="px-3 py-1.5 rounded-lg bg-accent-dynamic text-black hover:opacity-90 disabled:opacity-20 font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                SAVE & SUBMIT
              </button>
            </div>
          </form>
        ) : (
          /* Plain Message Bubble Display */
          <div className="relative">
            <div
              className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                isUser ? "user-bubble text-white" : "assistant-bubble text-gray-300"
              }`}
            >
              {message.text}
            </div>

            {/* Bubble Action Controls: Shown on hover */}
            <div
              className={`absolute top-2 flex items-center gap-1.5 opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 z-10 px-2 py-1 rounded-lg bg-black/40 border border-white/5 backdrop-blur-sm ${
                isUser ? "right-full mr-2" : "left-full ml-2"
              }`}
            >
              {isUser ? (
                /* Edit button for User */
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                  title="Edit prompt"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
              ) : (
                /* Copy & Regenerate buttons for Assistant */
                <>
                  <button
                    onClick={handleCopy}
                    className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                    title="Copy message content"
                  >
                    {copied ? (
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125V16.5c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.375z" />
                      </svg>
                    )}
                  </button>

                  {/* Only show Regenerate if response has text (not currently streaming) */}
                  {message.text && (
                    <button
                      onClick={() => onRegenerate?.(message.id)}
                      className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
                      title="Regenerate reply"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        <span className="text-[9px] font-mono text-gray-500 px-1 select-none">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
