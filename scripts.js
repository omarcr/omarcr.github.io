// scripts.js

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initHamburgerMenu();
    initContactForm();
    initLanguageSwitcher();
    initSmoothScrolling();
});

/**
 * Initializes the scroll progress indicator.
 */
function initScrollProgress() {
    const progressBar = document.getElementById('progress-bar');

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
}

/**
 * Initializes the hamburger menu toggle functionality.
 */
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');

        // Update ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', isOpen);
        mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Close mobile menu when a navigation link is clicked
    mobileMenu.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
            }
        });
    });
}

/**
 * Initializes the contact form submission handling.
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact__form');
    const successMessage = document.querySelector('.success-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageTextarea = contactForm.querySelector('textarea');

        if (emailInput.checkValidity() && messageTextarea.checkValidity()) {
            // Simulate form submission (e.g., AJAX request)
            // Here, we'll just display the success message
            successMessage.style.display = 'block';
            contactForm.reset();

            // Optionally hide the message after a few seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            // Highlight invalid fields
            emailInput.reportValidity();
            messageTextarea.reportValidity();
        }
    });
}

/**
 * Initializes the language switching functionality.
 */
function initLanguageSwitcher() {
    const languageSwitcher = document.querySelector('.language-switcher');
    const langButtons = languageSwitcher.querySelectorAll('button');
    let currentLang = 'en';

    const translations = {
        "nav_about": {
            "en": "About",
            "es": "Acerca de"
        },
        "nav_solutions": {
            "en": "Solutions",
            "es": "Soluciones"
        },
        "nav_approach": {
            "en": "Approach",
            "es": "Enfoque"
        },
        "nav_technology": {
            "en": "Technology",
            "es": "Tecnología"
        },
        "nav_team": {
            "en": "Team",
            "es": "Equipo"
        },
        "nav_contact": {
            "en": "Contact",
            "es": "Contacto"
        },
        "hero_title": {
            "en": "Balancing health and equity for the Hispanic community in the United States, one equation at a time.",
            "es": "Equilibrando salud y equidad para la comunidad hispana en Estados Unidos, una ecuación a la vez."
        },
        "hero_subtitle": {
            "en": "Empowering the Hispanic/Latino community with culturally tailored, transparent AI healthcare solutions for a healthier future.",
            "es": "Empoderando a la comunidad hispana/latina con soluciones de salud basadas en IA culturalmente adaptadas y transparentes para un futuro más saludable."
        },
        "hero_cta_explore": {
            "en": "Explore Our Solutions",
            "es": "Explora Nuestras Soluciones"
        },
        "hero_cta_start": {
            "en": "Start Your Health Journey",
            "es": "Comienza Tu Viaje de Salud"
        },
        "about_title": {
            "en": "About Us",
            "es": "Sobre Nosotros"
        },
        "about_p1": {
            "en": "At Equ Healthcare, we specialize in developing interpretable AI solutions that are transparent and culturally tailored for the Hispanic/Latino community. Our focus on balance, precision, and equity ensures that our technology not only advances healthcare outcomes but also fosters trust and engagement.",
            "es": "En Equ Healthcare, nos especializamos en desarrollar soluciones de IA interpretables que son transparentes y culturalmente adaptadas para la comunidad hispana/latina. Nuestro enfoque en el equilibrio, la precisión y la equidad garantiza que nuestra tecnología no solo mejore los resultados de salud, sino que también fomente la confianza y el compromiso."
        },
        "about_p2": {
            "en": "Founded as a spin-out from research at MIT and Harvard Medical School, Equ Healthcare is built upon a strong foundation of scientific innovation. Supported by the National Science Foundation, we leverage cutting-edge technology to bridge gaps in healthcare disparities.",
            "es": "Fundada como una derivación de investigaciones en MIT y Harvard Medical School, Equ Healthcare se basa en una sólida fundación de innovación científica. Con el apoyo de la National Science Foundation, aprovechamos la tecnología de vanguardia para cerrar brechas en las disparidades de atención médica."
        },
        "pillars_title": {
            "en": "Our Pillars",
            "es": "Nuestros Pilares"
        },
        "pillar1_title": {
            "en": "Equilibrium | Equilibrio",
            "es": "Equilibrio | Equilibrium"
        },
        "pillar1_text": {
            "en": "Our AI platform harmonizes metabolic, nutritional, and mental health by leveraging real-time data and adaptive algorithms. This ensures personalized, actionable insights that empower individuals to achieve and maintain optimal health.",
            "es": "Nuestra plataforma de IA armoniza la salud metabólica, nutricional y mental aprovechando datos en tiempo real y algoritmos adaptativos. Esto garantiza conocimientos personalizados y accionables que empoderan a las personas para lograr y mantener una salud óptima."
        },
        "pillar2_title": {
            "en": "Equation | Ecuación",
            "es": "Ecuación | Equation"
        },
        "pillar2_text": {
            "en": "We utilize advanced neurosymbolic AI, integrating neural networks for pattern recognition with symbolic reasoning for decision-making. This unique approach delivers precise, evidence-based interventions while maintaining full transparency.",
            "es": "Utilizamos IA neurosimbólica avanzada, integrando redes neuronales para el reconocimiento de patrones con razonamiento simbólico para la toma de decisiones. Este enfoque único ofrece intervenciones precisas basadas en evidencia, manteniendo una total transparencia."
        },
        "pillar3_title": {
            "en": "Equity | Equidad",
            "es": "Equidad | Equity"
        },
        "pillar3_text": {
            "en": "Our dedication to healthcare equity means delivering culturally tailored, accessible, and interpretable care. We enable underserved Hispanic/Latino communities to confidently engage with personalized health plans.",
            "es": "Nuestra dedicación a la equidad en la atención médica significa brindar atención culturalmente adaptada, accesible e interpretable. Permitimos que las comunidades hispanas/latinas desatendidas se involucren de manera segura con planes de salud personalizados."
        },
        "pillar4_title": {
            "en": "Equality | Igualdad",
            "es": "Igualdad | Equality"
        },
        "pillar4_text": {
            "en": "By employing white-box AI models, we ensure fairness and transparency in healthcare delivery. Our technology supports equitable treatment and outcomes for all individuals, regardless of socioeconomic background.",
            "es": "Empleando modelos de IA de caja blanca, garantizamos equidad y transparencia en la prestación de atención médica. Nuestra tecnología respalda un tratamiento y resultados equitativos para todos, independientemente del origen socioeconómico."
        },
        "mission_title": {
            "en": "Our Mission",
            "es": "Nuestra Misión"
        },
        "mission_text": {
            "en": "At Equ Healthcare, we are dedicated to revolutionizing precision healthcare for the Hispanic/Latino community through scientifically validated, culturally responsive, and transparent AI solutions.",
            "es": "En Equ Healthcare, estamos dedicados a revolucionar la atención médica de precisión para la comunidad hispana/latina a través de soluciones de IA científicamente validadas, culturalmente receptivas y transparentes."
        },
        "solutions_title": {
            "en": "Our Solutions",
            "es": "Nuestras Soluciones"
        },
        "product1_status": {
            "en": "In Development",
            "es": "En Desarrollo"
        },
        "product1_title": {
            "en": "Equ-1 Amigo",
            "es": "Equ-1 Amigo"
        },
        "product1_desc": {
            "en": "AI-Powered Diet and Physical Activity Coach for the Hispanic Community.",
            "es": "Entrenador de Dieta y Actividad Física impulsado por IA para la Comunidad Hispana."
        },
        "product1_feature1": {
            "en": "Personalized diet recommendations based on cultural preferences.",
            "es": "Recomendaciones de dieta personalizadas según preferencias culturales."
        },
        "product1_feature2": {
            "en": "Activity tracking and goal setting.",
            "es": "Seguimiento de actividad y establecimiento de metas."
        },
        "product1_feature3": {
            "en": "Interactive daily tips and motivational messages.",
            "es": "Consejos diarios interactivos y mensajes motivacionales."
        },
        "product1_feature4": {
            "en": "Progress tracking with rewards and achievements.",
            "es": "Seguimiento del progreso con recompensas y logros."
        },
        "product1_progress": {
            "en": "Prototype Testing Phase (70%)",
            "es": "Fase de Pruebas del Prototipo (70%)"
        },
        "product1_cta": {
            "en": "Join Waitlist",
            "es": "Únete a la Lista de Espera"
        },
        "product2_status": {
            "en": "In Development",
            "es": "En Desarrollo"
        },
        "product2_title": {
            "en": "Equ-2 Amiga",
            "es": "Equ-2 Amiga"
        },
        "product2_desc": {
            "en": "AI Assistant for Healthcare Providers in Complex Clinical Analysis.",
            "es": "Asistente de IA para Proveedores de Atención Médica en Análisis Clínicos Complejos."
        },
        "product2_feature1": {
            "en": "Evidence-based treatment recommendations.",
            "es": "Recomendaciones de tratamiento basadas en evidencia."
        },
        "product2_feature2": {
            "en": "Clear, interpretable insights to enhance decision-making.",
            "es": "Información clara e interpretable para mejorar la toma de decisiones."
        },
        "product2_feature3": {
            "en": "Seamless integration with existing healthcare systems.",
            "es": "Integración sin problemas con los sistemas de atención médica existentes."
        },
        "product2_feature4": {
            "en": "Support for improved patient outcomes.",
            "es": "Soporte para mejorar los resultados de los pacientes."
        },
        "product2_progress": {
            "en": "Development Phase (50%)",
            "es": "Fase de Desarrollo (50%)"
        },
        "product2_cta": {
            "en": "Sign Up for Updates",
            "es": "Regístrate para Actualizaciones"
        },
        "product3_status": {
            "en": "In Development",
            "es": "En Desarrollo"
        },
        "product3_title": {
            "en": "Equ-3 Abu",
            "es": "Equ-3 Abu"
        },
        "product3_desc": {
            "en": "Connects individuals with the right therapist to meet their unique needs, ensuring culturally sensitive mental health support.",
            "es": "Conecta a las personas con el terapeuta adecuado para satisfacer sus necesidades únicas, asegurando un apoyo de salud mental culturalmente sensible."
        },
        "product3_feature1": {
            "en": "Personalized matching based on individual preferences.",
            "es": "Emparejamiento personalizado basado en preferencias individuales."
        },
        "product3_feature2": {
            "en": "Network of culturally competent therapists.",
            "es": "Red de terapeutas culturalmente competentes."
        },
        "product3_feature3": {
            "en": "Confidential and user-friendly platform.",
            "es": "Plataforma confidencial y fácil de usar."
        },
        "product3_feature4": {
            "en": "Support in both English and Spanish.",
            "es": "Soporte tanto en inglés como en español."
        },
        "product3_progress": {
            "en": "Research Phase (30%)",
            "es": "Fase de Investigación (30%)"
        },
        "product3_cta": {
            "en": "Learn More",
            "es": "Aprende Más"
        },
        "approach_title": {
            "en": "Our Approach",
            "es": "Nuestro Enfoque"
        },
        "approach1_title": {
            "en": "Modularity",
            "es": "Modularidad"
        },
        "approach1_text": {
            "en": "Our solutions operate as distinct components, transforming complex healthcare processes into manageable, focused units.",
            "es": "Nuestras soluciones operan como componentes distintos, transformando procesos complejos de atención médica en unidades manejables y enfocadas."
        },
        "approach2_title": {
            "en": "Abstraction",
            "es": "Abstracción"
        },
        "approach2_text": {
            "en": "By abstracting key healthcare operations, we streamline personalized care with AI-driven modules addressing specific needs.",
            "es": "Al abstraer operaciones clave de atención médica, optimizamos el cuidado personalizado con módulos impulsados por IA que abordan necesidades específicas."
        },
        "approach3_title": {
            "en": "Scalability",
            "es": "Escalabilidad"
        },
        "approach3_text": {
            "en": "Our adaptable system scales with evolving healthcare demands, incorporating advanced AI functionalities to serve broader populations.",
            "es": "Nuestro sistema adaptable se escala con las demandas de atención médica en evolución, incorporando funcionalidades avanzadas de IA para servir a poblaciones más amplias."
        },
        "approach4_title": {
            "en": "Interoperability",
            "es": "Interoperabilidad"
        },
        "approach4_text": {
            "en": "Each module integrates seamlessly within the healthcare ecosystem, ensuring efficient data exchange and enhancing care delivery.",
            "es": "Cada módulo se integra sin problemas dentro del ecosistema de atención médica, asegurando un intercambio de datos eficiente y mejorando la prestación de atención."
        },
        "technology_title": {
            "en": "Neurosymbolic AI: The Future of Healthcare",
            "es": "IA Neurosimbólica: El Futuro de la Atención Médica"
        },
        "technology_p1": {
            "en": "Our commitment to R&D drives us to the forefront of AI innovation in healthcare. We leverage neurosymbolic intelligence—a fusion of neural networks and symbolic AI—to manage complex health data and deliver precise, interpretable solutions.",
            "es": "Nuestro compromiso con la I+D nos lleva a la vanguardia de la innovación en IA en la atención médica. Aprovechamos la inteligencia neurosimbólica—una fusión de redes neuronales e IA simbólica—para gestionar datos de salud complejos y ofrecer soluciones precisas e interpretables."
        },
        "technology_h3_nn": {
            "en": "Neural Networks",
            "es": "Redes Neuronales"
        },
        "technology_p2": {
            "en": "Excel at pattern recognition, uncovering trends and anomalies within vast datasets encompassing metabolic, nutritional, and mental health metrics.",
            "es": "Excelentes en el reconocimiento de patrones, descubren tendencias y anomalías dentro de vastos conjuntos de datos que abarcan métricas metabólicas, nutricionales y de salud mental."
        },
        "technology_h3_sa": {
            "en": "Symbolic AI",
            "es": "IA Simbólica"
        },
        "technology_p3": {
            "en": "Utilize logical reasoning and decision-making frameworks, applying clinical knowledge to provide clear, structured treatment recommendations.",
            "es": "Utilizan razonamiento lógico y marcos de toma de decisiones, aplicando conocimientos clínicos para proporcionar recomendaciones de tratamiento claras y estructuradas."
        },
        "technology_h3_integration": {
            "en": "Integration",
            "es": "Integración"
        },
        "technology_p4": {
            "en": "By integrating these AI paradigms, our neurosymbolic AI offers a holistic and transparent approach to complex medical challenges, enhancing predictive accuracy and ensuring understandable reasoning behind each decision.",
            "es": "Al integrar estos paradigmas de IA, nuestra IA neurosimbólica ofrece un enfoque holístico y transparente para desafíos médicos complejos, mejorando la precisión predictiva y asegurando un razonamiento comprensible detrás de cada decisión."
        },
        "n1_title": {
            "en": "N=1 for Precision Medicine",
            "es": "N=1 para Medicina de Precisión"
        },
        "n1_text": {
            "en": "At Equ Healthcare, we embrace the concept of 'n=1' in precision medicine, designing digital health solutions that address the unique needs of each individual. By integrating personalized care with interpretable technology, we provide support precisely tailored to each person's circumstances.",
            "es": "En Equ Healthcare, adoptamos el concepto de 'n=1' en la medicina de precisión, diseñando soluciones de salud digital que abordan las necesidades únicas de cada individuo. Al integrar el cuidado personalizado con tecnología interpretable, proporcionamos un apoyo precisamente adaptado a las circunstancias de cada persona."
        },
        "vision_title": {
            "en": "Our Vision",
            "es": "Nuestra Visión"
        },
        "vision_text": {
            "en": "We start in the Hispanic community in the US with a goal to expand to Latin America, bringing equitable healthcare solutions to a broader audience.",
            "es": "Comenzamos en la comunidad hispana en EE. UU. con el objetivo de expandirnos a América Latina, llevando soluciones de atención médica equitativas a una audiencia más amplia."
        },
        "supporters_title": {
            "en": "Our Supporters",
            "es": "Nuestros Patrocinadores"
        },
        "MIT": {
            "en": "Massachusetts Institute of Technology",
            "es": "Instituto Tecnológico de Massachusetts"
        },
        "harv": {
            "en": "Harvard Medical School",
            "es": "Escuela de Medicina de Harvard"
        },
        "team_title": {
            "en": "Meet Our Founder",
            "es": "Conoce a Nuestro Fundador"
        },
        "founder_name": {
            "en": "Dr. Omar Costilla-Reyes",
            "es": "Dr. Omar Costilla-Reyes"
        },
        "founder_title": {
            "en": "Founder & CEO",
            "es": "Fundador y CEO"
        },
        "contact_title": {
            "en": "Contact Us",
            "es": "Contáctanos"
        },
        "footer_privacy": {
            "en": "Privacy Policy",
            "es": "Política de Privacidad"
        },
        "footer_terms": {
            "en": "Terms of Service",
            "es": "Términos de Servicio"
        },
        "footer_copy": {
            "en": "© Equ Healthcare Technologies. All rights reserved.",
            "es": "© Equ Healthcare Technologies. Todos los derechos reservados."
        }
    };

    /**
     * Switches the website language.
     * @param {string} lang - The language code ('en' or 'es').
     */
    function switchLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        const metaContentLanguage = document.querySelector('meta[http-equiv="Content-Language"]');
        if (metaContentLanguage) {
            metaContentLanguage.setAttribute('content', lang);
        }

        // Update active class on language buttons
        langButtons.forEach(button => {
            if (button.dataset.lang === lang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        // Update text content for all elements with data-key
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key] && translations[key][lang] !== undefined) {
                element.textContent = translations[key][lang];
                element.setAttribute('lang', lang);
            }
        });
    }

    // Add event listeners to language switcher buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.dataset.lang;
            if (selectedLang !== currentLang) {
                switchLanguage(selectedLang);
            }
        });
    });

    // Initialize language on page load
    switchLanguage('en');
}

/**
 * Initializes smooth scrolling for navigation links.
 */
function initSmoothScrolling() {
    document.querySelectorAll('a.nav__link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetID);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            // Close mobile menu after clicking a link
            const mobileMenu = document.getElementById('mobileMenu');
            const hamburger = document.getElementById('hamburger');
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
            }
        });
    });
}
