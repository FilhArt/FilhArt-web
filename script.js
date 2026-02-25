/* =========================================
   FILHART STUDIO - CORE ENGINE (SILENT MODE)
   ========================================= */

// --- VARIABLES GLOBALES ---
// Mantenemos las variables en null para evitar errores de referencia
let audioContext = null;
let backgroundStaticNode = null;

// ==========================================
// 1. SISTEMA DE AUDIO (TOTALMENTE DESACTIVADO)
// ==========================================

// Todas estas funciones ahora están vacías. 
// Si el código intenta llamarlas, simplemente no ocurrirá nada.

function initAudio() {
    // Silenciado
    return;
}

function startBackgroundStatic() {
    // Silenciado
    return;
}

function playInteractionStatic() {
    // Silenciado
    return;
}

// ==========================================
// 2. CONTROL DE PANTALLA DE INICIO
// ==========================================

const startScreen = document.getElementById('start-screen');
const mainContent = document.getElementById('main-content');
let startIdleTimer = null;

// Temporizador: Si no entran en 12 segundos, inicia el evento de terror visual
window.addEventListener('load', () => {
    startIdleTimer = setTimeout(triggerStartScreenEasterEgg, 12000);
});

// Evento: Al hacer clic en la pantalla de inicio
if (startScreen) {
    startScreen.addEventListener('click', () => {
        // CANCELAR EL SUSTO si entran voluntariamente
        clearTimeout(startIdleTimer);

        // Animación de salida
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
            // Animación de entrada del contenido CRT
            if (mainContent) {
                mainContent.style.opacity = '1';
                mainContent.style.animation = 'blink 0.1s 4 alternate'; 
            }
        }, 500);
    });
}

function triggerStartScreenEasterEgg() {
    // Solo efectos visuales, nada de audio
    startScreen.classList.add('possessed');
    
    // Cambio de texto demoníaco
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

// Ventanas Modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll
    }
}

function closeModalBtn(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }
}

function closeModal(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Copiar al portapapeles
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
    
    // Contraseña (Cliente) - Cambia esto cada mes
    const CURRENT_PASS = "NEMESIS"; 

    if (input && input.value.toUpperCase().trim() === CURRENT_PASS) {
        
        // 1. Quitar el candado visualmente
        overlay.style.opacity = '0';
        
        // 2. Quitar el desenfoque al contenido
        if(content) content.classList.add('unlocked'); 

        // 3. Eliminar el overlay del DOM después de la animación
        setTimeout(() => {
            overlay.style.display = 'none'; 
        }, 500);
        
    } else {
        if(errorMsg) errorMsg.style.display = 'block';
        if(input) {
            input.value = '';
            input.focus();
            // Pequeña animación de temblor en el input
            input.style.borderColor = 'red';
            setTimeout(() => input.style.borderColor = '#444', 300);
        }
    }
}

// ==========================================
// 5. EASTER EGGS (SOLO VISUALES)
// ==========================================

// A) CÓDIGO KONAMI
const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let currentSequence = [];

document.addEventListener('keydown', (e) => {
    currentSequence.push(e.key);
    // Mantener array limpio
    currentSequence.splice(-secretCode.length - 1, currentSequence.length - secretCode.length);

    // Chequear secuencia
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

// B) CÓDIGO SENREF ("af-01")
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

    // Fase 1: Pantalla Azul
    senrefScreen.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Fase 2: Corrupción (3s)
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

    // Fase 3: Blackout (5.5s)
    setTimeout(() => {
        senrefScreen.style.display = 'none';
        if(blackout) blackout.style.display = 'block';
        document.body.classList.remove('cursed-mode'); 
    }, 5500);

    // Fase 4: Restaurar (8s)
    setTimeout(() => {
        if(blackout) blackout.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Resetear visuales para la próxima
        senrefScreen.style.backgroundColor = "";
        senrefScreen.style.borderColor = "";
        if(messageBox) messageBox.innerHTML = "<p>ESTE DOMINIO HA SIDO INTERCEPTADO...</p>";
        
        alert("SISTEMA RESTAURADO TRAS FALLO CRÍTICO.");
    }, 8000);
}

// C) GRITO DEL LOGO (3 Clics)
let logoClickCount = 0;
let logoResetTimer = null;

function triggerTitleEasterEgg() {
    const title = document.getElementById('main-logo');
    if (!title) return;

    logoClickCount++;

    clearTimeout(logoResetTimer);
    logoResetTimer = setTimeout(() => { logoClickCount = 0; }, 2000);

    if (logoClickCount === 3) {
        // Ejecutar evento
        title.innerText = "AYUDA";
        title.setAttribute('data-text', "AYUDA");
        title.style.color = "red";
        title.style.textShadow = "0 0 20px red";
        document.body.classList.add('cursed-mode'); 

        // Restaurar
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
    // THROTTLING: Solo crear una partícula cada 40ms 
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