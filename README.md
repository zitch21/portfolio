# Emmanuel Bernal | Personal Profile & Portfolio

A simple, interactive personal website built for my Web Programming course. It shares a bit about who I am as a 4th-Year BSCS student at DMMMSU in Tubao, La Union, and displays the coding projects I've been working on.

## 🛠️ Tech Stack & Features
* **Structure & Styling:** Semantic HTML5 and modular CSS3 using custom variables for seamless theme management. 
* **Interactive Theme Switcher:** A dark/light mode toggle button that remembers your preference using the browser's `localStorage`.
* **Dynamic Presentation Elements:**
    * *Scroll Reveals:* Uses the native JavaScript `IntersectionObserver` to smoothly fade in content as the user scrolls down the page.
    * *Sleek Tech Hover:* A pure CSS GPU-accelerated chromatic aberration effect on the header title.
* **Embedded JS Mini-Game ("Debug Defender: Pro"):** * *Evasive Difficulty Scaling:* The target dynamically increases speed based on the player's active score.
    * *Persistent Leaderboards:* Uses JSON data structures in the browser's `localStorage` to save, sort, and display the Top 5 High Scores with player nicknames.
    * *Mobile-Optimized:* Utilizes `pointerdown` events and CSS manipulation to prevent mobile zoom-lag and ensure snappy touch controls.

## 🤖 AI Collaboration Workflow
To meet the assignment guidelines, this project was developed by experimenting with AI tools like Cursor and GitHub Copilot. 
* **Drafting:** Used natural language prompts to quickly set up the basic HTML structure and responsive CSS layout.
* **Troubleshooting:** Worked with the AI to patch memory leaks (clearing overlapping `setInterval` timers), fix boundary clipping math in the mini-game, and write backward-compatibility checks for old local storage data.
* **Feature Integration:** Collaborated with the AI to generate the logic for the interactive scroll elements and evolve a static project description into a fully playable, data-persistent Javascript mini-game.

## 📈 Version Control
This project uses Git and GitHub to track progress. I used semantic commit messages (like `feat:`, `fix:`, `style:`, and `perf:`) to keep my update history organized for grading evaluation.