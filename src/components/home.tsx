import React from "react";
import Header from "./layout/Header";
import AuthContainer from "./auth/AuthContainer";
import LoadingSpinner from "./shared/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import KnowledgeBase from "./knowledge/KnowledgeBase";

export default function Home() {
  const { user, isLoading, error, login, register, logout } = useAuth();
  const [authView, setAuthView] = React.useState<"login" | "register">("login");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <LoadingSpinner size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to Knowledge Base
          </h1>
          {!user && (
            <AuthContainer
              onLogin={login}
              onRegister={register}
              isLoading={isLoading}
              error={error}
              defaultView={authView}
            />
          )}
          {user && <KnowledgeBase />}
        </div>
      </main>
    </div>
  );
}
