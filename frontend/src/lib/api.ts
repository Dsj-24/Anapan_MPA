// src/lib/api.ts
const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

// Types aligned with your backend
export type MeetingPrep = {
  header: {
    name: string;
    roleLine: string;
    company: string;
  };
  painPoints: string[];
  talkingPoints: string[];
  approach: string[];
  tips: string[];
  toneSummary: string;
};

export type Prospect = {
  eventId: string;
  fullName: string;
  email?: string;
  emailDomain?: string;
  companyNameGuess?: string;
  roleGuess?: string;
  meetingTitle: string;
  meetingDescription?: string;
  startTime: string;
};

export type MeetingSummary = {
  eventId: string;
  startTime: string;
  meetingTitle: string;
  prospect: Prospect;
  prep: MeetingPrep;
};

export async function fetchPreps(): Promise<MeetingSummary[]> {
  const res = await fetch(`${backendBaseUrl}/preps`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Backend /preps failed with ${res.status} ${res.statusText}`
    );
  }

  const data = (await res.json()) as { meetings?: MeetingSummary[] };
  return data.meetings ?? [];
}
