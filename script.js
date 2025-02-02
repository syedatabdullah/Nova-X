// Typing animation
const typingText = document.querySelector('.typing-text');
const texts = [
    "Transform Your Career with Nova X",
    "Master Amazon FBA Business",
    "Build Your Dropshipping Empire",
    "Learn Professional Trading",
    "Join Pakistan's Top E-commerce Academy"
];

let textIndex = 0;
let index = 0;
let isDeleting = false;
let currentText = '';

const typeWriter = () => {
    currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, index - 1);
        index--;
    } else {
        typingText.textContent = currentText.substring(0, index + 1);
        index++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && index === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && index === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before starting new text
    }

    setTimeout(typeWriter, typeSpeed);
};

const startTypingAnimation = () => {
    try {
        typingText.textContent = '';
        index = 0;
        isDeleting = false;
        typeWriter();
    } catch (error) {
        console.error('Error in typing animation:', error);
    }
};

// Smooth scroll for navigation links
const enableSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Add active class to current navigation item
const highlightActiveNavLink = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentUrl = window.location.href;

    navLinks.forEach(link => {
        if (link.href === currentUrl) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Add smooth reveal animations for cards
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .course-card, .stat-item').forEach((el) => {
        el.classList.add('hidden');
        observer.observe(el);
    });
};

// Initialize functions on window load
window.onload = () => {
    startTypingAnimation();
    enableSmoothScroll();
    highlightActiveNavLink();
    observeElements();

    // Create floating support button
    function createSupportButton() {
        const supportButton = document.createElement('a');
        supportButton.href = 'support.html';
        supportButton.className = 'support-link';
        supportButton.innerHTML = '<i class="fas fa-headset"></i>';
        supportButton.title = 'Need Help?';
        
        // Don't show on support page
        if (!window.location.pathname.includes('support.html')) {
            document.body.appendChild(supportButton);
        }
    }

    createSupportButton();

    // Add support link to user dropdown if it exists
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        const supportLink = document.createElement('a');
        supportLink.href = 'support.html';
        supportLink.innerHTML = '<i class="fas fa-headset"></i> Support';
        userDropdown.appendChild(supportLink);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-links') && 
                !e.target.closest('.mobile-menu-btn') && 
                navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Loading State Handler
    window.showLoading = function() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(overlay);
        setTimeout(() => overlay.classList.add('active'), 10);
    };

    window.hideLoading = function() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
    };

    // Example usage for loading states
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.hasAttribute('data-no-loading')) {
                showLoading();
            }
        });
    });

    // Theme Toggle
    const createThemeToggle = () => {
        const toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
        toggle.setAttribute('aria-label', 'Toggle Dark Mode');
        
        // Set initial theme
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        toggle.innerHTML = currentTheme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';

        toggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            // Animate theme change
            const transition = document.createElement('div');
            transition.className = 'page-transition';
            document.body.appendChild(transition);
            
            setTimeout(() => {
                transition.classList.add('active');
            }, 10);

            setTimeout(() => {
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                toggle.innerHTML = newTheme === 'dark' ? 
                    '<i class="fas fa-sun"></i>' : 
                    '<i class="fas fa-moon"></i>';
                
                transition.classList.remove('active');
                setTimeout(() => transition.remove(), 600);
            }, 600);
        });

        document.body.appendChild(toggle);
    };

    createThemeToggle();

    // Enhanced Page Transitions
    const enhancePageTransitions = () => {
        document.querySelectorAll('a').forEach(link => {
            if (link.hostname === window.location.hostname) {
                link.addEventListener('click', (e) => {
                    if (!link.hasAttribute('data-no-transition')) {
                        e.preventDefault();
                        const href = link.getAttribute('href');
                        
                        const transition = document.createElement('div');
                        transition.className = 'page-transition';
                        document.body.appendChild(transition);
                        
                        setTimeout(() => {
                            transition.classList.add('active');
                        }, 10);

                        setTimeout(() => {
                            window.location.href = href;
                        }, 600);
                    }
                });
            }
        });
    };

    enhancePageTransitions();

    // Smooth Scroll Animation
    const smoothScrollTo = (element, duration = 1000) => {
        const target = element.getBoundingClientRect().top;
        const startPos = window.pageYOffset;
        const startTime = performance.now();

        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const animation = (currentTime) => {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            window.scrollTo(0, startPos + target * ease(progress));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Apply smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                smoothScrollTo(target);
            }
        });
    });

    // Enhanced Card Hover Effects
    document.querySelectorAll('.feature-card, .course-card, .job-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = 'var(--hover-shadow)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--card-shadow)';
        });
    });
};
