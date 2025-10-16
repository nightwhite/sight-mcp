import { describe, it, expect, beforeAll } from 'bun:test';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('MCP Server Integration Tests', () => {
  let serverPath: string;

  beforeAll(() => {
    serverPath = path.join(__dirname, '../../dist', 'sight-mcp');
  });

  describe('Server Startup', () => {
    it('should start successfully', async () => {
      const server = spawn(serverPath, [], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, OPENAI_API_KEY: 'test-key' }
      });

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

      return new Promise((resolve, reject) => {
        server.stdout.on('data', (data) => {
          try {
            const response = JSON.parse(data.toString());
            if (response.result?.serverInfo) {
              expect(response.result.serverInfo.name).toBe('sight-mcp');
              server.kill();
              resolve(response);
            }
          } catch (e) {
            // Ignore JSON parse errors during startup
          }
        });

        server.on('error', reject);

        setTimeout(() => {
          server.stdin.write(JSON.stringify(initMessage) + '\n');
        }, 100);

        setTimeout(() => {
          server.kill();
          reject(new Error('Server startup timeout'));
        }, 5000);
      });
    });
  });

  describe('Tool Registration', () => {
    it('should list available tools', async () => {
      const server = spawn(serverPath, [], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, OPENAI_API_KEY: 'test-key' }
      });

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

      const toolsMessage = {
        jsonrpc: "2.0",
        id: 2,
        method: "tools/list",
        params: {}
      };

      return new Promise((resolve, reject) => {
        let initialized = false;

        server.stdout.on('data', (data) => {
          try {
            const response = JSON.parse(data.toString());

            if (response.result?.serverInfo && !initialized) {
              initialized = true;
              setTimeout(() => {
                server.stdin.write(JSON.stringify(toolsMessage) + '\n');
              }, 100);
            } else if (response.result?.tools) {
              const toolNames = response.result.tools.map((t: any) => t.name);
              expect(toolNames).toContain('analyze_image');
              expect(toolNames).toContain('analyze_video');
              server.kill();
              resolve(response);
            }
          } catch (e) {
            // Ignore JSON parse errors
          }
        });

        server.on('error', reject);

        setTimeout(() => {
          server.stdin.write(JSON.stringify(initMessage) + '\n');
        }, 100);

        setTimeout(() => {
          server.kill();
          reject(new Error('Tool listing timeout'));
        }, 10000);
      });
    });
  });
});