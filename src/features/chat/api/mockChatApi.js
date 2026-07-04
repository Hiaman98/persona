export const PERSONAS = {
  coder: {
    id: "coder",
    name: "Antigravity-Coder",
    title: "SYSTEM CODING ASSISTANT",
    avatar: "C",
    systemPrompt: "A specialized React & Tailwind assistant that responds with code snippets.",
    welcomeMessage: "System initialized. How can I assist you with React, Tailwind CSS, or coding logic today?",
  },
  shell: {
    id: "shell",
    name: "Cyber-Shell",
    title: "SECURE CONSOLE SHELL",
    avatar: "S",
    systemPrompt: "A terminal interface simulation that responds with system status output.",
    welcomeMessage: "root@cyber_shell:~$ ready. Enter console instruction parameters.",
  },
  creative: {
    id: "creative",
    name: "Aero-Creative",
    title: "MARKETING & COPY WRITER",
    avatar: "W",
    systemPrompt: "A literary creative helper that generates slogans, descriptions, and copy drafts.",
    welcomeMessage: "Greetings. Let us weave some words. What project or creative draft are we brainstorming?",
  },
  generalist: {
    id: "generalist",
    name: "Nexus-Generalist",
    title: "KNOWLEDGE ENGINE",
    avatar: "N",
    systemPrompt: "A balanced general purpose AI assistant.",
    welcomeMessage: "Hello! I am Nexus. Ask me anything, and I'll help you compile an answer.",
  },
};

// Generates simulated context-aware outputs
export function getMockResponse(personaId, userMessageText) {
  const query = userMessageText.toLowerCase().trim();

  if (personaId === "coder") {
    if (query.includes("hello") || query.includes("hi")) {
      return "Hello! I'm your React developer assistant. I can help write hooks, build layouts, or refactor logic. What are we building?";
    }
    if (query.includes("react") || query.includes("hook")) {
      return "Here is a clean custom React hook to track window dimensions:\n\n```javascript\nimport { useState, useEffect } from 'react';\n\nexport function useWindowSize() {\n  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });\n\n  useEffect(() => {\n    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);\n\n  return size;\n}\n```";
    }
    return `I have analyzed your prompt: "${userMessageText}". Here is a clean boilerplate snippet for this feature:\n\n\`\`\`jsx\nexport default function Module() {\n  return (\n    <div className="p-4 bg-white/5 rounded-xl border border-[#e6e2d8]">\n      <h4 className="text-accent-dynamic font-bold">Execution Ready</h4>\n    </div>\n  );\n}\n\`\`\``;
  }

  if (personaId === "shell") {
    if (query.includes("hello") || query.includes("hi")) {
      return "kernel init: core shell system listening.\nIP: 127.0.0.1\nPORT: 5173\nSTATUS: ONLINE";
    }
    if (query.includes("status") || query.includes("info")) {
      return "system_monitor:\n  cpu_usage: 12.4%\n  mem_allocated: 248MB/1024MB\n  latency: 42ms\n  active_sockets: 3";
    }
    return `root@cyber_shell:~$ exec "${userMessageText}"\nAnalyzing directive logs...\nCOMPILATION: SUCCESS\nEXEC_TIME: 0.08ms\n[Operation completed successfully.]`;
  }

  if (personaId === "creative") {
    if (query.includes("hello") || query.includes("hi")) {
      return "Welcome. Let's make something memorable. Give me a core concept, and I'll draft some words for you.";
    }
    if (query.includes("slogan") || query.includes("marketing")) {
      return "Here are three slogan concepts for your brand:\n\n1. *\"Persona: Pure aesthetics. Zero friction.\"*\n2. *\"Logic meets beauty, cleanly compiled.\"*\n3. *\"Interactive identity, built for creators.\"*";
    }
    return `Draft concept based on: "${userMessageText}":\n\n*"In the quiet space where code meets user experience, true design behaves like gravity: completely silent, highly functional, and impossible to ignore."*`;
  }

  // default / generalist
  if (query.includes("hello") || query.includes("hi")) {
    return "Hi there! I'm Nexus, a generalist assistant. How can I help you learn, debug, or write today?";
  }
  return `Thank you for asking about "${userMessageText}". Here is a brief synthesis:\n\nTo accomplish this, configure a state reducer hook or use query params to track history states. This decouples local UI triggers from structural page data, keeping your component code isolated and reusable.`;
}
