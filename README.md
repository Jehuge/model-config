# Model Config Demo System

这是一个演示如何配置和管理 AI 模型（支持 OpenAI, Gemini, DeepSeek, Anthropic, Ollama 等）的 React + Express 全栈应用。

## 功能特点

- **多模型支持**：统一的配置界面，支持多种主流 AI 提供商。
- **本地优先**：所有配置数据仅存储在浏览器的 **LocalStorage** 中。
- **验证机制**：提供后端验证接口，确保模型配置（API Key, Base URL）可用。
- **完全开源**：基于 Express 和 React 构建，易于扩展和二次开发。

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动服务

你需要同时启动后端API服务和前端开发服务器。

**启动后端 (端口 3001):**
```bash
pnpm run serve
```

**启动前端 (端口 5173+):**
```bash
pnpm run dev
```

打开浏览器访问前端地址（通常是 `http://localhost:5173`）即可使用。

## 🔐 数据安全说明

本项目高度重视数据安全，特别是对于 API Key 的处理：

1.  **纯本地存储**：所有的模型配置（包括 API Key）都**只存储在您的浏览器 LocalStorage 中**。
2.  **不上传云端**：后端服务器仅提供 verify（验证）接口，接收配置参数进行一次性连接测试，**不会保存任何 Key 到数据库或文件中**。
3.  **开源透明**：您可以随时查看源码（`src/ui/components/ModelConfig.tsx` 和 `server/index.ts`）来验证数据处理逻辑。

> **注意**：请勿将包含真实 API Key 的代码或截图分享给他人。如果你在公共电脑上使用，请在使用后清除浏览器缓存或使用无痕模式。

## 项目结构

- `src/ui`: 前端 UI 组件库
- `src/core`: 核心业务逻辑和 Adapter 实现
- `src/server`: 后端 Express 服务器
- `src/*.tsx`: 前端入口文件

## License

MIT
