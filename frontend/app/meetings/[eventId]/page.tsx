// app/meetings/[eventId]/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Mail,
  AlertTriangle,
  MessageSquare,
  Compass,
  Lightbulb,
  Headphones
} from "lucide-react";
import { authOptions } from "../../../src/lib/auth";
import { fetchMeetingPrep } from "../../../src/lib/api";

export default async function MeetingDetailPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect("/");
  }

  let detail;
  try {
    detail = await fetchMeetingPrep(session.user.email, eventId);
  } catch (err) {
    console.error("Meeting detail error", err);
    return (
      <main className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-md">
          <div className="rounded-2xl bg-red-50 p-6 mb-4 inline-block">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <p className="text-slate-700 leading-relaxed">
            We couldn&apos;t generate the meeting prep right now. Please ensure the
            backend is running and the meeting still exists in your calendar.
          </p>
        </div>
      </main>
    );
  }

  if (!detail) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-600">Meeting not found.</p>
      </main>
    );
  }

  const { prep, prospect, meetingTitle, startTime } = detail;
  const when = new Date(startTime);

  return (
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-5xl mx-auto px-6 py-8">
        <Link
          href="/preps"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              {meetingTitle}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-blue-600" />
                {when.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-2 font-medium">
                <Clock className="w-4 h-4 text-blue-600" />
                {when.toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
          <span className="inline-flex px-4 py-2 rounded-lg bg-blue-50 text-sm font-semibold text-blue-700 border border-blue-100">
            Upcoming
          </span>
        </div>

        <section className="mb-6 rounded-xl bg-blue-50 border border-blue-100 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            {prep.header.name}
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-700">
              <User className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{prep.header.roleLine}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Building2 className="w-5 h-5 text-blue-600" />
              <span className="font-medium">{prep.header.company}</span>
            </div>
            {prospect.email && (
              <div className="flex items-center gap-3 text-sm text-slate-600 mt-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{prospect.email}</span>
              </div>
            )}
          </div>
        </section>

        <PrepSection 
          title="Pain Points" 
          icon={<AlertTriangle className="w-6 h-6" />}
          items={prep.painPoints}
          color="red"
        />
        <PrepSection
          title="Talking Points"
          icon={<MessageSquare className="w-6 h-6" />}
          items={prep.talkingPoints}
          color="blue"
        />
        <PrepSection 
          title="Approach Strategy" 
          icon={<Compass className="w-6 h-6" />}
          items={prep.approach}
          color="purple"
        />
        <PrepSection 
          title="Tips for Success" 
          icon={<Lightbulb className="w-6 h-6" />}
          items={prep.tips}
          color="amber"
        />

        <section className="mt-6 rounded-xl bg-white border border-slate-200 shadow-sm p-6">
          <h3 className="flex items-center gap-3 font-semibold text-lg text-slate-900 mb-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 text-white">
              <Headphones className="w-5 h-5" />
            </div>
            <span>Tone & Style</span>
          </h3>
          <p className="text-slate-700 italic leading-relaxed bg-slate-50 rounded-lg p-4">
            {prep.toneSummary}
          </p>
        </section>
      </div>
    </main>
  );
}

function PrepSection({
  title,
  icon,
  items,
  color,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  color: string;
}) {
  const colorClasses = {
    red: "bg-red-600",
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    amber: "bg-amber-600",
  };

  return (
    <section className="mb-6 rounded-xl bg-white border border-slate-200 shadow-sm p-6">
      <h3 className="flex items-center gap-3 font-semibold text-lg text-slate-900 mb-6">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${colorClasses[color as keyof typeof colorClasses]} text-white shadow-sm`}>
          {icon}
        </div>
        <span>{title}</span>
      </h3>
      <ul className="space-y-5">
        {items.map((item, idx) => {
          const colonIndex = item.indexOf(":");
          if (colonIndex === -1) {
            return (
              <li
                key={idx}
                className="flex items-start gap-3 text-slate-700"
              >
                <span className="text-blue-500 mt-1 font-bold">•</span>
                <span className="flex-1 leading-relaxed">{item}</span>
              </li>
            );
          }

          const heading = item.substring(0, colonIndex).trim();
          const content = item.substring(colonIndex + 1).trim();

          return (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-blue-500 mt-1.5 font-bold">•</span>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-2">
                  {heading}
                </h4>
                <p className="text-slate-700 leading-relaxed">
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