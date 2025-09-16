"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";
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
import { Fragment, memo, useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { signUpRest } from "@/internal/services/auth-service";
import { TransitionIcon } from "@/components/atoms/transition-icon";
import { signUpAction } from "@/internal/actions/auth-action";
const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function SignUpForm({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        const response = await signUpAction({
          email: data.email,
          full_name: data.firstName + " " + data.lastName,
          password: data.password,
        });
        console.log("🚀 ~ onSubmit ~ response:", response);
        startTransition(() => {
          if (response?.status !== "success") {
            toast.error("Whoops", {
              description: response?.message || "Unexpected error",
            });
          } else {
            toast("Success", {
              description: "Account created successfully!",
              action: {
                label: "Go to Signin",
                onClick: () => router.push("/signin"),
              },
            });
          }
        });
      } catch (err: any) {
        toast.error("Whoops", {
          description: err?.message || "Unexpected error",
        });
      }
    });
  };

  return (
    <Fragment>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("flex flex-col gap-6", className)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create a new account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Sign up to get started with your account
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                    We&apos;ll send a verification link to this email
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput id="password" field={field} />
                  </FormControl>
                  <FormDescription>
                    Create a strong password with at least 8 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <TransitionIcon isPending={isPending}>
                <SendIcon className="mr-2 h-4 w-4" />
              </TransitionIcon>
              Sign Up
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </Fragment>
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
