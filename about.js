document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation
    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    // Reveal animations on scroll
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.mission-content, .team-card, .value-card, .timeline-item').forEach((el) => {
            el.classList.add('hidden');
            observer.observe(el);
        });
    };

    // Initialize animations
    observeElements();
}); 