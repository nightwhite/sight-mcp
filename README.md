# Sight MCP - AI Vision Analysis Server

A powerful MCP server that brings AI vision capabilities to Claude Desktop. Analyze images and videos using OpenAI GPT-4o, Claude, or any compatible vision API.

**中文版本**: See [README_CN.md](./README_CN.md) for the full Chinese documentation.

## Features

- **🖼️ Image Analysis**: Analyze PNG, JPG, JPEG files (max 5MB)
- **🎥 Video Analysis**: Analyze MP4, MOV, M4V files (max 8MB)
- **🌐 Remote URL Support**: Process images and videos from HTTP/HTTPS URLs
- **🔧 Multi-API Support**: Works with OpenAI, Anthropic, and compatible APIs
- **📁 Local File Processing**: Secure file validation and automatic encoding
- **🛡️ Error Handling**: Comprehensive error management and validation

## Quick Start

### 1. Install the Server

**Option A: npx (Recommended - No Installation)**
```bash
# Just add to Claude Desktop config below - nothing to install!
```

**Option B: Global Install**
```bash
npm install -g sight-mcp
# Or: bun install -g sight-mcp
```

### 2. Configure Claude Desktop

Add this to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "sight-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "sight-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-openai-api-key",
        "API_URL": "https://api.openai.com/v1/chat/completions",
        "MODEL": "gpt-4o"
      }
    }
  }
}
```

### 3. Configure Your API Provider

**Required Environment Variables:**
- `OPENAI_API_KEY` (required): Your API key
- `API_URL` (required): API endpoint URL
- `MODEL` (required): Model name

#### OpenAI GPT-4o
```json
"env": {
  "OPENAI_API_KEY": "sk-your-openai-key",
  "API_URL": "https://api.openai.com/v1/chat/completions",
  "MODEL": "gpt-4o"
}
```

#### Anthropic Claude
```json
"env": {
  "OPENAI_API_KEY": "sk-ant-your-claude-key",
  "API_URL": "https://api.anthropic.com/v1/messages",
  "MODEL": "claude-3-5-sonnet-20241022"
}
```

#### Zhipu AI GLM-4.5v
```json
"env": {
  "OPENAI_API_KEY": "your-zhipu-api-key",
  "API_URL": "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  "MODEL": "glm-4v"
}
```

#### Other Compatible APIs
Any API that follows the OpenAI vision format will work. Just update the `API_URL` and `MODEL` accordingly.

### 4. Restart Claude Desktop

After updating the config, restart Claude Desktop and you'll see the vision tools available!

### Usage Examples

Once configured, you can use these tools in Claude:

#### Image Analysis
```
Analyze this image: /path/to/photo.jpg
```

```
What do you see in this screenshot? /Users/desktop/screen.png
```

#### Video Analysis
```
Analyze the video at https://example.com/demo.mp4 and describe what happens
```

```
What's in this video file? /path/to/recordings.mov
```

#### Using in Claude Code
When using Claude Code, add this MCP server with:

```bash
claude mcp add sight-mcp --env OPENAI_API_KEY=your_api_key --env API_URL=https://api.openai.com/v1/chat/completions --env MODEL=gpt-4o -- npx -y sight-mcp
```

Or for different providers:

```bash
# Anthropic Claude
claude mcp add sight-mcp --env OPENAI_API_KEY=your_claude_key --env API_URL=https://api.anthropic.com/v1/messages --env MODEL=claude-3-5-sonnet-20241022 -- npx -y sight-mcp

# Zhipu AI
claude mcp add sight-mcp --env OPENAI_API_KEY=your_zhipu_key --env API_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions --env MODEL=glm-4v -- npx -y sight-mcp
```

After adding, the tools are available directly in Claude Code conversations as:
- `mcp__sight-mcp__analyze_image`
- `mcp__sight-mcp__analyze_video`

## Supported File Formats

### Images
- **Formats**: PNG, JPG, JPEG
- **Max Size**: 5MB
- **Source**: Local files or HTTP/HTTPS URLs

### Videos
- **Formats**: MP4, MOV, M4V
- **Max Size**: 8MB
- **Source**: Local files or HTTP/HTTPS URLs

## Available Tools

### `analyze_image`
Analyzes images using AI vision models.

**Parameters:**
- `image` (string): Local file path or remote URL to the image
- `prompt` (string): What you want to know about the image

### `analyze_video`
Analyzes videos using AI vision models.

**Parameters:**
- `video` (string): Local file path or remote URL to the video
- `prompt` (string): What you want to know about the video

## Troubleshooting

### Common Issues

**"Server not found" error:**
- Make sure Claude Desktop is restarted after config changes
- Check that your API key is valid and has credits
- Verify the `API_URL` is correct for your provider

**"File too large" error:**
- Images: Max 5MB
- Videos: Max 8MB
- Try compressing files or using URLs for larger files

**"Unsupported format" error:**
- Images: Use PNG, JPG, or JPEG
- Videos: Use MP4, MOV, or M4V

**API authentication errors:**
- Double-check your `OPENAI_API_KEY`
- Ensure the key has vision capabilities enabled
- Verify the `API_URL` matches your provider

### Debug Mode

Add `"DEBUG": "true"` to your environment variables to see detailed logs:

```json
"env": {
  "OPENAI_API_KEY": "your-key",
  "API_URL": "https://api.openai.com/v1/chat/completions",
  "MODEL": "gpt-4o",
  "DEBUG": "true"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 **Security Issues**: Please report via private GitHub issue
