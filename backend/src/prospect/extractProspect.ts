import type { calendar_v3 } from "googleapis";
import type { Prospect } from "./types.js";

const SELF_EMAIL = "diveshjamwal.dsj@gmail.com"; // later from env

const EMAIL_PROVIDERS = ["gmail", "yahoo", "hotmail", "outlook", "proton"];

// Prefer a capitalized token in the meeting title, e.g. "Flexiple" in "Flexiple Sales Meeting"
function guessCompanyFromTitle(title: string): string | undefined {
  const stopWords = new Set([
    "meeting",
    "sales",
    "call",
    "intro",
    "sync",
    "catch",
    "up",
    "review",
    "demo",
    "with",
    "for",
    "x",
    "vs",
  ]);

  const tokens = title
    .replace(/[^A-Za-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (stopWords.has(lower)) continue;
    if (/^[A-Z]/.test(token)) {
      return token;
    }
  }
  return undefined;
}

// Fallback: company from email domain, but ignore Gmail/Yahoo/etc.
function guessCompanyFromDomain(domain?: string): string | undefined {
  if (!domain) return;
  const [first] = domain.split(".");
  if (!first) return;
  if (EMAIL_PROVIDERS.includes(first.toLowerCase())) return;
  return first.charAt(0).toUpperCase() + first.slice(1);
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

  const companyFromTitle = guessCompanyFromTitle(title);
  const companyFromDomain = guessCompanyFromDomain(emailDomain);

  const base: Prospect = {
    eventId: event.id!,
    fullName: external?.displayName || email.split("@")[0] || "Unknown",
    email: email || undefined,
    companyNameGuess: companyFromTitle ?? companyFromDomain,
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
