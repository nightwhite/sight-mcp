## Context

项目需要从一个基础的MCP服务器转换为支持视觉分析的OpenAI兼容服务器。当前项目包含示例工具，需要完全重构以支持图片和视频分析功能。

## Goals / Non-Goals

- Goals:
  - 提供兼容OpenAI API格式的图片分析功能
  - 提供兼容OpenAI API格式的视频分析功能
  - 支持本地文件和远程URL两种输入方式
  - 实现健壮的错误处理和重试机制
  - 保持与@z_ai/mcp-server相似的功能和架构

- Non-Goals:
  - 支持实时视频流处理
  - 提供图像/视频编辑功能
  - 实现复杂的用户认证系统

## Decisions

- Decision: 采用@z_ai/mcp-server的架构模式，使用服务类分离关注点
- Decision: 使用OpenAI兼容的API格式，支持multimodal messages
- Decision: 文件大小限制：图片5MB，视频8MB（基于参考实现）
- Decision: 支持的格式：PNG/JPG/JPEG（图片），MP4/MOV/M4V（视频）
- Decision: 使用Zod进行参数验证，确保类型安全
- Decision: 实现重试机制，提高API调用的可靠性

## Risks / Trade-offs

- [Risk] API兼容性问题 → 严格遵循OpenAI API格式，进行充分测试
- [Risk] 文件大小限制影响用户体验 → 提供清晰的错误信息和处理建议
- [Trade-off] 功能完整性 vs 实现复杂度 → 优先实现核心功能，后续迭代扩展

## Migration Plan

1. 备份当前代码
2. 创建新的核心服务架构
3. 逐步实现图片和视频分析功能
4. 测试API集成和错误处理
5. 更新文档和部署配置
6. 验证所有功能正常工作

## Open Questions

- 是否需要支持其他图片/视频格式？
- API超时时间应该如何设置？
- 是否需要添加缓存机制？