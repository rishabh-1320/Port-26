export function isSvgUrl(url: string) {
  return url.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
}
