    import Groq from "groq-sdk";

    const groq = new Groq({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
    });

    interface SearchFilters {
    searchType: string;
    jurisdiction: string;
    dateRange: string;
    useBlockchain: boolean;
    }

    export async function getGroqChatCompletion(query: string, filters: SearchFilters, chatHistory: string) {
    const systemPrompt = `You are Cortex, an AI system to assist in legal research for commercial courts, potentially speeding up legal processes.
    Consider the following search parameters:
    - Search Type: ${filters.searchType}
    - Jurisdiction: ${filters.jurisdiction}
    - Date Range: ${filters.dateRange}
    - Blockchain Verification: ${filters.useBlockchain ? 'Required' : 'Not required'}
    Keep the response short when the user asks about yourself or any general question about what you can do.
    For legal queries, provide comprehensive and accurate information based on the specified parameters.
    Previous conversation context:
    ${chatHistory}`;

    return groq.chat.completions.create({
        messages: [
        {
            role: "system",
            content: systemPrompt,
        },
        {
            role: "user",
            content: query,
        },
        ],
        model: "llama3-8b-8192",
    });
    }

    export async function predictCaseOutcome(caseDetails: string) {
    const systemPrompt = `You are a legal AI assistant specializing in predicting case outcomes based on provided details. Analyze the given case information and predict the likelihood of success for each party involved. Provide a concise response indicating which party is more likely to win and an approximate percentage chance of their success.`;

    const response = await groq.chat.completions.create({
        messages: [
        {
            role: "system",
            content: systemPrompt,
        },
        {
            role: "user",
            content: `Predict the outcome of this case: ${caseDetails} . Provide the perchantage of winning and which party will be winning do not give long detailed answers`,
        },
        ],
        model: "llama3-8b-8192",
    });

    return response.choices[0]?.message?.content || "Unable to predict case outcome.";
    }


  export async function Vision(
    fileContent: string,
    filters: SearchFilters,
    chatHistory: string
  ) {
    const systemPrompt = `You are Cortex, an AI system Developed by team synergy six specifically trained on the indian legal text to assist in legal research for commercial courts, potentially speeding up legal processes.
    Consider the following search parameters:
    - Search Type: ${filters.searchType}
    - Jurisdiction: ${filters.jurisdiction}
    - Date Range: ${filters.dateRange}
    - Blockchain Verification: ${
      filters.useBlockchain ? "Required" : "Not required"
    }
    Keep the response short when the user asks about yourself or any general question about what you can do.
    For legal queries, provide comprehensive and accurate information based on the specified parameters.
    Previous conversation context:
    ${chatHistory}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Analyze the following file content: ${fileContent}`,
        },
        {
          role: "system",
          content: systemPrompt,
        },
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    return chatCompletion.choices[0].message.content;
  }
