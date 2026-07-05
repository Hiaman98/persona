/* global process */
import Anthropic from "@anthropic-ai/sdk";
import { PERSONAS } from "./mockChatApi";

// Retrieve the Claude API key from environment variables (defined via Vite config)
const apiKey = process.env.CLAUDE_API_KEY || import.meta.env.VITE_CLAUDE_API_KEY;

/**
 * Streams Claude responses for a specific persona and conversation context.
 * 
 * @param {string} personaId - The ID of the persona (e.g., 'hitesh', 'piyush')
 * @param {Array<{role: string, content: string}>} messages - Standard Claude API-compatible messages array
 * @yields {string} The incremental text chunks returned by Claude API
 */
export async function* streamClaudeResponse(personaId, messages, signal) {
  if (!apiKey) {
    throw new Error("CLAUDE_API_KEY is not defined. Please add it to your .env file.");
  }

  const anthropic = new Anthropic({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const persona = PERSONAS[personaId];
  let systemPrompt = persona?.systemPrompt || "";

  if (persona) {
    const transcriptsText = (persona.youtubeTranscripts || [])
      .map((t) => `- "${t}"`)
      .join("\n\n");
    const commentsText = (persona.socialComments || [])
      .map((c) => `- "${c}"`)
      .join("\n");

    let referenceContext = "";
    if (transcriptsText) {
      referenceContext += `\n\nHere are reference transcripts of some of your YouTube videos (which may contain a mix of English, Hindi, and Hinglish). Use them to mimic your voice, phrasing, multilingual style, vocabulary, and topic explanation style, and refer to this knowledge when relevant:\n<youtube_transcripts>\n${transcriptsText}\n</youtube_transcripts>`;
    }
    if (commentsText) {
      referenceContext += `\n\nHere are reference comments you posted on YouTube/Twitter/X (which may contain a mix of English, Hindi, and Hinglish). Mimic their writing style, vocabulary, code-switching, catchphrases, punctuation usage, and tone:\n<social_media_comments>\n${commentsText}\n</social_media_comments>`;
    }

    systemPrompt += referenceContext;

    // Guide Hinglish / Code-Switching response patterns
    systemPrompt += `\n\nLanguage & Style Instruction: You are fluent in English, Hindi, and Hinglish (the typical blend of Hindi and English used in Indian tech/developer communities). Analyze the reference transcripts and comments to understand how you naturally switch between languages (code-switching). Match the user's language style: if they write in Hinglish or Hindi, reply in your natural Hinglish/Hindi persona style. If they ask in English, reply in English but keep your iconic catchphrases, voice, and high-energy developer tone active.`;

    // Prevent context pollution from other personas in the same chat
    systemPrompt += `\n\nContext Isolation Instruction: The conversation history might contain messages from other simulated personas, which are prefixed with "[Response from <Name> - Note: ...]". You must strictly ignore their communication styles, vocabulary, catchphrases, and emojis (e.g. Hitesh's use of '☕' or Hinglish expressions). Remain 100% in your own designated persona (${persona.name}) for your response. Do not adopt or continue the style of the other personas.`;
  }

  const stream = await anthropic.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages,
    stream: true,
  }, {
    signal
  });

  for await (const chunk of stream) {
    if (chunk.type === "content_block_delta" && chunk.delta?.text) {
      yield chunk.delta.text;
    }
  }
}
