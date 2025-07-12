document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('toggle-theme-btn');
    const body = document.body;

    // Función para establecer el tema
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme); // Guarda la preferencia del usuario
        if (theme === 'dark') {
            themeToggleButton.textContent = '☀️ Claro';
            themeToggleButton.setAttribute('aria-label', 'Activar modo claro');
        } else {
            themeToggleButton.textContent = '🌙 Oscuro';
            themeToggleButton.setAttribute('aria-label', 'Activar modo oscuro');
        }
    };

    // Cargar la preferencia del tema guardada o usar 'light' por defecto
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Opcional: detectar la preferencia del sistema operativo del usuario
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    // Listener para el clic del botón
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
});