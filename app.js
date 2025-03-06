document.addEventListener('DOMContentLoaded', function() {
    const projectDetailsSection = document.querySelector('.project-details');
    const projectCards = document.querySelectorAll('.project-card .project-content');
    const body = document.querySelector('body');
    
    if (projectDetailsSection) {
        projectDetailsSection.style.display = 'none';
    }
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            openProjectDetails(this);
        });
    });
    
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
        closeButton.addEventListener('click', closeProjectDetails);
    }
    
    /**
     * Opens the project details section with appropriate content
     * @param {HTMLElement} cardElement - The clicked card element
     */
    function openProjectDetails(cardElement) {
        if (!projectDetailsSection) return;
        
        projectDetailsSection.style.display = 'block';
        projectDetailsSection.style.animation = "bg-blur 0.25s cubic-bezier(.25,0,.25,1) forwards";
        
        const detailsContent = projectDetailsSection.querySelector('.details-content');
        if (detailsContent) {
            detailsContent.scrollTop = 0;
        }
        
        body.classList.add("no-scroll");
        
        updateProjectInfo(cardElement);
    }
    
    function closeProjectDetails() {
        if (!projectDetailsSection) return;
        
        projectDetailsSection.style.display = 'none';
        body.classList.remove('no-scroll');
    }
    
    /**
     * Updates the project information in the details section
     * @param {HTMLElement} cardElement - The clicked card element
     */
    function updateProjectInfo(cardElement) {
        const projectNumber = document.querySelector('.project-number');
        const projectTitle = document.querySelector('.project-title');
        
        if (!projectNumber || !projectTitle) return;
        
        if (cardElement.querySelector('.project-logo')) {
            projectNumber.textContent = "01.";
            projectTitle.textContent = "Envision Center";
        } else if (cardElement.closest('#portfolio-project')) {
            projectNumber.textContent = "02.";
            projectTitle.textContent = "Friendly Portfolio";
        } else if (cardElement.closest('#cdh-project')) {
            projectNumber.textContent = "03.";
            projectTitle.textContent = "CDH Linux Terminal";
        }
    }
});