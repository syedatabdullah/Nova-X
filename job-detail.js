document.addEventListener('DOMContentLoaded', () => {
    // Save Job Button Functionality
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const icon = saveBtn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.replace('far', 'fas');
                saveBtn.classList.add('saved');
                showToast('Job saved successfully!');
            } else {
                icon.classList.replace('fas', 'far');
                saveBtn.classList.remove('saved');
                showToast('Job removed from saved items');
            }
        });
    }

    // Apply Button Functionality
    const applyBtns = document.querySelectorAll('.apply-btn');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Check if user is logged in (you'll need to implement this)
            const isLoggedIn = false; // Replace with actual auth check
            
            if (!isLoggedIn) {
                window.location.href = 'login.html';
                return;
            }
            
            showApplicationModal();
        });
    });

    // Toast Notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Application Modal
    function showApplicationModal() {
        const modal = document.createElement('div');
        modal.className = 'application-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal"><i class="fas fa-times"></i></button>
                <h2>Apply for Amazon FBA Specialist</h2>
                <form id="applicationForm">
                    <div class="form-group">
                        <label for="resume">Upload Resume</label>
                        <input type="file" id="resume" accept=".pdf,.doc,.docx" required>
                    </div>
                    <div class="form-group">
                        <label for="coverLetter">Cover Letter</label>
                        <textarea id="coverLetter" rows="5" placeholder="Why should we hire you?" required></textarea>
                    </div>
                    <button type="submit" class="submit-btn">Submit Application</button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);

        // Close Modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.closest('.close-modal')) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });

        // Handle Form Submission
        const form = modal.querySelector('#applicationForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                showToast('Application submitted successfully!');
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            } catch (error) {
                console.error('Error submitting application:', error);
                showToast('Failed to submit application. Please try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Application';
            }
        });
    }

    // Load Similar Jobs
    loadSimilarJobs();
});

// Function to load similar jobs
async function loadSimilarJobs() {
    const jobsGrid = document.querySelector('.jobs-grid');
    if (!jobsGrid) return;

    try {
        // Simulate API call to get similar jobs
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Example similar jobs data
        const similarJobs = [
            {
                title: 'E-commerce Manager',
                company: 'Digital Solutions Inc',
                location: 'Islamabad',
                type: 'Full Time',
                salary: 'PKR 120,000 - 200,000'
            },
            {
                title: 'Amazon PPC Specialist',
                company: 'Global Ventures',
                location: 'Karachi',
                type: 'Remote',
                salary: 'PKR 100,000 - 180,000'
            }
        ];

        // Render similar jobs
        similarJobs.forEach(job => {
            const jobCard = createJobCard(job);
            jobsGrid.appendChild(jobCard);
        });
    } catch (error) {
        console.error('Error loading similar jobs:', error);
    }
}

// Function to create job card
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.innerHTML = `
        <h3>${job.title}</h3>
        <div class="job-info">
            <span><i class="fas fa-building"></i> ${job.company}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
            <span><i class="fas fa-clock"></i> ${job.type}</span>
        </div>
        <div class="job-salary">
            <i class="fas fa-money-bill-alt"></i> ${job.salary}
        </div>
        <a href="#" class="view-job-btn">View Job</a>
    `;
    return card;
} 