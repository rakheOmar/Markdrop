import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function DetailsSection({ user, loading, error }) {
  if (loading) {
    return (
      <>
        <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden" />
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center px-4 md:px-8">
          <div className="animate-pulse text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-24 mx-auto"></div>
          </div>
        </div>
        <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden" />
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center px-4 md:px-8">
          <div className="text-center text-red-500">
            <p>Error loading profile: {error}</p>
          </div>
        </div>
        <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden" />
        <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-center px-4 md:px-8">
          <div className="text-center">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Please sign in to view your profile</p>
          </div>
        </div>
        <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

  const getInitials = (email) => {
    return email ? email.substring(0, 2).toUpperCase() : "U";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] relative overflow-hidden" />
      <div className="border-b border-[#cecece] dark:border-[#16181d] flex items-center px-4 md:px-8">
        <div className="w-full flex items-center gap-8">
          {/* Profile Icon on the left */}
          <div className="flex-shrink-0">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.full_name || user.email}
              />
              <AvatarFallback className="text-xl font-semibold">
                {getInitials(user.email)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Details on the right */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Full Name
              </label>
              <div className="mt-1 px-3 py-2 border border-[#cecece] dark:border-[#16181d] bg-background">
                {user.user_metadata?.full_name || user.email?.split("@")[0] || "User"}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Email Address
              </label>
              <div className="mt-1 px-3 py-2 border border-[#cecece] dark:border-[#16181d] bg-background flex items-center justify-between">
                <span className="truncate">{user.email}</span>
                {user.email_confirmed_at && (
                  <Badge variant="secondary" className="text-xs ml-2">
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            {/* Join Date */}
            {user.created_at && (
              <div>
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Member Since
                </label>
                <div className="mt-1 px-3 py-2 border border-[#cecece] dark:border-[#16181d] bg-background">
                  {formatDate(user.created_at)}
                </div>
              </div>
            )}

            {/* Last Active */}
            {user.last_sign_in_at && (
              <div>
                <label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Last Active
                </label>
                <div className="mt-1 px-3 py-2 border border-[#cecece] dark:border-[#16181d] bg-background">
                  {formatDate(user.last_sign_in_at)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
