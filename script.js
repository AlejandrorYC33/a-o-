// Fecha de inicio de la relación
// Si el 5 de diciembre cumplen 1 año y 2 meses, la fecha es 5 de octubre de 2023
// Ajusta esta fecha según cuando realmente empezaron
const startDate = new Date('2024-10-05T00:00:00');

// Crear estrellas animadas
function createStars() {
    const starsContainer = document.querySelector('.stars');
    // Reducir número de estrellas en móviles para mejor rendimiento
    const isMobile = window.innerWidth <= 768;
    const numberOfStars = isMobile ? 50 : 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        starsContainer.appendChild(star);
    }
}

// Crear tulipanes flotantes
function createTulips() {
    const tulipsContainer = document.querySelector('.tulips-container');
    if (!tulipsContainer) return;
    
    // Reducir número de tulipanes en móviles
    const isMobile = window.innerWidth <= 768;
    const numberOfTulips = isMobile ? 8 : 15;
    
    // Emojis de tulipanes en diferentes colores
    const tulipEmojis = ['🌷', '🌷', '🌷'];
    
    for (let i = 0; i < numberOfTulips; i++) {
        const tulip = document.createElement('div');
        tulip.className = 'tulip';
        tulip.textContent = tulipEmojis[Math.floor(Math.random() * tulipEmojis.length)];
        
        // Posición inicial aleatoria
        tulip.style.left = Math.random() * 100 + '%';
        tulip.style.animationDelay = Math.random() * 15 + 's';
        
        // Tamaño aleatorio
        const size = 1.5 + Math.random() * 1;
        tulip.style.fontSize = size + 'rem';
        
        // Rotación inicial aleatoria
        tulip.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        tulipsContainer.appendChild(tulip);
    }
}

// Calcular el tiempo transcurrido de manera precisa
function calculateTime() {
    const now = new Date();
    const start = new Date(startDate);
    
    // Calcular la diferencia total en milisegundos
    const diffTime = now - start;
    
    // Calcular el total de días transcurridos
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Calcular años
    let years = now.getFullYear() - start.getFullYear();
    
    // Calcular meses
    let months = now.getMonth() - start.getMonth();
    
    // Ajustar si el mes actual es menor que el mes de inicio
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Ajustar si el día actual es menor que el día de inicio
    if (now.getDate() < start.getDate()) {
        months--;
        if (months < 0) {
            years--;
            months += 12;
        }
    }
    
    // Asegurar valores no negativos
    return {
        years: Math.max(0, years),
        months: Math.max(0, months),
        days: Math.max(0, totalDays) // Total de días desde la fecha de inicio
    };
}

// Actualizar el contador
function updateCounter() {
    const time = calculateTime();
    
    // Animación de números
    function animateNumber(elementId, newValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const currentValue = parseInt(element.textContent) || 0;
        
        if (currentValue !== newValue) {
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.textContent = newValue;
                element.style.transform = 'scale(1)';
            }, 150);
        } else {
            element.textContent = newValue;
        }
    }
    
    animateNumber('years', time.years);
    animateNumber('months', time.months);
    animateNumber('days', time.days);
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    createTulips();
    updateCounter();
    
    // Intentar reproducir el video con sonido
    const video = document.querySelector('.love-video');
    if (video) {
        video.muted = false;
        video.volume = 1.0;
        
        // Intentar reproducir con sonido (puede requerir interacción del usuario)
        video.play().catch(function(error) {
            console.log('El autoplay con sonido fue bloqueado. El usuario debe interactuar primero.');
            // Si falla, intentar reproducir cuando el usuario interactúe
            document.addEventListener('click', function enableAudio() {
                video.play().then(function() {
                    video.muted = false;
                    video.volume = 1.0;
                }).catch(function(err) {
                    console.log('Error al reproducir video:', err);
                });
                document.removeEventListener('click', enableAudio);
            }, { once: true });
        });
    }
    
    // Actualizar cada segundo
    setInterval(updateCounter, 1000);
    
    // Efecto parallax suave al hacer scroll (deshabilitado en móviles para mejor rendimiento)
    if (window.innerWidth > 768) {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    const stars = document.querySelector('.stars');
                    if (stars) {
                        stars.style.transform = `translateY(${scrolled * 0.5}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Agregar efecto de partículas al hacer clic o tocar
    function handleInteraction(e) {
        const x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : e.changedTouches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : e.changedTouches[0].clientY);
        if (x && y) {
            createParticle(x, y);
        }
    }
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction, { passive: true });
});

// Crear partículas al hacer clic o tocar
function createParticle(x, y) {
    // Limitar número de partículas simultáneas para mejor rendimiento en móviles
    const existingParticles = document.querySelectorAll('[data-particle="true"]');
    if (existingParticles.length > 20) {
        return;
    }
    
    const particle = document.createElement('div');
    particle.setAttribute('data-particle', 'true');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '6px';
    particle.style.height = '6px';
    particle.style.background = '#fff';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
    particle.style.willChange = 'transform, opacity';
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let posX = x;
    let posY = y;
    let opacity = 1;
    
    function animate() {
        posX += vx;
        posY += vy;
        opacity -= 0.02;
        
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}


