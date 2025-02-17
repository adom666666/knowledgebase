import { ArticleModel } from "@/models/ArticleModel";
import { connectDB } from "@/lib/db";

export async function getArticles() {
  await connectDB();
  return ArticleModel.find().sort({ updatedAt: -1 });
}

export async function createArticle(articleData: any) {
  await connectDB();
  const article = new ArticleModel(articleData);
  return article.save();
}

export async function updateArticle(id: string, articleData: any) {
  await connectDB();
  return ArticleModel.findByIdAndUpdate(id, articleData, { new: true });
}

export async function deleteArticle(id: string) {
  await connectDB();
  return ArticleModel.findByIdAndDelete(id);
}

export async function getArticleById(id: string) {
  await connectDB();
  return ArticleModel.findById(id);
}
