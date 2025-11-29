// frontend/app/preps/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "../../src/lib/auth";
import { fetchPreps, type MeetingSummary } from "../../src/lib/api";
import {LogoutButton} from "../../src/components/LogoutButton";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function PrepsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const meetings: MeetingSummary[] = await fetchPreps();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-blue-600 text-white text-xl">
              📅
            </span>
            <span className="text-lg font-semibold text-slate-900">
              Meeting Prep Assistant
            </span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-600">
              Welcome,{" "}
              <span className="font-semibold">
                {session.user?.name ?? "Guest"}
              </span>
            </p>
            <LogoutButton />
          </div>
        </header>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Upcoming Meetings
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Your next 5 sales meetings with AI-generated preparation insights
          </p>
        </div>

        {meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="rounded-full bg-slate-100 p-6 mb-4">
              <span className="text-4xl">📅</span>
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No Upcoming Meetings
            </h2>
            <p className="text-sm text-slate-600 text-center max-w-md">
              You don't have any upcoming Sales or Marketing related meetings
            </p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {meetings.map((m) => (
              <Link
                key={m.eventId}
                href={`/meetings/${m.eventId}`}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-2">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {m.meetingTitle}
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                      Upcoming
                    </span>
                  </div>

                  <div className="mb-5 flex items-center gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className="text-lg">📅</span>
                      <span className="font-medium">{formatDate(m.startTime)}</span>
                    </span>
                    <span className="text-lg">🕐</span>
                    <span className="font-medium">{formatTime(m.startTime)}</span>
                  </div>

                  <div className="space-y-3 border-t border-slate-100 pt-4">
                    <div className="flex items-start gap-2.5 text-sm">
                      <span className="text-xl">👤</span>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {m.prospect.fullName || "Unknown contact"}
                        </div>
                        {m.prospect.roleGuess && (
                          <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">
                            {m.prospect.roleGuess}
                          </div>
                        )}
                      </div>
                    </div>
                    {m.prospect.companyNameGuess && (
                      <div className="flex items-center gap-2.5 text-sm">
                        <span className="text-xl">🏢</span>
                        <span className="font-medium text-slate-900">
                          {m.prospect.companyNameGuess}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}