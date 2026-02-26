/* =========================================
   FILHART STUDIO - CORE ENGINE (SILENT MODE)
   ========================================= */


let audioContext = null;
let backgroundStaticNode = null;



// ==========================================
// 2. CONTROL DE PANTALLA DE INICIO
// ==========================================

const startScreen = document.getElementById('start-screen');
const mainContent = document.getElementById('main-content');
let startIdleTimer = null;


window.addEventListener('load', () => {
    startIdleTimer = setTimeout(triggerStartScreenEasterEgg, 12000);
});


if (startScreen) {
    startScreen.addEventListener('click', () => {
      
        clearTimeout(startIdleTimer);

      
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
            
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.animation = 'blink 0.1s 4 alternate'; 
            }
        }, 500);
    });
}

function triggerStartScreenEasterEgg() {
   
    startScreen.classList.add('possessed');
    

    setTimeout(() => {
        startScreen.classList.add('possessed-text');
        const title = startScreen.querySelector('h1');
        if(title) title.innerText = "¡YA ENTRA A LA PÁGINA HUMANO! TU ALMA YA NOS PERTENECE.";
    }, 2500);
}

// ==========================================
// 3. NAVEGACIÓN Y UI
// ==========================================

function scrollToId(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}


function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModalBtn(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    }
}

function closeModal(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}


function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        var x = document.getElementById("copy-toast");
        if(x) {
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
    }, function(err) {
        console.error('Error al copiar: ', err);
    });
}

// ==========================================
// 4. LÓGICA DE PATREON (CANDADO)
// ==========================================

function checkPatreonPass() {
    const input = document.getElementById('patreon-pass');
    const overlay = document.getElementById('overlay-lock');
    const errorMsg = document.getElementById('error-msg');
    const content = document.getElementById('secret-area');
    
   
    const CURRENT_PASS = "NEMESIS"; 

    if (input && input.value.toUpperCase().trim() === CURRENT_PASS) {
        
        
        overlay.style.opacity = '0';
        
     
        if(content) content.classList.add('unlocked'); 

        
        setTimeout(() => {
            overlay.style.display = 'none'; 
        }, 500);
        
    } else {
        if(errorMsg) errorMsg.style.display = 'block';
        if(input) {
            input.value = '';
            input.focus();
            
            input.style.borderColor = 'red';
            setTimeout(() => input.style.borderColor = '#444', 300);
        }
    }
}

// ==========================================
// 5. EASTER EGGS (SOLO VISUALES)
// ==========================================


const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let currentSequence = [];

document.addEventListener('keydown', (e) => {
    currentSequence.push(e.key);

    currentSequence.splice(-secretCode.length - 1, currentSequence.length - secretCode.length);


    if (currentSequence.join('').toLowerCase() === secretCode.join('').toLowerCase()) {
        activateSecretMode();
        currentSequence = [];
    }
});

function activateSecretMode() {
    document.body.classList.add('cursed-mode');
    const modal = document.getElementById('modal-secret');
    if(modal) modal.classList.add('active');
    document.title = "NO VENGAS - NO VENGAS - NO VENGAS";
}

function disableSecret() {
    document.body.classList.remove('cursed-mode');
    const modal = document.getElementById('modal-secret');
    if(modal) modal.classList.remove('active');
    document.title = "FilhArt Studio - Horror Indie";
}


let keyHistory = "";
const triggerPhrase = "af-01";

document.addEventListener('keypress', (e) => {
    keyHistory += e.key.toLowerCase();
    if (keyHistory.length > 20) keyHistory = keyHistory.slice(-10);

    if (keyHistory.endsWith(triggerPhrase)) {
        triggerSenrefSequence();
        keyHistory = "";
    }
});

function triggerSenrefSequence() {
    const senrefScreen = document.getElementById('senref-overlay');
    const messageBox = document.getElementById('senref-message');
    const blackout = document.getElementById('blackout-screen');
    
    if(!senrefScreen) return;

   
    senrefScreen.style.display = 'flex';
    document.body.style.overflow = 'hidden';


    setTimeout(() => {
        senrefScreen.style.backgroundColor = "#1a0000"; 
        senrefScreen.style.borderColor = "red";
        if(messageBox) {
            messageBox.innerHTML = `
                <h1 style="font-size: 3rem; color: red;">YA ESTOY ADENTRO.</h1>
                <p>TE VEO.</p>
            `;
        }
        document.body.classList.add('cursed-mode'); 
    }, 3000);

    
    setTimeout(() => {
        senrefScreen.style.display = 'none';
        if(blackout) blackout.style.display = 'block';
        document.body.classList.remove('cursed-mode'); 
    }, 5500);


    setTimeout(() => {
        if(blackout) blackout.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        
        senrefScreen.style.backgroundColor = "";
        senrefScreen.style.borderColor = "";
        if(messageBox) messageBox.innerHTML = "<p>ESTE DOMINIO HA SIDO INTERCEPTADO...</p>";
        
        alert("SISTEMA RESTAURADO TRAS FALLO CRÍTICO.");
    }, 8000);
}


let logoClickCount = 0;
let logoResetTimer = null;

function triggerTitleEasterEgg() {
    const title = document.getElementById('main-logo');
    if (!title) return;

    logoClickCount++;

    clearTimeout(logoResetTimer);
    logoResetTimer = setTimeout(() => { logoClickCount = 0; }, 2000);

    if (logoClickCount === 3) {
        
        title.innerText = "AYUDA";
        title.setAttribute('data-text', "AYUDA");
        title.style.color = "red";
        title.style.textShadow = "0 0 20px red";
        document.body.classList.add('cursed-mode'); 

    
        setTimeout(() => {
            title.innerText = "FILHART";
            title.setAttribute('data-text', "FILHART");
            title.style.color = ""; 
            title.style.textShadow = "";
            document.body.classList.remove('cursed-mode');
            logoClickCount = 0;
        }, 3000);
    }
}

// ==========================================
// 6. EFECTO: RASTRO DEL MOUSE
// ==========================================

let lastTrailTime = 0;

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
   
    if (now - lastTrailTime < 40) return; 
    
    lastTrailTime = now;

    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 500);
});