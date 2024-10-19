/**
 * Equ Healthcare Website Scripts
 * Author: Your Name
 * Description: Handles navigation, language switching, scroll progress, and other interactive features.
 * Date: 2024-10-11
 */

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Utility Functions
     */
    const Utils = (() => {
        /**
         * Debounce function to limit the rate at which a function can fire.
         * @param {Function} func - The function to debounce.
         * @param {number} wait - The time to wait in milliseconds.
         * @returns {Function}
         */
        const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };

        return { debounce };
    })();

    /**
     * ScrollProgress Module
     * Updates the width of the progress bar based on scroll position.
     */
    const ScrollProgress = (() => {
        const progressBar = document.getElementById('progress-bar');

        const updateProgressBar = () => {
            if (!progressBar) return;
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        };

        const init = () => {
            if (progressBar) {
                window.addEventListener('scroll', Utils.debounce(updateProgressBar, 100));
                updateProgressBar(); // Initialize on load
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

        const toggleMenu = (e) => {
            e.stopPropagation(); // Prevent event bubbling
            const isOpen = hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
            mobileMenu.setAttribute('aria-hidden', !isOpen);

            // Prevent the menu from closing immediately when clicking inside
            mobileMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        };

        const closeMenu = () => {
            if (hamburger.classList.contains('open')) {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                hamburger.setAttribute('aria-expanded', false);
                mobileMenu.setAttribute('aria-hidden', true);
            }
        };

        const handleClickOutside = (e) => {
            if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeMenu();
            }
        };

        const init = () => {
            if (hamburger && mobileMenu) {
                hamburger.addEventListener('click', toggleMenu);
                mobileMenu.querySelectorAll('.nav__link').forEach(link => {
                    link.addEventListener('click', closeMenu);
                });
                document.addEventListener('click', handleClickOutside);
                document.addEventListener('keydown', handleEscape);
            }
        };

        return { init };
    })();

    /**
     * LanguageSwitcher Module
     * Handles switching between English and Spanish languages.
     */
    /**
     * LanguageSwitcher Module for Google Translate
     */
    const LanguageSwitcher = (() => {
        const langButton = document.getElementById('language-toggle');

        // Ensure Google Translate dropdown exists before interacting
        const ensureTranslateDropdown = (callback) => {
            const interval = setInterval(() => {
                const googleTranslateDropdown = document.querySelector('.goog-te-combo');
                if (googleTranslateDropdown) {
                    clearInterval(interval);
                    callback(googleTranslateDropdown);
                }
            }, 300); // Check every 300ms until found
        };

        // Function to trigger the language switch
        const switchLanguage = (lang) => {
            ensureTranslateDropdown((googleTranslateDropdown) => {
                googleTranslateDropdown.value = lang; // Set language value (en or es)
                googleTranslateDropdown.dispatchEvent(new Event('change')); // Trigger the change event
            });
        };

        // Toggle between English and Spanish
        const toggleLanguage = () => {
            const currentLang = langButton.getAttribute('data-lang');
            const newLang = currentLang === 'en' ? 'es' : 'en'; // Toggle language
            switchLanguage(newLang);

            // Update button text and data attribute
            langButton.textContent = newLang === 'en' ? 'ES' : 'EN'; 
            langButton.setAttribute('data-lang', newLang);
        };

        const init = () => {
            if (langButton) {
                langButton.addEventListener('click', toggleLanguage); // Add click event listener
            }
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
        ContactForm.init();
    };

    // Initialize the modules when the DOM is fully loaded
    init();
});
