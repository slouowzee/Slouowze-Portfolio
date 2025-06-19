// Portfolio Slider Carbon - Design noir/blanc/doré avec fond carbon
class PortfolioSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 8;
        this.isTransitioning = false;
        
        this.slideData = [
            {
                type: 'hero',
                icon: 'fa-house',
                titleKey: 'nav_hero',
                content: this.createHeroSlide()
            },
            {
                type: 'about',
                icon: 'fa-user',
                titleKey: 'nav_about',
                content: this.createAboutSlide()
            },
            {
                type: 'stats',
                icon: 'fa-chart-bar',
                titleKey: 'nav_stats',
                content: this.createStatsSlide()
            },
            {
                type: 'technologies',
                icon: 'fa-code',
                titleKey: 'nav_techs',
                content: this.createTechSlide()
            },
            {
                type: 'services',
                icon: 'fa-briefcase',
                titleKey: 'nav_services',
                content: this.createServicesSlide()
            },
            {
                type: 'projects',
                icon: 'fa-folder-open',
                titleKey: 'nav_projects',
                content: this.createProjectsSlide()
            },
            {
                type: 'contact',
                icon: 'fa-envelope',
                titleKey: 'nav_contact',
                content: this.createContactSlide()
            },
            {
                type: 'aboutme',
                icon: 'fa-heart',
                titleKey: 'nav_aboutme',
                content: this.createAboutMeSlide()
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createSlider();
        this.createNavigation();
        this.attachHeroButtonEvents(); // Attacher les événements aux boutons CTA
        this.addEventListeners();
        this.initTheme();
        this.setupLanguageListener();
        this.setupTitleClickListener();
    }

    setupLanguageListener() {
        document.addEventListener('languageChanged', () => {
            // Recharger les traductions quand la langue change
            setTimeout(() => {
                if (window.i18n) {
                    window.i18n.reloadTranslations();
                }
            }, 100);
        });
    }

    setupTitleClickListener() {
        // Ajouter un gestionnaire d'événement pour le retour à l'accueil via le titre
        const portfolioTitle = document.getElementById('portfolioTitle');
        if (portfolioTitle) {
            portfolioTitle.addEventListener('click', () => {
                this.goToSlide(0);
            });
        }
    }
    
    createSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        
        this.slideData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `slide ${slide.type}`;
            slideElement.innerHTML = slide.content;
            sliderContainer.appendChild(slideElement);
        });
    }
    
    createNavigation() {
        const navigation = document.querySelector('.bottom-navigation');
        if (!navigation) return; // Sécurité si l'élément n'existe pas
        navigation.innerHTML = ''; // Vider la navigation existante avant de la recréer
        
        this.slideData.forEach((slide, index) => {
            const navIcon = document.createElement('button');
            navIcon.className = `nav-icon ${index === 0 ? 'active' : ''}`;
            navIcon.setAttribute('data-slide', index);
            navIcon.setAttribute('data-i18n-aria', slide.titleKey);
            navIcon.innerHTML = `<i class="fa-solid ${slide.icon}"></i>`;
            
            navIcon.addEventListener('click', () => this.goToSlide(index));
            navigation.appendChild(navIcon);
        });
    }
    
    showTitleAfterDelay() {
        // Cette fonction est conservée si vous souhaitez un délai spécifique pour le titre,
        // mais l'affichage est maintenant géré dans goToSlide pour plus de réactivité.
        const titleElement = document.getElementById('portfolioTitle');
        if (!titleElement) return;

        // Affiche le titre si on n'est pas sur la première slide
        if (this.currentSlide > 0) {
            titleElement.classList.add('show');
        } else {
            titleElement.classList.remove('show');
        }
    }
    
    createHeroSlide() {
        return `
            <div class="hero-content">
                <p class="hero-greeting" data-i18n="hero_greeting">Bonjour, je suis</p>
                <h1 class="hero-name" data-i18n="hero_name">Pilet Gaël,</h1>
                <p class="hero-job-cycling"></p>
                <p class="hero-quote" data-i18n="hero_quote">
                    "Pour moi, imaginer, concevoir, créer, à partir de zéro est l'une des choses les plus satisfaisantes dans le métier de développeur web."
                </p>
                <div class="hero-buttons">
                    <button class="hero-cta contact" style="height: 52px;">
                        <i class="fa-solid fa-rocket"></i>
                        <span data-i18n="nav_projects">Projets</span>
                    </button>
                    <button class="hero-cta navigate" style="height: 52px;">
                        <i class="fa-solid fa-envelope"></i>
                        <span data-i18n="nav_contact">Contact</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    createAboutSlide() {
        return `
            <div class="about-content">
                <div class="about-text">
                    <h2 data-i18n="about_title">Et si on parlais un peu de moi ?</h2>
                    <h3 data-i18n="about_text_heading">Mon parcours</h3>
                    <p data-i18n="about_p1">
                        Ay, salut, ça va ?<br>Nan en vrai, je peux pas t'entendre ^-^'...<br>Comme tu as pu le voir dans le titre de la page, je m'appelle Gaël, je suis développeur machin chose et bidule, je fais des trucs bien et d'autres trucs cool, et j'en suis fier, donc tant mieux ;)<br>Plus sérieusement, je suis étudiant en BTS SIO "Services Informatiques aux Organisations", où j'étudie le développement web, en parallèle de plein d'autres sujets : développement web statique et dynamique (surtout dynamique), développement d'applications avec la POO et Windows Forms, compréhension des données, et bien plus encore.
                    </p>
                    <p data-i18n="about_p2">
                        À part l'école, j'ai aussi un background en développement, pas forcément web, mais j'ai de l'expérience et une bonne logique, ce qui m'aide pas mal, à vrai dire.<br>J'ai fait du Python au lycée et en autodidacte pendant environ un an et demi, jusqu'à la POO et Tkinter… :smileypascontent:<br>J'ai aussi bien mangé du C, notamment lors d'une piscine à 42. Ça m'a aidé, tant pour l'apprentissage en autonomie que pour la sociabilisation et plein d'autres trucs.
                    </p>
                    <button id="load-more" data-i18n="about_more">$ cat more_details.txt <i class="fa-solid fa-terminal"></i></button>
                    <div id="more-info" style="display: none;">
                        <p data-i18n="about_p3">
                            Bien, maintenant vous savez qui je suis dans le monde du dev. Mais qui suis-je vraiment ? Bah… Batman ! Vous n'aviez pas remarqué ? Attends, je parle à qui, là ? Moi ou toi ? Bon, pas grave.<br>Bref, voici mon top 3 des meilleures choses dans ma vie :
                        </p>
                        <div class="about-interests">
                            <div class="interest-item">
                                <h4>1.</h4>
                                <p data-i18n="about_interest_1">Le chant. Eh ouais, je suis chanteur ! J'aimerais bien en faire mon métier, mais on verra plus tard. Ça fait maintenant 7 ans que je chante, et pas dans n'importe quel genre : le ✨Métal✨. Un vrai coup de cœur pour moi depuis longtemps, notamment avec Avatar (hein ? Non, pas le film ni le dessin animé, "Avatar", les vrais !). Je chante en français comme en anglais, j'en écoute tous les jours, je fais des covers, j'écris des textes, etc.</p>
                            </div>
                            <div class="interest-item">
                                <h4>2.</h4>
                                <p data-i18n="about_interest_2">Le sport. Ça ne se voit peut-être pas, mais j'aime bien au final. Ça m'aide à affiner mon corps pour atteindre celui que je veux, enfin bref…</p>
                            </div>
                            <div class="interest-item">
                                <h4>3.</h4>
                                <p data-i18n="about_interest_3">Les activités : les jeux vidéo, même si j'ai de moins en moins de temps… dure vie. Je joue aussi de la guitare, j'essaie de progresser. Je ne serai sûrement pas leader avec, mais j'aime bien avoir un petit niveau sympa. Et puis manger, comme tout le monde, je suppose (la cuisine rentre dedans aussi). Et plein d'autres trucs qui rendent la vie cool.</p>
                            </div>
                        </div>
                        <p data-i18n="about_p4">
                            Bon, je crois t'avoir assez retenu. Et puis si tu lis ça, c'est que tu voulais en savoir plus, vu que tu as cliqué sur le bouton rouge, il est bleu ? ah. Merci en tout cas d'avoir lu ! Je sais que ma biographie est meilleure qu'un bon thriller de Stephen King, mais pas besoin de me le rappeler hein.<br>Bise ❤️
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
    
    createTechSlide() {
        return `
            <div class="tech-content">
                <h2 data-i18n="tech_title">EH eh, regarde tout ça ! >-<</h2>
                <p data-i18n="tech_subtitle">Vous avez vu ? Je parle beaucoup de langages >_<'<br>Et en plus je suis polyvalant ^-^</p>
                <div class="tech-grid">
                    <div class="tech-category">
                        <h3 data-i18n="tech_frontend">Front-end</h3>
                        <div class="tech-icons">
                            <i class="fa-brands fa-html5 tech-icon html" title="HTML5"></i>
                            <i class="fa-brands fa-css3-alt tech-icon css" title="CSS3"></i>
                            <i class="fa-brands fa-js tech-icon js" title="JavaScript"></i>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3 data-i18n="tech_backend">Back-end</h3>
                        <div class="tech-icons">
                            <i class="fa-brands fa-php tech-icon php" title="PHP"></i>
                            <i class="fa-brands fa-python tech-icon python" title="Python"></i>
                            <span class="tech-icon" title="C">C</span>
                            <span class="tech-icon" title="C#">C#</span>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3 data-i18n="tech_cms">CMS, Frameworks & Bibliothèques</h3>
                        <div class="tech-icons">
                            <i class="fa-brands fa-wordpress tech-icon" title="WordPress"></i>
                            <i class="fa-brands fa-react tech-icon" title="React"></i>
                            <i class="fa-brands fa-bootstrap tech-icon" title="Bootstrap"></i>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3 data-i18n="tech_db">Base de données</h3>
                        <div class="tech-icons">
                            <i class="fa-solid fa-database tech-icon" title="SQL"></i>
                            <span class="tech-icon" title="MySQL">MySQL</span>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3 data-i18n="tech_tools">Outils de développement</h3>
                        <div class="tech-icons">
                            <i class="fa-brands fa-git-alt tech-icon" title="Git"></i>
                            <i class="fa-brands fa-github tech-icon" title="GitHub"></i>
                            <i class="fa-solid fa-terminal tech-icon" title="Terminal"></i>
                        </div>
                    </div>
                    <div class="tech-category">
                        <h3 data-i18n="tech_systems">Systèmes & Environnements</h3>
                        <div class="tech-icons">
                            <i class="fa-brands fa-linux tech-icon" title="Linux"></i>
                            <i class="fa-brands fa-windows tech-icon" title="Windows"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createProjectsSlide() {
        return `
            <div class="projects-content">
                <h2 data-i18n="projects_title">Faisons un petit tour dans ma galerie de projets !</h2>
                <div class="projects-grid">
                    <div class="project-card">
                        <div class="project-image">
                            <i class="fa-solid fa-earth-europe"></i>
                        </div>
                        <h3 data-i18n="project_1_title">Le Monde de Slou</h3>
                        <p data-i18n="project_1_text">
                            Le Monde de Slou est un petit site static que j'ai dû développer en projet professionnel à mon lycée pour le faire noté.
                        </p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML</span>
                            <span class="tech-tag">CSS</span>
                            <span class="tech-tag">JavaScript</span>
                        </div>
                        <a href="#" class="project-link" data-i18n="project_view">Voir le site</a>
                    </div>
                    <div class="project-card">
                        <div class="project-image">
                            <i class="fa-solid fa-user-tie"></i>
                        </div>
                        <h3 data-i18n="project_2_title">Portfolio</h3>
                        <p data-i18n="project_2_text">
                            Ça, bah c'est mon portfolio, vous êtes déjà dessus x). Si vous cliquez sur le bouton, vous ne serez pas du tout renvoyé sur une page troll.
                        </p>
                        <div class="project-tech">
                            <span class="tech-tag">HTML5</span>
                            <span class="tech-tag">CSS3</span>
                            <span class="tech-tag">JavaScript</span>
                            <span class="tech-tag">i18n</span>
                        </div>
                        <a href="#" class="project-link" data-i18n="project_view">Voir le site</a>
                    </div>
                    <div class="project-card">
                        <div class="project-image">
                            <i class="fa-solid fa-server"></i>
                        </div>
                        <h3 data-i18n="project_3_title">Serveur Nextcloud</h3>
                        <p data-i18n="project_3_text">
                            Déploiement et sécurisation d'un serveur Nextcloud local avec configuration SSL et gestion des utilisateurs. Projet d'infrastructure.
                        </p>
                        <div class="project-tech">
                            <span class="tech-tag">Linux</span>
                            <span class="tech-tag">Docker</span>
                            <span class="tech-tag">SSL</span>
                            <span class="tech-tag">Nextcloud</span>
                        </div>
                        <a href="#" class="project-link" data-i18n="project_view">Documentation</a>
                    </div>
                    <div class="project-card">
                        <div class="project-image">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                        <h3 data-i18n="project_more_title">"There is more to come... Encore..."</h3>
                        <p data-i18n="project_more_text">
                            Comme pour les services, je suis en train de travailler sur de nouveaux projets, mais je ne peux pas tout faire en même temps. Si vous avez des idées, n'hésitez pas à me contacter !
                        </p>
                        <div class="project-tech">
                            <span class="tech-tag">En cours</span>
                            <span class="tech-tag">Bientôt</span>
                        </div>
                        <a href="#" class="project-link" data-i18n="nav_contact">Contact</a>
                    </div>
                </div>
            </div>
        `;
    }
    
    createContactSlide() {
        return `
            <div class="contact-content">
                <h2 data-i18n="contact_title">Une envie de papotter ?</h2>
                <p class="contact-text" data-i18n="contact_text">
                    Envie de me contacter pour parler de votre projet, de vos idées, ou juste pour discuter ?<br>N'hésitez pas à m'envoyer un mail, je vous répondrai dès que possible ! :D<br>Mais vous pouvez tout de même communiquer avec moi via mes réseaux sociaux ;) !
                </p>
                <form class="contact-form" id="contact-form">
                    <div class="form-group">
                        <label for="lastname" data-i18n="contact_lastname">Nom:</label>
                        <input type="text" id="lastname" name="lastname" required>
                    </div>
                    <div class="form-group">
                        <label for="firstname" data-i18n="contact_firstname">Prénom:</label>
                        <input type="text" id="firstname" name="firstname" required>
                    </div>
                    <div class="form-group">
                        <label for="email" data-i18n="contact_email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="subject" data-i18n="contact_subject">Objet:</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>
                    <div class="form-group">
                        <label for="message" data-i18n="contact_message">Message:</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">
                        <i class="fa-solid fa-paper-plane"></i>
                        <span data-i18n="contact_submit">Envoyer</span>
                    </button>
                </form>
            </div>
        `;
    }
    
    createIndicators() {
        const indicatorsContainer = document.querySelector('.slide-indicators');
        
        for (let i = 0; i < this.totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    addEventListeners() {
        // Navigation avec la molette et trackpad
        document.addEventListener('wheel', (e) => {
            if (this.isTransitioning) return;
            
            // Détecter le scroll horizontal (trackpad)
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                if (e.deltaX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            } 
            // Shift + molette verticale = navigation horizontale
            else if (e.shiftKey && Math.abs(e.deltaY) > 0) {
                e.preventDefault();
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            } 
            else {
                // Scroll vertical classique
                if (e.deltaY > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        }, { passive: false });
        
        // Navigation avec les flèches du clavier
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
        
        // Navigation tactile (swipe horizontal)
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            if (this.isTransitioning) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaX = touchStartX - touchEndX;
            const deltaY = touchStartY - touchEndY;
            
            // Priorité au swipe horizontal
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX > 50) {
                    this.nextSlide();
                } else if (deltaX < -50) {
                    this.prevSlide();
                }
            } else {
                // Fallback swipe vertical
                if (deltaY > 50) {
                    this.nextSlide();
                } else if (deltaY < -50) {
                    this.prevSlide();
                }
            }
        }, { passive: true });
        
        // Gestionnaire pour le formulaire de contact
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'contact-form') {
                e.preventDefault();
                this.handleContactForm(e.target);
            }
        });
        
        // Gestionnaire pour le changement de thème
        const themeSwitcher = document.querySelector('.theme-switcher');
        if (themeSwitcher) {
            themeSwitcher.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Gestionnaire pour le changement de langue
        const languageSwitcher = document.querySelector('.language-switcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides || slideIndex === this.currentSlide) {
            return;
        }
        
        this.isTransitioning = true;
        this.currentSlide = slideIndex;
        
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.style.transform = `translateX(-${slideIndex * 100}vw)`;
        
        // Mettre à jour la navigation avec icônes
        document.querySelectorAll('.nav-icon').forEach((icon, index) => {
            icon.classList.toggle('active', index === slideIndex);
        });
        
        // Afficher le titre après la première slide
        const titleElement = document.getElementById('portfolioTitle');
        if (slideIndex > 0 && !titleElement.classList.contains('show')) {
            titleElement.classList.add('show');
        } else if (slideIndex === 0) {
            titleElement.classList.remove('show');
        }
        
        // Réactiver la navigation après la transition
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    startTypingAnimation() {
        const titles = ['Créateur', 'Développeur', 'Étudiant', 'Passionné'];
        let currentTitle = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        const typingElement = document.getElementById('typing-text');
        
        const typeAnimation = () => {
            const currentText = titles[currentTitle];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typingElement.textContent = currentText.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentChar === currentText.length) {
                typeSpeed = 2000; // Pause à la fin
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentTitle = (currentTitle + 1) % titles.length;
                typeSpeed = 500; // Pause avant le prochain mot
            }
            
            setTimeout(typeAnimation, typeSpeed);
        };
        
        typeAnimation();
    }
    
    handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulation d'envoi (remplacez par votre logique d'envoi réelle)
        console.log('Formulaire soumis:', data);
        
        // Afficher un message de confirmation
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        const successMessage = window.i18n ? window.i18n.translate('contact_success') : 'Message envoyé !';
        submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> ${successMessage}`;
        submitBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            form.reset();
        }, 3000);
    }
    
    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeSwitcherIcon(newTheme);
    }

    updateThemeSwitcherIcon(theme) {
        const themeIcon = document.querySelector('.theme-switcher i');
        if (!themeIcon) return;
        const currentTheme = theme || localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (currentTheme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        // S'assurer que le body a l'attribut data-theme initial
        if (!document.body.hasAttribute('data-theme')) {
            document.body.setAttribute('data-theme', currentTheme);
        }
    }

    currentLanguage = 'fr'; // Langue par défaut

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';
        this.applyLocales();
        const langButton = document.querySelector('.language-switcher span');
        if (langButton) {
            langButton.textContent = this.currentLanguage.toUpperCase();
        }
    }

    applyLocales() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            // Simple exemple, vous devrez adapter cela à la structure de votre objet locales
            // et à la manière dont vous voulez récupérer les traductions.
            // Ici, on suppose que locales[this.currentLanguage][key] existe.
            if (locales[this.currentLanguage] && locales[this.currentLanguage][key]) {
                el.innerHTML = locales[this.currentLanguage][key]; 
            }
        });
        // Mettre à jour le titre de la page
        if (locales[this.currentLanguage] && locales[this.currentLanguage].page_title) {
            document.title = locales[this.currentLanguage].page_title;
        }
        // Mettre à jour les data-title des icônes de navigation
        this.slideData.forEach((slide, index) => {
            const navIcon = document.querySelector(`.nav-icon[data-slide='${index}']`);
            if (navIcon && locales[this.currentLanguage] && locales[this.currentLanguage][`nav_title_${slide.type}`]) {
                navIcon.setAttribute('data-title', locales[this.currentLanguage][`nav_title_${slide.type}`]);
            }
        });

    }
    // --- FIN DES AJOUTS ---

    attachHeroButtonEvents() {
        // Attacher les événements aux boutons CTA du hero (comme pour la navbar)
        const contactButton = document.querySelector('.hero-cta.contact');
        const navigateButton = document.querySelector('.hero-cta.navigate');
        
        if (contactButton) {
            contactButton.addEventListener('click', () => this.goToSlide(5)); // Projets (index 5)
        }
        
        if (navigateButton) {
            navigateButton.addEventListener('click', () => this.goToSlide(6)); // Contact (index 6)
        }
    }

    createStatsSlide() {
        return `
            <div class="stats-content">
                <h2 data-i18n="about_stats_heading">En quelques chiffres</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">7+</span>
                        <span class="stat-label" data-i18n="stat_languages">Langages de programmation</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">2+</span>
                        <span class="stat-label" data-i18n="stat_education">SIO en cours</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">7</span>
                        <span class="stat-label" data-i18n="stat_singing">Années de chant</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">4+</span>
                        <span class="stat-label" data-i18n="stat_experience">Ans d'expérience</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">10+</span>
                        <span class="stat-label" data-i18n="stat_projects">Projets réalisés</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">∞</span>
                        <span class="stat-label" data-i18n="stat_coffee">Tasses de café</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    createServicesSlide() {
        return `
            <div class="services-content">
                <h2 data-i18n="services_title">Je peux quand même te proposer quelques choses. :></h2>
                <div class="services-grid">
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fa-solid fa-globe"></i>
                        </div>
                        <h3 data-i18n="service_1_title">Site web static, sécurisé, responsive et agréable.</h3>
                        <p data-i18n="service_1_text">
                            Afin de satisfaire ton envie d'exposer ce qui te passionne, je peux te proposer un site web entièrement fonctionnel, optimisé et bien référencé pour le SEO, pour que tu puisse toucher le plus grand nombre de personnes. ;)
                        </p>
                        <div class="service-features">
                            <span class="feature-tag">Responsive</span>
                            <span class="feature-tag">SEO Optimisé</span>
                            <span class="feature-tag">Sécurisé</span>
                        </div>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fa-solid fa-rocket"></i>
                        </div>
                        <h3 data-i18n="service_2_title">"There is more to come..."</h3>
                        <p data-i18n="service_2_text">
                            Ça, c'est ce que je dirais si j'étais Anglais. J'étudie toujours, donc mes services sont limités. Cependant, si vous avez des requêtes spéciales, je serai heureux d'en apprendre d'avantage ! Il faudra juste scroller un peu et m'envoyer un mail :)
                        </p>
                        <div class="service-features">
                            <span class="feature-tag">En développement</span>
                            <span class="feature-tag">Sur mesure</span>
                            <span class="feature-tag">Apprentissage</span>
                        </div>
                    </div>
                    <div class="service-card">
                        <div class="service-icon">
                            <i class="fa-solid fa-code"></i>
                        </div>
                        <h3 data-i18n="service_3_title">Développement web dynamique</h3>
                        <p data-i18n="service_3_text">
                            Applications web interactives avec bases de données, authentification utilisateur, et fonctionnalités avancées. Parfait pour les projets qui nécessitent une interaction utilisateur poussée.
                        </p>
                        <div class="service-features">
                            <span class="feature-tag">Base de données</span>
                            <span class="feature-tag">Interactif</span>
                            <span class="feature-tag">Authentification</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createAboutMeSlide() {
        return `
            <div class="aboutme-content">
                <div class="goodbye-section">
                    <h2 data-i18n="footer_goodbye">On se sépare déjà ;-;</h2>
                    <p data-i18n="footer_goodbye_text">
                        À notre grand regret, tu es déjà arrivé en bas de la page, juste en dessous t'a le footer, et y'a pleins d'infos intéréssante dessus, mais si tu lis ça c'est que tu veux me quitter ou bien que tu veux faire le tour de la page. Mais n'empâche, je te remercie du temps que tu m'a accordé aujourd'hui, je t'en suis reconnaissant ! J'espère te revoir bientôt ^-^
                    </p>
                </div>
                
                <div class="aboutme-grid">
                    <div class="aboutme-card social-section">
                        <h3 data-i18n="social_links_title">Retrouvez-moi sur</h3>
                        <div class="social-grid">
                            <a href="#" class="social-link discord">
                                <i class="fa-brands fa-discord"></i>
                                <span>Discord</span>
                            </a>
                            <a href="#" class="social-link github">
                                <i class="fa-brands fa-github"></i>
                                <span>GitHub</span>
                            </a>
                            <a href="#" class="social-link instagram">
                                <i class="fa-brands fa-instagram"></i>
                                <span>Instagram</span>
                            </a>
                            <a href="#" class="social-link twitter">
                                <i class="fa-brands fa-x-twitter"></i>
                                <span>Twitter</span>
                            </a>
                        </div>
                    </div>
                    
                    <div class="aboutme-card support-section">
                        <h3 data-i18n="footer_support_heading">Me soutenir</h3>
                        <div class="support-links">
                            <a href="#" data-i18n="footer_support_paypal">PayPal</a>
                            <a href="#" data-i18n="footer_support_kofi">Ko-fi</a>
                        </div>
                    </div>
                    
                    <div class="aboutme-card copyright-section">
                        <p data-i18n="footer_designed">Conçu avec <i class="fa-solid fa-heart footer__heart" aria-hidden="true"></i> par moi-même ">-<"</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialiser le slider quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioSlider = new PortfolioSlider();
});
