"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/preps");
    }
  }, [status, router]);

  if (status === "loading") {
    return null;
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-slate-50">
      <header className="w-full max-w-5xl flex items-center justify-between py-6 px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-semibold">
            📅
          </span>
          <span className="font-semibold text-slate-900">
            Meeting Prep Assistant
          </span>
        </div>
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 rounded-md border border-slate-200 bg-white text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-50"
        >
          Press Middle Button
        </button>
      </header>

      <section className="flex-1 w-full max-w-5xl flex flex-col items-center px-6 pb-16">
        <div className="text-center mt-16 max-w-2xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Never Walk Into a Meeting Unprepared
          </h1>
          <p className="text-slate-600 mb-8">
            AI-powered meeting intelligence that syncs with your Google
            Calendar and delivers comprehensive prospect research before every
            call.
          </p>
          <button
            onClick={() => signIn("google")}
            className="px-6 py-3 rounded-md bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
          >
            Get Started with Google
          </button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 w-full">
          <FeatureCard
            icon="📅"
            title="Auto-Sync Calendar"
            body="Automatically syncs with your Google Calendar to identify upcoming Sales /Marketing meetings and prospects."
          />
          <FeatureCard
            icon="👥"
            title="Prospect Research"
            body="Get comprehensive insights about who you're meeting, their role, company, and pain points."
          />
          <FeatureCard
            icon="🗣️"
            title="Talking Points"
            body="Receive tailored talking points and approach strategies for each prospect."
          />
          <FeatureCard
            icon="⚡"
            title="Before Time Prep"
            body="Get meeting prep delivered right before your calls, so you're always prepared."
          />
        </div>
      </section>

      <footer className="w-full py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Meeting Prep Assistant. Built for sales
        professionals.
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="rounded-xl bg-white px-6 py-5 shadow-sm border border-slate-100">
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
        {icon}
      </div>
      <h2 className="font-semibold text-slate-900 mb-2">{title}</h2>
      <p className="text-sm text-slate-600">{body}</p>
    </div>
  );
}