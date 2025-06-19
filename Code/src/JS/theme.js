/**
 * Thème - Gestion du mode clair/sombre
 * Ce script gère la bascule entre thème clair et sombre avec une animation améliorée
 */

document.addEventListener('DOMContentLoaded', function() {
    const themeSwitch = document.querySelector('.theme-switcher');
    const themeIcon = themeSwitch?.querySelector('i');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Liaison avec le fichier d'animations.js
    function loadAnimationsScript() {
        const script = document.createElement('script');
        script.src = 'JS/animations.js';
        script.defer = true;
        document.head.appendChild(script);
    }
    
    // Chargement du script d'animations
    loadAnimationsScript();
    
    // Animation de transition lors du changement de thème - Redesign
    function createRippleEffect(isDark) {
        // Crée l'élément de transition
        const ripple = document.createElement('div');
        ripple.className = isDark ? 'theme-ripple light-to-dark' : 'theme-ripple dark-to-light';
        
        // Ajouter au body
        document.body.appendChild(ripple);
        
        // Créer des particules pour améliorer l'effet visuel (optionnel)
        createThemeParticles(isDark);
        
        // Appliquer des effets supplémentaires sur différents éléments
        const elementsToAnimate = document.querySelectorAll('.navbar, h1, h2, h3, .abt__text, .tech-group, .project-card');
        elementsToAnimate.forEach(el => {
            el.classList.add('animate-opacity');
            setTimeout(() => el.classList.remove('animate-opacity'), 800);
        });
        
        // Supprimer l'élément après l'animation
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
    
    // Fonction pour créer des particules flottantes lors du changement de thème
    function createThemeParticles(isDark) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            
            // Définir le style des particules
            Object.assign(particle.style, {
                position: 'fixed',
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                borderRadius: '50%',
                backgroundColor: isDark 
                    ? `rgba(26, 20, 20, ${Math.random() * 0.5 + 0.3})` 
                    : `rgba(245, 245, 240, ${Math.random() * 0.5 + 0.3})`,
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                zIndex: '9998',
                pointerEvents: 'none',
                opacity: Math.random() * 0.5 + 0.3,
                transform: 'scale(0)',
                transition: `transform ${Math.random() * 0.5 + 0.3}s cubic-bezier(0.25, 0.1, 0.25, 1.5), 
                           opacity ${Math.random() * 0.5 + 0.8}s ease-out`
            });
            
            // Ajouter au body
            document.body.appendChild(particle);
            
            // Animation des particules
            setTimeout(() => {
                particle.style.transform = `scale(${Math.random() * 1.5 + 1})`;
                particle.style.opacity = '0';
                
                // Supprimer les particules après leur animation
                setTimeout(() => particle.remove(), 800);
            }, Math.random() * 200);
        }
    }
    
    // Vérifier si un thème est déjà enregistré
    const savedTheme = localStorage.getItem('theme');
    
    // Appliquer le thème enregistré ou celui du système
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else if (savedTheme === 'dark' || prefersDark) {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    
    // Gérer le changement de thème
    if (themeSwitch) {
        themeSwitch.addEventListener('click', function() {
            const isCurrentlyDark = !document.body.classList.contains('light-theme');
            
            // Créer l'effet de transition
            createRippleEffect(!isCurrentlyDark);
            
            // Changer le thème après un court délai pour que l'animation commence
            setTimeout(() => {
                document.body.classList.toggle('light-theme');
                
                if (document.body.classList.contains('light-theme')) {
                    localStorage.setItem('theme', 'light');
                    if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    localStorage.setItem('theme', 'dark');
                    if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
                }
            }, 50);
        });
    }
});
