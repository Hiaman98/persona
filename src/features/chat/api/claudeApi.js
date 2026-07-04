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

  const systemPrompt = PERSONAS[personaId]?.systemPrompt;

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
