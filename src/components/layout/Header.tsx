"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NotepadText, Tag } from "lucide-react";
import LogoutAction from "@/actions/LogoutAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const menuItems = [
  { href: "/notes", label: "Notes", icon: <NotepadText className="size-5" /> },
  { href: "/topics", label: "Topics", icon: <Tag className="size-5" /> },
];

const UserProfileHeader = () => {
  /* _____ State for toogling sidebar... */
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const { success, message } = await LogoutAction();
    if (!success) {
      toast.error(message);
      return;
    }
    toast.success(message);
    router.push("/login");
  };

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 top-0 left-0 h-full bg-blue-600/10 backdrop-blur-md text-white w-64 p-6 transform transition-transform duration-300 ease-in-out ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <nav className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-bold mb-8">Profile</h2>
            <div className="flex flex-col gap-4">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="hover:text-white w-full transition-all duration-150 ease-in-out cursor-pointer hover:bg-gray-400 py-2 px-3 rounded-md flex flex-row flex-nowrap justify-start gap-[10px]"
                >
                  {item.icon}
                  <span className="text-sm ">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <button
            className="w-full text-left hover:text-white transition-all duration-150 ease-in-out cursor-pointer hover:bg-[var(--faun-light)] py-2 px-3 rounded-md"
            aria-label="Logout"
            onClick={handleLogout}
          >
            Logout &nbsp; <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </nav>
      </aside>

      {/* Toggle Button */}
      <button
        className="md:hidden fixed top-4 right-4 z-30 text-white bg-gray-900 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white"
        onClick={() => setNavOpen((prev) => !prev)}
        aria-label={navOpen ? "Close menu" : "Open menu"}
      >
        {navOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25H12"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default UserProfileHeader;
