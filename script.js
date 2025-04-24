document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('header'); // Referencia al header
    const navLinksContainer = document.getElementById('main-nav-links');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

    // --- Smooth Scrolling para enlaces de navegación ---
    // Selecciona TODOS los enlaces que apunten a un ID, incluyendo los del menú móvil
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el salto instantáneo
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = window.pageYOffset + elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // --- Cerrar menú móvil si está abierto después de hacer clic ---
                if (header.classList.contains('nav-open')) {
                    header.classList.remove('nav-open');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('no-scroll'); // Permitir scroll de nuevo
                }
            }
        });
    });

    // --- Intersection Observer for Animations On Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        animatedElements.forEach(el => observer.observe(el));

    } else {
        console.warn("IntersectionObserver no soportado. Mostrando elementos animados.");
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }

    // --- Lógica del Cambio de Tema ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = themeToggleButton.querySelector('.theme-icon-moon');
    const sunIcon = themeToggleButton.querySelector('.theme-icon-sun');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            if(moonIcon) moonIcon.style.display = 'block';
            if(sunIcon) sunIcon.style.display = 'none';
            themeToggleButton.setAttribute('aria-label', 'Cambiar a tema oscuro');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            if(moonIcon) moonIcon.style.display = 'none';
            if(sunIcon) sunIcon.style.display = 'block';
            themeToggleButton.setAttribute('aria-label', 'Cambiar a tema claro');
            localStorage.setItem('theme', 'dark');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme = savedTheme ? savedTheme : (prefersDarkScheme ? 'dark' : 'light');
    applyTheme(initialTheme);

    themeToggleButton.addEventListener('click', () => {
        const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });

    // --- Lógica del Menú Móvil (Hamburguesa) ---
    if (mobileMenuToggle && navLinksContainer && header) {
        mobileMenuToggle.addEventListener('click', () => {
            header.classList.toggle('nav-open'); // Clase en el header controla la visibilidad del menú
            mobileMenuToggle.classList.toggle('active'); // Para animar el icono X

            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);

            // Evitar scroll del body cuando el menú está abierto
            if (header.classList.contains('nav-open')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    } else {
        console.error("No se encontraron elementos necesarios para el menú móvil (toggle, container, header)");
    }

}); // Fin del DOMContentLoaded