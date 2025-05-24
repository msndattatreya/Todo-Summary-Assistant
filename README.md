## Todo Summary Assistant:-

A complete full-stack application that allows users to create, manage, and summarize personal to-do items using Google Gemini AI.The generated summary is automatically sent to a designated Slack channel via webhook.
Built with React, Node.js, Supabase, and integrated with Gemini and Slack APIs.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
##  Project Objective:-

To demonstrate integration of a full-stack system with:
- A user-friendly frontend built using React.
- A robust backend API using Node.js and Express.
- Cloud-based database using Supabase.
- Real-time summary generation using Gemini (Google Generative AI).
- Real-time notifications via Slack Webhooks.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ## Features:-

- Add, view, and delete to-do items
- Summarize all current todos using Gemini AI
- Send the summary directly to a Slack channel
- RESTful backend API endpoints
- Fully styled and responsive frontend
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Technologies Used 
- Frontend : React, Axios
- Backend : Node.js, Express, dotenv, axios 
- Database : Supabase           
- LLM : Gemini AI (Google Generative AI)   
- Messaging : Slack (Incoming Webhooks)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 ## Getting Started

### 1. Clone the Repository
`Terminal`
git clone https://github.com/msndattatreya/Todo-Summary-Sssistant.git
cd Todo-Summary-Assistant

### 2. Frontend Setup
`Terminal`
cd frontend
npm install
npm start

This will run the frontend on `http://localhost:3000`

### 3. Backend Setup
`Terminal`
cd backend
npm install

Create a ".env" file in the backend folder with the following:

`.env`
PORT=5000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz

->Then start the backend server:

node index.js

Your backend will run at `http://localhost:5000`

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Slack Webhook Setup

1. Go to [Slack API - Incoming Webhooks](https://api.slack.com/messaging/webhooks)
2. Click "Create a New App" → from scratch
3. Enable "Incoming Webhooks" in features
4. Add a webhook to a public channel
5. Copy the generated webhook URL
6. Paste it into ".env" as:

`.env`
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Gemini AI Setup (Google Generative AI)

1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Click “Create API Key” and copy it
3. Paste it into your ".env" file as:

`.env`
GEMINI_API_KEY=your_generated_key

4. The backend uses the `gemini-2.0-flash` model for fast and concise responses.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Design & Architecture Decisions

- **React Frontend**: Modular design with separate components for form, list, and summary.
- **Node.js Backend**: RESTful API structure using Express with middleware support.
- **Supabase**: PostgreSQL with RLS enabled and a public policy that allows read/write via API key.
- **Gemini AI**: Chosen over OpenAI for flexibility, free-tier usage, and fast summarization.
- **Slack Integration**: Real-time summary alerts without needing bot installation.

---
