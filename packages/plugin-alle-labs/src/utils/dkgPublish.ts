export async function publishToDkg(ctx, asset) {
  const result = await ctx.dkg.publish({
    asset
  });

  return result.UAL;
}
