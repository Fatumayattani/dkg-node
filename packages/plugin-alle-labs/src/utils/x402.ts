export async function verifyX402Receipt(ctx, input) {
  if (!input.receipt) {
    throw new Error("Premium request must include a valid x402 receipt");
  }

  const ok = await ctx.x402.verify(input.receipt);

  if (!ok) {
    throw new Error("Invalid x402 receipt");
  }

  return true;
}
