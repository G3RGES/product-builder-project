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

/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
