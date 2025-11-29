// frontend/app/preps/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, Building2, CheckCircle2, Clock3 } from "lucide-react";

import { authOptions } from "../../src/lib/auth";
import { fetchPreps, type MeetingSummary } from "../../src/lib/api";
import { LogoutButton } from "../../src/components/LogoutButton";

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
  if (!session || !session.user?.email) {
    redirect("/");
  }

  const { meetings, recommendation } = await fetchPreps(session.user.email);

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-lg font-semibold text-slate-900">
              Meeting Prep Assistant
            </span>
          </div>
          <div className="flex items-center gap-5">
            <p className="text-sm text-slate-600">
              Welcome,{" "}
              <span className="font-semibold text-slate-900">
                {session.user?.name ?? "Guest"}
              </span>
            </p>
            <LogoutButton />
          </div>
        </header>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Upcoming Meetings
          </h1>
          <p className="mt-2 text-slate-600">
            Your next 6 sales / marketing meetings with AI-generated insights.
          </p>
        </div>

        {meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="rounded-2xl bg-blue-50 p-8 mb-6 shadow-sm border border-blue-100">
              <Calendar className="w-16 h-16 text-blue-600 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              No Sales/Marketing Meetings Yet
            </h2>
            <p className="text-slate-600 max-w-md leading-relaxed">
              {recommendation ||
                'Create a Google Calendar event with "Sales" or "Marketing" in the title and we will prepare the brief as soon as it appears here.'}
            </p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
            {meetings.map((m: MeetingSummary) => (
              <Link
                key={m.eventId}
                href={`/meetings/${m.eventId}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300"
              >
                <div>
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <h2 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {m.meetingTitle}
                    </h2>
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                        Upcoming
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          m.prepStatus === "ready"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {m.prepStatus === "ready" ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Ready
                          </>
                        ) : (
                          <>
                            <Clock3 className="w-3.5 h-3.5" />
                            Pending
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-2 font-medium">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      {formatDate(m.startTime)}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-2 font-medium">
                      <Clock className="w-4 h-4 text-blue-600" />
                      {formatTime(m.startTime)}
                    </span>
                  </div>

                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <div className="flex items-start gap-3 text-sm">
                      <User className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">
                          {m.prospect.fullName || "Unknown contact"}
                        </div>
                        {m.prospect.roleGuess && (
                          <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">
                            {m.prospect.roleGuess}
                          </div>
                        )}
                      </div>
                    </div>
                    {m.prospect.companyNameGuess && (
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 className="w-5 h-5 text-slate-400" />
                        <span className="font-semibold text-slate-900">
                          {m.prospect.companyNameGuess}
                        </span>
                      </div>
                    )}
                    {m.prepStatus === "pending" && (
                      <p className="text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-2 mt-3">
                        Open this meeting to generate the latest prep briefing.
                      </p>
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