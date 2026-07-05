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
        ],
        socialComments: [
            // Paste Piyush's comments from YouTube, Twitter/X, etc., here
        ],
    },
};
