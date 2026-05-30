/**
 * Google Drive share links cannot be fetched directly in the browser (CORS).
 * Store only file IDs in data; build preview URLs at runtime for iframe embeds.
 */

const DRIVE_FILE_ID_REGEX = /drive\.google\.com\/(?:file\/d\/|open\?id=)([^/?&]+)/;
const RAW_FILE_ID_REGEX = /^[\w-]{10,}$/;

export function extractGoogleDriveFileId(input: string): string | null {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  const match = trimmed.match(DRIVE_FILE_ID_REGEX);
  if (match?.[1]) return match[1];
  if (RAW_FILE_ID_REGEX.test(trimmed)) return trimmed;
  return null;
}

export function isGoogleDriveFileId(input: string): boolean {
  return extractGoogleDriveFileId(input) !== null;
}

/** Embed URL that works in an iframe without CORS issues. */
export function getGoogleDrivePreviewUrlFromId(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

/** Accepts a file ID or legacy full Drive URL. */
export function getGoogleDrivePreviewUrl(input: string): string | null {
  const fileId = extractGoogleDriveFileId(input);
  if (!fileId) return null;
  return getGoogleDrivePreviewUrlFromId(fileId);
}
