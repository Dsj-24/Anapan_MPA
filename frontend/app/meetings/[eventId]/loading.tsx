"use client";

export default function MeetingLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center space-y-3">
        <div className="mx-auto h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin" />
        <p className="text-sm text-slate-600">
          Generating your meeting prep. This usually takes just a few seconds…
        </p>
      </div>
    </main>
  );
}
