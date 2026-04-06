export function slugify(value: string): string {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/--+/g, '-');
}
