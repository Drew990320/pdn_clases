// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the current theme
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('.theme-icon');
        if (icon) {
            if (theme === 'dark') {
                icon.innerHTML = '☀️'; // Sun icon for light mode
                themeToggle.querySelector('.theme-text').textContent = 'Modo Claro';
            } else {
                icon.innerHTML = '🌙'; // Moon icon for dark mode
                themeToggle.querySelector('.theme-text').textContent = 'Modo Oscuro';
            }
        }
    }
});

// Form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    // Add loading state to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner"></span> Procesando...';
            }
        });
    });
    
    // Password strength indicator
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
        if (input.name === 'password' || input.name === 'newPassword') {
            input.addEventListener('input', function() {
                const strength = checkPasswordStrength(this.value);
                updatePasswordStrength(this, strength);
            });
        }
    });
    
    // Confirm password validation
    const confirmPasswordInputs = document.querySelectorAll('input[name="confirmPassword"]');
    confirmPasswordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const passwordInput = document.querySelector('input[name="password"]') || 
                                 document.querySelector('input[name="newPassword"]');
            if (passwordInput) {
                validatePasswordMatch(passwordInput, this);
            }
        });
    });
});

function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    return strength;
}

function updatePasswordStrength(input, strength) {
    let strengthIndicator = input.parentNode.querySelector('.password-strength');
    
    if (!strengthIndicator) {
        strengthIndicator = document.createElement('div');
        strengthIndicator.className = 'password-strength';
        input.parentNode.appendChild(strengthIndicator);
    }
    
    const strengthText = ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'];
    const strengthColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];
    
    strengthIndicator.textContent = strengthText[strength - 1] || '';
    strengthIndicator.style.color = strengthColors[strength - 1] || '#6b7280';
}

function validatePasswordMatch(passwordInput, confirmInput) {
    const matchIndicator = confirmInput.parentNode.querySelector('.password-match');
    
    if (!matchIndicator) {
        const indicator = document.createElement('div');
        indicator.className = 'password-match';
        confirmInput.parentNode.appendChild(indicator);
    }
    
    if (passwordInput.value === confirmInput.value && confirmInput.value !== '') {
        matchIndicator.textContent = '✓ Las contraseñas coinciden';
        matchIndicator.style.color = '#10b981';
        confirmInput.style.borderColor = '#10b981';
    } else if (confirmInput.value !== '') {
        matchIndicator.textContent = '✗ Las contraseñas no coinciden';
        matchIndicator.style.color = '#ef4444';
        confirmInput.style.borderColor = '#ef4444';
    } else {
        matchIndicator.textContent = '';
        confirmInput.style.borderColor = '';
    }
}

// Auto-hide alerts
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
