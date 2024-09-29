import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});


export async function getGroqChatCompletion(query: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are Cortex An AI system to assist in legal research for commercial courts, potentially speeding up legal processes.Keep the response short when user ask about yourself or any general question about what can you do",
      },
      {
        role: "user",
        content: query,
      },
    ],
    model: "llama3-8b-8192",
  });
}
