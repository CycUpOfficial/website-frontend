export const toSafeImageSrc = (src?: string): string => {
  if (!src) {
    return "/logo-green.png";
  }

  if (src.startsWith("/")) {
    return src;
  }

  try {
    const url = new URL(src);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "/logo-green.png";
    }

    return `/api/image-proxy?url=${encodeURIComponent(src)}`;
  } catch {
    return src;
  }
};
