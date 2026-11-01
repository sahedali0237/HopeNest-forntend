"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { useSession } from "@/hooks/use-session";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UserProfile {
  name: string;
  email: string;
  image?: string;
  bio?: string;
}

export default function ProfilePage() {
  const { user: sessionUser, isLoading: sessionLoading } = useSession();
  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
    image: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const profile = sessionUser
    ? {
        name: sessionUser.name,
        email: sessionUser.email,
        image: sessionUser.image,
        bio: user.bio,
      }
    : user;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would call an API to update the user profile
      // For now, we'll update the local state and the auth client
      await authClient.updateUser({
        name: user.name,
        image: user.image,
      });

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setIsSaving(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
      setIsSaving(false);
    }
  };

  if (sessionLoading) {
    return (
      <DashboardLayout sidebarTitle="Profile">
        <main className="pt-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
          </div>
        </main>
      </DashboardLayout>
    );
  }

  if (!sessionUser) {
    router.push("/signIn");
    return null;
  }

  return (
    <DashboardLayout sidebarTitle="Profile" user={sessionUser}>
      <main className="pt-6">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header with large avatar */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 rounded-full bg-emerald-100 mx-auto mb-4 flex items-center justify-center overflow-hidden">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-emerald-600">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-[#062D25]">
              {profile.name}
            </h1>
            <p className="text-emerald-500 text-base">{profile.email}</p>
          </div>

          {/* Edit Form */}
          {isEditing ? (
            <div className="bg-white rounded-lg border border-emerald-200 p-6 sm:p-8 max-w-md mx-auto shadow-md">
              <h2 className="text-2xl font-bold text-[#062D25] mb-6">
                Update Profile
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Full Name
                  </label>
                  <Input
                    value={user.name}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className={cn(
                      "rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition w-full",
                      isSaving && "cursor-not-allowed opacity-50",
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Bio
                  </label>
                  <textarea
                    value={user.bio}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    rows={3}
                    className={cn(
                      "rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition w-full resize-none",
                      isSaving && "cursor-not-allowed opacity-50",
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Profile Photo URL
                  </label>
                  <Input
                    type="url"
                    value={user.image || ""}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, image: e.target.value }))
                    }
                    placeholder="https://example.com/photo.jpg"
                    className={cn(
                      "rounded-md border border-emerald-200 bg-yellow-50 px-3 py-2.5 text-stone-900 placeholder-stone-400 focus:ring-2 focus:ring-emerald-400 outline-none transition w-full",
                      isSaving && "cursor-not-allowed opacity-50",
                    )}
                  />
                  <p className="mt-1 text-sm text-emerald-500/80">
                    Supported: http/https URLs
                  </p>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="rounded-md px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-all"
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="rounded-md px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            /* View Mode */
            <div className="bg-white rounded-lg border border-emerald-200 p-6 sm:p-8 max-w-md mx-auto shadow-md">
              <h2 className="text-2xl font-bold text-[#062D25] mb-4">
                Profile
              </h2>

              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-emerald-100 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      width={96}
                      height={96}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-emerald-600">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-[#062D25]">
                  {profile.name}
                </h1>
                <p className="text-emerald-500 text-base mt-1">
                  {profile.email}
                </p>
              </div>

              <div className="prose max-w-none">
                <p className="text-[#475569] mb-6">{profile.bio}</p>

                <div className="flex gap-4 pt-6 border-t border-emerald-100">
                  <div>
                    <p className="text-xs text-emerald-400">Full Name</p>
                    <p className="font-medium text-[#1F2937]">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400">Email</p>
                    <p className="font-medium text-[#1F2937]">
                      {profile.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400">Bio</p>
                    <p className="font-medium text-[#1F2937]">{profile.bio}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setUser({
                    name: sessionUser.name,
                    email: sessionUser.email,
                    image: sessionUser.image,
                    bio:
                      user.bio ||
                      "Community volunteer focused on environmental conservation and social development.",
                  });
                  setIsEditing(true);
                }}
                className="mt-4 w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-all"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
}
