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
  pdfUrl?: string;
}
