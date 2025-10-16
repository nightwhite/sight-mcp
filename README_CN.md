# Sight MCP - AI 视觉分析服务器

为 Claude Desktop 提供 AI 视觉功能的 MCP 服务器。支持使用 OpenAI GPT-4o、Claude 或任何兼容的视觉 API 分析图像和视频。

## 功能特性

- **🖼️ 图像分析**: 分析 PNG、JPG、JPEG 文件（最大 5MB）
- **🎥 视频分析**: 分析 MP4、MOV、M4V 文件（最大 8MB）
- **🌐 远程 URL 支持**: 处理来自 HTTP/HTTPS URL 的图像和视频
- **🔧 多 API 支持**: 兼容 OpenAI、Anthropic 和其他兼容 API
- **📁 本地文件处理**: 安全文件验证和自动编码
- **🛡️ 错误处理**: 全面的错误管理和验证

## 快速配置

### Claude Desktop 配置

在你的 Claude Desktop 配置中添加这个（`~/Library/Application Support/Claude/claude_desktop_config.json`）：

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

### API 提供商配置

**必需环境变量:**
- `OPENAI_API_KEY` (必需): 你的 API 密钥
- `API_URL` (必需): API 端点 URL
- `MODEL` (必需): 模型名称

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

#### 智谱 AI GLM-4.5v
```json
"env": {
  "OPENAI_API_KEY": "your-zhipu-api-key",
  "API_URL": "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  "MODEL": "glm-4v"
}
```

配置完成后重启 Claude Desktop 即可使用！

## 使用方法

配置完成后，你可以在 Claude 中这样使用：

### 图像分析
```
分析这张图片：/path/to/photo.jpg
```

```
这张截图里有什么？/Users/desktop/screen.png
```

### 视频分析
```
分析 https://example.com/demo.mp4 这个视频并描述内容
```

#### 在 Claude Code 中使用
在 Claude Code 中，使用以下命令添加这个 MCP 服务器：

```bash
claude mcp add sight-mcp --env OPENAI_API_KEY=your_api_key --env API_URL=https://api.openai.com/v1/chat/completions --env MODEL=gpt-4o -- npx -y sight-mcp
```

或其他提供商：

```bash
# Anthropic Claude
claude mcp add sight-mcp --env OPENAI_API_KEY=your_claude_key --env API_URL=https://api.anthropic.com/v1/messages --env MODEL=claude-3-5-sonnet-20241022 -- npx -y sight-mcp

# 智谱 AI
claude mcp add sight-mcp --env OPENAI_API_KEY=your_zhipu_key --env API_URL=https://open.bigmodel.cn/api/paas/v4/chat/completions --env MODEL=glm-4v -- npx -y sight-mcp
```

添加后，在 Claude Code 对话中可直接使用这些工具：
- `mcp__sight-mcp__analyze_image`
- `mcp__sight-mcp__analyze_video`

## 支持的文件格式

### 图像
- **格式**: PNG、JPG、JPEG
- **最大大小**: 5MB
- **来源**: 本地文件或 HTTP/HTTPS URL

### 视频
- **格式**: MP4、MOV、M4V
- **最大大小**: 8MB
- **来源**: 本地文件或 HTTP/HTTPS URL

## 可用工具

### `analyze_image`
使用 AI 视觉模型分析图像。

**参数:**
- `image` (string): 图像的本地文件路径或远程 URL
- `prompt` (string): 你想了解的关于图像的内容

### `analyze_video`
使用 AI 视觉模型分析视频。

**参数:**
- `video` (string): 视频的本地文件路径或远程 URL
- `prompt` (string): 你想了解的关于视频的内容

---

**English version**: See [README.md](./README.md) for the full English documentation.