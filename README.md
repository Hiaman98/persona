# Persona Simulator:
An interactive chat application designed to simulate the unique communication styles, teaching methodologies, and developer personalities of well-known coding educators (currently featuring **Hitesh Choudhary** and **Piyush Garg**).

Users can ask coding or career-related questions and receive answers structured as if they were talking directly to their favorite tech mentors.

## Tech Stack
*   **Core Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vite.dev/)
*   **Styling**: [TailwindCSS 4](https://tailwindcss.com/)
*   **AI Integration**: [@anthropic-ai/sdk](https://github.com/anthropics/anthropic-sdk-typescript) (utilizing Claude models)

---

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   An Anthropic Claude API Key

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Hiaman98/persona.git
    cd persona
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your Claude API key:
    ```env
    CLAUDE_API_KEY=your-actual-claude-api-key-here
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to the local URL (usually `http://localhost:5173`).
---

## ⚠️ Disclaimer
This is an educational course project built as a stylistic simulation. The responses generated are stylistic simulations of the educators and do not represent the actual individuals.
