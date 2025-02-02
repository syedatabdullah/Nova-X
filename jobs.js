document.addEventListener('DOMContentLoaded', () => {
    // Sample job data
    const jobs = [
        // Full-Time Jobs
        {
            title: 'Amazon FBA Specialist',
            type: 'Full Time',
            location: 'Remote',
            experience: '2-3 years',
            salary: 'Rs. 80,000 - 150,000',
            description: 'Join our team as an Amazon FBA specialist and help scale successful e-commerce businesses. You will be responsible for product research, listing optimization, and inventory management.',
            requirements: [
                'Proven experience in Amazon FBA',
                'Strong analytical skills',
                'Excellent communication'
            ]
        },
        {
            title: 'Dropshipping Manager',
            type: 'Full Time',
            location: 'Lahore',
            experience: '1-2 years',
            salary: 'Rs. 70,000 - 120,000',
            description: 'Lead and optimize dropshipping operations for multiple successful online stores. Handle supplier relationships and ensure smooth order fulfillment.',
            requirements: [
                'Experience with Shopify',
                'Supplier management',
                'Inventory optimization'
            ]
        },
        {
            title: 'Senior Trading Analyst',
            type: 'Full Time',
            location: 'Islamabad',
            experience: '4+ years',
            salary: 'Rs. 150,000 - 250,000',
            description: 'Lead our trading team and develop advanced trading strategies. Mentor junior analysts and optimize trading operations.',
            requirements: [
                'Proven trading experience',
                'Team leadership skills',
                'Risk management expertise'
            ]
        },

        // Internship Positions
        {
            title: 'Trading Analyst Intern',
            type: 'Internship',
            location: 'Karachi',
            experience: 'Entry Level',
            salary: 'Rs. 25,000 - 35,000',
            description: 'Learn and grow as a trading analyst while working with experienced professionals. Great opportunity for fresh graduates.',
            requirements: [
                'Basic understanding of trading',
                'Strong mathematical skills',
                'Eagerness to learn'
            ]
        },
        {
            title: 'E-commerce Marketing Intern',
            type: 'Internship',
            location: 'Lahore',
            experience: 'Entry Level',
            salary: 'Rs. 20,000 - 30,000',
            description: 'Join our marketing team to learn digital marketing strategies for e-commerce. Hands-on experience with real campaigns.',
            requirements: [
                'Basic marketing knowledge',
                'Social media proficiency',
                'Creative mindset'
            ]
        },
        {
            title: 'Digital Content Intern',
            type: 'Internship',
            location: 'Remote',
            experience: 'Entry Level',
            salary: 'Rs. 15,000 - 25,000',
            description: 'Create engaging content for our e-commerce platforms. Learn content strategy and SEO optimization.',
            requirements: [
                'Strong writing skills',
                'Basic SEO knowledge',
                'Creative portfolio'
            ]
        }
    ];

    const jobsGrid = document.querySelector('.jobs-grid');
    const searchInput = document.querySelector('.search-input input');
    const searchBtn = document.querySelector('.search-btn');
    const filterSelects = document.querySelectorAll('.filter-options select');

    // Enhanced render function with sections
    const renderJobs = (jobsToRender) => {
        // Separate jobs by type
        const fullTimeJobs = jobsToRender.filter(job => job.type === 'Full Time');
        const internships = jobsToRender.filter(job => job.type === 'Internship');

        // Create HTML for job cards
        const createJobCard = (job) => `
            <div class="job-card">
                <div class="job-header">
                    <h3>${job.title}</h3>
                    <span class="job-type">${job.type}</span>
                </div>
                <div class="job-details">
                    <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                    <p><i class="fas fa-briefcase"></i> ${job.experience}</p>
                    <p><i class="fas fa-dollar-sign"></i> ${job.salary}</p>
                </div>
                <p class="job-description">${job.description}</p>
                <div class="requirements">
                    <h4>Requirements:</h4>
                    <ul>
                        ${job.requirements.map(req => `<li><i class="fas fa-check"></i> ${req}</li>`).join('')}
                    </ul>
                </div>
                <a href="#" class="apply-btn">Apply Now</a>
            </div>
        `;

        // Combine sections with headers
        jobsGrid.innerHTML = `
            ${fullTimeJobs.length ? `
                <div class="jobs-section">
                    <h2 class="section-title">Full Time Positions</h2>
                    <div class="jobs-grid-section">
                        ${fullTimeJobs.map(createJobCard).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${internships.length ? `
                <div class="jobs-section">
                    <h2 class="section-title">Internship Opportunities</h2>
                    <div class="jobs-grid-section">
                        ${internships.map(createJobCard).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${!jobsToRender.length ? `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No jobs found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            ` : ''}
        `;
    };

    // Initial render
    renderJobs(jobs);

    // Search functionality
    const handleSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredJobs = jobs.filter(job => 
            job.title.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm)
        );
        renderJobs(filteredJobs);
    };

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Filter functionality
    const handleFilter = () => {
        let filteredJobs = [...jobs];
        
        filterSelects.forEach(select => {
            const value = select.value.toLowerCase();
            if (value) {
                filteredJobs = filteredJobs.filter(job => {
                    switch(select.name) {
                        case 'type':
                            return job.type.toLowerCase() === value;
                        case 'location':
                            return job.location.toLowerCase() === value;
                        case 'experience':
                            return job.experience.toLowerCase().includes(value);
                        default:
                            return true;
                    }
                });
            }
        });

        renderJobs(filteredJobs);
    };

    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilter);
    });
}); 