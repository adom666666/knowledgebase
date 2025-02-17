export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

// Mock data for client-side demo
export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started Guide",
    content:
      "# Welcome to the Knowledge Base\n\nThis is your guide to getting started...",
    category: "Guides",
    tags: ["beginner", "setup"],
    authorId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
