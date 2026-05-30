export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  year: number | string;
  category: string;
  tags: string[];
  summary: string;
  filename: string;
  coverColor: string;
  /** Google Drive file ID — preview URL is derived at runtime, not stored. */
  driveFileId?: string;
  /** Direct PDF URL for non-Drive sources (admin / demo only). */
  pdfUrl?: string;
}
