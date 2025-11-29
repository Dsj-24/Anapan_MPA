// app/meetings/[eventId]/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "../../../src/lib/auth";
import { fetchPreps, type MeetingSummary } from "../../../src/lib/api";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  let meetings: MeetingSummary[];
  try {
    meetings = await fetchPreps();
  } catch {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Could not load meeting prep. Make sure the backend is running and
          /preps is healthy.
        </p>
      </main>
    );
  }

  const meeting = meetings.find((m) => m.eventId === eventId);

  if (!meeting) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Meeting not found.</p>
      </main>
    );
  }

  const { header, painPoints, talkingPoints, approach, tips, toneSummary } =
    meeting.prep;
  const { prospect } = meeting;
  const when = new Date(meeting.startTime);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="w-full max-w-4xl mx-auto px-6 py-6">
        <Link
          href="/preps"
          className="text-sm text-blue-600 hover:underline mb-6 inline-flex items-center"
        >
          ← Back to Dashboard
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {meeting.meetingTitle}
            </h1>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <span className="flex items-center gap-1.5">
                📅{" "}
                {when.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                🕐{" "}
                {when.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <span className="inline-flex px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
            Upcoming
          </span>
        </div>

        {/* Prospect header card */}
        <section className="mb-6 rounded-xl bg-blue-50 border border-blue-100 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            {header.name}
          </h2>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-slate-500">👤</span>
              <span>{header.roleLine}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="text-slate-500">🏢</span>
              <span>{header.company}</span>
            </div>
            {prospect.email && (
              <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                <span className="text-slate-500">✉️</span>
                <span>{prospect.email}</span>
              </div>
            )}
          </div>
        </section>

        <PrepSection title="Pain Points" icon="⚠️" items={painPoints} iconColor="text-red-500" />
        <PrepSection
          title="Talking Points"
          icon="💬"
          items={talkingPoints}
          iconColor="text-blue-500"
        />
        <PrepSection 
          title="Approach Strategy" 
          icon="🎯" 
          items={approach}
          iconColor="text-blue-500"
        />
        <PrepSection title="Tips for Success" icon="💡" items={tips} iconColor="text-yellow-500" />

        <section className="mt-6 rounded-xl bg-white border border-slate-100 shadow-sm p-6">
          <h3 className="flex items-center gap-2 font-semibold text-slate-900 mb-3">
            <span className="text-blue-500">🔊</span>
            <span>Tone & Style</span>
          </h3>
          <p className="text-sm text-slate-700 italic leading-relaxed">{toneSummary}</p>
        </section>
      </div>
    </main>
  );
}

function PrepSection({ 
  title, 
  icon, 
  items, 
  iconColor = "text-slate-500" 
}: { 
  title: string; 
  icon: string; 
  items: string[];
  iconColor?: string;
}) {
  return (
    <section className="mb-6 rounded-xl bg-white border border-slate-100 shadow-sm p-6">
      <h3 className="flex items-center gap-3 font-bold text-lg text-slate-900 mb-5">
        <span className={`${iconColor} text-2xl`}>{icon}</span>
        <span>{title}</span>
      </h3>
      <ul className="space-y-4">
        {items.map((item, idx) => {
          // Split on first colon to separate heading from content
          const colonIndex = item.indexOf(':');
          if (colonIndex === -1) {
            // No colon found, render as regular item
            return (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="text-slate-400 mt-0.5">•</span>
                <span className="flex-1 leading-relaxed">{item}</span>
              </li>
            );
          }
          
          const heading = item.substring(0, colonIndex).trim();
          const content = item.substring(colonIndex + 1).trim();
          
          return (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-slate-400 mt-1">•</span>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                  {heading}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {content}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}