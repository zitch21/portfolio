/**
 * Debug Defender: Pro - Isolated Modular Game Engine
 */

// Initialize runtime variables by tapping directly into the shared page handshake.
// Wrapped in try/catch so a missing/broken client (e.g. env-config.js failed to
// load) can't crash this whole script and take the game itself down with it.
const getSupabaseClient = () => {
    try {
        if (window.supabaseInstance) return window.supabaseInstance;
        const URL = (window.env && window.env.SUPABASE_URL) || "YOUR_LOCAL_FALLBACK_URL";
        const KEY = (window.env && window.env.SUPABASE_ANON_KEY) || "YOUR_LOCAL_FALLBACK_KEY";
        return supabase.createClient(URL, KEY);
    } catch (err) {
        console.error("Supabase client init failed:", err.message);
        return null;
    }
};

const gameSupabase = getSupabaseClient();

// --- Game Target Node Handlers ---
const startBtn = document.getElementById('start-game-btn');
const restartBtn = document.getElementById('restart-game-btn');
const startScreen = document.getElementById('start-screen');
const playScreen = document.getElementById('play-screen');
const endScreen = document.getElementById('end-screen');
const bug = document.getElementById('bug');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const currentBestDisplay = document.getElementById('current-best');
const finalScoreDisplay = document.getElementById('final-score');
const endMessage = document.getElementById('end-message');
const gameArea = document.getElementById('game-container');
const startLeaderboard = document.getElementById('start-leaderboard');
const nameInput = document.getElementById('player-name');

let score = 0;
let timeLeft = 15;
let gameInterval;
let bugTimeout; 
let isPlaying = false;
let isSaving = false;
// Tracked as a real variable (not read back out of the DOM) so a failed
// leaderboard fetch can't leave endGame() comparing against stale text.
let currentBest = 0;

async function updateLeaderboardUI() {
    if (!startLeaderboard) return;
    startLeaderboard.innerHTML = '';

    if (!gameSupabase) {
        const errorLi = document.createElement('li');
        errorLi.textContent = 'Leaderboard unavailable';
        startLeaderboard.appendChild(errorLi);
        return;
    }

    try {
        const { data, error } = await gameSupabase
            .from('game_leaderboard')
            .select('player_name, score')
            .order('score', { ascending: false })
            .range(0, 4);

        if (error) throw error;

        if (!data || data.length === 0) {
            const emptyLi = document.createElement('li');
            emptyLi.textContent = 'No scores yet!';
            startLeaderboard.appendChild(emptyLi);
            currentBest = 0;
            if (currentBestDisplay) currentBestDisplay.textContent = '0';
            return;
        }

        currentBest = data[0].score;
        if (currentBestDisplay) currentBestDisplay.textContent = currentBest;

        data.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.player_name}: ${entry.score}`;
            startLeaderboard.appendChild(li);
        });
    } catch (err) {
        console.error("Leaderboard Sync Failure:", err.message);
        const errorLi = document.createElement('li');
        errorLi.textContent = 'Failed to load scores';
        startLeaderboard.appendChild(errorLi);
        // Don't overwrite currentBest here — keep whatever the last
        // successful fetch gave us rather than silently resetting it.
    }
}

async function saveScore(newScore, playerName) {
    if (newScore === 0) return;
    if (!gameSupabase) {
        console.error("Score Save Error: no database connection available");
        throw new Error("No database connection available");
    }
    const finalName = playerName.trim() === "" ? "Player" : playerName.trim();
    
    try {
        const { error } = await gameSupabase
            .from('game_leaderboard')
            .insert([{ player_name: finalName, score: newScore }]);
        
        if (error) throw error;
        await updateLeaderboardUI();
    } catch (err) {
        console.error("Score Save Error:", err.message);
        throw err; // Propagate up to ensure correct error lifecycle capture
    }
}

function startGame() {
    clearInterval(gameInterval); 
    clearTimeout(bugTimeout);
    
    score = 0;
    timeLeft = 15;
    isPlaying = true;
    isSaving = false; 
    
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (timeDisplay) timeDisplay.textContent = timeLeft;
    if (nameInput) nameInput.value = '';

    if (startScreen) startScreen.style.display = 'none';
    if (endScreen) endScreen.style.display = 'none';
    if (playScreen) playScreen.style.display = 'block';

    moveBug();

    gameInterval = setInterval(() => {
        timeLeft--;
        if (timeDisplay) timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearTimeout(bugTimeout); 
    
    if (playScreen) playScreen.style.display = 'none';
    if (endScreen) endScreen.style.display = 'flex';
    if (finalScoreDisplay) finalScoreDisplay.textContent = score;

    if (score > 0) {
        if (nameInput) nameInput.style.display = 'block';
        if (score > currentBest) {
            if (endMessage) endMessage.textContent = "🏆 New High Score!";
        } else {
            if (endMessage) endMessage.textContent = "Time's Up!";
        }
    } else {
        if (nameInput) nameInput.style.display = 'none';
        if (endMessage) endMessage.textContent = "Try again!";
    }
}

function moveBug() {
    clearTimeout(bugTimeout);
    if (!isPlaying || !bug || !gameArea) return;

    // Responsive bounds protection clamping minimum layout dimensions safely
    const maxX = Math.max(10, gameArea.clientWidth - 45); 
    const maxY = Math.max(40, gameArea.clientHeight - 65); 
    const randomX = Math.floor(Math.random() * maxX) + 5; 
    const randomY = Math.floor(Math.random() * (maxY - 35)) + 35; 
    
    bug.style.left = `${randomX}px`;
    bug.style.top = `${randomY}px`;

    let speed = Math.max(400, 1000 - (score * 40)); 
    bugTimeout = setTimeout(moveBug, speed);
}

function squashBug() {
    if (!isPlaying) return;
    score++;
    if (scoreDisplay) scoreDisplay.textContent = score;

    bug.style.transform = 'scale(0.3)';
    setTimeout(() => { if (bug) bug.style.transform = 'scale(1)'; }, 100);

    moveBug();
}

if (bug) {
    bug.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        squashBug();
    });

    // Keyboard accessibility: allow squashing the bug via Enter/Space
    // when it's focused, not just pointer/touch input.
    bug.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            squashBug();
        }
    });
}

if (startBtn) startBtn.addEventListener('click', startGame);

if (restartBtn) {
    restartBtn.addEventListener('click', async () => {
        if (isSaving) return;
        isSaving = true;
        restartBtn.disabled = true;
        const originalLabel = restartBtn.textContent;
        restartBtn.textContent = 'Saving...';

        try {
            if (score > 0 && nameInput) {
                await saveScore(score, nameInput.value);
            }
        } catch (err) {
            console.error("Score save failed, continuing without blocking restart:", err.message);
            // Don't leave the player stuck on the end screen just because the
            // leaderboard write failed — always let them keep playing.
        } finally {
            restartBtn.disabled = false;
            restartBtn.textContent = originalLabel;
            isSaving = false;
            startGame();
        }
    });
}

// Automatically populate scores on initialization
updateLeaderboardUI();