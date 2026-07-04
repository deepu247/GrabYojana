# GrabYojana

GrabYojana helps Indian citizens discover government welfare schemes they are eligible for. Users fill in a short profile (age, gender, state, occupation, income, category) and get a ranked list of matching schemes, optionally re-ranked by AI for personalized match reasons.

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI:** Google Gemini (optional, used to re-rank and explain matches)

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
