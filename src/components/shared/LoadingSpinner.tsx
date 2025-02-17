import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({
  size = 40,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center bg-white ${className}`}>
      <Loader2 className="animate-spin text-primary" size={size} />
    </div>
  );
}
