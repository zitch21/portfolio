# Emmanuel John Bernal — Personal Portfolio

A simple, interactive personal website built for my Web Programming course.
It showcases who I am as a 4th-Year BSCS student at **DMMMSU – SLUC**,
and highlights the projects I've been working on throughout my studies.

---

## 🎮 Featured Project: Debug Defender Pro

A high-speed, reflex-based mini-game built as the centerpiece of this portfolio.
The goal is simple: catch the moving bug as fast as you can before the 15-second
timer runs out — but the bug gets faster as your score climbs.

### Features

| Feature | Description |
|---|---|
| **Dynamic Difficulty** | Bug speed scales with your score for a fair but challenging experience |
| **Global Leaderboard** | Real-time top 5 high scores powered by Supabase |
| **Light / Dark Mode** | Clean, minimalist UI with a toggle for both themes |
| **Responsive Design** | Mobile-first layout that adapts across screen sizes |
| **Data Persistence** | Scores are saved to a cloud database after every session |
| **Smooth Animations** | CSS transitions and clean JavaScript event handling throughout |

---

## 🛠️ Technology Stack

- **Frontend:** HTML5, Modern CSS (Flexbox / Grid), Vanilla JavaScript
- **Backend / Database:** Supabase (PostgreSQL)
- **Integrations:** EmailJS (contact form)
- **Hosting / Deployment:** Vercel

---

## 🤖 AI-Assisted Development Workflow

This project was built using an iterative, AI-assisted approach to meet
the course assignment guidelines and explore modern development tools.

- **Code Generation:** Core game engine, UI logic, and database integration
  were architected with the help of **Gemini AI**.
- **Prompt Refinement:** Structural prompts, logic flows, and feature specs
  were refined using **Claude AI** to keep the code modular, readable, and
  aligned with professional standards.
- **Tooling:** Experimented with **Cursor** and **GitHub Copilot** for
  drafting HTML structure, responsive CSS, and JavaScript logic.
- **Troubleshooting:** Used AI assistance to patch memory leaks (overlapping
  `setInterval` timers), fix boundary clipping in the mini-game, and add
  backward-compatibility checks for old localStorage data.
- **Architecture:** Follows a *Modular Engine* pattern, keeping game logic
  cleanly separated from portfolio UI components.

---

## 📈 Version Control

This project uses **Git and GitHub** for progress tracking.
Commits follow semantic conventions for clear, gradable history:

| Prefix | Purpose |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `style:` | UI / formatting changes |
| `perf:` | Performance improvements |

---

## ⚙️ Setup & Deployment

### Prerequisites

- A [Supabase](https://supabase.com/) account and project
- An [EmailJS](https://www.emailjs.com/) account for the contact form
- A [Vercel](https://vercel.com/) account for hosting

### Environment Variables

Sensitive credentials are managed via Vercel environment variables.
Set the following in your Vercel dashboard before deploying:

```
SUPABASE_URL
SUPABASE_ANON_KEY
EMAILJS_SERVICE_ID
EMAILJS_TEMPLATE_ID
EMAILJS_PUBLIC_KEY
```

> The build script generates `env-config.js` during deployment
> using these Vercel environment variables.


---

## 🗄️ Database Schema

The leaderboard relies on a `game_leaderboard` table in Supabase:

| Column | Type | Notes |
|---|---|---|
| `id` | `int8` | Primary key |
| `player_name` | `text` | Player's entered name |
| `score` | `int8` | Final score from the session |
| `created_at` | `timestamp` | Auto-generated on insert |

---

## 📬 Contact

Developed by **Emmanuel John P. Bernal**
4th-Year BSCS Student — DMMMSU - SLUC

[![GitHub](https://img.shields.io/badge/GitHub-zitch21-181717?style=flat&logo=github)](https://github.com/zitch21)
[![Facebook](https://img.shields.io/badge/Facebook-johnjohn0521-1877F2?style=flat&logo=facebook)](https://www.facebook.com/johnjohn0521/)