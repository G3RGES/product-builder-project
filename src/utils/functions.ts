/**
 *
 * @param {string} text - the text to be sliced
 * @param {number} [limit = 50] - the maximum length before truncation
 * @returns - the sliced text
 */

export function txtSlicer(text: string, limit: number = 50) {
  if (text.length >= limit) return `${text.slice(0, limit)} ...`;
  return text;
}
