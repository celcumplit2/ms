export function getAuthorPhoto({src}: { src: string, width?: number; height?: number; }): string {
  return `https://moldstud.com/images/authors/uploads/${src}`;
}
