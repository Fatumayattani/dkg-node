import { DkgClient } from "@dkg/plugins";
import { createKnowledgeAsset } from "../utils/knowledgeAsset";
import { publishToDkg } from "../utils/dkgPublish";
import { verifyX402Receipt } from "../utils/x402";
import axios from "axios";

export default async function runAuthenticityCheck(ctx, input) {
  const { mediaUrl, premium } = input;

  if (premium) {
    await verifyX402Receipt(ctx, input);
  }

  const workerUrl = "http://localhost:9400/check";

  const response = await axios.post(workerUrl, {
    mediaUrl
  });

  const report = response.data;

  const knowledgeAsset = createKnowledgeAsset(report);

  const ual = await publishToDkg(ctx, knowledgeAsset);

  return {
    summary: `Authenticity check complete for ${mediaUrl}`,
    report,
    ual
  };
}
