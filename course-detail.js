document.addEventListener('DOMContentLoaded', () => {
    // Course Preview Video Modal
    const previewBtn = document.querySelector('.preview-btn');
    const videoModal = createVideoModal();
    
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            document.body.appendChild(videoModal);
            setTimeout(() => videoModal.classList.add('active'), 10);
        });
    }

    function createVideoModal() {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal"><i class="fas fa-times"></i></button>
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/VIDEO_ID" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;

        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.close-modal')) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });

        return modal;
    }

    // Curriculum Accordion
    const moduleHeaders = document.querySelectorAll('.module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const module = header.parentElement;
            const isActive = module.classList.contains('active');
            const icon = header.querySelector('.fa-chevron-down');
            
            // Close all modules
            document.querySelectorAll('.module').forEach(mod => {
                mod.classList.remove('active');
                mod.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
            });
            
            // Open clicked module if it wasn't active
            if (!isActive) {
                module.classList.add('active');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Enroll Button
    const enrollBtn = document.querySelector('.enroll-btn');
    
    if (enrollBtn) {
        enrollBtn.addEventListener('click', async () => {
            // Check if user is logged in (you'll need to implement this)
            const isLoggedIn = false; // Replace with actual auth check
            
            if (!isLoggedIn) {
                window.location.href = 'login.html';
                return;
            }
            
            enrollBtn.disabled = true;
            enrollBtn.textContent = 'Processing...';
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Redirect to checkout or show success message
                window.location.href = 'checkout.html';
            } catch (error) {
                console.error('Enrollment error:', error);
                alert('Failed to process enrollment. Please try again.');
                enrollBtn.disabled = false;
                enrollBtn.textContent = 'Enroll Now';
            }
        });
    }

    // Rating Bars Animation
    const ratingBars = document.querySelectorAll('.rating-bar');
    
    function animateRatingBars() {
        ratingBars.forEach(bar => {
            const percentage = bar.dataset.percentage;
            bar.style.width = percentage + '%';
        });
    }

    // Animate rating bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateRatingBars();
                observer.unobserve(entry.target);
            }
        });
    });

    const reviewSection = document.querySelector('.reviews');
    if (reviewSection) {
        observer.observe(reviewSection);
    }

    // Sticky Course Card
    const courseCard = document.querySelector('.course-card');
    const header = document.querySelector('.navbar');
    
    if (courseCard && header) {
        const headerHeight = header.offsetHeight;
        const padding = 20;
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            courseCard.style.top = `${headerHeight + padding}px`;
            
            // Add shadow when scrolled
            if (scrollY > 0) {
                courseCard.style.boxShadow = 'var(--card-shadow)';
            } else {
                courseCard.style.boxShadow = 'none';
            }
        });
    }
});

// Add these styles to course-detail.css 