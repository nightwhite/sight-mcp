#!/usr/bin/env node

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { spawn } = require('child_process');
const path = require('path');

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

// Check if API key is available
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY not found in environment variables');
  console.error('💡 Please create a .env or .env.local file with your API key');
  console.error('📄 See .env.example for template');
  process.exit(1);
}

console.log('🔑 Using API key:', process.env.OPENAI_API_KEY.substring(0, 10) + '...');

// 启动MCP服务器
const serverPath = path.join(process.cwd(), 'dist', 'sight-mcp');
const server = spawn(serverPath, [], {
  stdio: ['pipe', 'pipe', 'pipe']
});

console.log('🚀 启动MCP服务器测试...');

// 发送初始化消息
const initMessage = {
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: {
      name: "test-client",
      version: "1.0.0"
    }
  }
};

// 发送工具列表请求
const toolsMessage = {
  jsonrpc: "2.0",
  id: 2,
  method: "tools/list",
  params: {}
};

server.stdout.on('data', (data) => {
  console.log('📤 服务器响应:', data.toString());
});

server.stderr.on('data', (data) => {
  console.log('❌ 错误:', data.toString());
});

server.on('close', (code) => {
  console.log(`🏁 服务器退出，代码: ${code}`);
});

// 发送测试消息
setTimeout(() => {
  console.log('📤 发送初始化消息...');
  server.stdin.write(JSON.stringify(initMessage) + '\n');
}, 100);

setTimeout(() => {
  console.log('📤 请求工具列表...');
  server.stdin.write(JSON.stringify(toolsMessage) + '\n');
}, 500);

setTimeout(() => {
  console.log('📤 测试图片分析工具...');
  const testImageMessage = {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "analyze_image",
      arguments: {
        image_source: "参考/example.png",
        prompt: "请简单描述这张图片"
      }
    }
  };
  server.stdin.write(JSON.stringify(testImageMessage) + '\n');
}, 1000);

setTimeout(() => {
  server.kill();
}, 10000);

console.log('⏳ 等待服务器响应...');