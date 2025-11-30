import axios from "axios";
import { publishToDKG, KnowledgeAsset } from "../utils/dkgPublish";
import { buildKnowledgeAsset } from "../utils/knowledgeAsset";
import { verifyX402Payment } from "../utils/x402";

interface RunAuthenticityCheckInput {
  mediaUrl: string;
  premium?: boolean;
  receipt?: string;
}

export async function runAuthenticityCheck(input: RunAuthenticityCheckInput) {
  // 1. Verify x402 payment
  const payment = await verifyX402Payment({
    premium: input.premium,
    receipt: input.receipt,
  });

  if (!payment.allowed) {
    return { summary: payment.reason, knowledgeAssetUAL: null };
  }

  try {
    // 2. Call detection worker
    const response = await axios.post("http://127.0.0.1:9400/check", { mediaUrl: input.mediaUrl });
    const report = response.data;

    // 3. Build Knowledge Asset
    const asset = buildKnowledgeAsset(report) as unknown as KnowledgeAsset;

    // 4. Publish KA to the DKG
    let ual: string | null = null;
    try {
      ual = await publishToDKG(asset);
    } catch (err) {
      console.error("Failed to publish to DKG:", err);
    }

    return { summary: report, knowledgeAssetUAL: ual };
  } catch (err: any) {
    console.error("Error in runAuthenticityCheck:", err.message);
    throw err;
  }
}
