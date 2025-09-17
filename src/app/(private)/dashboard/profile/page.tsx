import { getProfileAction } from "@/internal/actions/user-action";
import { auth } from "../../../../../auth";
import ErrorComponent from "@/components/views/common/place-holder/error-component";
import { ProfileForm } from "@/components/views/clients/internal/dashboard/profile/profile-form";
import { ProfileResponse } from "@/internal/validations/user-validation";
import { Suspense } from "react";
import { ProfileFormSkeleton } from "@/components/views/common/skeletons/profile-form-skeleton";

export default function Page() {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<ProfileFormSkeleton />}>
        <Suspended />
      </Suspense>
    </div>
  );
}

async function Suspended() {
  const session = await auth();
  console.log("session?.user.role", session?.user.role);
  if (!session?.accessToken) {
    return (
      <ErrorComponent
        title="Unauthorized"
        error="Please Sign in to Continue"
        redirect
      />
    );
  }
  const {
    payload: { data: profile },
    status,
  } = await getProfileAction(session.accessToken);
  if (status !== "success") {
    return <ErrorComponent title="Error" error="Failed to fetch profile" />;
  }

  return (
    <ProfileForm
      accessToken={session.accessToken}
      profile={profile as ProfileResponse}
    />
  );
}
