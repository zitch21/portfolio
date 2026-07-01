# Emmanuel John P. Bernal — Cyber-Glassmorphic Portfolio

An immersive, retro-futuristic personal website built for my Web Programming course. It showcases who I am as a 4th-Year BSCS student at **DMMMSU – SLUC**, highlights the projects I've been working on throughout my studies, and integrates modern cloud architecture.

* **Location:** Tubao, La Union
* **Current Status:** 4th-Year Computer Science Student (CCS) @ DMMMSU - SLUC

## 🔗 Connect & Live Demo

* **Live Portfolio Link:** [Deploy Preview on Vercel](https://zitch-personal-portfolio.vercel.app/)
* **GitHub Profile:** [zitch21](https://github.com/zitch21)[cite: 2]
* **Facebook Profile:** [John John Bernal](https://www.facebook.com/johnjohn0521/)[cite: 2]

---

## 🎮 Featured Project: Debug Defender Pro

A high-speed, reflex-based mini-game built as the centerpiece of this portfolio. The goal is simple: catch the moving bug as fast as you can before the 15-second timer runs out.

The layout utilizes an adaptive velocity calculation that scales based on performance:


$$\text{speed} = \max(400, 1000 - (\text{score} \times 40))$$

### Features

| Feature | Description |
| --- | --- |
| **Dynamic Difficulty** | Bug speed scales with your score for a fair but challenging experience.

 |
| **Tabbed Interface** | Real-time toggling between a "Personal" view (local cache stats) and a global tier view. |
| **Global Leaderboard** | Real-time top high scores tracked and powered by Supabase.

 |
| **Menu Navigation** | Operational lifecycle loops allowing seamless transition back to the Start Screen. |
| **Light / Dark Mode** | High-end glassmorphic UI with native browser theme-state synchronization.

 |
| **Responsive Design** | Securely clamped layout boundaries preventing elements from rendering off-screen.

 |
| **Data Persistence** | Multi-channel cloud data logging alongside local storage fallback tracking.

 |

---

## 🛠️ Technology Stack

* **Frontend:** HTML5, Cyber-Glassmorphic CSS3 (Custom Variables / Backdrop Blurs), Vanilla JavaScript ES6.


* **Backend / Database:** Supabase (PostgreSQL Cloud Architecture).


* **Integrations:** EmailJS API (Direct client-side contact submission delivery).


* **Hosting / Deployment:** Vercel Static Edge Network Pipeline.



---

## 🤖 AI-Assisted Development Workflow

This project was built using an iterative, multi-model AI workflow to optimize prompt refinement, style transformations, and deep codebase debugging.

* **Core Generation & Portfolio Design:** Layout components, structural changes, styling overrides, and the portfolio design were generated mainly using **Gemini AI**.


* **Prompt Refinement:** Logic matrices, feature specs, and engineering workflows were refined using **Claude AI** to guarantee clear code optimization.


* **Debugging & Code Quality:** Deployed several specialized AI engines and multi-agent systems alongside Gemini to isolate runtime exceptions, patch state tracking anomalies, and eliminate overlapping interval hazards.


* **Drafting Assistance:** Used **Cursor** and **GitHub Copilot** as secondary aids for tracking rapid changes across boilerplate code loops.



---

## 📈 Version Control

This project uses **Git and GitHub** for tracking progress and managing codebase changes. Commits adhere to semantic conventions for visible transparency:

| Prefix | Purpose |
| --- | --- |
| `feat:` | New features

 |
| `fix:` | Bug fixes

 |
| `style:` | UI / formatting changes

 |
| `perf:` | Performance improvements

 |

---

## ⚙️ Setup & Deployment

This site is deployed globally using Vercel's automated static pipeline. To maximize credential isolation and secure production delivery, no physical configuration .env file exists as I inserted the production access keys exactly as defined below:

* `SUPABASE_URL`

* `SUPABASE_ANON_KEY`

* `EMAILJS_PUBLIC_KEY`

* `EMAILJS_SERVICE_ID`

* `EMAILJS_TEMPLATE_ID`


---

## 🗄️ Database Blueprints

Backend states run on a relational layout handling user interactions natively. Row Level Security (RLS) is explicitly enabled on these tables to permit direct serverless communication:

### 1. Match Leaderboard (`game_leaderboard`)

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `int8` | Primary key

 |
| `player_name` | `text` | Player's entered name

 |
| `score` | `int8` | Final score from the session

 |
| `created_at` | `timestamp` | Auto-generated on insert

 |

### 2. Contact Submissions (`contact_submissions`)

| Column | Type | Notes |
| --- | --- | --- |
| `id` | `int8` | Primary key |
| `name` | `text` | Sender's contact name |
| `email` | `text` | Sender's fallback email |
| `message` | `text` | Form submission payload |
| `created_at` | `timestamp` | Auto-generated timestamp |

---

## 📬 Contact

Developed by **Emmanuel John P. Bernal**

4th-Year BSCS Student — DMMMSU - SLUC

[![GitHub](https://img.shields.io/badge/GitHub-zitch21-181717?style=flat&logo=github)](https://github.com/zitch21)
[![Facebook](https://img.shields.io/badge/Facebook-johnjohn0521-1877F2?style=flat&logo=facebook)](https://www.facebook.com/johnjohn0521/)