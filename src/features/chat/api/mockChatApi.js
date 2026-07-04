export const PERSONAS = {
  hitesh: {
    id: "hitesh",
    name: "Hitesh Choudhary",
    title: "CHAI AUR CODE MENTOR",
    avatar: "HC",
    systemPrompt: "A programming mentor representing Hitesh Choudhary. He talks in a friendly, enthusiastic, high-energy tone, starts with his iconic catchphrase 'Hey what's up everyone, Hitesh here!', frequently mentions drinking chai, and emphasizes hands-on code writing, practical tutorials, and absolute clarity on computer science fundamentals.",
    welcomeMessage: "Hey what's up everyone, Hitesh here! Grab a hot cup of chai ☕ and let's write some code today. What core concepts or frameworks are we exploring?",
  },
  piyush: {
    id: "piyush",
    name: "Piyush Garg",
    title: "FULL-STACK & DEVOPS ARCHITECT",
    avatar: "PG",
    systemPrompt: "A senior full-stack developer and software architect representing Piyush Garg. He has a highly structured, tutorial-style, direct approach. He starts with 'Hey guys, welcome back to another video' or similar, focuses on end-to-end setups (Node.js, Docker, databases, Next.js, systems design, scalability), and loves breaking down complex backend and devops pipelines step-by-step.",
    welcomeMessage: "Hey guys, Piyush here. Today we are going to dive deep into Web Development, Systems Design, or DevOps pipelines. What are we building or debugging today?",
  },
};

// Generates simulated context-aware outputs matching Hitesh and Piyush
export function getMockResponse(personaId, userMessageText) {
  const query = userMessageText.toLowerCase().trim();

  if (personaId === "hitesh") {
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "Hey what's up everyone, Hitesh here! Good to see you in the community. You know, whenever we start writing code, I always say that the best way to learn is by getting your hands dirty and typing along. Grab a hot cup of chai ☕ and let's write some code. What are we building or debugging today?";
    }
    if (query.includes("javascript") || query.includes("js") || query.includes("react") || query.includes("hook") || query.includes("closure")) {
      return "That's an amazing question! In JavaScript, people often get super confused with things like closures, lexical scoping, or how custom React hooks manage state. But don't worry, it's actually super simple when you build it line-by-line.\n\nLet's write a simple example of a custom hook together:\n\n```javascript\n// Chai aur Code: Learning Custom Hooks\nimport { useState, useEffect } from 'react';\n\nexport function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : initialValue;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue];\n}\n```\n\nSee? We have a state value, we run a side-effect via `useEffect` to sync with localStorage, and we return the state pair just like standard React hooks. Super clean, super simple! Go ahead, copy this snippet, paste it in your codebase, and let me know if you hit any errors. Let's make sure it works!";
    }
    if (query.includes("chai") || query.includes("tea")) {
      return "Ah! You mentioned chai! ☕ You know, no coding session is complete without a fresh cup of ginger or cardamom chai. It keeps the bugs away and the brain focused! Make sure you take a small tea break, relax, and code along with me. Let's write some more code now!";
    }
    return `Ah, that is a very interesting topic: "${userMessageText}". Let's break it down in our classic "Chai aur Code" style. Whenever you approach a new topic, don't just read about it—build a small project around it. Here is a starter boiler snippet to experiment with:\n\n\`\`\`javascript\n// Hitesh's hands-on code template\nconst startLearning = (topic) => {\n  console.log(\`Hey what's up everyone! Today we are mastering: \${topic}\`);\n  console.log("Step 1: Write code. Step 2: Drink Chai. Step 3: Repeat!");\n};\n\nstartLearning("${userMessageText}");\n\`\`\`\n\nGive it a run! What part of this topic is giving you a hard time? Let's fix it together.`;
  }

  if (personaId === "piyush") {
    if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      return "Hey guys, welcome back. Today we're going to build a scalable web application from scratch or dive deep into developer operations. We'll be talking system design, Docker containers, or high-performance APIs. What technical problem or architecture are you working on?";
    }
    if (query.includes("system") || query.includes("design") || query.includes("architecture") || query.includes("redis") || query.includes("scale") || query.includes("node")) {
      return "To build a robust, scalable backend service that handles thousands of requests per second, you need a solid directory structure, connection pooling, and proper caching. Let's write a production-grade Express server setup with a built-in health check and connection handling:\n\n```javascript\n// Piyush Garg's production-grade Express server setup\nimport express from 'express';\nimport cors from 'cors';\nimport dotenv from 'dotenv';\n\ndotenv.config();\nconst app = express();\nconst PORT = process.env.PORT || 8000;\n\napp.use(cors());\napp.use(express.json());\n\n// Health monitoring endpoint\napp.get('/health', (req, res) => {\n  return res.json({\n    status: 'healthy',\n    uptime: process.uptime(),\n    timestamp: new Date().toISOString()\n  });\n});\n\napp.listen(PORT, () => {\n  console.log(`[Server] Service successfully listening on http://localhost:${PORT}`);\n});\n```\n\nIn a production system, we'd also containerize this database connections pipeline with Docker. Here's a quick `Dockerfile` setup you should add to the root of your project:\n\n```dockerfile\n# Production Dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 8000\nCMD [\"node\", \"index.js\"]\n```\n\nLet me know if you want to write the docker-compose configuration next to set up Redis and Postgres!";
    }
    return `Let's analyze your requirement: "${userMessageText}". When designing a robust architecture for this, we want to make sure it's decoupled and maintainable. Here's a typical production folder structure you should follow:\n\n1. **\`src/controllers/\`**: Handles HTTP requests/responses.\n2. **\`src/services/\`**: Business logic, database queries (e.g., via Prisma).\n3. **\`src/routes/\`**: Route definitions.\n4. **\`src/middlewares/\`**: Auth, error handlers, rate-limiting.\n\nHere is a simple helper function to cleanly handle server-side errors in your controllers:\n\n\`\`\`javascript\n// Clean error wrapper helper\nexport const asyncHandler = (fn) => (req, res, next) => {\n  Promise.resolve(fn(req, res, next)).catch(next);\n};\n\`\`\`\n\nWhat database or hosting provider are you planning to use for this project? Let's design the schema.`;
  }

  // fallback/default
  return `Welcome! Feel free to ask questions about software development, system design, or engineering pipelines.`;
}

