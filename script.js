document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('header');
    const navLinksContainer = document.getElementById('main-nav-links');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const body = document.body; // Reference body element

    // --- Smooth Scrolling for navigation links ---
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is inside the mobile nav
            const isMobileNavLink = navLinksContainer.contains(link);

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 0;
                // Use window.scrollY for cross-browser compatibility
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = window.scrollY + elementPosition - headerOffset - 20; // 20px extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // --- Close mobile menu ONLY if a mobile nav link was clicked ---
                if (isMobileNavLink && header.classList.contains('nav-open')) {
                    header.classList.remove('nav-open');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    body.classList.remove('no-scroll'); // Use body reference
                }
            }
        });
    });

    // --- Intersection Observer for Animations On Scroll ---
    // Select sections that need to trigger animations for their children
    const animatedSections = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px 0px -10% 0px', // Trigger slightly before element is fully in view
            threshold: 0.1 // 10% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: unobserve after animation starts if you only want it once
                    // observer.unobserve(entry.target);
                }
                // Optional: Remove 'is-visible' when scrolling up if you want animations to repeat
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedSections.forEach(el => observer.observe(el));

    } else {
        // Fallback for browsers without IntersectionObserver
        console.warn("IntersectionObserver not supported. Animating all sections.");
        animatedSections.forEach(el => el.classList.add('is-visible'));
    }

    // --- Theme Toggling Logic ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const moonIcon = themeToggleButton?.querySelector('.theme-icon-moon'); // Use optional chaining
    const sunIcon = themeToggleButton?.querySelector('.theme-icon-sun');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if (moonIcon) moonIcon.style.display = 'block';
            if (sunIcon) sunIcon.style.display = 'none';
            themeToggleButton?.setAttribute('aria-label', 'Cambiar a tema oscuro'); // Optional chaining
            localStorage.setItem('theme', 'light');
        } else { // 'dark' or default
            body.classList.remove('light-mode');
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'block';
            themeToggleButton?.setAttribute('aria-label', 'Cambiar a tema claro'); // Optional chaining
            localStorage.setItem('theme', 'dark');
        }
        // Add/Update RGB variable for mobile nav background
        const bgColor = window.getComputedStyle(body).getPropertyValue('--bg-color').trim();
        // Basic conversion to RGB (might need adjustment based on actual color format)
        try {
            let rgbValue = '18, 18, 18'; // Default dark
            if (body.classList.contains('light-mode')) {
                 rgbValue = '233, 236, 239'; // Default light
            }
            // More robust color conversion might be needed if using hex/hsl etc.
             document.documentElement.style.setProperty('--bg-color-rgb', rgbValue);
        } catch (e) {
            console.error("Could not set RGB background variable:", e);
        }

    };

    const savedTheme = localStorage.getItem('theme');
    // Check system preference *only* if no theme is saved
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme || (prefersDarkScheme ? 'dark' : 'light');
    applyTheme(currentTheme);

    themeToggleButton?.addEventListener('click', () => { // Optional chaining
        currentTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(currentTheme);
    });

    // Listen for changes in system preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Only change if NO theme has been manually set by the user
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });

    // --- Mobile Menu Logic ---
    if (mobileMenuToggle && navLinksContainer && header) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpening = !header.classList.contains('nav-open');

            header.classList.toggle('nav-open');
            mobileMenuToggle.classList.toggle('active');
            mobileMenuToggle.setAttribute('aria-expanded', isOpening);

            if (isOpening) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }
        });
    } else {
        console.error("Mobile menu elements (toggle, container, header) not found.");
    }

}); // End DOMContentLoaded