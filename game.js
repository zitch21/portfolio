/**
 * Debug Defender: Pro - Isolated Modular Game Engine
 */

// Initialize runtime variables by tapping directly into the shared page handshake
const getSupabaseClient = () => {
    if (window.supabaseInstance) return window.supabaseInstance;
    if (typeof supabase === 'undefined' || !supabase.createClient) return null;
    const URL = (window.env && window.env.SUPABASE_URL) || "YOUR_LOCAL_FALLBACK_URL";
    const KEY = (window.env && window.env.SUPABASE_ANON_KEY) || "YOUR_LOCAL_FALLBACK_KEY";
    try {
        return supabase.createClient(URL, KEY);
    } catch (err) {
        console.warn('Unable to create Supabase client:', err);
        return null;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    const gameSupabase = getSupabaseClient();

    // --- Game Target Node Handlers ---
    const startBtn = document.getElementById('start-game-btn');
    const restartBtn = document.getElementById('restart-game-btn');
    const profileTab = document.getElementById('profile-tab');
    const leaderboardTab = document.getElementById('leaderboard-tab');
    const profilePanel = document.getElementById('profile-panel');
    const leaderboardPanel = document.getElementById('leaderboard-panel');
    const startScreen = document.getElementById('start-screen');
    const playScreen = document.getElementById('play-screen');
    const endScreen = document.getElementById('end-screen');
    const bug = document.getElementById('bug');
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');
    const currentBestDisplay = document.getElementById('current-best');
    const personalBestDisplay = document.getElementById('personal-best');
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
    let personalBest = 0;

    async function updateLeaderboardUI() {
        if (!startLeaderboard) return;
        startLeaderboard.innerHTML = '';

        if (!gameSupabase) {
            const li = document.createElement('li');
            li.textContent = 'Scores unavailable';
            startLeaderboard.appendChild(li);
            if (currentBestDisplay) currentBestDisplay.textContent = '0';
            updatePersonalBest();
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
                if (currentBestDisplay) currentBestDisplay.textContent = '0';
                updatePersonalBest();
                return;
            }
            
            if (currentBestDisplay) currentBestDisplay.textContent = data[0].score;
            
            data.forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.player_name}: ${entry.score}`;
                startLeaderboard.appendChild(li);
            });
        } catch (err) {
            console.error("Leaderboard Sync Failure:", err && (err.message || err));
            const errorLi = document.createElement('li');
            errorLi.textContent = 'Failed to load scores';
            startLeaderboard.appendChild(errorLi);
        } finally {
            updatePersonalBest();
        }
    }

    async function saveScore(newScore, playerName) {
        if (newScore === 0) return;
        if (!gameSupabase) return; // skip saving when no client
        const finalName = playerName.trim() === "" ? "Player" : playerName.trim();
        
        try {
            const { error } = await gameSupabase
                .from('game_leaderboard')
                .insert([{ player_name: finalName, score: newScore }]);
            
            if (error) throw error;
            await updateLeaderboardUI();
        } catch (err) {
            console.error("Score Save Error:", err && (err.message || err));
            throw err; // Propagate up to ensure correct error lifecycle capture
        }
    }

    function updatePersonalBest() {
        if (personalBestDisplay) {
            personalBestDisplay.textContent = personalBest;
        }
    }

    function showScreen(screen) {
        const screens = [startScreen, playScreen, endScreen];
        screens.forEach(el => {
            if (!el) return;
            el.classList.add('screen-hidden');
            el.setAttribute('aria-hidden', 'true');
        });

        if (screen) {
            screen.classList.remove('screen-hidden');
            screen.setAttribute('aria-hidden', 'false');
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
        if (personalBestDisplay) personalBestDisplay.textContent = personalBest;

        showScreen(playScreen);
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
        
        if (finalScoreDisplay) finalScoreDisplay.textContent = score;
        const currentBest = parseInt(currentBestDisplay ? currentBestDisplay.textContent : 0) || 0;
        if (score > currentBest) {
            if (endMessage) endMessage.textContent = "🏆 New High Score!";
        } else if (score > 0) {
            if (endMessage) endMessage.textContent = "Time's Up!";
        } else {
            if (endMessage) endMessage.textContent = "Try again!";
        }

        if (score > personalBest) {
            personalBest = score;
            updatePersonalBest();
        }

        showScreen(endScreen);
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

    if (bug) {
        bug.addEventListener('pointerdown', (e) => {
            if (!isPlaying) return;
            e.preventDefault();
            score++;
            if (scoreDisplay) scoreDisplay.textContent = score;
            
            bug.style.transform = 'scale(0.3)';
            setTimeout(() => { if (bug) bug.style.transform = 'scale(1)'; }, 100);

            moveBug();
        });
    }

    function switchTab(tab) {
        if (!profileTab || !leaderboardTab || !profilePanel || !leaderboardPanel) return;

        const active = tab === 'leaderboard' ? leaderboardTab : profileTab;
        const inactive = tab === 'leaderboard' ? profileTab : leaderboardTab;
        const showPanel = tab === 'leaderboard' ? leaderboardPanel : profilePanel;
        const hidePanel = tab === 'leaderboard' ? profilePanel : leaderboardPanel;

        active.classList.add('active-tab');
        active.setAttribute('aria-selected', 'true');
        active.tabIndex = 0;
        inactive.classList.remove('active-tab');
        inactive.setAttribute('aria-selected', 'false');
        inactive.tabIndex = -1;

        showPanel.hidden = false;
        showPanel.classList.add('active-panel');
        hidePanel.hidden = true;
        hidePanel.classList.remove('active-panel');
    }

    if (profileTab) {
        profileTab.addEventListener('click', () => switchTab('profile'));
        profileTab.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                switchTab('leaderboard');
            }
        });
    }

    if (leaderboardTab) {
        leaderboardTab.addEventListener('click', () => switchTab('leaderboard'));
        leaderboardTab.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                event.preventDefault();
                switchTab('profile');
            }
        });
    }

    if (startBtn) startBtn.addEventListener('click', startGame);

    if (restartBtn) {
        restartBtn.addEventListener('click', async () => {
            if (isSaving) return;
            isSaving = true;

            try {
                if (score > 0 && nameInput) {
                    await saveScore(score, nameInput.value);
                }
                startGame();
            } catch (err) {
                console.error("Engine Restart Interrupted:", err && (err.message || err));
                // Flash a dynamic UI hint on failure if required; reset lock state safely
                if (endMessage) endMessage.textContent = "⚠️ Sync Error. Retrying...";
            } finally {
                isSaving = false;
            }
        });
    }

    // Initialize UI state and leaderboard
    showScreen(startScreen);
    updateLeaderboardUI();
    switchTab('profile');
});