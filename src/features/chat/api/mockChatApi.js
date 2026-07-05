import { HITESH_SYSTEM_PROMPT, PIYUSH_SYSTEM_PROMPT } from "./systemPrompts";

export const PERSONAS = {
    hitesh: {
        id: "hitesh",
        name: "Hitesh Choudhary",
        title: "CHAI AUR CODE MENTOR",
        avatar: "HC",
        systemPrompt: HITESH_SYSTEM_PROMPT,
        youtubeTranscripts: [
            // Paste transcripts of Hitesh's YouTube videos as strings here
            "Hey what's up everyone, Hitesh here! Today we are going to write some real code. No theories, just absolute hands-on practical work. Grab a cup of chai ☕ and let's get started."
        ],
        socialComments: [
            // Paste Hitesh's comments from YouTube, Twitter/X, etc., here
            "Chai is the secret fuel behind clean code! ☕",
            "Don't just watch the video, type the code along with me. That's how it sinks in."
        ],
    },
    piyush: {
        id: "piyush",
        name: "Piyush Garg",
        title: "FULL-STACK & DEVOPS ARCHITECT",
        avatar: "PG",
        systemPrompt: PIYUSH_SYSTEM_PROMPT,
        youtubeTranscripts: [
            // Paste transcripts of Piyush's YouTube videos as strings here
            "Hey guys, Piyush here. Today we are deep diving into systems design. We will look at Docker containers, load balancers, database connection pools, and building scalable pipelines."
        ],
        socialComments: [
            // Paste Piyush's comments from YouTube, Twitter/X, etc., here
            "Systems design is all about trade-offs. Understand your bottlenecks before scaling.",
            "Docker makes deployment pipelines predictable and reliable."
        ],
    },
};
