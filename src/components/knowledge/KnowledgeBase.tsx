import React, { useState } from "react";
import ArticleList from "./ArticleList";
import ArticleEditor from "./ArticleEditor";
import { Article } from "@/models/Article";
import { useEffect } from "react";

export default function KnowledgeBase() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/articles");
      if (!response.ok) throw new Error("Failed to fetch articles");
      const data = await response.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
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
    try {
      const articleData = {
        ...data,
        tags: data.tags.split(",").map((tag: string) => tag.trim()),
        authorId: user?.id, // Make sure user is available from auth context
      };

      const response = await fetch(
        `/api/articles${selectedArticle ? `/${selectedArticle.id}` : ""}`,
        {
          method: selectedArticle ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articleData),
        },
      );

      if (!response.ok) throw new Error("Failed to save article");

      const savedArticle = await response.json();

      if (selectedArticle) {
        setArticles(
          articles.map((a) => (a.id === savedArticle.id ? savedArticle : a)),
        );
      } else {
        setArticles([...articles, savedArticle]);
      }

      setIsEditing(false);
      setSelectedArticle(null);
    } catch (err) {
      setError(err.message);
    }
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

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
