# Meeting Prep Assistant

**Meeting Prep Assistant** is a full-stack web application designed for Salesforce Account Executives who sell Marketing Cloud. It connects to a user's Google Calendar, identifies upcoming sales and marketing meetings, performs web research on the prospect and their company, and generates a structured meeting-prep brief using an LLM.

---

## Key Features

-   **Google Sign-In & Calendar Integration:** Users sign in with their Google account and grant read-only access to their calendar.
-   **Upcoming Meetings Dashboard:** Displays upcoming sales/marketing meetings and indicates whether a prep brief is ready or will be generated on demand.
-   **Automated Prospect & Company Research:** Extracts attendee information, gathers public data using Tavily Search, and builds a structured persona.
-   **LLM-Generated Meeting Briefs:** Creates detailed JSON-formatted briefs with pain points, talking points, recommended approach, and more, tailored to the prospect's role, industry, and company size.
-   **Per-Meeting Caching:** Stores generated preps in a Postgres database to avoid redundant generation.
-   **On-Demand Prep Flow:** Briefs are generated in real-time when a user clicks to view the meeting details.

---

## Tech Stack

| Category  | Technologies                                                              |
| :-------- | :------------------------------------------------------------------------ |
| **Backend**   | Node.js, TypeScript, Express, Google Calendar API, Tavily API, LangChain, OpenAI, Drizzle ORM, Postgres |
| **Frontend**  | Next.js 16 (App Router), TypeScript, React, NextAuth, Tailwind CSS      |

---

## Development Setup

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/your-username/Anapan_MPA.git
cd Anapan_MPA

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

You will need to create `.env` files for both the `backend` and `frontend` directories.

**`backend/.env`:**
```
OPENAI_API_KEY=sk-...
TAVILY_API_KEY=tvly-...
GOOGLE_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_OAUTH_CLIENT_SECRET
DATABASE_URL=postgres://user:password@host:port/dbname
PORT=3001
FRONTEND_ORIGIN=http://localhost:3000
```

**`frontend/.env`:**
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=some-long-random-string
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_OAUTH_CLIENT_SECRET
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 3. Run Database Migrations

```bash
cd backend
npx drizzle-kit migrate --config drizzle.config.ts
```

### 4. Start the Servers

```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd ../frontend
npm run dev
```

---

## How It Works

1.  **Authentication:** User signs in with Google.
2.  **Dashboard:** The app fetches upcoming sales/marketing meetings from the user's Google Calendar.
3.  **Prep Generation:** When a user selects a meeting, the backend fetches event details, researches the prospect, and uses an LLM to generate a detailed prep brief.
4.  **Display:** The frontend renders the complete brief for the user.

---

## Limitations

-   **Google OAuth Verification:** The app is a prototype and has not been verified by Google, so users will see an "unverified app" warning during sign-in.
-   **Token Management:** The current implementation assumes refresh tokens are long-lived and does not handle token rotation or revocation.
-   **Heuristics:** Role and industry classifications are based on heuristics and can be improved.
