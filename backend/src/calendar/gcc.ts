import { google, type calendar_v3 } from "googleapis";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
} from "../config/env.js";

function createOAuthClient(refreshToken: string) {
  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return oauth2Client;
}

export async function listUpcomingEventsForUser(
  refreshToken: string,
  maxResults = 6
): Promise<calendar_v3.Schema$Event[]> {
  const oauth2Client = createOAuthClient(refreshToken);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const { data } = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults,
    singleEvents: true,
    orderBy: "startTime",
  });

  return data.items ?? [];
}

export async function getEventById(
  refreshToken: string,
  eventId: string
): Promise<calendar_v3.Schema$Event | null> {
  const oauth2Client = createOAuthClient(refreshToken);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const { data } = await calendar.events.get({
      calendarId: "primary",
      eventId,
    });
    return data;
  } catch {
    return null;
  }
}

export function getFallbackRefreshToken(): string | undefined {
  return GOOGLE_REFRESH_TOKEN;
}
