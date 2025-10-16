# Sight MCP - AI Vision Analysis Server

An OpenAI-compatible MCP server for image and video analysis. Works with any vision API that supports OpenAI's format.

**Just configure Claude Desktop and start using - no installation needed!**

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
- `API_URL` (optional): API endpoint (default: OpenAI)
- `MODEL` (optional): Model name (default: `gpt-4o`)

## Usage

### Image Analysis

```typescript
// Example: Analyze a local image
const result = await mcp.call("analyze_image", {
  image_source: "/path/to/image.png",
  prompt: "Describe what you see in this image, including objects, colors, and composition."
});
```

### Video Analysis

```typescript
// Example: Analyze a remote video
const result = await mcp.call("analyze_video", {
  video_source: "https://example.com/video.mp4",
  prompt: "Analyze this video and describe the main actions, scenes, and any notable events."
});
```

## Tools

### `analyze_image`
Analyzes images using advanced AI vision models.

**Parameters:**
- `image_source` (string): Local file path or remote URL to the image (PNG, JPG, JPEG, max 5MB)
- `prompt` (string): Detailed description of what to analyze or extract from the image

### `analyze_video`
Analyzes videos using advanced AI vision models.

**Parameters:**
- `video_source` (string): Local file path or remote URL to the video (MP4, MOV, M4V, max 8MB)
- `prompt` (string): Detailed description of what to analyze or extract from the video

## Development

```bash
# Clone and run
git clone https://github.com/yourusername/sight-mcp.git
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

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/sight-mcp/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/sight-mcp/discussions)
- 📧 **Security Issues**: Please report via private GitHub issue

---

## 中文版本

# Sight MCP - AI 视觉分析服务器

一个兼容 OpenAI 的模型上下文协议（MCP）服务器，提供使用 AI 视觉模型的高级图像和视频分析功能。该服务器通过标准化的 MCP 工具使 LLM 能够理解和分析多媒体内容。

## 功能特性

- **🖼️ 图像分析**: 分析 PNG、JPG、JPEG 文件（最大 5MB）
- **🎥 视频分析**: 分析 MP4、MOV、M4V 文件（最大 8MB）
- **🌐 远程 URL 支持**: 处理来自 HTTP/HTTPS URL 的图像和视频
- **📁 本地文件处理**: 安全文件验证和 Base64 编码
- **🔄 重试机制**: 内置指数退避确保 API 可靠性
- **🛡️ 错误处理**: 全面的错误管理和验证
- **🧪 完整测试覆盖**: 包含单元测试和集成测试

## 快速开始

### 安装

```bash
# 通过 NPM 安装
npm install -g sight-mcp

# 或从源码构建
git clone https://github.com/yourusername/sight-mcp.git
cd sight-mcp
bun install
bun run build
cp dist/sight-mcp $HOME/bin/
```

### 配置

设置你的 OpenAI API 密钥：

```bash
export OPENAI_API_KEY=your-api-key-here
```

### Claude Desktop 设置

添加到你的 Claude Desktop 配置（`~/Library/Application Support/Claude/claude_desktop_config.json`）：

```json
{
  "mcpServers": {
    "sight-mcp": {
      "command": "sight-mcp",
      "env": {
        "OPENAI_API_KEY": "your-api-key-here"
      }
    }
  }
}
```

## 使用方法

### 图像分析

```typescript
// 示例：分析本地图像
const result = await mcp.call("analyze_image", {
  image_source: "/path/to/image.png",
  prompt: "描述这张图像中的内容，包括对象、颜色和构图。"
});
```

### 视频分析

```typescript
// 示例：分析远程视频
const result = await mcp.call("analyze_video", {
  video_source: "https://example.com/video.mp4",
  prompt: "分析这个视频并描述主要动作、场景和任何值得注意的事件。"
});
```

## 工具

### `analyze_image`
使用高级 AI 视觉模型分析图像。

**参数：**
- `image_source` (string): 图像的本地文件路径或远程 URL（PNG、JPG、JPEG，最大 5MB）
- `prompt` (string): 详细说明要从图像中分析或提取什么内容

### `analyze_video`
使用高级 AI 视觉模型分析视频。

**参数：**
- `video_source` (string): 视频的本地文件路径或远程 URL（MP4、MOV、M4V，最大 8MB）
- `prompt` (string): 详细说明要从视频中分析或提取什么内容

## 开发

### 环境要求

- [Bun](https://bun.sh) - JavaScript 运行时和包管理器
- Node.js 18+（Bun 的替代选择）
- 具有视觉功能的 OpenAI API 密钥

### 设置

```bash
git clone https://github.com/yourusername/sight-mcp.git
cd sight-mcp
bun install
```

### 测试

```bash
# 运行所有测试
bun test

# 仅运行集成测试
bun run test:integration

# 开发监视模式
bun test --watch
```

### 构建

```bash
# 构建可执行文件
bun run build

# 显示包名
bun run show-package-name
```

### 使用 MCP Inspector 测试

```bash
package_name=$(bun run show-package-name)
npx @modelcontextprotocol/inspector dist/$package_name
```

## 配置选项

服务器支持以下环境变量：

- `OPENAI_API_KEY` (必需): 你的 OpenAI API 密钥
- `API_URL` (可选): 自定义 API 端点（默认: `https://api.openai.com/v1/chat/completions`）
- `MODEL` (可选): 模型名称（默认: `gpt-4o`）

## 架构

- **FileService**: 处理文件验证、处理和编码
- **ChatService**: 管理带有重试逻辑的 OpenAI API 通信
- **ErrorHandler**: 提供统一的错误处理和响应格式化
- **MCP Server**: 核心协议实现和工具注册

## 支持的文件格式

### 图像
- **格式**: PNG、JPG、JPEG
- **最大大小**: 5MB
- **处理**: 本地文件自动 Base64 编码

### 视频
- **格式**: MP4、MOV、M4V
- **最大大小**: 8MB
- **处理**: 远程文件直接 URL 传输

## 错误处理

服务器为以下情况提供全面的错误处理：
- 文件未找到或访问被拒绝
- 不支持的文件格式
- 文件大小超限
- API 认证失败
- 网络超时和重试
- 无效参数

## 贡献

1. Fork 仓库
2. 创建功能分支（`git checkout -b feature/amazing-feature`）
3. 提交更改（`git commit -m 'Add amazing feature'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 支持

- 🐛 **错误报告**: [GitHub Issues](https://github.com/yourusername/sight-mcp/issues)
- 💡 **功能请求**: [GitHub Discussions](https://github.com/yourusername/sight-mcp/discussions)
- 📧 **安全问题**: 请通过私人 GitHub issue 报告