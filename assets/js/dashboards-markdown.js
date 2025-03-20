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
  
    // Project selection functionality
    const projects = {
      "asset-management": {
        name: "Asset Management",
        url: "https://raw.githubusercontent.com/nkosanamolefe/data-visualization/refs/heads/main/Customer%20churn/README.md",
        baseUrl: "https://raw.githubusercontent.com/nkosanamolefe/data-visualization/refs/heads/main/Customer%20churn/"
      },
      "advisory": {
        name: "Advisory",
        url: "https://raw.githubusercontent.com/nkosanamolefe/sql/main/Customer%20churn",
        baseUrl: "" //for pulling images
      },
      "legal": {
        name: "Legal",
        url: "https://raw.githubusercontent.com/nkosanamolefe/sql/refs/heads/main/HR/README.md",
        baseUrl: ""
      },
      "credit": {
        name: "Credit",
        url: "https://raw.githubusercontent.com/nkosanamolefe/credit/refs/heads/main/README.md",
        baseUrl: ""
      },
      "real-estate": {
        name: "Real Estate",
        url: "https://raw.githubusercontent.com/nkosanamolefe/real-estate/refs/heads/main/README.md",
        baseUrl: ""
      }
    };
  
    function loadMarkdown(url, baseUrl, containerId) {
      fetch(url)
        .then(response => response.text())
        .then(markdownContent => {
          // Convert relative image URLs to absolute URLs
          const updatedContent = markdownContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
            if (!src.startsWith('http')) {
              src = baseUrl + src;
            }
            return `![${alt}](${src})`;
          });
  
          const sanitizedContent = DOMPurify.sanitize(marked.parse(updatedContent));
          document.getElementById(containerId).innerHTML = sanitizedContent;
        })
        .catch(error => console.error('Error fetching markdown content:', error));
    }
  
    // Load markdown content for each tab
    for (const [tabName, project] of Object.entries(projects)) {
      loadMarkdown(project.url, project.baseUrl, `${tabName}-content`);
    }
  });