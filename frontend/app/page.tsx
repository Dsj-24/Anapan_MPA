"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Calendar, Users, MessageSquare, Zap, ArrowRight } from "lucide-react";

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
    <main className="min-h-screen flex flex-col items-center bg-white">
      <header className="w-full max-w-6xl flex items-center py-6 px-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg text-slate-900">
            Meeting Prep Assistant
          </span>
        </div>
      </header>

      <section className="flex-1 w-full max-w-6xl flex flex-col items-center px-6 pb-16">
        <div className="text-center mt-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Intelligence
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-5 leading-tight">
            Never Walk Into a<br />
            <span className="text-blue-600">
              Meeting Unprepared
            </span>
          </h1>
          <p className="text-base text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            AI-powered meeting intelligence that syncs with your Google Calendar 
            and delivers comprehensive prospect research before every call.
          </p>
          <button
            onClick={() => signIn("google")}
            className="px-7 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200 flex items-center gap-2 mx-auto"
          >
            Get Started with Google
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 w-full max-w-5xl">
          <FeatureCard
            icon={<Calendar className="w-6 h-6" />}
            title="Auto-Sync Calendar"
            body="Automatically syncs with your Google Calendar to identify upcoming Sales & Marketing meetings and prospects."
            color="blue"
          />
          <FeatureCard
            icon={<Users className="w-6 h-6" />}
            title="Prospect Research"
            body="Get comprehensive insights about who you're meeting, their role, company, and pain points."
            color="indigo"
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Talking Points"
            body="Receive tailored talking points and approach strategies for each prospect."
            color="violet"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Real-Time Prep"
            body="Get meeting prep delivered right before your calls, so you're always prepared."
            color="purple"
          />
        </div>
      </section>

      <footer className="w-full py-6 text-center text-sm text-slate-500 border-t border-slate-200">
        © {new Date().getFullYear()} Meeting Prep Assistant · Built for sales professionals
      </footer>
    </main>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  body,
  color
}: { 
  icon: React.ReactNode; 
  title: string; 
  body: string;
  color: string;
}) {
  const colorClasses = {
    blue: "bg-blue-600",
    indigo: "bg-indigo-600",
    violet: "bg-violet-600",
    purple: "bg-purple-600"
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all duration-200">
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses[color as keyof typeof colorClasses]} text-white shadow-sm`}>
        {icon}
      </div>
      <h2 className="font-semibold text-lg text-slate-900 mb-2">{title}</h2>
      <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  );
}