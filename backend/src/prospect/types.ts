export type Prospect = {
    eventId: string;
    fullName: string;
    email?: string | undefined;
    emailDomain?: string | undefined;
    companyNameGuess?: string | undefined;
    roleGuess?: string | undefined;
    meetingTitle: string;
    meetingDescription?: string | undefined;
    startTime: string;
  };
  