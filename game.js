/**
 * Debug Defender: Pro - Modular Cloud Engine
 * Architecture: Serverless Decoupled Component
 */

// --- Global Supabase Verification and Handshake Access ---
const SUPABASE_URL = (window.env && window.env.SUPABASE_URL) || "YOUR_LOCAL_FALLBACK_URL";
const SUPABASE_ANON_KEY = (window.env && window.env.SUPABASE_ANON_KEY) || "YOUR_LOCAL_FALLBACK_KEY";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// --- Game Runtime State Registry ---
let score = 0;
let timeLeft = 15;
let gameInterval;
let bugTimeout; 
let isPlaying = false;
let isSaving = false; 

/**
 * Reads data elements live from Cloud DB engine and syncs leaderboard listing
 */
async function updateLeaderboardUI() {
    if (!startLeaderboard) return;
    startLeaderboard.innerHTML = '';
    
    try {
        const { data, error } = await supabaseClient
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
            return;
        }
        
        if (currentBestDisplay) currentBestDisplay.textContent = data[0].score;
        
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
    }
}

/**
 * Safe multi-instance insert pipeline invocation
 */
async function saveScore(newScore, playerName) {
    if (newScore === 0) return;
    const finalName = playerName.trim() === "" ? "Player" : playerName.trim();
    
    try {
        const { error } = await supabaseClient
            .from('game_leaderboard')
            .insert([{ player_name: finalName, score: newScore }]);
        
        if (error) throw error;
        await updateLeaderboardUI();
    } catch (err) {
        console.error("Score Cloud Migration Interrupted:", err.message);
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

async function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearTimeout(bugTimeout); 
    
    if (playScreen) playScreen.style.display = 'none';
    if (endScreen) endScreen.style.display = 'flex';
    if (finalScoreDisplay) finalScoreDisplay.textContent = score;

    if (score > 0) {
        if (nameInput) nameInput.style.display = 'block';
        const currentBest = parseInt(currentBestDisplay ? currentBestDisplay.textContent : 0) || 0;
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

    const maxX = gameArea.clientWidth - 35; 
    const maxY = gameArea.clientHeight - 60; 
    const randomX = Math.floor(Math.random() * Math.max(0, maxX)) + 5; 
    const randomY = Math.floor(Math.random() * Math.max(0, maxY)) + 35; 
    
    bug.style.left = `${randomX}px`;
    bug.style.top = `${randomY}px`;

    let speed = Math.max(400, 1000 - (score * 40)); 
    bugTimeout = setTimeout(moveBug, speed);
}

// --- Wire Touch Events Safely ---
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

if (startBtn) startBtn.addEventListener('click', startGame);

if (restartBtn) {
    restartBtn.addEventListener('click', async () => {
        if (isSaving) return;
        isSaving = true;

        if (score > 0 && nameInput) {
            await saveScore(score, nameInput.value);
        }
        startGame();
    });
}

// --- Contact Form Database Gateway Integration ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }
        if (formStatus) formStatus.style.display = 'none';

        const uName = document.getElementById('user-name').value;
        const uEmail = document.getElementById('user-email').value;
        const uMsg = document.getElementById('user-message').value;

        try {
            const { error } = await supabaseClient
                .from('contact_submissions')
                .insert([{ name: uName, email: uEmail, message: uMsg }]);

            if (error) throw error;

            if (formStatus) {
                formStatus.textContent = "🚀 Message sent successfully!";
                formStatus.style.color = "var(--accent-color)";
                formStatus.style.display = "block";
            }
            contactForm.reset();
        } catch (err) {
            console.error('Submission Routing Error:', err.message);
            if (formStatus) {
                formStatus.textContent = "❌ Failed to send message. Please try again.";
                formStatus.style.color = "#ff4d4d";
                formStatus.style.display = "block";
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        }
    });
}

// Initialize on execution start
updateLeaderboardUI();

// Hook up dynamically tracking on the contact view frame safely via backward verification reference
const contactSection = document.getElementById('contact');
if (contactSection && window.scrollObserverInstance) {
    window.scrollObserverInstance.observe(contactSection);
}