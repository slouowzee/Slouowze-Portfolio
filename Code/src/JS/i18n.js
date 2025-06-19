// Gestionnaire de traduction et de changement de langue
class I18nManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'fr';
        this.translationElements = new Map();
        this.init();
    }

    init() {
        this.setupLanguageSwitcher();
        this.loadTranslations();
        this.updateLanguageButton();
    }

    getStoredLanguage() {
        return localStorage.getItem('portfolio-language');
    }

    setStoredLanguage(lang) {
        localStorage.setItem('portfolio-language', lang);
    }

    setupLanguageSwitcher() {
        const languageButton = document.querySelector('.language-switcher');
        if (languageButton) {
            languageButton.addEventListener('click', () => {
                this.switchLanguage();
            });
        }
    }

    switchLanguage() {
        const newLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';
        this.setLanguage(newLanguage);
    }

    setLanguage(lang) {
        if (lang !== this.currentLanguage && locales[lang]) {
            this.currentLanguage = lang;
            this.setStoredLanguage(lang);
            this.loadTranslations();
            this.updateLanguageButton();
            this.updateMetadata();
            
            // Notifier les autres composants du changement de langue
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang }
            }));
        }
    }

    loadTranslations() {
        const translations = locales[this.currentLanguage];
        if (!translations) return;

        // Traduire tous les éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                element.innerHTML = translations[key];
            }
        });

        // Traduire les attributs aria-label
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            if (translations[key]) {
                element.setAttribute('aria-label', translations[key]);
            }
        });

        // Traduire les placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[key]) {
                element.setAttribute('placeholder', translations[key]);
            }
        });
    }

    updateLanguageButton() {
        const languageButton = document.querySelector('.language-switcher span');
        if (languageButton) {
            const translations = locales[this.currentLanguage];
            languageButton.textContent = translations.language_switcher_text || (this.currentLanguage === 'fr' ? 'FR' : 'EN');
        }
    }

    updateMetadata() {
        const translations = locales[this.currentLanguage];
        if (!translations) return;

        // Mettre à jour le titre de la page
        if (translations.page_title) {
            document.title = translations.page_title;
        }

        // Mettre à jour les meta descriptions
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && translations.page_description) {
            metaDescription.setAttribute('content', translations.page_description);
        }

        // Mettre à jour les Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && translations.og_title) {
            ogTitle.setAttribute('content', translations.og_title);
        }

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription && translations.og_description) {
            ogDescription.setAttribute('content', translations.og_description);
        }

        const ogLocale = document.querySelector('meta[property="og:locale"]');
        if (ogLocale && translations.og_locale) {
            ogLocale.setAttribute('content', translations.og_locale);
        }

        // Mettre à jour les Twitter Cards
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle && translations.twitter_title) {
            twitterTitle.setAttribute('content', translations.twitter_title);
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription && translations.twitter_description) {
            twitterDescription.setAttribute('content', translations.twitter_description);
        }

        // Mettre à jour l'attribut lang du document
        document.documentElement.lang = this.currentLanguage;
    }

    // Méthode pour obtenir une traduction spécifique
    translate(key) {
        const translations = locales[this.currentLanguage];
        return translations && translations[key] ? translations[key] : key;
    }

    // Méthode pour obtenir la langue actuelle
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Méthode pour forcer le rechargement des traductions
    reloadTranslations() {
        this.loadTranslations();
    }
}

// Initialisation automatique quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18nManager();
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}
