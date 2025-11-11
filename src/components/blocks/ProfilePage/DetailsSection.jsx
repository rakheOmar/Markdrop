import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DetailsSection({ user, loading, error }) {
  const borderClass = "border-b border-[#cecece] dark:border-[#16181d]";

  const getInitials = (email) => (email ? email.substring(0, 2).toUpperCase() : "U");

  const TopRightLabel = () => (
    <div className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
      <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap leading-tight">
        Profile Details
      </span>
    </div>
  );

  if (loading) {
    return (
      <>
        <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
          <TopRightLabel />
        </div>
        <div
          className={`${borderClass} flex flex-col md:flex-row items-start md:items-stretch p-4 md:p-6 lg:p-8 gap-4 md:gap-6`}
        >
          <div className="animate-pulse w-full space-y-4">
            <div className="md:hidden w-full space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-40" />
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20 shrink-0" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
                <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
              </div>
            </div>

            {/* Desktop Layout Skeleton */}
            <div className="hidden md:flex shrink-0 w-full md:w-auto">
              <div className="w-full space-y-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20" />
                <div className="h-[100px] md:h-[120px] bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
              </div>
            </div>

            <div className="hidden md:flex flex-1 flex-col gap-4 md:gap-6 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20" />
                  <div className="h-10 md:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-28" />
                  <div className="h-10 md:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
                </div>
              </div>
              <div className="h-10 md:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg border border-[#cecece] dark:border-[#16181d]" />
            </div>
          </div>
        </div>
        <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

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

  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <TopRightLabel />
      </div>

      <div
        className={`${borderClass} flex flex-col md:flex-row items-start md:items-stretch p-4 md:p-6 lg:p-8 gap-4 md:gap-6`}
      >
        {/* Mobile Layout */}
        <div className="md:hidden w-full space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 shrink-0">
              <AvatarImage
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.full_name || user.email}
              />
              <AvatarFallback className="text-lg font-semibold">
                {getInitials(user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold truncate">
                {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
              </div>
              <div className="text-sm text-muted-foreground truncate">{user.email}</div>
            </div>
            <div className="text-yellow-500 text-lg shrink-0">★★★★★</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="px-3 py-2 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background">
              <div className="text-xs text-muted-foreground mb-1">Status</div>
              {user.email_confirmed_at && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
            </div>
            <div className="px-3 py-2 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background">
              <div className="text-xs text-muted-foreground mb-1">Member</div>
              <div className="text-sm font-medium">Active</div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex shrink-0 w-full md:w-auto">
          <div className="w-full">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Avatar
            </label>
            <div className="mt-2 flex items-center justify-center md:justify-start p-4 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background h-[100px] md:h-[120px]">
              <Avatar className="w-16 h-16 md:w-20 md:h-20">
                <AvatarImage
                  src={user.user_metadata?.avatar_url}
                  alt={user.user_metadata?.full_name || user.email}
                />
                <AvatarFallback className="text-lg md:text-xl font-semibold">
                  {getInitials(user.email)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 flex-col gap-4 md:gap-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Full Name
              </label>
              <div className="mt-2 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background text-sm md:text-base">
                {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Email Address
              </label>
              <div className="mt-2 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background flex items-center justify-between text-sm md:text-base">
                <span className="truncate">{user.email}</span>
                {user.email_confirmed_at && (
                  <Badge variant="secondary" className="text-xs ml-2 shrink-0">
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-[#cecece] dark:border-[#16181d] bg-background flex items-center gap-2 text-sm md:text-base">
            <span className="text-foreground">Rating:</span>
            <span className="text-yellow-500">★★★★★</span>
          </div>
        </div>
      </div>

      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
