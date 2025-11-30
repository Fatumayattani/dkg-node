import { runAuthenticityCheck } from "./tools/runAuthenticityCheck";
import { getReportByHash } from "./tools/getReportByHash";

// Placeholder MCP server creation
// Replace this with the actual MCP server library once provided by hackathon docs
function createMcpServer(config: any) {
  return {
    config,
    tools: {},
    registerTool(name: string, handler: any) {
      this.tools[name] = handler;
    },
    listen(options: any, cb: Function) {
      console.log(`MCP server running on port ${options.port}`);
      cb();
    },
  };
}

async function main() {
  const server = createMcpServer({
    name: "alle-labs-mcp",
  });

  server.registerTool("run_authenticity_check", runAuthenticityCheck);
  server.registerTool("get_report_by_hash", getReportByHash);

  const port = process.env.MCP_PORT || 9300;

  server.listen({ port }, () => {
    console.log(`Alle Labs MCP plugin active on port ${port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start MCP plugin:", err);
});
