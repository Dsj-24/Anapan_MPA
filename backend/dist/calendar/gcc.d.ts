import { type calendar_v3 } from "googleapis";
export declare function listUpcomingEventsForUser(refreshToken: string, maxResults?: number): Promise<calendar_v3.Schema$Event[]>;
export declare function getEventById(refreshToken: string, eventId: string): Promise<calendar_v3.Schema$Event | null>;
export declare function getFallbackRefreshToken(): string | undefined;
//# sourceMappingURL=gcc.d.ts.map