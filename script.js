document.addEventListener('DOMContentLoaded', () => {
    // 1. Array of images
    const images = [
        "IMG_0244.jpg",
        "IMG_0261.jpg",
        "IMG_0286.jpg",
        "IMG_0380.jpg",
        "IMG_0429.PNG",
        "IMG_0671.jpg",
        "IMG_0751.jpg",
        "IMG_2265.jpg",
        "IMG_2341.jpg",
        "IMG_2478.jpg",
        "IMG_2481.jpg",
        "IMG_2498.jpg",
        "IMG_2499.jpg",
        "IMG_2944.JPG",
        "IMG_2945.JPG",
        "IMG_2946.JPG",
        "IMG_2947.JPG"
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    
    // Populate gallery
    images.forEach(img => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        const imgElement = document.createElement('img');
        imgElement.src = `assets/${img}`;
        imgElement.alt = "Momento especial";
        imgElement.loading = "lazy";
        item.appendChild(imgElement);
        galleryGrid.appendChild(item);
    });

    // 2. Terminal Boot Sequence
    const terminalBody = document.getElementById('terminal-body');
    const commands = [
        { text: "Booting Sys-Engineer OS v24.0...", delay: 800, type: "normal" },
        { text: "Mounting love_drive (/dev/pomarola)... [OK]", delay: 1000, type: "success" },
        { text: "Scanning for 'Eliane' in heart_memory...", delay: 1500, type: "normal" },
        { text: "Match found: 100% compatibility detected.", delay: 800, type: "highlight" },
        { text: "Loading module: 'Eliane_Smile_Engine'... [LOADED]", delay: 1200, type: "success" },
        { text: "Resolving dependencies for 'Perfect_Birthday'...", delay: 1000, type: "normal" },
        { text: "Bypassing firewall... [HACKED]", delay: 800, type: "error" },
        { text: "Decrypting birthday_wishes.sh...", delay: 1500, type: "normal" },
        { text: "Compilation successful.", delay: 500, type: "success" },
        { text: "Executing surprise in 3... 2... 1...", delay: 2000, type: "highlight" }
    ];

    let currentCommandIndex = 0;

    function typeCommand() {
        if (currentCommandIndex < commands.length) {
            const cmd = commands[currentCommandIndex];
            
            const typingContainer = document.createElement('div');
            typingContainer.className = 'log-line';
            let prefix = "> root@sys-engineer:~$ ";
            if (cmd.text.startsWith("Booting") || cmd.text.startsWith("Match") || cmd.text.startsWith("Compilation")) {
                prefix = "";
            }
            typingContainer.innerHTML = `<span style="color: #fff">${prefix}</span><span class="log-${cmd.type} typing-text"></span><span class="cursor"></span>`;
            terminalBody.appendChild(typingContainer);
            
            const textElement = typingContainer.querySelector('.typing-text');
            const cursor = typingContainer.querySelector('.cursor');
            let charIndex = 0;
            
            const typeInterval = setInterval(() => {
                textElement.textContent += cmd.text.charAt(charIndex);
                charIndex++;
                
                if (charIndex >= cmd.text.length) {
                    clearInterval(typeInterval);
                    cursor.style.display = 'none';
                    currentCommandIndex++;
                    setTimeout(typeCommand, cmd.delay);
                }
            }, 30 + Math.random() * 40);
            
        } else {
            setTimeout(transitionToLogin, 500);
        }
    }

    function transitionToLogin() {
        const terminalScreen = document.getElementById('terminal-screen');
        const loginScreen = document.getElementById('login-screen');
        
        terminalScreen.classList.add('hidden');
        
        setTimeout(() => {
            terminalScreen.style.display = 'none';
            loginScreen.classList.remove('hidden');
            loginScreen.classList.add('visible');
        }, 1500);
    }

    // 4. Login Validation
    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const bgMusic = document.getElementById('bg-music');
    
    loginBtn.addEventListener('click', () => {
        const user = usernameInput.value.trim().toLowerCase();
        const pass = passwordInput.value.trim();
        
        if (user === 'pomarola' && pass === '14082002') {
            loginError.classList.add('hidden');
            const loginScreen = document.getElementById('login-screen');
            const uiScreen = document.getElementById('ui-screen');
            
            // Start music exactly here!
            bgMusic.play().catch(e => console.log("Audio play prevented by browser:", e));
            bgMusic.volume = 0.8;
            
            loginScreen.style.opacity = '0';
            
            setTimeout(() => {
                loginScreen.style.display = 'none';
                uiScreen.classList.add('visible');
            }, 1500);
        } else {
            loginError.classList.remove('hidden');
        }
    });

    // Start boot sequence after a small delay
    setTimeout(typeCommand, 1000);
});

// Global function for slide navigation
window.nextSlide = function(slideNumber) {
    const prevSlide = document.getElementById(`slide-${slideNumber - 1}`);
    const nextSlideElement = document.getElementById(`slide-${slideNumber}`);
    
    if (prevSlide) {
        prevSlide.classList.remove('slide-active');
        prevSlide.classList.add('hidden'); // Immediate hide after fade
    }
    
    if (nextSlideElement) {
        nextSlideElement.classList.remove('hidden');
        setTimeout(() => {
            nextSlideElement.classList.add('slide-active');
        }, 50);
        
        // Special Logic for Slide 3 (Gallery Stagger Animation)
        if (slideNumber === 3) {
            const items = document.querySelectorAll('.gallery-item');
            const nextArrowBtn = document.getElementById('btn-slide-3');
            let delay = 0;
            
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, delay);
                delay += 200; // slightly faster
            });
            
            // Show the next arrow after all photos have appeared
            setTimeout(() => {
                nextArrowBtn.classList.remove('hidden');
            }, delay + 500);
        }
    }
};

window.prevSlide = function(slideNumber) {
    const currentSlide = document.querySelector('.slide.slide-active');
    const targetSlide = document.getElementById(`slide-${slideNumber}`);
    
    if (currentSlide) {
        currentSlide.classList.remove('slide-active');
        currentSlide.classList.add('hidden');
    }
    
    if (targetSlide) {
        targetSlide.classList.remove('hidden');
        setTimeout(() => {
            targetSlide.classList.add('slide-active');
        }, 50);
    }
};

// --- COUNTERS LOGIC ---
function updateCounters() {
    const date1 = new Date("2025-08-05T00:00:00");
    const date2 = new Date("2026-01-28T00:00:00");
    const now = new Date();

    function formatTime(diffMs) {
        if (diffMs < 0) return "¡Falta poco!";
        
        const diffSecs = Math.floor(diffMs / 1000);
        const d = Math.floor(diffSecs / (3600 * 24));
        const h = Math.floor((diffSecs % (3600 * 24)) / 3600);
        const m = Math.floor((diffSecs % 3600) / 60);
        const s = diffSecs % 60;
        
        return `${d}d ${h}h ${m}m ${s}s`;
    }

    const counter1 = document.getElementById('counter-1');
    const counter2 = document.getElementById('counter-2');

    if (counter1) counter1.innerText = formatTime(now - date1);
    if (counter2) counter2.innerText = formatTime(now - date2);
}

// Start updating counters immediately and every second
updateCounters();
setInterval(updateCounters, 1000);
