export default async function getReportByHash(ctx, input) {
  const { mediaHash } = input;

  const result = await ctx.dkg.read({
    query: {
      "alle:mediaHash": mediaHash
    }
  });

  if (!result || result.length === 0) {
    return {
      message: "No report found for this hash"
    };
  }

  return {
    summary: "Authenticity report retrieved",
    asset: result[0]
  };
}
