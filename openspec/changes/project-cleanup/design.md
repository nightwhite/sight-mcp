## Context

当前项目结构包含多个冗余文件和混乱的目录组织。参考文件、测试文件和配置文件混合在根目录中，缺乏清晰的项目结构。项目使用 Bun 作为运行时，但仍保留了不必要的 TypeScript 配置文件。

## Goals / Non-Goals

- Goals:
  - 创建干净、专业的项目结构
  - 建立标准的测试目录组织
  - 移除不必要的参考文件和冗余配置
  - 保持所有核心功能不变
  - 提高项目的可维护性

- Non-Goals:
  - 修改核心功能代码
  - 改变 MCP 服务器的 API 接口
  - 更新 OpenSpec 规范内容
  - 修改构建和部署流程

## Decisions

- Decision: 删除 `参考/` 目录，这些是开发时的参考文件，不属于生产代码
- Decision: 将所有测试文件移至 `test/` 目录，遵循标准的项目组织规范
- Decision: 移除 `tsconfig.json`，因为项目使用 Bun 而非 TypeScript 编译器
- Decision: 保留 `.env.example` 作为环境配置模板
- Decision: 保留 `openspec/` 目录的完整结构，这是项目的重要文档

## Risks / Trade-offs

- [Risk] 测试文件路径变更可能影响现有的测试运行脚本 → 更新 package.json 中的测试脚本
- [Risk] 删除参考文件可能影响开发调试 → 在需要时可以重新创建
- [Trade-off] 更简洁的结构 vs 现有工作流的适应性 → 优先考虑长期可维护性

## Migration Plan

1. 备份当前项目状态
2. 创建新的测试目录结构
3. 移动测试文件到新位置
4. 删除冗余文件和目录
5. 更新构建和测试脚本
6. 验证所有功能正常工作
7. 更新项目文档

## Open Questions

- 是否需要在 test/fixtures/ 中保留示例图片？
- 集成测试脚本是否需要重命名以符合新的命名约定？
- 是否需要添加单元测试以覆盖服务类？