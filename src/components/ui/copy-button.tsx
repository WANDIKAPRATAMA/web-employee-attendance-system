"use client";
import { useCallback, useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { toast } from "sonner";

export function CopyButton({
  value,
  loadingPlaceHolder = "Processed Your copied",
}: {
  value: string;
  copyable?: boolean;
  loadingPlaceHolder?: string;
}) {
  const [copying, setCopying] = useState<boolean>(false);

  const onCopy = useCallback(async () => {
    try {
      toast.loading(loadingPlaceHolder);
      await navigator.clipboard.writeText(value);
      setCopying(true);
      setTimeout(() => {
        setCopying(false);
      }, 2000);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy text: ", { description: String(err) });
    } finally {
      toast.dismiss();
    }
  }, [value]);

  return (
    <Button
      onClick={onCopy}
      aria-label="Copy code"
      variant="ghost"
      className={cn(
        `top-[0.6rem] z-50 flex size-8 items-center justify-center rounded-md p-0 text-zinc-50`
      )}
    >
      <div
        className={cn(
          "transition-transform duration-150 ease-in-out"
          // copying ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
      >
        {copying ? <Check className="size-3" /> : <Copy className="size-3" />}
      </div>
    </Button>
  );
}
