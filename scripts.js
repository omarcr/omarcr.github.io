// scripts.js

/**
 * Equ Healthcare Website Scripts
 * Author: Your Name
 * Description: Handles navigation, language switching, scroll progress, and other interactive features.
 * Date: 2024-10-11
 */

document.addEventListener('DOMContentLoaded', () => {
    /**
     * ScrollProgress Module
     * Updates the width of the progress bar based on scroll position.
     */
    const ScrollProgress = (() => {
        const progressBar = document.getElementById('progress-bar');

        const updateProgressBar = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        };

        const init = () => {
            if (progressBar) {
                window.addEventListener('scroll', updateProgressBar);
                // Initialize on load
                updateProgressBar();
            }
        };

        return { init };
    })();

    /**
     * HamburgerMenu Module
     * Toggles the mobile navigation menu and manages ARIA attributes for accessibility.
     */
    const HamburgerMenu = (() => {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');

        const toggleMenu = () => {
            const isOpen = hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);
        };

        const closeMenu = () => {
            if (hamburger.classList.contains('open')) {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
            }
        };

        const init = () => {
            if (hamburger && mobileMenu) {
                hamburger.addEventListener('click', toggleMenu);

                // Close mobile menu when a link is clicked
                mobileMenu.querySelectorAll('.nav__link').forEach(link => {
                    link.addEventListener('click', closeMenu);
                });

                // Close mobile menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                        closeMenu();
                    }
                });

                // Close mobile menu on ESC key press
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        closeMenu();
                    }
                });
            }
        };

        return { init };
    })();

    /**
     * LanguageSwitcher Module
     * Handles switching between English and Spanish languages.
     */
    const LanguageSwitcher = (() => {
        const languageSwitcher = document.querySelector('.language-switcher');
        const langButtons = languageSwitcher ? languageSwitcher.querySelectorAll('.language-switcher__button') : [];

        let currentLang = 'en';

        // Comprehensive Translation Object
        const translations = {
            // Navigation
            "nav_about": {
                "en": "About Us",
                "es": "Sobre Nosotros"
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
            "nav_scientific_discovery": {
                "en": "Scientific Discovery",
                "es": "Descubrimiento Científico"
            },
            "nav_team": {
                "en": "Team",
                "es": "Equipo"
            },
            "nav_contact": {
                "en": "Contact",
                "es": "Contacto"
            },

            // Hero Section
            "hero_title": {
                "en": "Balancing health, equity, and technology for the Hispanic/Latino community.<br><br>One equation at a time.",
                "es": "Equilibrando la salud, la equidad y la tecnología para la comunidad hispana/latina.<br><br>Una ecuación a la vez."
            },
            "hero_subtitle": {
                "en": "Transparent, interpretable AI technologies grounded in cultural understanding.",
                "es": "Tecnologías de IA transparentes e interpretables basadas en la comprensión cultural."
            },
            "hero_cta_discover": {
                "en": "Discover our solutions",
                "es": "Descubre nuestras soluciones"
            },
            "hero_cta_join": {
                "en": "Join our product waitlist",
                "es": "Únete a nuestra lista de espera"
            },

            // About Us Section
            "about_title": {
                "en": "About Us",
                "es": "Sobre Nosotros"
            },
            "about_p1": {
                "en": "Equ Healthcare—a proud spin-out from MIT and Harvard Medical School, supported by the National Science Foundation—is dedicated to revolutionizing healthcare for the Hispanic/Latino community. By delivering transparent, culturally tailored AI solutions, we aim to bridge the gap in health equity and foster trust in technology-driven care.",
                "es": "Equ Healthcare—un orgulloso spin-out del MIT y la Escuela de Medicina de Harvard, apoyado por la Fundación Nacional de Ciencia—está dedicado a revolucionar la atención médica para la comunidad hispana/latina. Al ofrecer soluciones de IA transparentes y culturalmente adaptadas, nuestro objetivo es cerrar la brecha en la equidad en salud y fomentar la confianza en la atención impulsada por tecnología."
            },
            "about_p2": {
                "en": "Our commitment to balance, precision, and equity ensures that our technology not only advances healthcare outcomes but also empowers individuals to take control of their health.",
                "es": "Nuestro compromiso con el equilibrio, la precisión y la equidad asegura que nuestra tecnología no solo mejora los resultados de la atención médica, sino que también empodera a las personas para que tomen el control de su salud."
            },

            // Pillars Section
            "pillars_title": {
                "en": "Our Pillars",
                "es": "Nuestros Pilares"
            },
            "pillar1_title": {
                "en": "Equilibrium | Equilibrio",
                "es": "Equilibrium | Equilibrio"
            },
            "pillar1_text": {
                "en": "Our AI platform harmonizes metabolic, nutritional, and mental health by leveraging real-time data and adaptive algorithms. This ensures personalized, actionable insights that empower individuals to achieve and maintain optimal health.",
                "es": "Nuestra plataforma de IA armoniza la salud metabólica, nutricional y mental al aprovechar datos en tiempo real y algoritmos adaptativos. Esto asegura conocimientos personalizados y accionables que empoderan a las personas para lograr y mantener una salud óptima."
            },
            "pillar2_title": {
                "en": "Equation | Ecuación",
                "es": "Equation | Ecuación"
            },
            "pillar2_text": {
                "en": "We utilize advanced neurosymbolic AI, integrating neural networks for pattern recognition with symbolic reasoning for decision-making. This unique approach delivers precise, evidence-based interventions while maintaining full transparency.",
                "es": "Utilizamos IA neurosimbólica avanzada, integrando redes neuronales para el reconocimiento de patrones con razonamiento simbólico para la toma de decisiones. Este enfoque único ofrece intervenciones precisas basadas en evidencia, manteniendo una total transparencia."
            },
            "pillar3_title": {
                "en": "Equity | Equidad",
                "es": "Equity | Equidad"
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

            // Mission Section
            "mission_title": {
                "en": "Our Mission",
                "es": "Nuestra Misión"
            },
            "mission_text": {
                "en": "Our mission is to advance health equity by providing the Hispanic/Latino community with culturally resonant, transparent AI healthcare solutions—empowering individuals to take control of their health with confidence and clarity.",
                "es": "Nuestra misión es avanzar la equidad en salud proporcionando a la comunidad hispana/latina soluciones de atención médica basadas en IA culturalmente resonantes y transparentes—empoderando a las personas para que tomen el control de su salud con confianza y claridad."
            },

            // Products Section
            "solutions_title": {
                "en": "Our Solutions",
                "es": "Nuestras Soluciones"
            },
            "product1_status": {
                "en": "Developing",
                "es": "En Desarrollo"
            },
            "product1_title": {
                "en": "Equ-1 Amigo",
                "es": "Equ-1 Amigo"
            },
            "product1_desc": {
                "en": "Equ-1 Amigo is our AI-powered diet and physical activity coach, uniquely designed for the Hispanic/Latino community. By providing personalized diet plans rooted in cultural preferences and interactive support, Equ-1 Amigo empowers individuals to achieve optimal health.",
                "es": "Equ-1 Amigo es nuestro entrenador de dieta y actividad física impulsado por IA, diseñado exclusivamente para la comunidad hispana/latina. Al proporcionar planes de dieta personalizados basados en preferencias culturales y soporte interactivo, Equ-1 Amigo empodera a las personas para lograr una salud óptima."
            },
            "product1_feature1": {
                "en": "Personalized, culturally tailored diet recommendations.",
                "es": "Recomendaciones de dieta personalizadas y culturalmente adaptadas."
            },
            "product1_feature2": {
                "en": "Activity tracking with goal setting and progress monitoring.",
                "es": "Seguimiento de actividad con establecimiento de metas y monitoreo de progreso."
            },
            "product1_feature3": {
                "en": "Interactive daily tips and motivational messages.",
                "es": "Consejos diarios interactivos y mensajes motivacionales."
            },
            "product1_cta": {
                "en": "Waitlist",
                "es": "Lista de Espera"
            },
            "product2_status": {
                "en": "Developing",
                "es": "En Desarrollo"
            },
            "product2_title": {
                "en": "Equ-2 Amiga",
                "es": "Equ-2 Amiga"
            },
            "product2_desc": {
                "en": "Equ-2 Amiga is an AI assistant for healthcare providers, offering evidence-based treatment recommendations and clear, interpretable insights to enhance decision-making and patient outcomes.",
                "es": "Equ-2 Amiga es un asistente de IA para proveedores de atención médica, que ofrece recomendaciones de tratamiento basadas en evidencia e información clara e interpretable para mejorar la toma de decisiones y los resultados de los pacientes."
            },
            "product2_feature1": {
                "en": "Evidence-based, culturally sensitive treatment recommendations.",
                "es": "Recomendaciones de tratamiento basadas en evidencia y culturalmente sensibles."
            },
            "product2_feature2": {
                "en": "Seamless integration with existing healthcare systems.",
                "es": "Integración sin problemas con los sistemas de atención médica existentes."
            },
            "product2_feature3": {
                "en": "Supports improved patient outcomes and satisfaction.",
                "es": "Apoya la mejora de los resultados y la satisfacción de los pacientes."
            },
            "product2_cta": {
                "en": "Waitlist",
                "es": "Lista de Espera"
            },
            "product3_status": {
                "en": "Developing",
                "es": "En Desarrollo"
            },
            "product3_title": {
                "en": "Equ-3 Abu",
                "es": "Equ-3 Abu"
            },
            "product3_desc": {
                "en": "Equ-3 Abu connects individuals with the right therapist to meet their unique needs, ensuring culturally sensitive mental health support that is both accessible and personalized.",
                "es": "Equ-3 Abu conecta a las personas con el terapeuta adecuado para satisfacer sus necesidades únicas, asegurando un apoyo de salud mental culturalmente sensible que es accesible y personalizado."
            },
            "product3_feature1": {
                "en": "Personalized matching with culturally competent therapists.",
                "es": "Emparejamiento personalizado con terapeutas culturalmente competentes."
            },
            "product3_feature2": {
                "en": "Offers outcomes tracking for value-based delivery.",
                "es": "Ofrece seguimiento de resultados para una prestación basada en valor."
            },
            "product3_feature3": {
                "en": "Enables focus on important subjects between patient and therapist.",
                "es": "Permite centrarse en temas importantes entre el paciente y el terapeuta."
            },
            "product3_cta": {
                "en": "Waitlist",
                "es": "Lista de Espera"
            },
            "product4_status": {
                "en": "Developing",
                "es": "En Desarrollo"
            },
            "product4_title": {
                "en": "Equ-4 Tote",
                "es": "Equ-4 Tote"
            },
            "product4_desc": {
                "en": "Tote is the official equ mascot that harmonizes all your medical information and shares relevant results with family members to keep everyone on a healthy track.",
                "es": "Tote es la mascota oficial de Equ que armoniza toda tu información médica y comparte resultados relevantes con los miembros de la familia para mantener a todos en una trayectoria saludable."
            },
            "product4_feature1": {
                "en": "Centralized and secure management of medical records.",
                "es": "Gestión centralizada y segura de los registros médicos."
            },
            "product4_feature2": {
                "en": "Real-time health monitoring with personalized insights.",
                "es": "Monitoreo de salud en tiempo real con conocimientos personalizados."
            },
            "product4_feature3": {
                "en": "Seamless sharing of health updates with family members.",
                "es": "Compartir sin problemas actualizaciones de salud con los miembros de la familia."
            },
            "product4_cta": {
                "en": "Waitlist",
                "es": "Lista de Espera"
            },

            // Approach Section
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

            // Technology Section
            "technology_title": {
                "en": "Neurosymbolic AI: The Future of Healthcare",
                "es": "IA Neurosimbólica: El Futuro de la Atención Médica"
            },
            "technology_p1": {
                "en": "Our commitment to R&D drives us to the forefront of technology innovation in healthcare. We leverage neurosymbolic intelligence—a groundbreaking blend of advanced machine learning and logical reasoning—to transform complex health data into clear, actionable insights. This ensures our solutions are not only highly accurate but also fully transparent, fostering trust among users and healthcare professionals alike.",
                "es": "Nuestro compromiso con la I+D nos impulsa a la vanguardia de la innovación tecnológica en la atención médica. Aprovechamos la inteligencia neurosimbólica—una combinación innovadora de aprendizaje automático avanzado y razonamiento lógico—para transformar datos de salud complejos en conocimientos claros y accionables. Esto asegura que nuestras soluciones no solo sean altamente precisas, sino también totalmente transparentes, fomentando la confianza entre los usuarios y los profesionales de la salud por igual."
            },
            "technology_h3_nn": {
                "en": "Neural Networks",
                "es": "Redes Neuronales"
            },
            "technology_p2": {
                "en": "Recognize patterns and trends within vast datasets encompassing metabolic, nutritional, and mental health metrics.",
                "es": "Reconocen patrones y tendencias dentro de vastos conjuntos de datos que abarcan métricas metabólicas, nutricionales y de salud mental."
            },
            "technology_h3_sa": {
                "en": "Symbolic AI",
                "es": "IA Simbólica"
            },
            "technology_p3": {
                "en": "Applies clinical knowledge through logical reasoning to provide clear, evidence-based recommendations.",
                "es": "Aplica conocimientos clínicos a través de razonamiento lógico para proporcionar recomendaciones claras y basadas en evidencia."
            },
            "technology_p4": {
                "en": "By integrating these AI paradigms, our neurosymbolic AI offers a holistic and transparent approach to complex medical challenges, enhancing predictive accuracy and ensuring understandable reasoning behind each decision.",
                "es": "Al integrar estos paradigmas de IA, nuestra IA neurosimbólica ofrece un enfoque holístico y transparente para desafíos médicos complejos, mejorando la precisión predictiva y asegurando un razonamiento comprensible detrás de cada decisión."
            },

            // N=1 Section
            "n1_title": {
                "en": "N=1 for Precision Medicine",
                "es": "N=1 para Medicina de Precisión"
            },
            "n1_text": {
                "en": "At Equ Healthcare, we embrace the concept of 'n=1' in precision medicine, designing digital health solutions that address the unique needs of each individual. By integrating personalized care with interpretable technology, we provide support precisely tailored to each person's circumstances.",
                "es": "En Equ Healthcare, adoptamos el concepto de 'n=1' en la medicina de precisión, diseñando soluciones de salud digital que abordan las necesidades únicas de cada individuo. Al integrar el cuidado personalizado con tecnología interpretable, proporcionamos un apoyo precisamente adaptado a las circunstancias de cada persona."
            },

            // Vision Section
            "vision_title": {
                "en": "Our Vision",
                "es": "Nuestra Visión"
            },
            "vision_text": {
                "en": "We start in the Hispanic community in the US with a goal to expand to Latin America, bringing equitable healthcare solutions to a broader audience.",
                "es": "Comenzamos en la comunidad hispana en EE. UU. con el objetivo de expandirnos a América Latina, llevando soluciones de atención médica equitativas a una audiencia más amplia."
            },

            // Supporters Section
            "supporters_title": {
                "en": "Our Supporters and Experience",
                "es": "Nuestros Patrocinadores y Experiencia"
            },

            // Team Section
            "team_title": {
                "en": "Meet Our Team",
                "es": "Conoce a Nuestro Equipo"
            },
            "founder_name": {
                "en": "Dr. Omar Costilla-Reyes",
                "es": "Dr. Omar Costilla-Reyes"
            },
            "founder_title": {
                "en": "CEO & Founder",
                "es": "CEO y Fundador"
            },
            "founder_position1": {
                "en": "Research Scientist, MIT CSAIL",
                "es": "Científico de Investigación, MIT CSAIL"
            },
            "team_member_vishal_name": {
                "en": "Vishal Bhalla",
                "es": "Vishal Bhalla"
            },
            "team_member_vishal_title": {
                "en": "Business Director",
                "es": "Director de Negocios"
            },
            "team_member_vishal_position1": {
                "en": "Board-member, Advisor, Healthcare experience officer expert",
                "es": "Miembro del Consejo, Asesor, Experto en Director de Experiencia en Salud"
            },
            "team_member_vishal_position2": {
                "en": "Advisory Council, Harvard Business Review · Freelance",
                "es": "Consejo Asesor, Harvard Business Review · Freelance"
            },
            "team_member_jennifer_name": {
                "en": "Jennifer Miles-Thomas, MD",
                "es": "Jennifer Miles-Thomas, MD"
            },
            "team_member_jennifer_title": {
                "en": "Medical Director",
                "es": "Directora Médica"
            },
            "team_member_jennifer_position1": {
                "en": "Vice Chair of Integration and Innovation, Northwestern Medicine Department of Urology",
                "es": "Vicepresidenta de Integración e Innovación, Departamento de Urología de Northwestern Medicine"
            },
            "team_member_jennifer_position2": {
                "en": "Assistant Professor, Department of Urology, Eastern Virginia Medical School",
                "es": "Profesora Asistente, Departamento de Urología, Eastern Virginia Medical School"
            },
            "team_member_alfredo_name": {
                "en": "Dr. Alfredo Costilla Reyes",
                "es": "Dr. Alfredo Costilla Reyes"
            },
            "team_member_alfredo_title": {
                "en": "Business Advisor",
                "es": "Asesor de Negocios"
            },
            "team_member_alfredo_position1": {
                "en": "AI Research, autoedge.ai",
                "es": "Investigación en IA, autoedge.ai"
            },
            "team_member_morgan_name": {
                "en": "Morgan Talbot",
                "es": "Morgan Talbot"
            },
            "team_member_morgan_title": {
                "en": "Data Scientist",
                "es": "Científico de Datos"
            },
            "team_member_morgan_position1": {
                "en": "MD-PhD Candidate, Massachusetts Institute of Technology",
                "es": "Candidato MD-PhD, Instituto de Tecnología de Massachusetts"
            },
            "team_member_morgan_position2": {
                "en": "Full-time, Sep 2021 - Present (3 years 2 months)",
                "es": "Tiempo completo, Sep 2021 - Presente (3 años 2 meses)"
            },
            "team_member_jesse_name": {
                "en": "Jesse Hamel",
                "es": "Jesse Hamel"
            },
            "team_member_jesse_title": {
                "en": "Strategic Advisor",
                "es": "Asesor Estratégico"
            },
            "team_member_jesse_position1": {
                "en": "Founder & Principal, Victus Key Ventures",
                "es": "Fundador y Principal, Victus Key Ventures"
            },
            "team_member_daniel_name": {
                "en": "Daniel Araya",
                "es": "Daniel Araya"
            },
            "team_member_daniel_title": {
                "en": "Partnerships Director",
                "es": "Director de Alianzas"
            },
            "team_member_daniel_position1": {
                "en": "Startup Lead, Google",
                "es": "Líder de Startup, Google"
            },
            "team_member_felix_name": {
                "en": "Felix Reivera, MD",
                "es": "Felix Reivera, MD"
            },
            "team_member_felix_title": {
                "en": "Hispanic Medical Director",
                "es": "Director Médico Hispano"
            },
            "team_member_felix_position1": {
                "en": "Rio Grande Regional Hospital, Texas",
                "es": "Hospital Regional Rio Grande, Texas"
            },

            // Investor Relations Section
            "investor_relations_title": {
                "en": "Invest in the Future of Healthcare",
                "es": "Invierte en el Futuro de la Atención Médica"
            },
            "investor_relations_text": {
                "en": "Equ Healthcare is at the forefront of a transformative movement in healthcare. By investing with us, you are contributing to a solution that combines cutting-edge technology with cultural empathy, addressing a significant market need. Investing in Equ Healthcare means partnering with a team dedicated to pushing the boundaries of what’s possible in healthcare. Our unique neurosymbolic AI framework positions us to lead the next wave of medical innovations, addressing critical challenges in disease prediction, treatment personalization, and health equity.",
                "es": "Equ Healthcare está a la vanguardia de un movimiento transformador en la atención médica. Al invertir con nosotros, estás contribuyendo a una solución que combina tecnología de vanguardia con empatía cultural, abordando una necesidad significativa del mercado. Invertir en Equ Healthcare significa asociarse con un equipo dedicado a empujar los límites de lo que es posible en la atención médica. Nuestro marco único de IA neurosimbólica nos posiciona para liderar la próxima ola de innovaciones médicas, abordando desafíos críticos en la predicción de enfermedades, la personalización de tratamientos y la equidad en salud."
            },

            // Healthcare Professionals Section
            "healthcare_professionals_title": {
                "en": "Collaborate with Us",
                "es": "Colabora con Nosotros"
            },
            "healthcare_professionals_text": {
                "en": "Are you a healthcare professional passionate about advancing health equity? Partner with Equ Healthcare to bring culturally tailored AI solutions to your patients. Together, we can enhance patient outcomes and transform healthcare delivery.",
                "es": "¿Eres un profesional de la salud apasionado por avanzar en la equidad en salud? Asóciate con Equ Healthcare para llevar soluciones de IA culturalmente adaptadas a tus pacientes. Juntos, podemos mejorar los resultados de los pacientes y transformar la prestación de atención médica."
            },

            // Contact Section
            "contact_title": {
                "en": "Get in Touch",
                "es": "Contáctanos"
            },
            "contact_text": {
                "en": "Ready to join us on this journey towards building the future of healthcare? Whether you are an investor, healthcare professional, or community member, we would love to hear from you.",
                "es": "¿Listo para unirte a nosotros en este viaje hacia la construcción del futuro de la atención médica? Ya sea que seas un inversionista, profesional de la salud o miembro de la comunidad, nos encantaría saber de ti."
            },
            "contact_email_text": {
                "en": "Email us at omar@equ.care",
                "es": "Envíanos un correo a omar@equ.care"
            },
            "success_message": {
                "en": "Thank you! We'll get back to you soon.",
                "es": "¡Gracias! Nos pondremos en contacto contigo pronto."
            },

            // Footer
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
         * Updates text content and lang attributes based on the selected language.
         * @param {string} lang - The language code ('en' or 'es').
         */
        const switchLanguage = (lang) => {
            currentLang = lang;
            document.documentElement.lang = lang;

            const metaContentLanguage = document.querySelector('meta[http-equiv="Content-Language"]');
            if (metaContentLanguage) {
                metaContentLanguage.setAttribute('content', lang);
            }

            // Update active class and ARIA attributes on language buttons
            langButtons.forEach(button => {
                const isActive = button.dataset.lang === lang;
                button.classList.toggle('active', isActive);
                button.setAttribute('aria-pressed', isActive);
            });

            // Update text content and lang attributes for all elements with data-key
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[key] && translations[key][lang] !== undefined) {
                    if (key === 'hero_title') {
                        element.innerHTML = translations[key][lang]; // Use innerHTML for line breaks
                    } else {
                        element.textContent = translations[key][lang];
                    }
                    element.setAttribute('lang', lang);
                }
            });
        };

        /**
         * Adds event listeners to language switcher buttons.
         */
        const addLanguageSwitcherEventListeners = () => {
            langButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const selectedLang = button.dataset.lang;
                    if (selectedLang !== currentLang) {
                        switchLanguage(selectedLang);
                    }
                });
            });
        };

        /**
         * Initializes the language switcher functionality.
         */
        const init = () => {
            if (languageSwitcher && langButtons.length > 0) {
                switchLanguage('en'); // Set default language to English
                addLanguageSwitcherEventListeners();
            }
        };

        return { init };
    })();

    /**
     * SmoothScrolling Module
     * Enables smooth scrolling behavior for navigation links.
     */
    const SmoothScrolling = (() => {
        /**
         * Initializes smooth scrolling for navigation links.
         * Enhances user experience by providing smooth transitions to sections.
         */
        const init = () => {
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
                    if (mobileMenu && hamburger && mobileMenu.classList.contains('open')) {
                        mobileMenu.classList.remove('open');
                        hamburger.classList.remove('open');
                        hamburger.setAttribute('aria-expanded', false);
                        mobileMenu.setAttribute('aria-hidden', true);
                    }
                });
            });
        };

        return { init };
    })();

    /**
     * ContactForm Module
     * Handles contact form submissions (if applicable).
     * Note: Currently, the contact section uses a mailto link.
     * If you plan to add a contact form in the future, implement form handling here.
     */
    const ContactForm = (() => {
        const successMessage = document.querySelector('.success-message');

        const showSuccessMessage = () => {
            if (successMessage) {
                successMessage.style.display = 'block';
            }
        };

        const init = () => {
            // Currently, there's no contact form to handle.
            // Future implementation can go here.
        };

        return { init, showSuccessMessage };
    })();

    /**
     * Initialize All Modules
     */
    const init = () => {
        ScrollProgress.init();
        HamburgerMenu.init();
        LanguageSwitcher.init();
        SmoothScrolling.init();
        ContactForm.init();
    };

    init();
});
