# GrabYojana

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=for-the-badge" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=for-the-badge" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white&style=for-the-badge" alt="React Router" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge" alt="Tailwind CSS" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=nodedotjs&logoColor=white&style=for-the-badge" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white&style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white&style=for-the-badge" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google_Gemini-AI-8E75B2?logo=googlegemini&logoColor=white&style=for-the-badge" alt="Google Gemini" />
</p>

GrabYojana helps Indian citizens discover government welfare schemes they are eligible for. Users fill in a short profile (age, gender, state, occupation, income, category) and get a ranked list of matching schemes, optionally re-ranked by AI for personalized match reasons.

**Live Demo:** [https://grabyojana-hmnq.onrender.com/](https://grabyojana-hmnq.onrender.com/)

## Tech Stack

### 🎨 Frontend

| Technology | Purpose |
|---|---|
| ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) | UI library |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) | Build tool & dev server |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=reactrouter&logoColor=white) | Client-side routing |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white) | Utility-first styling |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?logo=framer&logoColor=white) | Animations |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) | HTTP client |

### ⚙️ Backend

| Technology | Purpose |
|---|---|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) | JavaScript runtime |
| ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) | Web framework |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) | Database |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white) | ODM |

### 🤖 AI

| Technology | Purpose |
|---|---|
| ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?logo=googlegemini&logoColor=white) | Optional AI-powered re-ranking & match explanations |

## Project Structure

```
GrabYojana/
├── src/                 # React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/            # Route-level pages
│   └── services/          # API client, helpers, static data
├── backend/              # Express API
│   ├── routes/            # /api/match, /api/schemes, /api/stats
│   ├── engine/            # Rule-based matching engine
│   ├── ai/                # Gemini-powered ranking
│   ├── models/            # Mongoose schemas
│   ├── middleware/        # Request validation
│   └── seed/              # Database seed script
└── public/
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google Gemini API key](https://ai.google.dev/) (optional — the app falls back to rule-based matching without it)

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/GrabYojana.git
cd GrabYojana
npm install
cd backend && npm install && cd ..
```

### 2. Configure environment variables

Copy the example env files and fill in your own values:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

- Root `.env` — `VITE_API_URL` should point to your backend (defaults to `http://localhost:5000`)
- `backend/.env` — set `MONGODB_URI` and `GEMINI_API_KEY`

### 3. Seed the database

```bash
cd backend
npm run seed
cd ..
```

### 4. Run the app

```bash
# Run frontend + backend together
npm start

# Or run separately
npm run dev            # frontend only, http://localhost:5173
npm run dev --prefix backend   # backend only, http://localhost:5000
```

## Available Scripts (root)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm start` | Start frontend and backend together |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and deploy to GitHub Pages |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/match` | Get matching schemes for a user profile |
| GET | `/api/schemes` | List all schemes (optional `category`/`state` filters) |
| GET | `/api/schemes/:id` | Get a single scheme |
| GET | `/api/stats` | Aggregate stats (scheme/query counts) |

## License

This project is provided as-is for educational purposes.
