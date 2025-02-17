import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { AnimatePresence, motion } from "framer-motion";

interface AuthContainerProps {
  onLogin?: (data: any) => Promise<void>;
  onRegister?: (data: any) => Promise<void>;
  isLoading?: boolean;
  error?: string;
  defaultView?: "login" | "register";
}

export default function AuthContainer({
  onLogin = async () => {},
  onRegister = async () => {},
  isLoading = false,
  error = "",
  defaultView = "login",
}: AuthContainerProps) {
  const [view, setView] = useState<"login" | "register">(defaultView);

  const toggleView = () => {
    setView((current) => (current === "login" ? "register" : "login"));
  };

  return (
    <div className="flex items-center justify-center min-h-[580px] w-[448px] bg-background p-4">
      <AnimatePresence mode="wait">
        {view === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <LoginForm
              onSubmit={onLogin}
              isLoading={isLoading}
              onRegisterClick={toggleView}
            />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <RegisterForm
              onSubmit={onRegister}
              isLoading={isLoading}
              error={error}
              onLoginClick={toggleView}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
