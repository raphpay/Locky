export function extractSiteName(url: string): string {
  try {
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

    const { hostname } = new URL(normalizedUrl);

    const parts = hostname.replace("www.", "").split(".");

    const name = parts[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch (error) {
    console.error(error);
    return url;
  }
}
