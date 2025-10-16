import {
  McpServer,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ChatService } from "./src/services/ChatService.js";
import { FileService } from "./src/services/FileService.js";

const API_URL = process.env.API_URL || "https://api.openai.com/v1/chat/completions";
const MODEL = process.env.MODEL || "gpt-4o";
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

const server = new McpServer({
  name: "sight-mcp",
  version: "1.0.0",
});

const chatService = new ChatService(API_URL, MODEL, API_KEY);

server.tool(
  "analyze_image",
  "Analyze an image using advanced AI vision models with comprehensive understanding capabilities. Supports both local files and remote URL. Maximum file size: 5MB",
  {
    image_source: z.string().describe("Local file path or remote URL to the image (supports PNG, JPG, JPEG)"),
    prompt: z.string().describe("Detailed text prompt describing what to analyze, extract, or understand from the image"),
  },
  async ({ image_source, prompt }) => {
    try {
      const { dataUrl, fileInfo } = await FileService.processFile(image_source);
      const imageUrl = dataUrl || fileInfo.path;

      const analysis = await chatService.analyzeImage(imageUrl, prompt);

      return {
        content: [{ type: "text", text: analysis }],
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
        };
      }
      return {
        content: [{ type: "text", text: `Unknown error occurred: ${String(error)}` }],
      };
    }
  },
);

server.tool(
  "analyze_video",
  "Analyze a video using advanced AI vision models with comprehensive understanding capabilities. Supports both local files and remote URL. Maximum file size: 8MB",
  {
    video_source: z.string().describe("Local file path or remote URL to the video (supports MP4, MOV, M4V)"),
    prompt: z.string().describe("Detailed text prompt describing what to analyze, extract, or understand from the video"),
  },
  async ({ video_source, prompt }) => {
    try {
      const { dataUrl, fileInfo } = await FileService.processFile(video_source);
      const videoUrl = dataUrl || fileInfo.path;

      const analysis = await chatService.analyzeVideo(videoUrl, prompt);

      return {
        content: [{ type: "text", text: analysis }],
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
        };
      }
      return {
        content: [{ type: "text", text: `Unknown error occurred: ${String(error)}` }],
      };
    }
  },
);

async function main() {
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (import.meta.main) {
  main();
}
