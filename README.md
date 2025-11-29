# Meeting Prep Assistant

*A full-stack prototype for a **Salesforce Account Executive** selling Marketing Cloud.*

It connects to a **single Google Calendar**, detects upcoming sales/marketing meetings, runs web research on the prospect and their company, and uses an LLM to generate a structured meeting-prep brief that you can review from a clean web dashboard.

> ⚠️ **Scope:** Single-owner, single-calendar tool  
> Designed for one AE using **their own Google account** (single-user Google OAuth).  
> Multi-user / multi-calendar support is considered a **future enhancement**.

---

## 🔍 What It Does

### 🔔 Upcoming Meetings Dashboard

- Shows your next **5 sales/marketing meetings** from Google Calendar.
- Each card includes:
  - Title  
  - Date & time  
  - Prospect name  
  - Role bucket (e.g., CMO, VP Marketing)  
  - Company  

---

### 🧠 Automated Prospect Research

- Extracts the main **external attendee** (prospect) from each event.
- Uses **Tavily web search** to gather public info about:
  - The person (role, seniority, short bio)  
  - Their company  
- Builds a structured **persona** with:
  - Role & seniority  
  - Keywords / themes  
  - Short bio summary  

---

### 🏢 Company Context

- Pulls:
  - “About us” style snippets  
  - Recent news  
  - Marketing / loyalty themes  
- Classifies:
  - **Industry:** retail, SaaS, fintech, etc.  
  - **Size:** startup / mid-market / enterprise  

---

### 📋 LLM-Generated Meeting Prep

For each meeting, the backend generates a structured JSON prep object:

```jsonc
{
  "header": {
    "name": "Prospect Name",
    "roleLine": "Normalized Role Line",
    "company": "Company Name"
  },
  "painPoints": [],
  "talkingPoints": [],
  "approach": [],
  "tips": [],
  "toneSummary": ""
}
```
The prep is tailored using:

* Role bucket (e.g., CMO, VP MARKETING, SALES / REVENUE LEADER)
* Company industry & size
* Persona keywords & bio summary
* Real Tavily snippets (no fabricated biographies)

#### 💾 Per-Meeting Caching
Prep for each meeting is stored in Postgres, keyed by `eventId`.

Subsequent requests for the same event:

* Reuse the cached prep
* Avoid extra LLM calls
* Improve performance & reduce cost

#### 🔐 Single-User Google Sign-In (NextAuth)
Frontend uses Google OAuth via NextAuth.

Only the configured `allowed_email` can:

* Access the dashboard
* View meeting details

Matches the single Calendar owner:

* Same Google account used to generate the refresh token
* Enforced via `NEXT_PUBLIC_ALLOWED_GOOGLE_EMAIL`

### 🌐 Demo
Hosted on Vercel:

[https://salesforce-meet-prep-assistant.vercel.app/](https://salesforce-meet-prep-assistant.vercel.app/)

### 🏗️ Local Setup
You can run this app locally and connect it to your own Google Calendar by:

* Using your own Google OAuth client (Client ID + Client Secret).
* Generating a refresh token for your Google account.
* Replacing the calendar-owner email with your own in the frontend env.

#### 1️⃣ Clone & Install
```bash
git clone https://github.com/your-username/Anapan_MPA.git
cd Anapan_MPA

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

#### 2️⃣ Backend Environment Variables
Create a `.env` file in the `backend` folder (or equivalent env setup):

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Tavily
TAVILY_API_KEY=tvly-...

# Google Calendar OAuth (single owner)
GOOGLE_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_OAUTH_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN=YOUR_REFRESH_TOKEN_FOR_CALENDAR_OWNER

# Postgres
DATABASE_URL=postgres://user:password@host:port/dbname

# CORS (frontend origin)
FRONTEND_ORIGIN=http://localhost:3000
```

#### 3️⃣ Frontend Environment Variables
Create a `.env.local` (or similar) in the `frontend` folder:

```bash
# NextAuth core
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=some-long-random-string

# Google OAuth for NextAuth (can reuse the same client as backend)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_OAUTH_CLIENT_SECRET

# Backend base URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

