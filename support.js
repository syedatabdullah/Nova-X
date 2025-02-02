document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchInput = document.querySelector('.search-box input');
    const helpArticles = document.querySelectorAll('.category-card li a');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        helpArticles.forEach(article => {
            const text = article.textContent.toLowerCase();
            const listItem = article.parentElement;
            
            if (text.includes(searchTerm)) {
                listItem.style.display = 'block';
            } else {
                listItem.style.display = 'none';
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('i').style.transform = 'rotate(0deg)';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // Support Form Handling
    const supportForm = document.getElementById('supportForm');
    
    if (supportForm) {
        supportForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = supportForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Add loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                alert('Message sent successfully! Our support team will get back to you soon.');
                supportForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // New Ticket Modal
    const newTicketBtn = document.querySelector('.new-ticket-btn');
    
    if (newTicketBtn) {
        newTicketBtn.addEventListener('click', () => {
            const modal = createTicketModal();
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('active'), 10);
        });
    }

    function createTicketModal() {
        const modal = document.createElement('div');
        modal.className = 'ticket-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal"><i class="fas fa-times"></i></button>
                <h2>Create New Support Ticket</h2>
                <form id="ticketForm">
                    <div class="form-group">
                        <label for="ticket-subject">Subject</label>
                        <input type="text" id="ticket-subject" required>
                    </div>
                    <div class="form-group">
                        <label for="ticket-type">Type</label>
                        <select id="ticket-type" required>
                            <option value="">Select ticket type</option>
                            <option value="technical">Technical Issue</option>
                            <option value="billing">Billing Issue</option>
                            <option value="course">Course Related</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ticket-description">Description</label>
                        <textarea id="ticket-description" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Create Ticket</button>
                </form>
            </div>
        `;

        // Close modal functionality
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.close-modal')) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });

        // Handle ticket form submission
        const ticketForm = modal.querySelector('#ticketForm');
        ticketForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = ticketForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                alert('Ticket created successfully!');
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
                // Optionally refresh ticket list here
            } catch (error) {
                console.error('Error creating ticket:', error);
                alert('Failed to create ticket. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Create Ticket';
            }
        });

        return modal;
    }

    // Smooth scroll for quick links
    const quickLinks = document.querySelectorAll('.quick-links a');
    
    quickLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 