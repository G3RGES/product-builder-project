export function txtSlicer(text: string, limit: number = 50) {
  if (text.length >= limit) return `${text.slice(0, limit)} ...`;
  return text;
}
