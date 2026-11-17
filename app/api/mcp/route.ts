import { handleMcpMessage } from "@/lib/mcp/server";

/**
 * MCP endpoint (Streamable HTTP, JSON responses). Send JSON-RPC messages with
 * POST to this URL. The server does not open a streaming (SSE) channel, so GET
 * returns 405, which the spec allows.
 */
export const dynamic = "force-dynamic";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id",
  "Access-Control-Max-Age": "86400",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export function GET() {
  return Response.json(
    { error: "Send JSON-RPC messages with POST. This server does not open a streaming session." },
    { status: 405, headers: { ...CORS, Allow: "POST, OPTIONS" } },
  );
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      { status: 400, headers: CORS },
    );
  }

  if (Array.isArray(body)) {
    const replies = (await Promise.all(body.map((m) => handleMcpMessage(m)))).filter((r) => r !== null);
    if (replies.length === 0) return new Response(null, { status: 202, headers: CORS });
    return Response.json(replies, { headers: CORS });
  }

  const reply = await handleMcpMessage(body);
  if (reply === null) return new Response(null, { status: 202, headers: CORS });
  return Response.json(reply, { headers: CORS });
}
