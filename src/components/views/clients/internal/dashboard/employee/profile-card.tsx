import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Clock, Building, IdCard, MapPin, Phone } from "lucide-react";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileResponse } from "@/internal/validations/user-validation";

export function ProfileCard({ profile }: { profile: ProfileResponse }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Your personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {profile.full_name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-lg font-medium leading-none">
                {profile.full_name}
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <IdCard className="h-3 w-3 mr-1" />
                {profile.employee_code}
              </p>
              <p className="text-sm text-muted-foreground flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                {profile.phone}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Address
              </h4>
              <p className="text-sm">{profile.address}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Department
              </h4>
              <p className="text-sm">
                {profile.department?.name || "Not assigned"}
              </p>

              {profile.department && (
                <>
                  <h4 className="font-medium text-sm mt-3 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Time Policies
                  </h4>
                  <div className="flex flex-col gap-2">
                    Clock In:
                    <p className="text-sm font-medium leading-none">
                      {format(
                        parseISO(profile.department.max_clock_in_time),
                        "HH:mm",
                        { locale: id }
                      )}
                    </p>
                    <br />
                    Clock Out:
                    <p className="text-sm font-medium leading-none">
                      {format(
                        parseISO(profile.department.max_clock_out_time),
                        "HH:mm",
                        { locale: id }
                      )}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
