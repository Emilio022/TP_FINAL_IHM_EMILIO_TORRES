document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica para Alternar Modo Claro/Oscuro ---
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    if (toggleThemeBtn) {
        // Cargar el tema guardado o el tema por defecto del sistema
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (savedTheme) {
            document.body.classList.add(savedTheme);
        } else if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.add('light-mode'); // Asegura que siempre haya una clase inicial
        }

        toggleThemeBtn.addEventListener('click', function() {
            if (document.body.classList.contains('dark-mode')) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
                localStorage.setItem('theme', 'light-mode');
            } else {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            }
        });
    }

    // --- Lógica para Mostrar/Ocultar Contraseña ---
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) { // Asegura que los elementos existan
        togglePassword.addEventListener('click', function() {
            // Alternar el tipo de input entre 'password' y 'text'
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Cambiar el icono del ojo (Unicode)
            this.textContent = (type === 'password') ? '👁️' : '🙈'; // Ojo abierto para ocultar (por defecto), ojo tachado para mostrar
        });
    }

    // --- Lógica para Validar que las Contraseñas Coincidan (en registro.html) ---
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) { // Asegura que solo se ejecute en la página de registro
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const passwordMatchError = document.getElementById('passwordMatchError');

        // Asegúrate de que passwordInput ya esté definido de la sección anterior
        if (passwordInput && confirmPasswordInput && passwordMatchError) {
            const checkPasswords = () => {
                // Solo mostrar error si la confirmación no está vacía y no coincide
                if (passwordInput.value !== confirmPasswordInput.value && confirmPasswordInput.value !== '') {
                    passwordMatchError.style.display = 'block';
                    // setCustomValidity detiene el envío del formulario con un mensaje de error
                    confirmPasswordInput.setCustomValidity("Las contraseñas no coinciden.");
                } else {
                    passwordMatchError.style.display = 'none';
                    confirmPasswordInput.setCustomValidity(""); // Resetea el mensaje de error si coinciden o está vacío
                }
            };

            // Ejecutar la verificación cada vez que el usuario escribe en ambos campos
            passwordInput.addEventListener('input', checkPasswords);
            confirmPasswordInput.addEventListener('input', checkPasswords);

            // También, al intentar enviar el formulario, forzar la validación final
            registrationForm.addEventListener('submit', function(event) {
                checkPasswords(); // Ejecutar una última vez antes del envío
                // Si customValidity está establecido, el formulario no se enviará.
            });
        }
    }

    // --- Lógica adicional para el botón de tema (icons) ---
    // Asegura que el icono de luz o oscuridad se muestre según el modo activo
    const updateThemeIcons = () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const lightIcon = document.querySelector('.icon-light');
        const darkIcon = document.querySelector('.icon-dark');

        if (lightIcon && darkIcon) {
            lightIcon.style.display = isDarkMode ? 'none' : 'inline-block';
            darkIcon.style.display = isDarkMode ? 'inline-block' : 'none';
        }
    };

    // Actualizar iconos al cargar la página
    updateThemeIcons();

    // Actualizar iconos al cambiar el tema
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', updateThemeIcons);
    }
});