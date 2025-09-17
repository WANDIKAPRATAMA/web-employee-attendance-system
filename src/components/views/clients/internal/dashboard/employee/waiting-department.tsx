"use client";

import { useTheme } from "next-themes";
import {
  Building,
  Clock,
  User,
  Calendar,
  Sun,
  Moon,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  HelpCircle,
  Contact,
  IdCard,
} from "lucide-react";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Types
import { ModeToggle } from "@/components/ui/toggle-mode";
import { ProfileResponse } from "@/internal/validations/user-validation";

export function WaitingDepartment({ profile }: { profile: ProfileResponse }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome to Your Dashboard
          </h2>
          <p className="text-muted-foreground">
            We're getting everything ready for you
          </p>
        </div>
        <ModeToggle />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Status Card */}
        <Card className="relative overflow-hidden border-2 border-dashed border-amber-200 dark:border-amber-800">
          <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-amber-100 dark:bg-amber-900/20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">
              Account Status
            </CardTitle>
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <HelpCircle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold mb-2">
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
              >
                Awaiting Department Assignment
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Your account is active but waiting for department assignment from
              admin.
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="relative overflow-hidden border-2 border-dashed border-blue-200 dark:border-blue-800">
          <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rounded-full bg-blue-100 dark:bg-blue-900/20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">What's Next?</CardTitle>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                    1
                  </span>
                </div>
                <p className="ml-3 text-sm">
                  Admin will assign you to a department
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">
                    2
                  </span>
                </div>
                <p className="ml-3 text-sm">
                  You'll receive department-specific working hours
                </p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">
                    3
                  </span>
                </div>
                <p className="ml-3 text-sm">Start tracking your attendance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Your Profile Information
          </CardTitle>
          <CardDescription>
            This information will be used for your employee profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {profile.full_name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-6 space-y-1">
                <p className="text-xl font-bold">{profile.full_name}</p>
                <p className="text-muted-foreground flex items-center">
                  <IdCard className="h-4 w-4 mr-2" />
                  {profile.employee_code}
                </p>
                <Badge variant="outline" className="mt-2">
                  {profile.application_role?.role === "admin"
                    ? "Administrator"
                    : "Employee"}
                </Badge>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center">
                  <Contact className="h-4 w-4 mr-2" />
                  Contact Information
                </h4>
                {profile.phone && (
                  <p className="text-sm flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {profile.phone}
                  </p>
                )}
                {profile.address && (
                  <p className="text-sm flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="line-clamp-2">{profile.address}</span>
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Department Status
                </h4>
                <div className="flex items-center p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      No Department Assigned
                    </p>
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      Please contact administrator for assignment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
