# Sight MCP - AI Vision Analysis Server

An OpenAI-compatible MCP server for image and video analysis. Works with any vision API that supports OpenAI's format.

**Just configure Claude Desktop and start using - no installation needed!**

**中文版本**: See [README_CN.md](./README_CN.md) for the full Chinese documentation.

## Features

- **🖼️ Image Analysis**: Analyze PNG, JPG, JPEG files (max 5MB)
- **🎥 Video Analysis**: Analyze MP4, MOV, M4V files (max 8MB)
- **🌐 Remote URL Support**: Process images and videos from HTTP/HTTPS URLs
- **📁 Local File Processing**: Secure file validation and Base64 encoding
- **🔄 Retry Mechanism**: Built-in exponential backoff for API reliability
- **🛡️ Error Handling**: Comprehensive error management and validation
- **🧪 Full Test Coverage**: Unit and integration tests included

## Quick Start

### Claude Desktop Setup

Just add this to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

**npx (no installation, recommended):**

```json
{
  "mcpServers": {
    "sight-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "sight-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-api-key-here",
        "API_URL": "https://api.openai.com/v1/chat/completions",
        "MODEL": "gpt-4o"
      }
    }
  }
}
```

### Compatible API Providers

This works with any OpenAI-compatible API:

```json
{
  "env": {
    "OPENAI_API_KEY": "your-key",
    "API_URL": "https://api.openai.com/v1/chat/completions",
    "MODEL": "gpt-4o"
  }
}
```

```json
{
  "env": {
    "OPENAI_API_KEY": "your-key",
    "API_URL": "https://api.anthropic.com/v1/messages",
    "MODEL": "claude-3-5-sonnet-20241022"
  }
}
```

**Environment Variables:**
- `OPENAI_API_KEY` (required): Your API key
- `API_URL` (optional): API end point (default: OpenAI)
- `MODEL` (optional): Model name (default: `gpt-4o`)

## Usage

### Image Analysis

```typescript
// Example: Analyze a local image
const result = await mcp.call("analyze_image", {
  image: "/path/to/image.png",
  prompt: "Describe what you see in this image, including objects, colors, and composition."
});
```

### Video Analysis

```typescript
// Example: Analyze a remote video
const result = await mcp.call("analyze_video", {
  video: "https://example.com/video.mp4",
  prompt: "Analyze this video and describe the main actions, scenes, and any notable events."
});
```

## Tools

### `analyze_image`
Analyzes images using advanced AI vision models.

**Parameters:**
- `image` (string): Local file path or remote URL to the image (PNG, JPG, JPEG, max 5MB)
- `prompt` (string): Detailed description of what to analyze or extract from the image

### `analyze_video`
Analyzes videos using advanced AI vision models.

**Parameters:**
- `video` (string): Local file path or remote URL to the video (MP4, MOV, M4V, max 8MB)
- `prompt` (string): Detailed description of what to analyze or extract from the video

## Development

```bash
# Clone and run
git clone https://github.com/nightwhite/sight-mcp.git
cd sight-mcp
bun install
bun run dev

# Test
bun test
```

## Configuration Options

All configuration is done through environment variables in your Claude Desktop config:

- `OPENAI_API_KEY` (required): Your API key
- `API_URL` (optional): API endpoint (default: OpenAI)
- `MODEL` (optional): Model name (default: `gpt-4o`)

## Architecture

- **FileService**: Handles file validation, processing, and encoding
- **ChatService**: Manages OpenAI API communication with retry logic
- **ErrorHandler**: Provides unified error handling and response formatting
- **MCP Server**: Core protocol implementation and tool registration

## Supported File Formats

### Images
- **Formats**: PNG, JPG, JPEG
- **Max Size**: 5MB
- **Processing**: Automatic Base64 encoding for local files

### Videos
- **Formats**: MP4, MOV, M4V
- **Max Size**: 8MB
- **Processing**: Direct URL transmission for remote files

## Error Handling

The server provides comprehensive error handling for:
- File not found or access denied
- Unsupported file formats
- File size exceeded
- API authentication failures
- Network timeouts and retries
- Invalid parameters

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/nightwhite/sight-mcp/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/nightwhite/sight-mcp/discussions)
- 📧 **Security Issues**: Please report via private GitHub issue