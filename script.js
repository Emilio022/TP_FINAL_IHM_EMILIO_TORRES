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

    // Listener para el clic del botón de tema
    if (themeToggleButton) { // Asegura que el botón exista en la página actual
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Lógica para el formulario de registro (solo en la página de registro)
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', (event) => {
            // Previene el envío por defecto del formulario para que JS lo maneje
            event.preventDefault(); 
            
            // Si el formulario es válido según HTML5
            if (registroForm.checkValidity()) {
                // Simula el envío de datos y luego redirige
                console.log('Datos validados y simuladamente enviados. Redirigiendo a página de éxito...');
                window.location.href = 'registro_exitoso.html'; // Redirige a la página de éxito
            } else {
                // Si hay campos inválidos, HTML5 mostrará sus mensajes de error predeterminados
                console.log('Por favor, completa todos los campos correctamente.');
                // trigger HTML5 validation messages if form is not valid
                registroForm.reportValidity(); 
            }
        });
    }
});