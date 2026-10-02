import { createMcpHandler, McpServer, SUPPORTED_PROTOCOL_VERSIONS } from '@modelcontextprotocol/server';
import { registerSourceTools } from 'fumadocs-core/mcp';
import { createFromSource } from 'fumadocs-core/search/server';
import { docsLlms, source } from '@/lib/source';
import { appName } from '@/lib/shared';
import { registerDocsSearchTool } from '@/lib/mcp-search';

// Built once per worker instance, not per request.
const searchServer = createFromSource(source);

const serverInfo = {
  name: 'docs',
  version: '1.0.0',
};

const handler = createMcpHandler(() => {
  const mcp = new McpServer(serverInfo);

  registerSourceTools(mcp, source, docsLlms);
  registerDocsSearchTool(mcp, searchServer);

  return mcp;
});

// Ask the MCP handler itself for its tools, so this listing never drifts
// from what clients actually get.
async function listTools(): Promise<{ name: string; description?: string }[]> {
  const response = await handler.fetch(
    new Request('http://localhost/api/mcp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }),
    }),
  );

  // Responses are SSE-framed: pull the JSON out of the `data:` line.
  const text = await response.text();
  const data = text.split('\n').find((line) => line.startsWith('data: '));
  const message = JSON.parse(data ? data.slice('data: '.length) : text);

  return (message.result?.tools ?? []).map((tool: { name: string; description?: string }) => ({
    name: tool.name,
    description: tool.description,
  }));
}

export async function GET(request: Request) {
  // A client opening an SSE stream gets the protocol's normal response (405,
  // since this server is stateless). Anyone else, e.g. a browser, gets a
  // description of the server.
  if (request.headers.get('accept')?.includes('text/event-stream')) {
    return handler.fetch(request);
  }

  return Response.json({
    name: appName,
    description: 'An MCP server for these docs. Connect an MCP client to this URL (Streamable HTTP).',
    server: serverInfo,
    protocolVersions: SUPPORTED_PROTOCOL_VERSIONS,
    pages: source.getPages().length,
    tools: await listTools(),
  });
}

export async function POST(request: Request) {
  return handler.fetch(request);
}

export async function DELETE(request: Request) {
  return handler.fetch(request);
}
