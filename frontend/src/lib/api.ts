// src/lib/api.ts
const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

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
  prepStatus: "ready" | "pending";
};

export type MeetingsResponse = {
  meetings: MeetingSummary[];
  recommendation?: string;
};

export type MeetingPrepDetail = {
  eventId: string;
  meetingTitle: string;
  startTime: string;
  prospect: Prospect;
  prep: MeetingPrep;
};

export async function fetchPreps(
  email: string
): Promise<MeetingsResponse> {
  const res = await fetch(`${backendBaseUrl}/preps`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "x-user-email": email,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Backend /preps failed with ${res.status} ${res.statusText}`
    );
  }

  const data = (await res.json()) as MeetingsResponse;
  return {
    meetings: data.meetings ?? [],
    recommendation: data.recommendation,
  };
}

export async function fetchMeetingPrep(
  email: string,
  eventId: string
): Promise<MeetingPrepDetail> {
  const res = await fetch(`${backendBaseUrl}/meetings/${eventId}/prep`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "x-user-email": email,
    },
  });

  if (!res.ok) {
    throw new Error(
      `Backend /meetings/${eventId}/prep failed with ${res.status} ${res.statusText}`
    );
  }

  return (await res.json()) as MeetingPrepDetail;
}
