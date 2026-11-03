"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/ui/dashboard-layout";
import { useSession } from "@/hooks/use-session";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  User,
  Mail,
  FileText,
  Camera,
  Edit3,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Calendar,
  Heart,
  X,
  Save,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  image?: string;
  bio?: string;
}

const DEFAULT_BIO =
  "Community volunteer focused on environmental conservation and social development.";

export default function ProfilePage() {
  const { user: sessionUser, isLoading: sessionLoading } = useSession();
  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
    image: "",
    bio: DEFAULT_BIO,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const sessionKey = sessionUser
    ? JSON.stringify([
        sessionUser.email,
        sessionUser.name,
        sessionUser.image,
      ])
    : null;
  const [syncedSessionKey, setSyncedSessionKey] = useState<string | null>(null);

  // Reset the profile draft when the authenticated user changes.
  if (sessionUser && sessionKey !== syncedSessionKey) {
    const savedBio =
      typeof window !== "undefined"
        ? localStorage.getItem(`hopenest_bio_${sessionUser.email}`)
        : null;

    setUser({
      name: sessionUser.name || "",
      email: sessionUser.email || "",
      image: sessionUser.image || "",
      bio: savedBio || DEFAULT_BIO,
    });
    setSyncedSessionKey(sessionKey);
  }

  const handleSave = async () => {
    if (!user.name.trim()) {
      toast.error("Full Name cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      await authClient.updateUser({
        name: user.name.trim(),
        image: user.image?.trim() || undefined,
      });

      if (typeof window !== "undefined" && user.email) {
        localStorage.setItem(
          `hopenest_bio_${user.email}`,
          user.bio?.trim() || DEFAULT_BIO,
        );
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (sessionLoading) {
    return (
      <DashboardLayout sidebarTitle="Profile">
        <main className="p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="animate-pulse bg-muted rounded-2xl h-64 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="animate-pulse bg-muted rounded-2xl h-56" />
              <div className="animate-pulse bg-muted rounded-2xl h-56 md:col-span-2" />
            </div>
          </div>
        </main>
      </DashboardLayout>
    );
  }

  if (!sessionUser) {
    router.push("/signIn");
    return null;
  }

  const displayName = user.name || sessionUser.name;
  const displayEmail = user.email || sessionUser.email;
  const displayImage = user.image || sessionUser.image;
  const displayBio = user.bio || DEFAULT_BIO;

  return (
    <DashboardLayout sidebarTitle="Profile" user={sessionUser}>
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative h-36 sm:h-44 w-full bg-linear-to-r from-[#04241D] via-[#063B2F] to-emerald-700">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[16px_16px]" />
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-100 backdrop-blur-md border border-white/15">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                HopeNest Volunteer
              </div>
            </div>

            <div className="relative px-6 pb-6 sm:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-14 sm:-mt-16">
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl border-4 border-white bg-emerald-100 shadow-md overflow-hidden flex items-center justify-center shrink-0">
                    {displayImage ? (
                      <Image
                        src={displayImage}
                        alt={displayName}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-emerald-700">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="pt-1 sm:pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        {displayName}
                      </h1>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Volunteer
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      {displayEmail}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="sm:pb-1">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 transition-all cursor-pointer"
                    >
                      <Edit3 className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setUser((prev) => ({
                          ...prev,
                          name: sessionUser.name,
                          image: sessionUser.image || "",
                        }));
                        setIsEditing(false);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                      Cancel Editing
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lower Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Account Status & Quick Shortcuts */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Account Status
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Active Member
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Can create and join social development events
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Quick Links
                    </p>
                    <Link
                      href="/joined-events"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-primary" />
                        Joined Events
                      </span>
                      <span className="text-xs text-primary font-semibold">
                        View &rarr;
                      </span>
                    </Link>
                    <Link
                      href="/manage-events"
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        Manage Events
                      </span>
                      <span className="text-xs text-primary font-semibold">
                        View &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Personal Details OR Edit Form */}
            <div className="lg:col-span-2">
              {isEditing ? (
                /* Edit Mode Card */
                <div className="rounded-2xl border border-emerald-900/10 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="mb-6 border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-foreground">
                      Update Profile Information
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Changes to your name and avatar will appear across all
                      events you organize or join.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                        <User className="h-4 w-4 text-primary" />
                        Full Name
                      </label>
                      <Input
                        value={user.name}
                        onChange={(e) =>
                          setUser((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Enter your full name"
                        disabled={isSaving}
                        className="rounded-xl border-border bg-muted px-4 py-2.5 text-foreground focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20 transition w-full"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                        <Camera className="h-4 w-4 text-primary" />
                        Profile Photo URL
                      </label>
                      <Input
                        type="url"
                        value={user.image || ""}
                        onChange={(e) =>
                          setUser((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }
                        placeholder="https://images.unsplash.com/..."
                        disabled={isSaving}
                        className="rounded-xl border-border bg-muted px-4 py-2.5 text-foreground focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20 transition w-full"
                      />
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Paste a direct image link (HTTPS) to update your avatar.
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Volunteer Bio
                      </label>
                      <textarea
                        value={user.bio}
                        onChange={(e) =>
                          setUser((prev) => ({ ...prev, bio: e.target.value }))
                        }
                        rows={4}
                        placeholder="Tell the community about your environmental and social interests..."
                        disabled={isSaving}
                        className={cn(
                          "rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/20 outline-none transition w-full resize-none",
                          isSaving && "cursor-not-allowed opacity-50",
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isSaving}
                        onClick={() => setIsEditing(false)}
                        className="rounded-xl border-border px-5 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        {isSaving ? "Saving Changes..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                /* View Mode Card */
                <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="border-b border-border pb-4">
                    <h2 className="text-lg font-bold text-foreground">
                      Personal Information
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Your public volunteer profile details on HopeNest
                    </p>
                  </div>

                  {/* Bio Section */}
                  <div className="rounded-xl bg-accent/50 border border-border p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      About / Bio
                    </div>
                    <p className="text-sm leading-relaxed text-foreground">
                      {displayBio}
                    </p>
                  </div>

                  {/* Structured Info Rows */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-border bg-muted/50 p-4">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <User className="h-3.5 w-3.5 text-primary" />
                        Full Name
                      </span>
                      <p className="mt-1 text-base font-semibold text-foreground">
                        {displayName}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-muted/50 p-4">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                        Email Address
                      </span>
                      <p className="mt-1 text-base font-semibold text-foreground break-all">
                        {displayEmail}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
