document.addEventListener('DOMContentLoaded', () => {
    // 1. Array of images generated earlier
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
        "IMG_2499.jpg"
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

    function addLogLine(command) {
        const line = document.createElement('div');
        line.className = 'log-line';
        
        let prefix = "> root@sys-engineer:~$ ";
        if (command.text.startsWith("Booting") || command.text.startsWith("Match") || command.text.startsWith("Compilation")) {
            prefix = "";
        }
        
        line.innerHTML = `<span style="color: #fff">${prefix}</span><span class="log-${command.type}">${command.text}</span>`;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight; // Auto-scroll
    }

    function typeCommand() {
        if (currentCommandIndex < commands.length) {
            const cmd = commands[currentCommandIndex];
            
            // Create typing effect container
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
            
            // Speed of typing (randomized slightly for realism)
            const typeInterval = setInterval(() => {
                textElement.textContent += cmd.text.charAt(charIndex);
                charIndex++;
                
                if (charIndex >= cmd.text.length) {
                    clearInterval(typeInterval);
                    cursor.style.display = 'none'; // hide cursor on finished line
                    currentCommandIndex++;
                    setTimeout(typeCommand, cmd.delay);
                }
            }, 30 + Math.random() * 40); // 30-70ms per character
            
        } else {
            // Sequence finished, transition to UI
            setTimeout(transitionToUI, 500);
        }
    }

    // 3. Transition logic
    function transitionToUI() {
        const terminalScreen = document.getElementById('terminal-screen');
        const uiScreen = document.getElementById('ui-screen');
        
        // Add hidden class to terminal (triggers CSS fade out)
        terminalScreen.classList.add('hidden');
        
        // Wait for fade out, then show UI
        setTimeout(() => {
            terminalScreen.style.display = 'none';
            uiScreen.classList.add('visible');
        }, 1500); // 1.5s matches CSS transition
    }

    // Start boot sequence after a small delay
    setTimeout(typeCommand, 1000);
});
