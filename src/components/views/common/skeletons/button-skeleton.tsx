import React from "react";

interface ButtonSkeletonProps {
  size?: "sm" | "md" | "full";
  variant?: "primary" | "outline";
  className?: string;
}

const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  size = "md",
  variant = "primary",
  className = "",
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "h-9 w-24", // Approximate dimensions for small button
    md: "h-10 w-28", // Approximate dimensions for medium button
    full: "h-10 w-full", // Full width button
  };

  // Variant Colors
  const variantColors = {
    primary: "bg-gray-200 dark:bg-gray-700",
    outline:
      "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700",
  };

  return (
    <div
      className={`inline-flex items-center justify-center rounded-lg animate-pulse ${className} ${sizeClasses[size]} ${variantColors[variant]}`}
    >
      {/* Skeleton content that mimics the button's layout */}
      <div className="flex items-center gap-2 w-full h-full px-4">
        {/* Simulate icon space if needed */}
        <div
          className={`h-4 w-4 rounded-full ${
            variant === "primary"
              ? "bg-gray-300 dark:bg-gray-600"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        ></div>
        {/* Main text area */}
        <div
          className={`h-2.5 rounded-full ${
            variant === "primary"
              ? "bg-gray-300 dark:bg-gray-600"
              : "bg-gray-200 dark:bg-gray-700"
          } flex-1`}
        ></div>
        {/* Simulate end icon space if needed */}
        <div
          className={`h-4 w-4 rounded-full ${
            variant === "primary"
              ? "bg-gray-300 dark:bg-gray-600"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ButtonSkeleton;
