document.addEventListener('DOMContentLoaded', () => {
    // Password visibility toggle
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.password-toggle');

    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    const authForm = document.querySelector('.auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your authentication logic here
            console.log('Form submitted');
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`Login with ${provider}`);
            // Add your social login logic here
        });
    });

    const validatePassword = (password) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*]/.test(password)
        };

        // Update requirement indicators
        Object.entries(requirements).forEach(([requirement, isValid]) => {
            const element = document.querySelector(`[data-requirement="${requirement}"]`);
            if (element) {
                element.classList.toggle('valid', isValid);
            }
        });

        return Object.values(requirements).every(Boolean);
    };

    // Add this inside the DOMContentLoaded event listener
    const confirmPasswordInput = document.getElementById('confirm-password');

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            validatePassword(passwordInput.value);
        });
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', () => {
            const isMatch = confirmPasswordInput.value === passwordInput.value;
            confirmPasswordInput.parentElement.classList.toggle('error', !isMatch && confirmPasswordInput.value);
            confirmPasswordInput.parentElement.classList.toggle('success', isMatch && confirmPasswordInput.value);
        });
    }

    // Update form submission handler
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (passwordInput && confirmPasswordInput) {
                // Sign up form validation
                const isPasswordValid = validatePassword(passwordInput.value);
                const isPasswordMatch = passwordInput.value === confirmPasswordInput.value;
                
                if (!isPasswordValid) {
                    alert('Please meet all password requirements');
                    return;
                }
                
                if (!isPasswordMatch) {
                    alert('Passwords do not match');
                    return;
                }
            }
            
            // Proceed with form submission
            console.log('Form submitted successfully');
        });
    }

    // Password Reset Form Handler
    const resetForm = document.getElementById('reset-form');
    const resetSuccess = document.querySelector('.reset-success');
    const resendBtn = document.querySelector('.resend-btn');

    if (resetForm) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = resetForm.querySelector('button[type="submit"]');
            const email = resetForm.querySelector('#email').value;

            // Add loading state
            submitBtn.classList.add('loading');
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                resetForm.style.display = 'none';
                resetSuccess.style.display = 'block';
            } catch (error) {
                console.error('Error sending reset email:', error);
                alert('Failed to send reset email. Please try again.');
            } finally {
                submitBtn.classList.remove('loading');
            }
        });
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', async () => {
            resendBtn.classList.add('loading');
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                alert('Reset email sent again!');
            } catch (error) {
                console.error('Error resending email:', error);
                alert('Failed to resend email. Please try again.');
            } finally {
                resendBtn.classList.remove('loading');
            }
        });
    }

    // Password strength checker
    const checkPasswordStrength = (password) => {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        
        // Character variety checks
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        return {
            score: strength,
            label: strength < 3 ? 'weak' : strength < 4 ? 'medium' : 'strong'
        };
    };

    // Add this inside the DOMContentLoaded event listener
    const newPasswordForm = document.getElementById('new-password-form');
    if (newPasswordForm) {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirm-password');
        
        passwordInput.addEventListener('input', () => {
            const strength = checkPasswordStrength(passwordInput.value);
            validatePassword(passwordInput.value);
            
            // Update strength meter if it exists
            const meter = document.querySelector('.password-strength-meter .strength');
            if (meter) {
                meter.className = `strength ${strength.label}`;
            }
        });

        newPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const password = passwordInput.value;
            const confirmPassword = confirmInput.value;
            
            if (!validatePassword(password)) {
                alert('Please ensure your password meets all requirements');
                return;
            }
            
            if (password !== confirmPassword) {
                confirmInput.parentElement.classList.add('match-error');
                setTimeout(() => {
                    confirmInput.parentElement.classList.remove('match-error');
                }, 500);
                return;
            }
            
            const submitBtn = newPasswordForm.querySelector('button[type="submit"]');
            submitBtn.classList.add('loading');
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                newPasswordForm.style.display = 'none';
                document.querySelector('.reset-success').style.display = 'block';
            } catch (error) {
                console.error('Error resetting password:', error);
                alert('Failed to reset password. Please try again.');
            } finally {
                submitBtn.classList.remove('loading');
            }
        });
    }
}); 