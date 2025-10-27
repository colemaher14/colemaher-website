class ProjectManager {
    constructor() {
        this.projects = [];
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderFeaturedProjects();
        this.renderProjectsByCategory('professional', 'professional-projects');
        this.renderProjectsByCategory('written', 'written-projects');
        this.renderProjectsByCategory('creative', 'creative-projects');
    }

    async loadProjects() {
        try {
            const response = await fetch('./projects.json');
            const data = await response.json();
            this.projects = data.projects;
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }

    renderFeaturedProjects() {
        const container = document.getElementById('featured-projects-container');
        const featuredProjects = this.projects.filter(project => project.featured);
        
        container.innerHTML = featuredProjects.map(project => 
            this.createProjectCard(project)
        ).join('');
    }

    renderProjectsByCategory(category, containerId) {
        const container = document.getElementById(containerId);
        const categoryProjects = this.projects.filter(project => project.category === category);
        
        container.innerHTML = categoryProjects.map(project => 
            this.createProjectCard(project)
        ).join('');
    }

    createProjectCard(project) {
        const fileIcon = this.getFileIcon(project.fileType);
        const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="project-card" data-project-id="${project.id}">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <span class="project-date">${formattedDate}</span>
                    ${project.file ? `
                        <a href="${project.file}" class="download-btn" download>
                            ${fileIcon} Download (${project.fileSize})
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getFileIcon(fileType) {
        const icons = {
            'pdf': '📄',
            'video': '🎥',
            'audio': '🎵',
            'max': '⚡'
        };
        return icons[fileType] || '📁';
    }

    // Method to add new project (for future use)
    addProject(projectData) {
        const newProject = {
            id: this.projects.length + 1,
            ...projectData
        };
        this.projects.push(newProject);
        this.saveProjects();
    }

    async saveProjects() {
        // In a real implementation, this would save back to the JSON file
        // For now, we'll just update the display
        this.renderFeaturedProjects();
        this.renderProjectsByCategory('professional', 'professional-projects');
        this.renderProjectsByCategory('written', 'written-projects');
        this.renderProjectsByCategory('creative', 'creative-projects');
    }
}

// Initialize project manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectManager = new ProjectManager();
});
