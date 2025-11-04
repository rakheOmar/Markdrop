import {
  FileText,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  UserPlus,
  Wrench,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import markdropLogoDark from "@/assets/markdrop_logo_dark.svg";
import markdropLogoLight from "@/assets/markdrop_logo_light.svg";
import HomeModeToggle from "@/components/blocks/Navbar/NavModeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { useThemeTransition } from "@/hooks/useThemeTransition";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NAV_LINKS } from "@/config/nav";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { applyCircleExpand } = useThemeTransition();
  const { user, logout, loading } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleTheme = () => {
    applyCircleExpand(() => setTheme(theme === "dark" ? "light" : "dark"));
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (_error) {
      toast.error("Failed to logout");
    }
  };

  // Get user initials for fallback
  const getUserInitials = (user) => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  // Get icon for nav links
  const getNavIcon = (href) => {
    switch (href) {
      case "/":
        return <Home className="h-4 w-4 mr-2" />;
      case "/builder":
        return <Wrench className="h-4 w-4 mr-2" />;
      case "/templates":
        return <FileText className="h-4 w-4 mr-2" />;
      case "/about":
        return <Info className="h-4 w-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="border-r border-b border-[#cecece] dark:border-[#16181d] lg:block hidden" />
      <nav className="border-b border-[#cecece] dark:border-[#16181d] flex items-center justify-between px-4 md:px-8 py-4 col-span-3 lg:col-span-1 overflow-hidden max-w-full">
        <Link to="/">
          <img
            src={theme === "dark" ? markdropLogoDark : markdropLogoLight}
            alt="Markdrop Logo"
            className="h-6 md:h-8 w-auto shrink-0 object-contain cursor-pointer"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-semibold relative transition-colors duration-500 ease-in-out text-sm xl:text-base
                ${
                  currentPath === link.href
                    ? "text-black dark:text-white"
                    : "text-[#9b9b9b] dark:text-[#a0a0a0] hover:text-black dark:hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth Section */}
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1 rounded-full">
                      <Avatar className="h-7 w-auto">
                        <AvatarImage
                          src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                          alt={user.user_metadata?.full_name || user.email}
                        />
                        <AvatarFallback className="text-xs">{getUserInitials(user)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/user-profile`}>
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="lg:hidden">
            <button className="p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors shrink-0">
              <Menu className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {NAV_LINKS.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link
                  to={link.href}
                  className={`cursor-pointer w-full flex items-center
                    ${currentPath === link.href ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {getNavIcon(link.href)}
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {/* Auth Section for Mobile */}
            {!loading && (
              <>
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to={`/user-profile`} className="flex items-center">
                        <Avatar className="h-4 w-auto mr-2">
                          <AvatarImage
                            src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                            alt={user.user_metadata?.full_name || user.email}
                          />
                          <AvatarFallback className="text-xs">
                            {getUserInitials(user)}
                          </AvatarFallback>
                        </Avatar>
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="flex items-center">
                        <LogIn className="h-4 w-4 mr-2" />
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/signup" className="flex items-center">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
              </>
            )}

            {/* Theme Toggle */}
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="w-4 h-4 mr-2" />
              ) : (
                <Moon className="w-4 h-4 mr-2" />
              )}
              Switch to {theme === "dark" ? "Light" : "Dark"} Mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="border-l border-b border-[#cecece] dark:border-[#16181d] lg:flex items-start hidden">
        <HomeModeToggle />
      </div>
    </>
  );
}
