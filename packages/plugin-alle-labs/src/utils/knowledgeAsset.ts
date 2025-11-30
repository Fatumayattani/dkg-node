export function createKnowledgeAsset(report) {
  return {
    "@type": "alle:AuthenticityAssessment",
    "alle:mediaHash": report.mediaHash,
    "media:contentUrl": report.mediaUrl,
    "alle:isAuthentic": report.isAuthentic,
    "alle:score": report.score,
    "alle:confidence": report.confidence,
    "alle:modelVersion": report.modelVersion,
    "alle:checkedAt": report.checkedAt,
    "alle:checkedBy": "did:polkadot:allelabs",
    "alle:explanation": report.explanation
  };
}
