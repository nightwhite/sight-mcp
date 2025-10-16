export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | Array<{ type: 'text' | 'image_url' | 'video_url'; [key: string]: any }>;
}

export interface ChatResponse {
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
  }>;
}

export class ChatService {
  private apiUrl: string;
  private model: string;
  private apiKey: string;

  constructor(apiUrl: string, model: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.model = model;
    this.apiKey = apiKey;
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    const body = {
      model: this.model,
      messages: messages,
    };

    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        let result: ChatResponse;

        try {
          result = JSON.parse(text);
        } catch (err) {
          throw new Error(`JSON parse failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }

        const content = result.choices?.[0]?.message?.content;
        if (!content) {
          throw new Error('No content returned from API');
        }

        return content;
      } catch (error) {
        retryCount++;
        if (retryCount >= maxRetries) {
          throw error;
        }

        // Exponential backoff
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error('Max retries exceeded');
  }

  async analyzeImage(imageUrl: string, prompt: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: imageUrl } },
        ],
      },
    ];

    return this.sendMessage(messages);
  }

  async analyzeVideo(videoUrl: string, prompt: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'video_url', video_url: { url: videoUrl } },
        ],
      },
    ];

    return this.sendMessage(messages);
  }
}