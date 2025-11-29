// backend/src/prospect/extractProspect.ts
import type { calendar_v3 } from "googleapis";
import type { Prospect } from "./types.js";

const PERSONAL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
]);

function cleanName(identifier?: string | null): string | undefined {
  if (!identifier) return undefined;

  // If it already looks like "First Last" with capitals, keep it
  if (identifier.includes(" ") && /[A-Z]/.test(identifier)) {
    return identifier.trim();
  }

  // Strip email domain if present
  const base = identifier.includes("@")
    ? identifier.split("@")[0]!
    : identifier;

  const parts = base.split(/[._-]+/).filter(Boolean);
  if (!parts.length) return undefined;

  return parts
    .map(
      (p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()
    )
    .join(" ");
}

function domainToCompany(domain?: string): string | undefined {
  if (!domain) return undefined;
  const lower = domain.toLowerCase();

  if (PERSONAL_DOMAINS.has(lower)) return undefined;

  const mainPart = lower.split(".")[0] || lower;
  return mainPart.charAt(0).toUpperCase() + mainPart.slice(1);
}

function guessCompanyFromTitle(
  title: string | undefined,
  fallback?: string
): string | undefined {
  if (!title) return fallback;

  // e.g. "Sales Meeting – Salesforce x Walmart"
  const xMatch = title.split(/x|X/);
  if (xMatch.length >= 2) {
    const right = xMatch[xMatch.length - 1]!.trim();
    if (right) return right.replace(/[-–—]/g, "").trim();
  }

  // e.g. "Marketing Meeting with Nike"
  const withMatch = title.match(/with\s+(.+)$/i);
  if (withMatch?.[1]) {
    return withMatch[1].trim();
  }

  return fallback;
}

function guessRoleFromText(
  title?: string,
  description?: string
): string | undefined {
  const text = `${title ?? ""} ${description ?? ""}`.toLowerCase();

  if (text.includes("chief marketing officer") || text.includes("cmo")) {
    return "CMO";
  }
  if (text.includes("vp marketing") || text.includes("vice president of marketing")) {
    return "VP MARKETING";
  }
  if (text.includes("head of marketing") || text.includes("director of marketing")) {
    return "HEAD OF MARKETING";
  }
  if (text.includes("growth") || text.includes("demand generation")) {
    return "GROWTH / DEMAND GENERATION";
  }
  if (text.includes("sales") || text.includes("revenue")) {
    return "SALES / REVENUE LEADER";
  }

  return undefined;
}

export function extractProspect(event: calendar_v3.Schema$Event): Prospect {
  const attendees = event.attendees ?? [];
  const primary =
    attendees.find((a) => !a.self) ?? attendees[0] ?? undefined;

  const email = primary?.email ?? undefined;
  const emailDomain = email ? email.split("@")[1] : undefined;

  const fullName =
    cleanName(primary?.displayName) ||
    cleanName(email) ||
    "Unknown";

  const meetingTitle = event.summary ?? "";
  const meetingDescription = event.description ?? undefined;
  const startTime =
    event.start?.dateTime ?? event.start?.date ?? "";

  const companyFromDomain = domainToCompany(emailDomain);
  const companyNameGuess = guessCompanyFromTitle(
    meetingTitle,
    companyFromDomain
  );

  const roleGuess = guessRoleFromText(
    meetingTitle,
    meetingDescription
  );

  return {
    eventId: event.id ?? "",
    fullName,
    email,
    emailDomain,
    companyNameGuess,
    roleGuess,
    meetingTitle,
    meetingDescription,
    startTime,
  };
}
