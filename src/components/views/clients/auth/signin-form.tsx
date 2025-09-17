"use client";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff, Send } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  memo,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getOrCreateDeviceId } from "@/lib/device";
import {
  SigninRequest,
  SigninRequestSchema,
} from "@/internal/validations/auth-validation";
import { TransitionIcon } from "@/components/atoms/transition-icon";

export function SignInForm({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const deviceId = getOrCreateDeviceId();
  const form = useForm<SigninRequest>({
    resolver: zodResolver(SigninRequestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async (values: SigninRequest) => {
    startTransition(async () => {
      try {
        const response = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          deviceId: deviceId,
          action: "login",
        });
        console.log("🚀 ~ SignInForm ~ response:", response);

        startTransition(() => {
          if (!response?.ok || response?.error) {
            toast.error("Whoops", {
              description: "Invalid email or password",
            });
          } else {
            toast.success("Success", {
              description: "You have successfully signed in",
            });
            router.refresh();
          }
        });
      } catch (err: any) {
        toast.error("Whoops", {
          description: "unexpected error",
        });
      }
    });
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your credentials to access your account
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Use the email associated with your account
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  {/* <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link> */}
                </div>
                <FormControl>
                  <PasswordInput id="password" field={field} />
                </FormControl>
                <FormDescription>
                  Password must be at least 8 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <TransitionIcon isPending={isPending}>
              <Send className="mr-2 h-4 w-4" />
            </TransitionIcon>
            Sign in
          </Button>
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}

const PasswordInput = memo(
  ({
    id,
    field,
    className,
  }: {
    id: string;
    field: any;
    className?: string;
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className={cn("pr-10", className)}
          {...field}
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
