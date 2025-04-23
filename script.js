document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scrolling para enlaces de navegación ---
    const navLinks = document.querySelectorAll('header nav ul li a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el salto instantáneo por defecto
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const header = document.querySelector('header');
                const headerOffset = header ? header.offsetHeight : 0; // Obtener altura del header si existe
                const elementPosition = targetElement.getBoundingClientRect().top;
                // Calcular posición final: scroll actual + top del elemento relativo al viewport - altura del header - padding extra
                const offsetPosition = window.pageYOffset + elementPosition - headerOffset - 20; // Padding opcional de 20px

                // Usar la API de scroll suave del navegador
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Activa la animación suave
                });
            }
        });
    });

    // --- Intersection Observer for Animations On Scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // Relativo al viewport
            rootMargin: '0px 0px -50px 0px', // Activar 50px antes de que entre completamente por abajo
            threshold: 0.1 // Activar cuando al menos el 10% esté visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                // Cuando el elemento entra en la vista
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Detener la observación del elemento después de que se haya vuelto visible una vez
                    // Mejora el rendimiento y evita que la animación se repita al scrollear arriba/abajo
                    observer.unobserve(entry.target);
                }
                // No se necesita 'else' porque estamos desobservando.
                // Si quisieras que la animación se repita, quita unobserve() y añade:
                // else { entry.target.classList.remove('is-visible'); }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Empezar a observar cada elemento marcado para animación
        animatedElements.forEach(el => {
            observer.observe(el);
        });

    } else {
        // Fallback simple para navegadores sin IntersectionObserver:
        // Hacer todos los elementos visibles inmediatamente. El CSS se encarga del resto.
        console.warn("IntersectionObserver no soportado. Mostrando todos los elementos animados.");
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }
    // --- Fin de la lógica del Intersection Observer ---


    // --- Lógica del Cambio de Tema ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIcon = themeToggleButton.querySelector('.theme-icon-moon');
    const sunIcon = themeToggleButton.querySelector('.theme-icon-sun');

    // Función para aplicar el tema (light/dark) y actualizar UI/Storage
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
            themeToggleButton.setAttribute('aria-label', 'Cambiar a tema oscuro');
            localStorage.setItem('theme', 'light'); // Guardar preferencia
        } else { // Asumimos 'dark' si no es 'light'
            body.classList.remove('light-mode');
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
            themeToggleButton.setAttribute('aria-label', 'Cambiar a tema claro');
            localStorage.setItem('theme', 'dark'); // Guardar preferencia
        }
    };

    // Determinar el tema inicial
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme;

    if (savedTheme) {
        // 1. Prioridad: Usar tema guardado si existe
        initialTheme = savedTheme;
    } else {
        // 2. Si no hay guardado, usar preferencia del sistema
        initialTheme = prefersDarkScheme ? 'dark' : 'light';
    }

     // 3. Aplicar el tema inicial determinado
    applyTheme(initialTheme);


    // Event listener para el botón de cambio de tema
    themeToggleButton.addEventListener('click', () => {
        // Determinar el tema NUEVO basado en el estado ACTUAL
        const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        // Aplicar el nuevo tema
        applyTheme(newTheme);
    });

    // (Opcional pero recomendado) Escuchar cambios de tema del Sistema Operativo
    // SOLO actualiza si el usuario NO ha establecido una preferencia manualmente antes.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Solo actuar si NO hay un tema guardado explícitamente por el usuario
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
    // --- Fin de la lógica del Cambio de Tema ---

}); // Fin del DOMContentLoaded