import React, { useState } from "react";
import ArticleList from "./ArticleList";
import ArticleEditor from "./ArticleEditor";
import { Article, mockArticles } from "@/models/Article";

export default function KnowledgeBase() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const handleNewArticle = () => {
    setSelectedArticle(null);
    setIsEditing(true);
  };

  const handleSave = async (data: any) => {
    const newArticle: Article = {
      id: selectedArticle?.id || String(articles.length + 1),
      ...data,
      tags: data.tags.split(",").map((tag: string) => tag.trim()),
      authorId: "1", // Mock user ID
      createdAt: selectedArticle?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (selectedArticle) {
      setArticles(
        articles.map((a) => (a.id === selectedArticle.id ? newArticle : a)),
      );
    } else {
      setArticles([...articles, newArticle]);
    }

    setIsEditing(false);
    setSelectedArticle(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isEditing ? (
        <ArticleEditor
          article={selectedArticle || undefined}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setSelectedArticle(null);
          }}
        />
      ) : (
        <ArticleList
          articles={articles}
          onArticleClick={handleArticleClick}
          onNewArticle={handleNewArticle}
        />
      )}
    </div>
  );
}
