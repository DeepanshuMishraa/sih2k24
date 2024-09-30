"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Rubik } from "next/font/google";
import { ModeToggle } from "./dark-mode-toggle";
import { IconBrain, IconScale } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const rubik = Rubik({
    subsets:['latin']
})

export const Appbar = () => {
  const session = useSession();
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 md:max-w-xl max-w-3xl p-3 font-semibold rounded-full backdrop-blur-2xl bg-white/70 dark:bg-black/10 z-50">
      <div className="flex gap-4 justify-between items-center p-2">
        <div>
          <Link href="/" className={`text-2xl ${rubik.className}`}>
            Cortex
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle />
          {session.data ? (
            <Button onClick={() => signOut()}>Logout</Button>
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const DashNav = () => {
  const { data: session, status } = useSession();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="bg-white border-b border-black shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <IconScale className="h-8 w-8 text-indigo-600" />
                <IconBrain className="h-8 w-8 text-blue-600 ml-2" />
                <span className="ml-2 text-xl font-bold text-gray-800">
                  Cortex
                </span>
              </div>
            </div>
          </Link>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={session?.user?.image || undefined}
                      alt={session?.user?.name || ""}
                    />
                    <AvatarFallback>
                      {session?.user?.name ? session.user.name.charAt(0) : "?"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
