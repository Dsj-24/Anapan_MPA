import type { calendar_v3 } from "googleapis";
import type { Prospect } from "./types.js";


const SELF_EMAIL = "diveshjamwal.dsj@gmail.com"; // later from env

function guessCompanyFromDomain(domain?: string): string | undefined {
    if (!domain) return;
    const [first] = domain.split(".");
    if (!first) return;
    const base = first;
    return base.charAt(0).toUpperCase() + base.slice(1);
  }
  

function guessRoleFromText(text: string): string | undefined {
  const patterns = [
    "CMO",
    "Chief Marketing Officer",
    "VP Marketing",
    "Vice President",
    "Director of Marketing",
    "Head of Marketing",
  ];
  const lower = text.toLowerCase();
  return patterns.find((p) => lower.includes(p.toLowerCase()));
}

export function extractProspect(event: calendar_v3.Schema$Event): Prospect {
    const attendees = event.attendees || [];
    const external =
      attendees.find(
        (a) => a.email && a.email.toLowerCase() !== SELF_EMAIL.toLowerCase()
      ) ?? attendees[0];
  
    const email = external?.email || "";
    const emailDomain = email.includes("@") ? email.split("@")[1] : undefined;
  
    const title = event.summary || "(No title)";
    const description = event.description || "";
    const combinedText = `${title}\n${description}`;
  
    const base: Prospect = {
      eventId: event.id!,
      fullName: external?.displayName || email.split("@")[0] || "Unknown",
      email: email || undefined,
      companyNameGuess: guessCompanyFromDomain(emailDomain),
      roleGuess: guessRoleFromText(combinedText),
      meetingTitle: title,
      meetingDescription: description || undefined,
      startTime:
        event.start?.dateTime || event.start?.date || new Date().toISOString(),
    };
  
    if (emailDomain) {
      base.emailDomain = emailDomain;
    }
  
    return base;
  }
  