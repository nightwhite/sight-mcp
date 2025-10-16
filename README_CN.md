# Sight MCP - AI 视觉分析服务器

兼容 OpenAI 格式的 MCP 图像和视频分析服务器。支持任何使用 OpenAI 格式的视觉 API。

**只需配置 Claude Desktop 即可使用 - 无需安装！**

## 功能特性

- **🖼️ 图像分析**: 分析 PNG、JPG、JPEG 文件（最大 5MB）
- **🎥 视频分析**: 分析 MP4、MOV、M4V 文件（最大 8MB）
- **🌐 远程 URL 支持**: 处理来自 HTTP/HTTPS URL 的图像和视频
- **📁 本地文件处理**: 安全文件验证和 Base64 编码
- **🔄 重试机制**: 内置指数退避确保 API 可靠性
- **🛡️ 错误处理**: 全面的错误管理和验证
- **🧪 完整测试覆盖**: 包含单元测试和集成测试

## 快速开始

### Claude Desktop 配置

只需在你的 Claude Desktop 配置中添加这个（`~/Library/Application Support/Claude/claude_desktop_config.json`）：

**npx 方式（无需安装，推荐）：**

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

### 兼容的 API 提供商

支持任何 OpenAI 兼容的 API：

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

**环境变量说明：**
- `OPENAI_API_KEY` (必需): 你的 API 密钥
- `API_URL` (可选): API 端点（默认：OpenAI）
- `MODEL` (可选): 模型名称（默认：`gpt-4o`）

## 使用方法

### 图像分析

```typescript
// 示例：分析本地图像
const result = await mcp.call("analyze_image", {
  image: "/path/to/image.png",
  prompt: "描述这张图像中的内容，包括对象、颜色和构图。"
});
```

### 视频分析

```typescript
// 示例：分析远程视频
const result = await mcp.call("analyze_video", {
  video: "https://example.com/video.mp4",
  prompt: "分析这个视频并描述主要动作、场景和任何值得注意的事件。"
});
```

## 工具

### `analyze_image`

使用高级 AI 视觉模型分析图像。

**参数：**

- `image` (string): 图像的本地文件路径或远程 URL（PNG、JPG、JPEG，最大 5MB）
- `prompt` (string): 详细说明要从图像中分析或提取什么内容

### `analyze_video`

使用高级 AI 视觉模型分析视频。

**参数：**

- `video` (string): 视频的本地文件路径或远程 URL（MP4、MOV、M4V，最大 8MB）
- `prompt` (string): 详细说明要从视频中分析或提取什么内容

## 开发

```bash
# 克隆并运行
git clone https://github.com/nightwhite/sight-mcp.git
cd sight-mcp
bun install
bun run dev

# 测试
bun test
```

## 配置选项

所有配置都通过 Claude Desktop 配置中的环境变量完成：

- `OPENAI_API_KEY` (必需): 你的 API 密钥
- `API_URL` (可选): API 端点（默认：OpenAI）
- `MODEL` (可选): 模型名称（默认：`gpt-4o`）

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

- 🐛 **错误报告**: [GitHub Issues](https://github.com/nightwhite/sight-mcp/issues)
- 💡 **功能请求**: [GitHub Discussions](https://github.com/nightwhite/sight-mcp/discussions)
- 📧 **安全问题**: 请通过私人 GitHub issue 报告

---

**English version**: See [README.md](./README.md) for the full English documentation.