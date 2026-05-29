/**
 * Google Drive share links cannot be fetched directly in the browser (CORS).
 * Use the /preview embed URL for in-app viewing instead of pdf.js fetch.
 */

const DRIVE_FILE_ID_REGEX = /drive\.google\.com\/(?:file\/d\/|open\?id=)([^/?&]+)/;

export function extractGoogleDriveFileId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(DRIVE_FILE_ID_REGEX);
  return match?.[1] ?? null;
}

export function isGoogleDriveUrl(url: string): boolean {
  return extractGoogleDriveFileId(url) !== null;
}

/** Embed URL that works in an iframe without CORS issues. */
export function getGoogleDrivePreviewUrl(url: string): string | null {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/** @deprecated Drive files should use getGoogleDrivePreviewUrl + iframe, not pdf.js fetch. */
export function convertGoogleDriveLink(url: string): string {
  if (!url || typeof url !== 'string') return url;

  const fileId = extractGoogleDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  return url;
}

export function getGoogleDriveViewUrl(url: string): string | null {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/view`;
}
