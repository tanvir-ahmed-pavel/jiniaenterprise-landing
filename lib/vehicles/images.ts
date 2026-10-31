/** Keep vehicle galleries predictable: front, side, rear, then any extras. */
export function orderVehicleImages(images: string[] | null | undefined, imageUrl?: string | null): string[] {
  const listed = images?.filter((image): image is string => typeof image === "string" && image.trim().length > 0) ?? [];
  // An empty gallery falls back to the single image_url, so a card never
  // renders without a photo when one exists.
  const source = listed.length > 0 ? listed : imageUrl ? [imageUrl] : [];
  return source.map((url, index) => ({ url, index, rank: imageAngleRank(url) }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index).map(({ url }) => url);
}

function imageAngleRank(url: string): number {
  const name = url.toLowerCase();
  if (/(^|[-_/])front([-.?_/]|$)/.test(name)) return 0;
  if (/(^|[-_/])(side|profile)([-.?_/]|$)/.test(name)) return 1;
  if (/(^|[-_/])rear([-.?_/]|$)/.test(name)) return 2;
  return 3;
}
