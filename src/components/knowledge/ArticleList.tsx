import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Article } from "@/models/Article";

interface ArticleListProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  onNewArticle: () => void;
}

export default function ArticleList({
  articles = [],
  onArticleClick = () => {},
  onNewArticle = () => {},
}: ArticleListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Articles</h2>
        <Button onClick={onNewArticle}>
          <Plus className="w-4 h-4 mr-2" />
          New Article
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card
            key={article.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onArticleClick(article)}
          >
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>
                {new Date(article.updatedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
