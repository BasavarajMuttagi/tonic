import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  BookmarkSimpleIcon,
  CompassIcon,
  GearIcon,
  HeartIcon,
  HouseIcon,
  SignOutIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { PodcastIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

const Avatar = () => (
  <span className="font-regular inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700">
    U
  </span>
);

const AppHeader = () => {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path);
  const activeLinkClasses =
    "text-purple-400 underline underline-offset-4 decoration-purple-400 decoration-2";

  return (
    <header className="w-full border-none px-5">
      <nav className="flex h-16 w-full items-center justify-between">
        <div className="flex items-center gap-10 tracking-wider">
          <Link
            to="/"
            className="font-regular flex items-center space-x-1 text-xl"
            style={{ minWidth: "120px" }}
          >
            <span>Tonic</span>
            <PodcastIcon size={24} className="text-purple-400" />
          </Link>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/podcasts"
                className={cn(
                  "flex items-center gap-1 text-sm",
                  isActive("/podcasts") && activeLinkClasses,
                  "hover:text-purple-400 hover:underline hover:decoration-purple-400 hover:decoration-2 hover:underline-offset-4",
                )}
              >
                <HouseIcon
                  size={24}
                  weight={isActive("/podcasts") ? "fill" : "regular"}
                  className={
                    isActive("/podcasts") ? "text-purple-400" : "text-zinc-400"
                  }
                />
                Podcasts
              </Link>
            </li>
            <li>
              <Link
                to="/discover"
                className={cn(
                  "flex items-center gap-1 text-sm",
                  isActive("/discover") && activeLinkClasses,
                  "hover:text-purple-400 hover:underline hover:decoration-purple-400 hover:decoration-2 hover:underline-offset-4",
                )}
              >
                <CompassIcon
                  size={24}
                  weight={isActive("/discover") ? "fill" : "regular"}
                  className={
                    isActive("/discover") ? "text-purple-400" : "text-zinc-400"
                  }
                />
                Discover
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className={cn(
                  "flex items-center gap-1 text-sm",
                  isActive("/favorites") && activeLinkClasses,
                  "hover:text-purple-400 hover:underline hover:decoration-purple-400 hover:decoration-2 hover:underline-offset-4",
                )}
              >
                <HeartIcon
                  size={24}
                  weight={isActive("/favorites") ? "fill" : "regular"}
                  className={
                    isActive("/favorites") ? "text-purple-400" : "text-zinc-400"
                  }
                />
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/saved"
                className={cn(
                  "flex items-center gap-1 text-sm",
                  isActive("/saved") && activeLinkClasses,
                  "hover:text-purple-400 hover:underline hover:decoration-purple-400 hover:decoration-2 hover:underline-offset-4",
                )}
              >
                <BookmarkSimpleIcon
                  size={24}
                  weight={isActive("/saved") ? "fill" : "regular"}
                  className={
                    isActive("/saved") ? "text-purple-400" : "text-zinc-400"
                  }
                />
                Saved
              </Link>
            </li>
          </ul>
        </div>
        <SearchBar placeholder="Search" />
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BellIcon
                size={24}
                weight={isActive("/notifications") ? "fill" : "regular"}
                className={
                  isActive("/notifications")
                    ? "text-purple-400"
                    : "text-zinc-400 hover:text-purple-400"
                }
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-64 rounded-md p-2 shadow-lg"
            >
              <DropdownMenuItem>
                <span className="text-sm text-zinc-700">
                  No new notifications
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-4 rounded-full p-0">
                <Avatar />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="">
              <DropdownMenuItem asChild>
                <Link
                  to="/profile"
                  className={cn(
                    "flex items-center gap-2 hover:text-purple-400 focus:text-purple-400",
                  )}
                >
                  <UserIcon
                    size={16}
                    weight={isActive("/profile") ? "fill" : "regular"}
                    className={
                      isActive("/profile") ? "text-purple-400" : "text-zinc-400"
                    }
                  />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/settings"
                  className={cn(
                    "flex items-center gap-2 hover:text-purple-400 focus:text-purple-400",
                  )}
                >
                  <GearIcon
                    size={16}
                    weight={isActive("/settings") ? "fill" : "regular"}
                    className={
                      isActive("/settings")
                        ? "text-purple-400"
                        : "text-zinc-400"
                    }
                  />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/logout"
                  className={cn(
                    "flex items-center gap-2 hover:text-purple-400 focus:text-purple-400",
                  )}
                >
                  <SignOutIcon
                    size={16}
                    weight={isActive("/logout") ? "fill" : "regular"}
                    className={
                      isActive("/logout") ? "text-purple-400" : "text-zinc-400"
                    }
                  />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
