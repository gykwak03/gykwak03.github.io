const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";

export const siteUrl = `https://gykwak03.github.io${pagesBasePath}`.replace(
  /\/$/,
  "",
);

export function absoluteUrl(path = "") {
  const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;
  return `${siteUrl}${normalizedPath}`;
}
