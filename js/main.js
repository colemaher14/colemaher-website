// Tab navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show target tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Mobile menu toggle (for future use)
    const setupMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        document.querySelector('.header').appendChild(menuToggle);

        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });
    };

    // Initialize mobile menu if needed
    if (window.innerWidth <= 768) {
        setupMobileMenu();
    }
});

// Utility function for adding new projects
function addNewProject(projectData) {
    if (window.projectManager) {
        window.projectManager.addProject(projectData);
    }
}
