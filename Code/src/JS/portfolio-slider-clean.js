// Portfolio Slider Carbon - Design noir/blanc/doré avec fond carbon
class PortfolioSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 5;
        this.isTransitioning = false;
        
        this.slideData = [
            {
                type: 'hero',
                icon: 'fa-house',
                title: 'Accueil',
                content: this.createHeroSlide()
            },
            {
                type: 'about',
                icon: 'fa-user',
                title: 'À propos',
                content: this.createAboutSlide()
            },
            {
                type: 'technologies',
                icon: 'fa-code',
                title: 'Technologies',
                content: this.createTechSlide()
            },
            {
                type: 'projects',
                icon: 'fa-folder-open',
                title: 'Projets',
                content: this.createProjectsSlide()
            },
            {
                type: 'contact',
                icon: 'fa-envelope',
                title: 'Contact',
                content: this.createContactSlide()
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createSlider();
        this.createNavigation();
        this.addEventListeners();
        this.initTheme();
    }
    
    createSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        if (!sliderContainer) return;
        
        this.slideData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `slide ${slide.type}`;
            slideElement.innerHTML = slide.content;
            sliderContainer.appendChild(slideElement);
        });
    }
    
    createNavigation() {
        const navigation = document.querySelector('.bottom-navigation');
        if (!navigation) return;
        
        this.slideData.forEach((slide, index) => {
            const navIcon = document.createElement('button');
            navIcon.className = `nav-icon ${index === 0 ? 'active' : ''}`;
            navIcon.setAttribute('data-slide', index);
            navIcon.setAttribute('data-title', slide.title);
            navIcon.innerHTML = `<i class="fa-solid ${slide.icon}"></i>`;
            
            navIcon.addEventListener('click', () => this.goToSlide(index));
            navigation.appendChild(navIcon);
        });
    }
    
    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides || slideIndex === this.currentSlide || this.isTransitioning) {
            return;
        }
        
        this.isTransitioning = true;
        this.currentSlide = slideIndex;
        
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;
        
        // Mettre à jour la navigation
        document.querySelectorAll('.nav-icon').forEach((icon, index) => {
            icon.classList.toggle('active', index === slideIndex);
        });
        
        // Gérer l'affichage du titre
        const titleElement = document.getElementById('portfolioTitle');
        if (titleElement) {
            if (slideIndex > 0) {
                titleElement.classList.add('show');
            } else {
                titleElement.classList.remove('show');
            }
        }
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }
    
    nextSlide() {
        this.goToSlide((this.currentSlide + 1) % this.totalSlides);
    }
    
    prevSlide() {
        this.goToSlide(this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1);
    }
    
    addEventListeners() {
        // Navigation molette
        document.addEventListener('wheel', (e) => {
            if (this.isTransitioning) return;
            
            if (e.deltaY > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        });
        
        // Navigation clavier
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    this.prevSlide();
                    break;
            }
        });
        
        // Gestion du thème
        const themeSwitcher = document.querySelector('.theme-switcher');
        if (themeSwitcher) {
            themeSwitcher.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Gestion de la langue
        const languageSwitcher = document.querySelector('.language-switcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }
    
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }
    
    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }
    
    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-switcher i');
        if (!themeIcon) return;
        
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }
    
    toggleLanguage() {
        const langSpan = document.querySelector('.language-switcher span');
        if (!langSpan) return;
        
        const currentLang = langSpan.textContent;
        const newLang = currentLang === 'FR' ? 'EN' : 'FR';
        langSpan.textContent = newLang;
    }
    
    createHeroSlide() {
        return `
            <div class="hero-content">
                <h1>Gaël Pilet</h1>
                <p class="hero-subtitle">Développeur Front-End & Créateur Digital</p>
                <p class="hero-quote">
                    "Transformer des idées en expériences numériques exceptionnelles"
                </p>
                <button class="hero-cta" onclick="portfolioSlider.goToSlide(1)">
                    Découvrir mon univers
                </button>
            </div>
        `;
    }
    
    createAboutSlide() {
        return `
            <div class="about-content">
                <div class="about-text">
                    <h2>À propos de moi</h2>
                    <p>
                        Salut ! Je m'appelle Gaël, je suis développeur passionné et étudiant en BTS SIO 
                        "Services Informatiques aux Organisations". J'étudie le développement web, 
                        la POO, et bien d'autres sujets fascinants du monde informatique.
                    </p>
                    <p>
                        J'ai déjà réalisé un serveur Nextcloud local sécurisé, plusieurs sites web, 
                        travaillé avec de nombreux langages et frameworks. J'aime particulièrement 
                        créer des expériences utilisateur innovantes et responsives.
                    </p>
                    <p>
                        En dehors du développement, je suis passionné de chant (métal 🤘), 
                        de sport et de nouvelles technologies. J'aime apprendre constamment 
                        et relever de nouveaux défis !
                    </p>
                </div>
                <div class="stats-container">
                    <h3>En quelques chiffres</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-value">7+</span>
                            <span class="stat-label">Langages</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">4+</span>
                            <span class="stat-label">Années d'expérience</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">10+</span>
                            <span class="stat-label">Projets réalisés</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">∞</span>
                            <span class="stat-label">Cafés bus</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createTechSlide() {
        return `
            <div class="tech-content">
                <h2>Technologies & Compétences</h2>
                <div class="tech-grid">
                    <div class="tech-category">
                        <h3>Front-end</h3>
                        <div class="tech-icons">
                            <i class="fa-brands fa-html5 tech-icon" title="HTML5"></i>
                            <i class="fa-brands fa-css3-alt tech-icon" title="CSS3"></i>
                            <i class="fa-brands fa-js tech-icon" title="JavaScript"></i>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3>Back-end</h3>
                        <div class="tech-icons">
                            <i class="fa-brands fa-php tech-icon" title="PHP"></i>
                            <i class="fa-brands fa-python tech-icon" title="Python"></i>
                            <span class="tech-icon" title="C">C</span>
                            <span class="tech-icon" title="C#">C#</span>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3>Outils & Environnements</h3>
                        <div class="tech-icons">
                            <i class="fa-brands fa-git-alt tech-icon" title="Git"></i>
                            <i class="fa-brands fa-github tech-icon" title="GitHub"></i>
                            <i class="fa-solid fa-terminal tech-icon" title="Terminal"></i>
                            <i class="fa-brands fa-linux tech-icon" title="Linux"></i>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3>Bases de données</h3>
                        <div class="tech-icons">
                            <i class="fa-solid fa-database tech-icon" title="SQL"></i>
                            <span class="tech-icon" title="MySQL">MySQL</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createProjectsSlide() {
        return `
            <div class="projects-content">
                <h2>Mes Projets</h2>
                <div class="projects-grid">
                    <div class="project-card">
                        <h3>Le Monde de Slou</h3>
                        <p>
                            Site web statique développé dans le cadre d'un projet scolaire. 
                            Interface moderne et responsive avec animations CSS.
                        </p>
                        <a href="#" class="project-link">Voir le projet</a>
                    </div>
                    <div class="project-card">
                        <h3>Portfolio Interactif</h3>
                        <p>
                            Ce portfolio que vous consultez actuellement ! Développé avec 
                            HTML5, CSS3 et JavaScript vanilla pour une performance optimale.
                        </p>
                        <a href="#" class="project-link">Code source</a>
                    </div>
                    <div class="project-card">
                        <h3>Serveur Nextcloud</h3>
                        <p>
                            Déploiement et sécurisation d'un serveur Nextcloud local avec 
                            configuration SSL et gestion des utilisateurs.
                        </p>
                        <a href="#" class="project-link">Documentation</a>
                    </div>
                </div>
            </div>
        `;
    }
    
    createContactSlide() {
        return `
            <div class="contact-content">
                <h2>Contactez-moi</h2>
                <p class="contact-text">
                    Envie de discuter d'un projet ? D'une collaboration ? Ou simplement de prendre un café ☕ ?<br>
                    N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais !
                </p>
                <form class="contact-form" id="contact-form">
                    <div class="form-group">
                        <label for="name">Nom complet</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="subject">Sujet</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">
                        <i class="fa-solid fa-paper-plane"></i>
                        Envoyer le message
                    </button>
                </form>
            </div>
        `;
    }
}

// Initialiser le slider quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioSlider = new PortfolioSlider();
});
