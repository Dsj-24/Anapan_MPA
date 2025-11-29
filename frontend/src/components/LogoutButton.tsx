"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="px-3 py-1 rounded-md border border-slate-200 bg-white text-xs font-medium text-slate-900 shadow-sm hover:bg-slate-50"
    >
      Logout
    </button>
  );
}
