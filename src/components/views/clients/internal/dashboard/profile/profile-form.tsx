"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { updateProfileAction } from "@/internal/actions/user-action";
import {
  UserResponse,
  ProfileResponse,
  UpdateProfileRequest,
  UpdateProfileRequestSchema,
} from "@/internal/validations/user-validation";

type ProfileFormProps = {
  accessToken: string;
  profile: ProfileResponse;
};

export function ProfileForm({ accessToken, profile }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define form
  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(UpdateProfileRequestSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      phone: profile.phone || "",
      avatar_url: profile.avatar_url || "",
      address: profile.address || "",
    },
  });

  // 2. Define a submit handler
  async function onSubmit(values: UpdateProfileRequest) {
    setIsLoading(true);
    try {
      const result = await updateProfileAction(values, accessToken);

      if (result.status === "success") {
        toast("Profile updated", {
          description: "Your profile has been updated successfully.",
        });
      } else {
        toast("Error", {
          description: result.message || "Failed to update profile",
        });
      }
    } catch (error) {
      toast("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-2xl  mx-auto ">
      <Card className="shadow-none border-none">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage
                src={form.watch("avatar_url") || profile.avatar_url}
              />
              <AvatarFallback className="text-2xl">
                {getInitials(form.watch("full_name") || profile.full_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">Edit Profile</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1234567890"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      Your phone number with country code.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/avatar.jpg"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormDescription>
                      URL to your profile picture.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your address"
                        {...field}
                        disabled={isLoading}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormDescription>Your current address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Employee Information Display */}
      <Card className="mt-6 shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-lg">Employee Information</CardTitle>
          <CardDescription>
            Your company information (read-only)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Employee Code
              </p>
              <p className="text-base">{profile.employee_code}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                User ID
              </p>
              <p className="text-base">{profile.source_user_id}</p>
            </div>
          </div>
          {profile.department_id && (
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Department ID
              </p>
              <p className="text-base">{profile.department_id}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
