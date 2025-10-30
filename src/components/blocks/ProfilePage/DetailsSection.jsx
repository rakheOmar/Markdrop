import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DetailsSection({ user, loading, error }) {
  const borderClass = "border-b border-[#cecece] dark:border-[#16181d]";

  const getInitials = (email) => (email ? email.substring(0, 2).toUpperCase() : "U");
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  // --- Top Right Label ---
  const TopRightLabel = () => (
    <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-10 md:w-28 md:h-12 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
      <span className="font-mono text-[10px] sm:text-xs md:text-sm text-black dark:text-white whitespace-nowrap">
        Profile <br />
        Details
      </span>
    </div>
  );

  // --- Loading State ---
  if (loading) {
    return (
      <>
        <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
          <TopRightLabel />
        </div>
        <div
          className={`${borderClass} flex flex-col md:flex-row items-center md:items-stretch p-4 md:p-6 gap-8`}
        >
          <div className="animate-pulse flex flex-col md:flex-row items-center md:items-stretch gap-8 w-full">
            {/* Avatar Skeleton */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full border border-[#cecece] dark:border-[#16181d]" />
            </div>

            {/* Details Grid Skeleton */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20" />
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24" />
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-28" />
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20" />
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <>
        <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
          <TopRightLabel />
        </div>
        <div className={`${borderClass} flex items-center justify-center py-10`}>
          <p className="text-red-500">Error loading profile: {error}</p>
        </div>
        <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

  // --- No User State ---
  if (!user) {
    return (
      <>
        <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
          <TopRightLabel />
        </div>
        <div
          className={`${borderClass} flex flex-col items-center justify-center py-10 text-center`}
        >
          <User className="w-12 h-12 mb-3 text-gray-400" />
          <p className="text-gray-500">Please sign in to view your profile</p>
        </div>
        <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

  // --- User Data ---
  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <TopRightLabel />
      </div>

      <div
        className={`${borderClass} flex flex-col md:flex-row items-center md:items-stretch p-4 md:p-6 gap-8`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <Avatar className="w-24 h-24 border border-[#cecece] dark:border-[#16181d]">
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt={user.user_metadata?.full_name || user.email}
            />
            <AvatarFallback className="text-xl font-semibold">
              {getInitials(user.email)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div>
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Full Name
            </label>
            <div className="mt-1 px-3 py-2 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background">
              {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Email Address
            </label>
            <div className="mt-1 px-3 py-2 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background flex items-center justify-between">
              <span className="truncate">{user.email}</span>
              {user.email_confirmed_at && (
                <Badge variant="secondary" className="text-xs ml-2">
                  Verified
                </Badge>
              )}
            </div>
          </div>

          {user.created_at && (
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Member Since
              </label>
              <div className="mt-1 px-3 py-2 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background">
                {formatDate(user.created_at)}
              </div>
            </div>
          )}

          {user.last_sign_in_at && (
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Last Active
              </label>
              <div className="mt-1 px-3 py-2 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background">
                {formatDate(user.last_sign_in_at)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
