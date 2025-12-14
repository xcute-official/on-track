"use client";
import { Plus, User } from "lucide-react";
import Link from "next/link";
import { useUserSession } from "./user-session";
const Navigation = () => {
  const { user } = useUserSession();
  return (
    <nav className="flex items-center justify-between w-full">
      <div>
        <h1 className="font-bold">On Track</h1>
      </div>
      <div className="flex items-center gap-8">
        <Link href="/user/new-goal">
          <div className="flex items-center gap-2">
            <span>new goal</span>
            <Plus size={18} />
          </div>
        </Link>
        <p className="flex items-center gap-2">
          <span className="">{user ? user.username : "NOT_LOGGED_IN"}</span>
          <User size={18} />
        </p>
      </div>
    </nav>
  );
};

export default Navigation;
