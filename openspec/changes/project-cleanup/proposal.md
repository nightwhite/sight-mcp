## Why

当前项目包含多个冗余文件和混乱的目录结构，需要进行清理和重组。测试文件散布在项目根目录，参考文件和开发工具混合在一起，影响了项目的可维护性和专业性。通过清理和重组，可以创建一个精简、专业的 MCP 服务器项目结构，提高代码组织和开发效率。

## What Changes

### 文件清理
- **删除参考目录**: 移除 `参考/` 目录及其内容（curl.log, desc-img.js, example.png）
- **清理根目录测试文件**: 移除 `fixed-test.js`, `simple-test.js`, `test-mcp.js`, `test-image.txt`
- **移除冗余配置文件**: 删除 `tsconfig.json`（项目使用 Bun，不需要 TypeScript 配置）

### 目录重组
- **创建专用测试目录**: 建立 `test/` 目录，包含所有测试相关文件
- **整理测试文件结构**:
  - `test/integration/` - 集成测试
  - `test/fixtures/` - 测试数据文件
  - `test/utils/` - 测试工具函数

### 核心文件保留
- **源代码**: `index.ts`, `src/services/` 目录下的核心服务
- **配置文件**: `package.json`, `.env.example`, `bun.lock`
- **文档**: `README.md`, `CLAUDE.md`, `openspec/` 目录
- **构建输出**: `dist/` 目录（通过 .gitignore 管理）

### 测试文件重组
- **移动集成测试**: 将现有的测试脚本重组到 `test/integration/`
- **创建测试套件**: 建立标准的 Bun 测试结构
- **添加测试数据**: 将示例图片移到 `test/fixtures/`

## Impact

- 受影响的规范：无（这是项目清理，不影响功能规范）
- 受影响的代码：测试文件位置，构建脚本路径
- 新增文件：测试目录结构，标准化的测试套件
- 删除文件：参考目录，冗余配置文件，根目录测试文件

## Expected Outcome

清理后的项目将具有：
- 精简的根目录，只包含核心文件
- 专业的测试目录结构
- 清晰的配置和文档组织
- 更好的可维护性和开发体验