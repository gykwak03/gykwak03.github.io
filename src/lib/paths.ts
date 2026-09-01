const pagesBasePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "");

/** Prefix files from `public/` for GitHub project Pages deployments. */
export function publicPath(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${pagesBasePath}${path}`;
}
