import { createPlugin } from "@dkg/plugins";
import runAuthenticityCheck from "./tools/runAuthenticityCheck";
import getReportByHash from "./tools/getReportByHash";

export default createPlugin({
  id: "alle_labs_plugin",
  metadata: {
    name: "Alle Labs",
    description: "Authenticity check and DKG publishing plugin",
    version: "0.0.1"
  },
  tools: {
    run_authenticity_check: {
      description: "Runs deepfake detection and publishes a Knowledge Asset",
      inputSchema: {
        type: "object",
        properties: {
          mediaUrl: { type: "string" },
          premium: { type: "boolean" }
        },
        required: ["mediaUrl"]
      },
      handler: runAuthenticityCheck
    },

    get_report_by_hash: {
      description: "Fetches a stored authenticity Knowledge Asset from the DKG",
      inputSchema: {
        type: "object",
        properties: {
          mediaHash: { type: "string" }
        },
        required: ["mediaHash"]
      },
      handler: getReportByHash
    }
  }
});
