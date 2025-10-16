# Project Context

## Purpose 
开发一个基于 Model Context Protocol (MCP) 的视觉分析服务器，为 AI 助手提供 OpenAI 兼容的图像和视频分析功能。该项目通过标准化 MCP 接口暴露视觉处理工具，支持可配置的 API 端点，使 LLM 能够理解和分析多媒体内容，实现图像识别、视频分析和计算机视觉相关的 AI 功能。项目专注于安全、可靠的视觉分析服务，支持本地文件和远程 URL 处理。

## Tech Stack
- **TypeScript** - 主要开发语言，提供类型安全和现代 JavaScript 特性
- **Bun** - JavaScript 运行时和构建工具，提供高性能执行环境和内置测试
- **Model Context Protocol (MCP) SDK** (@modelcontextprotocol/sdk) - 构建标准化 AI 工具接口的核心框架
- **Zod** - 运行时参数验证和类型定义的模式验证库
- **OpenAI Compatible API** - 支持多种视觉分析服务提供商的统一接口
- **Stdio Transport** - 基于 JSON-RPC 2.0 的标准输入输出通信协议
- **Node.js File System API** - 本地文件处理和 Base64 编码
- **Fetch API** - HTTP 请求处理和 API 调用

## Project Conventions

### Code Style
- 使用 TypeScript 严格模式，确保类型安全
- 命名规范：变量和函数使用 camelCase，类和类型使用 PascalCase
- 优先使用 named imports：`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"`
- 使用 async/await 处理异步操作，避免 Promise 链
- 为每个工具提供详细的描述和参数说明
- 使用 Zod schema 进行运行时参数验证和自动文档生成

### Architecture Patterns
- **服务分离架构**：FileService（文件处理）、ChatService（API通信）、ErrorHandler（错误处理）
- **MCP 工具模式**：`server.tool(name, description, schema, handler)` 格式
- **环境变量配置**：通过 `process.env` 管理敏感配置
- **错误包装器**：`ErrorHandler.wrapAsync()` 统一处理异步错误
- **重试机制**：指数退避算法实现 API 调用失败重试
- **类型安全接口**：所有服务间通信使用 TypeScript 接口定义

### Testing Strategy
- 使用 Bun 测试框架：`bun test`
- 单元测试覆盖：FileService、ChatService、ErrorHandler
- 集成测试：完整的 MCP 协议通信测试
- 错误场景测试：文件不存在、格式不支持、API 失败等
- 性能测试：大文件处理和并发请求测试
- 测试脚本：`simple-test.js` 和 `fixed-test.js` 用于快速验证

### Build and Deployment
- **构建命令**：`bun run build` 生成可执行文件到 `dist/`
- **开发模式**：`bun run dev` 支持热重载
- **环境配置**：`.env.example` 模板，实际配置在 `.env`
- **安装路径**：`cp dist/sight-mcp ~/bin/` 系统级安装
- **Claude Desktop 配置**：`~/Library/Application Support/Claude/claude_desktop_config.json`

### Git Workflow
- 主分支：`master`
- 功能分支：`feature/vision-analysis`、`feature/video-support`
- 修复分支：`fix/file-handling`、`fix/api-timeout`
- 提交格式：`type(scope): description`
  - `feat`: 新功能（analyze_image, analyze_video）
  - `fix`: 修复（file validation, error handling）
  - `docs`: 文档（README, API docs）
  - `refactor`: 重构（service extraction）
  - `test`: 测试（unit tests, integration tests）
  - `chore`: 构建/工具（dependencies, build scripts）

## Domain Context
该项目专注于计算机视觉和 AI 驱动的多媒体分析，提供 OpenAI 兼容的视觉分析服务：

### 核心功能域
- **图像分析**：支持 PNG/JPG/JPEG 格式，最大 5MB
- **视频分析**：支持 MP4/MOV/M4V 格式，最大 8MB
- **多模态处理**：文本 + 图像/视频的复合消息格式
- **本地文件处理**：文件验证、大小检查、Base64 编码
- **远程 URL 支持**：HTTP/HTTPS URL 直接访问

### 技术概念
- **OpenAI Vision API**：多模态消息结构和 image_url/video_url 字段
- **MCP 协议**：JSON-RPC 2.0 基础的标准化工具接口
- **Base64 编码**：文件数据的网络传输编码
- **MIME 类型**：application/octet-stream、image/jpeg、video/mp4 等
- **HTTP 重试**：指数退避算法和最大重试限制
- **文件系统操作**：path.resolve、fs.existsSync、fs.promises.stat

### API 兼容性
- **请求格式**：`{ model, messages: [{ role, content }] }`
- **多模态内容**：`[{ type: "text", text }, { type: "image_url", image_url: { url } }]`
- **响应解析**：`choices[0].message.content` 提取分析结果
- **认证头**：`Authorization: Bearer ${API_KEY}`
- **错误处理**：HTTP 状态码和 JSON 解析异常处理

## Important Constraints

### 安全约束
- **防御性安全优先**：仅支持合法的图像/视频分析任务
- **恶意文件检测**：文件扩展名和大小验证
- **隐私保护**：不存储用户上传的文件内容
- **API 密钥安全**：通过环境变量管理，不在代码中硬编码

### 性能约束
- **文件大小限制**：图像 5MB，视频 8MB（基于 API 提供商限制）
- **响应时间**：文件处理 + API 调用应在合理时间范围内
- **内存管理**：及时释放文件缓冲区和大对象
- **并发控制**：避免同时处理过多大文件请求

### 兼容性约束
- **MCP 协议合规**：严格遵循 MCP 2024-11-05 协议版本
- **OpenAI API 格式**：确保请求/响应格式与 OpenAI Vision API 兼容
- **Node.js 版本**：兼容 Node.js 18+ 和 Bun 最新版本
- **平台支持**：支持 macOS、Linux、Windows 跨平台运行

### 可靠性约束
- **错误处理完整性**：覆盖所有可能的失败场景
- **重试机制**：网络错误自动重试，最多 3 次
- **配置验证**：启动时检查必需的环境变量
- **优雅降级**：API 不可用时提供明确的错误信息

## External Dependencies

### 核心依赖
- **@modelcontextprotocol/sdk**: `^1.17.0` - MCP 协议实现和服务器框架
- **zod**: `^3.22.0` - 参数验证和运行时类型检查
- **@types/node**: `^20.0.0` - Node.js 类型定义（开发依赖）

### 运行时依赖
- **Bun Runtime**: 提供现代 JavaScript 执行环境
- **Node.js FS API**: 文件系统操作（path, fs 模块）
- **Fetch API**: HTTP 请求处理（内置）
- **Buffer API**: Base64 编码处理（内置）

### API 服务依赖
- **OpenAI Compatible Vision API**: 支持的端点包括：
  - `https://api.openai.com/v1/chat/completions`
- **支持的模型**: gpt-4-vision-preview, gpt-4o, claude-3-vision, glm-4.5v 等

### 系统依赖
- **标准输入输出**: JSON-RPC 2.0 通信通道
- **文件系统访问**: 读取本地图像/视频文件
- **网络访问**: 调用远程视觉分析 API
- **环境变量支持**: API 密钥和配置管理
