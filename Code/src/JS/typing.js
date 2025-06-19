// Animation de cycle de texte pour le hero
class TypingCycler {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.options = {
            typingSpeed: options.typingSpeed || 50,
            erasingSpeed: options.erasingSpeed || 30,
            delayBetweenTexts: options.delayBetweenTexts || 2000,
            delayBeforeRestart: options.delayBeforeRestart || 1000,
            ...options
        };
        
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isErasing = false;
        this.isTyping = false;
        
        this.init();
    }
    
    init() {
        if (this.element && this.texts.length > 0) {
            this.element.innerHTML = '';
            this.startCycle();
        }
    }
    
    startCycle() {
        this.isTyping = true;
        this.typeText();
    }
    
    typeText() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.currentCharIndex < currentText.length && !this.isErasing) {
            this.element.innerHTML = currentText.substring(0, this.currentCharIndex + 1) + '<span class="typing-cursor">|</span>';
            this.currentCharIndex++;
            
            setTimeout(() => this.typeText(), this.options.typingSpeed);
        } else if (!this.isErasing) {
            // Texte terminé, attendre avant d'effacer
            setTimeout(() => {
                this.isErasing = true;
                this.eraseText();
            }, this.options.delayBetweenTexts);
        }
    }
    
    eraseText() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.currentCharIndex > 0) {
            this.element.innerHTML = currentText.substring(0, this.currentCharIndex - 1) + '<span class="typing-cursor">|</span>';
            this.currentCharIndex--;
            
            setTimeout(() => this.eraseText(), this.options.erasingSpeed);
        } else {
            // Texte effacé, passer au suivant
            this.isErasing = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            
            setTimeout(() => this.typeText(), this.options.delayBeforeRestart);
        }
    }
    
    updateTexts(newTexts) {
        this.texts = newTexts;
        if (this.texts.length > 0) {
            // Redémarrer avec les nouveaux textes
            this.currentTextIndex = 0;
            this.currentCharIndex = 0;
            this.isErasing = false;
            if (this.isTyping) {
                this.typeText();
            }
        }
    }
    
    pause() {
        this.isTyping = false;
    }
    
    resume() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.typeText();
        }
    }
    
    restart() {
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isErasing = false;
        this.element.innerHTML = '';
        this.startCycle();
    }
}

// Gestionnaire global pour l'animation de cycling du hero
class HeroCyclingManager {
    constructor() {
        this.typingCycler = null;
        this.isInitialized = false;
        this.init();
    }
    
    init() {
        // Attendre que i18n soit prêt
        if (typeof window.i18n !== 'undefined') {
            this.setupCycling();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.setupCycling(), 100);
            });
        }
        
        // Écouter les changements de langue
        document.addEventListener('languageChanged', (event) => {
            this.updateTextsForLanguage(event.detail.language);
        });
    }
    
    setupCycling() {
        const cyclingElement = document.querySelector('.hero-job-cycling');
        if (!cyclingElement) return;
        
        const currentLang = window.i18n ? window.i18n.getCurrentLanguage() : 'fr';
        const texts = this.getTextsForLanguage(currentLang);
        
        if (texts.length > 0) {
            this.typingCycler = new TypingCycler(cyclingElement, texts, {
                typingSpeed: 60,
                erasingSpeed: 40,
                delayBetweenTexts: 2500,
                delayBeforeRestart: 800
            });
            this.isInitialized = true;
        }
    }
    
    getTextsForLanguage(language) {
        if (typeof locales !== 'undefined' && locales[language] && locales[language].hero_job_cycling) {
            return locales[language].hero_job_cycling;
        }
        return [];
    }
    
    updateTextsForLanguage(language) {
        if (this.typingCycler && this.isInitialized) {
            const newTexts = this.getTextsForLanguage(language);
            if (newTexts.length > 0) {
                this.typingCycler.updateTexts(newTexts);
            }
        }
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    window.heroCycling = new HeroCyclingManager();
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TypingCycler, HeroCyclingManager };
}
