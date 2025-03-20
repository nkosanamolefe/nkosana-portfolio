document.addEventListener("DOMContentLoaded", function() {
  // Tab functionality
  function openTab(event, tabName) {
    // Hide all tab content
    let tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Deactivate all tab buttons
    let tabbuttons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabbuttons.length; i++) {
      tabbuttons[i].classList.remove("active");
    }
    // Show the current tab content
    document.getElementById(tabName).style.display = "block";
    // Add "active" class to the button that opened the tab
    event.currentTarget.classList.add("active");
  }

  // Initial tab open
  const firstTabButton = document.querySelector(".tab-button");
  if (firstTabButton) {
    firstTabButton.classList.add("active");
    openTab({ currentTarget: firstTabButton }, firstTabButton.dataset.tab);
  }
  // Add click listener to all tab buttons
  let tabbuttons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabbuttons.length; i++) {
    tabbuttons[i].addEventListener("click", function(event) {
      openTab(event, this.dataset.tab);
    });
  }
  
      // Project expansion functionality
      const projectCards = document.querySelectorAll('.project-card-link');
      const projectsContainer = document.querySelector('.projects-container');
      const projectExpanded = document.querySelector('.project-expanded');
      const breadcrumbs = document.querySelector('.breadcrumbs');
      const currentPage = document.querySelector('.current-page');
      const scrollableContent = document.querySelector('.scrollable-content');
  
      // Handle project card clicks
      projectCards.forEach(card => {
          card.addEventListener('click', async function(e) {
              e.preventDefault();
              const projectTitle = this.querySelector('h3').textContent;
              
              // Update breadcrumbs
              currentPage.textContent = projectTitle;
              breadcrumbs.style.display = 'flex';
              
              // Hide projects grid and show expanded content
              projectsContainer.style.display = 'none';
              projectExpanded.classList.add('active');
              scrollableContent.classList.add('expanded');
              
              try {
                  // Load project content
                  const response = await fetch(this.href);
                  const html = await response.text();
                  const parser = new DOMParser();
                  const doc = parser.parseFromString(html, 'text/html');
                  const content = doc.querySelector('.project-content');
                  
                  if (content) {
                      projectExpanded.innerHTML = content.innerHTML;
                  } else {
                      throw new Error('Project content not found');
                  }
              } catch (error) {
                  console.error('Error loading project content:', error);
                  projectExpanded.innerHTML = '<p>Error loading project content. Please try again.</p>';
              }
          });
      });
  
      // Handle breadcrumb navigation back to projects
      const portfolioLink = document.querySelector('.breadcrumbs a[href="#home"]');
      if (portfolioLink) {
          portfolioLink.addEventListener('click', function(e) {
              e.preventDefault();
              projectsContainer.style.display = 'grid';
              projectExpanded.classList.remove('active');
              scrollableContent.classList.remove('expanded');
              currentPage.textContent = 'Projects';
          });
      }

});

const darkModeToggle = document.querySelector(".dark-mode-toggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  // Optional: Save the preference in local storage if desired.
});