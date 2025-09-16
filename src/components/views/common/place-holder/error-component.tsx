"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
export interface CustomError {
  message: string; // General error message
  details?: string; // Optional additional details
}
interface ErrorComponentProps {
  error: CustomError | Error | string;
  onRetry?: () => void;
  title: string;
  redirect?: boolean;
}

const ErrorComponent = ({
  title,
  error,
  onRetry,
  redirect,
}: ErrorComponentProps) => {
  return (
    <div>
      <div className="min-h-screen w-full rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center py-12 text-center">
          {/* Error Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>

          {/* Error Title */}
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {title}
          </h2>

          {/* Error Message */}
          <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            {typeof error === "string"
              ? error
              : error?.message ??
                "Something went wrong. Please try again later."}
          </p>

          {/* Technical Details (collapsible) */}
          <details className="mt-6 w-full max-w-2xl text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Technical Details
            </summary>
            <div className="mt-2 rounded-lg bg-gray-50 p-4 font-mono text-xs dark:bg-gray-800/50">
              {typeof error === "string" ? (
                error
              ) : (
                <pre className="whitespace-pre-wrap break-all">
                  {JSON.stringify(error, null, 2)}
                </pre>
              )}
            </div>
          </details>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="default" onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button variant="ghost" onClick={() => window.history.back()}>
              Go Back
            </Button>
            {redirect && (
              <Button
                variant="ghost"
                onClick={() => window.location.replace("/auth/signin")}
              >
                Go Home
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
