// Initialize AOS animations
AOS.init({
  duration: 1000,
  once: true
});

// Set dynamic year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// Typing animation configuration
const typingText = document.getElementById('typingText');
const fullText = 'Software Developer specializing in Python, FastAPI, SQL and Artificial Intelligence.';
let charIndex = 0;
let isTypingComplete = false;

// Lock typing height for mobile to prevent layout jumping
function lockTypingHeightForMobile() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const wrapper = document.querySelector('.typing-wrapper');

  if (!isMobile || !wrapper) {
    wrapper.style.height = '';
    return;
  }

  const probe = document.createElement('div');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  probe.style.left = '-9999px';

  probe.innerHTML = `
    <h3 style="margin:0;font-weight:500;">
      <span class="typing-text" style="display:inline-block;font-size:1.1rem;line-height:1.5;white-space:normal;">
        ${fullText}
      </span><span class="typing-caret" style="display:inline-block;width:1.5px;height:1em;"></span>
    </h3>
  `;

  document.body.appendChild(probe);
  const finalHeight = probe.getBoundingClientRect().height;
  document.body.removeChild(probe);

  wrapper.style.height = finalHeight + 'px';
}

// Typing animation implementation
function typeWriter() {
  if (charIndex < fullText.length) {
    typingText.textContent += fullText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50);
  } else {
    isTypingComplete = true;
  }
}

// Initialize typing animation
function initTyping() {
  typingText.textContent = '';
  charIndex = 0;
  isTypingComplete = false;

  lockTypingHeightForMobile();
  setTimeout(typeWriter, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTyping);
} else {
  initTyping();
}

// Handle window resize for mobile layout adjustments
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    lockTypingHeightForMobile();
  }, 200);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Close mobile navbar on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).toggle();
    }
  });
});

// Form notification system
function showFormNotification(message, type) {
  const notification = document.getElementById('form-notification');
  notification.textContent = message;
  notification.className = `form-notification ${type}`;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}

// Load resume data from API
async function loadResumeData() {
  try {
    const response = await fetch('/api/projects');
    const projectsData = await response.json();
    
    const resumeResponse = await fetch('/api/resume');
    const resumeData = await resumeResponse.json();

    populateProjects(projectsData.projects);
    populateExperience(resumeData.experience);
    populateEducation(resumeData.education);

  } catch (error) {
    console.error('Error loading resume data:', error);
    loadFallbackContent();
  }
}

// Fallback content when API is unavailable
function loadFallbackContent() {
  const fallbackProjects = [
    {
      title: "Python FastAPI MCP Appointment Manager (AI Integration)",
      description: "Intelligent appointment management backend built with FastAPI and PostgreSQL, containerized with Docker and integrated with Claude via Model Context Protocol (MCP). This project demonstrates how artificial intelligence can directly interact with a backend system to create, list, update, and delete appointments.",
      technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "MCP", "Claude", "Artificial Intelligence"],
      github: "https://github.com/Samuelr2112/mcp-project",
      demo: null,
      image: "/images/project5.png",
      features: [
        "AI-powered appointment management with Claude",
        "CRUD operations with FastAPI + PostgreSQL",
        "Containerized deployment with Docker Compose",
        "Model Context Protocol (MCP) integration",
        "Swagger UI for live API testing"
      ]
    },
    {
      title: "Java Spring Boot Task Manager",
      description: "Enterprise-level task and appointment management system built with Spring Boot. Provides comprehensive CRUD operations, RESTful API design, and a maintainable layered architecture. Endpoints tested directly from the command line using cURL.",
      technologies: ["Java", "Spring Boot", "REST API", "OOP", "Maven"],
      github: "https://github.com/Samuelr2112/Task-and-Appointment-Management-System-with-Java",
      demo: null,
      image: "/images/project4.png",
      features: [
        "Complete REST API with CRUD operations",
        "Command-line testing with cURL",
        "Layered architecture with separation of concerns",
        "Future-ready for validation, unit testing, and database integration"
      ]
    },
    {
      title: "Binary Search Tree Data Parser",
      description: "Command-line application implementing custom Binary Search Tree for efficient sales data parsing and analysis. Demonstrates advanced data structures and algorithm implementation.",
      technologies: ["Python", "Data Structures", "Algorithms", "CSV"],
      github: "https://github.com/Samuelr2112/Python-Sales-Data-BST-Parser",
      demo: null,
      image: "/images/project3.png",
      features: [
        "Custom BST implementation",
        "Efficient data parsing",
        "Interactive CLI",
        "CSV processing capabilities"
      ]
    },
    {
      title: "SQL Inventory Management System",
      description: "Full-featured inventory tracking system with SQL database integration. Features both command-line interface and web dashboard for comprehensive inventory management.",
      technologies: ["Python", "SQLite", "SQL", "Flask", "HTML/CSS"],
      github: "https://github.com/Samuelr2112/Inventory-Tracker-with-SQLite-and-Python",
      demo: null,
      image: "/images/project1.png",
      features: [
        "Full CRUD operations with SQL",
        "Web interface with Flask",
        "Database schema design",
        "Inventory reporting"
      ]
    },
    {
      title: "FastAPI Portfolio Website",
      description: "This modern, responsive portfolio website built with FastAPI backend and vanilla JavaScript frontend. Deployed on AWS with professional design and smooth animations.",
      technologies: ["Python", "FastAPI", "HTML/CSS", "JavaScript", "Bootstrap", "AWS"],
      github: "https://github.com/Samuelr2112/portfolio-website",
      demo: "https://www.samuelrincon.online",
      image: "/images/project2.png",
      features: [
        "Professional responsive design",
        "FastAPI REST API backend",
        "Contact form with email integration",
        "AWS Lightsail deployment"
      ]
    }
  ];
  
  const fallbackEducation = [
    {
      institution: "Southern New Hampshire University",
      degree: "Bachelor of Science in Computer Science",
      period: "May 2023 - March 2025",
      gpa: "3.69",
      status: "Graduated",
      focus: "Backend Development, API Design, Database Management",
      achievements: [
        "Multiple honors and certificates for outstanding performance",
        "Merit recognition available at meritpages.com/samuelrincon"
      ]
    },
    {
      institution: "Lone Star College",
      degree: "Associate of Arts",
      period: "August 2019 – May 2022",
      gpa: "3.75",
      status: "Graduated"
    }
  ];
  
  const fallbackExperience = [
    {
      title: "Online Grocery Associate & In-Home Delivery Driver",
      company: "Walmart",
      location: "The Woodlands, TX",
      period: "March 2023 - Present",
      achievements: [
        "Delivered customer orders while maintaining a friendly, respectful, and professional relationship with clients.",
        "Worked under time pressure to meet strict deadlines and ensure efficient order fulfillment.",
        "Managed TC devices and backroom operations using the GIF software system for inventory control and organization."
      ]
    },
    {
      title: "Moving Crew Lead & Operations Coordinator", 
      company: "Out The Door Moving",
      location: "Conroe, TX",
      period: "June 2022 - March 2023",
      achievements: [
        "Led teams of 2-6 movers with 100% customer satisfaction",
        "Implemented efficient logistics reducing move time by 20%",
        "Trained 12+ new team members on safety protocols"
      ],
      reviews: [
        {"customer": "Michael Coleman","rating": 5,"comment": "Samuel and Kevin were exactly the help we needed. They took very good care of our possessions and were very professional."},
        {"customer": "Janese Sokulski","rating": 5,"comment": "Enjoyed the attitude of these young men and they did an excellent job. On time and worked very hard. Highly recommend this group Samuel, Jony, Gabriel, Juan and Jose."},
        {"customer": "Irene Patricia Regalo Estrada","rating": 5,"comment": "We had the pleasure of having Samuel, Kevin and Juan move us to our new home. Very respectful, efficient, and quick. They also made sure not to damage any of our items."},
        {"customer": "Rebecca Stone","rating": 5,"comment": "Samuel and Marcelo were so polite and moved so quickly! I was very pleased with their work. Would hire them again for sure!"},
        {"customer": "Barraque Monfils-Evangelista","rating": 5,"comment": "Samuel and Daniel were quick, efficient, and patient when we had to wait at the storage unit. I recommend requesting them by name."}
      ]
    },
    {
      title: "Web & Systems Assistant (Part-Time)",
      company: "Aldea Music Corp",
      location: "The Woodlands, TX",
      period: "March 2022 – Present",
      achievements: [
        "Managed and maintained the company's HTML-based online receipt system",
        "Provided updates and light maintenance for the company website",
        "Assisted with digital record-keeping and ensuring smooth operation of online systems"
      ]
    }
  ];
  
  populateProjects(fallbackProjects);
  populateEducation(fallbackEducation);
  populateExperience(fallbackExperience);
}

// Function to convert project titles to URL slugs
function getProjectSlug(title) {
  console.log("Getting slug for title:", title); // Debug log
  
  const slugMap = {
    "Python FastAPI MCP Appointment Manager (AI Integration)": "mcp-appointment-manager",
    "Java Spring Boot Task Manager": "springboot-task-manager", 
    "FastAPI Portfolio Website": "fastapi-portfolio",
    "Binary Search Tree Data Parser": "bst-parser",
    "SQL Inventory Management System": "inventory-tracker"
  };
  
  const slug = slugMap[title] || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  console.log("Generated slug:", slug); // Debug log
  
  return slug;
}

// Populate projects section
function populateProjects(projects) {
  const container = document.getElementById('projects-container');
  
  projects.forEach((project, index) => {
    console.log("Processing project:", project.title); // Debug log
    
    const projectCard = document.createElement('div');
    projectCard.className = 'col-lg-6 mb-4';
    projectCard.setAttribute('data-aos', 'fade-up');
    projectCard.setAttribute('data-aos-delay', (index * 100).toString());
    
    const showDemo = project.demo && project.title !== 'FastAPI Portfolio Website';
    
    const imagePreview = project.image ? 
      `<img src="${project.image}" alt="${project.title} project preview" class="project-preview" 
           onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
       <div class="project-fallback-icon" style="display: none;"><i class="fas fa-project-diagram"></i></div>` :
      `<div class="project-fallback-icon"><i class="fas fa-project-diagram"></i></div>`;
    
    const projectSlug = getProjectSlug(project.title);
    console.log("Case Study URL will be:", `/projects/${projectSlug}`); // Debug log
    
    projectCard.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          ${imagePreview}
          <h5 class="card-title text-gradient">${project.title}</h5>
          <p class="card-text">${project.description}</p>
          <div class="mb-3">
            ${project.technologies.map(tech => 
              `<span class="badge bg-secondary me-1 mb-1">${tech}</span>`
            ).join('')}
          </div>
          <div class="card-features mb-3">
            <h6 class="text-muted">Key Features:</h6>
            <ul class="list-unstyled">
              ${project.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
            </ul>
          </div>
          <div class="mt-auto">
            <div class="d-flex flex-wrap gap-2 justify-content-center">
              <a href="${project.github}" target="_blank" class="btn-outline-primary">
                <i class="fab fa-github me-2"></i>View Code
              </a>
              <a href="/projects/${projectSlug}" class="btn-outline-primary">
                <i class="fas fa-search me-2"></i>Case Study
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.appendChild(projectCard);
    console.log("Project card added for:", project.title); // Debug log
  });
}

// Populate experience section
function populateExperience(experience) {
  const container = document.getElementById('experience-container');
  
  experience.forEach((job, index) => {
    const experienceCard = document.createElement('div');
    experienceCard.className = 'experience-card';
    experienceCard.setAttribute('data-aos', 'fade-up');
    experienceCard.setAttribute('data-aos-delay', (index * 100).toString());
    
    experienceCard.innerHTML = `
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h5 class="text-gradient">${job.title}</h5>
          <h6 class="text-muted">${job.company} - ${job.location}</h6>
        </div>
        <span class="date-badge">${job.period}</span>
      </div>
      <ul class="list-unstyled">
        ${job.achievements.map(achievement => `<li><i class="fas fa-arrow-right text-primary me-2"></i>${achievement}</li>`).join('')}
      </ul>
    `;
    
    container.appendChild(experienceCard);
  });

  const leadMoverJob = experience.find(job => job.title === 'Moving Crew Lead & Operations Coordinator');
  if (leadMoverJob && leadMoverJob.reviews) {
    populateReviews(leadMoverJob.reviews);
    document.getElementById('reviews-section').style.display = 'block';
    document.getElementById('view-more-reviews').style.display = 'block';
  }
}

// Populate customer reviews carousel
function populateReviews(reviews) {
  const container = document.getElementById('reviews-container');
  
  reviews.forEach((review, index) => {
    const reviewSlide = document.createElement('div');
    reviewSlide.className = `carousel-item ${index === 0 ? 'active' : ''}`;
    
    reviewSlide.innerHTML = `
      <div class="review-slide">
        <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
        <div class="review-top">${review.customer}</div>
        <div class="review-mid">"${review.comment}"</div>
      </div>
    `;
    
    container.appendChild(reviewSlide);
  });
}

// Populate education section
function populateEducation(education) {
  const container = document.getElementById('education-container');
  
  education.forEach((edu, index) => {
    const educationCard = document.createElement('div');
    educationCard.className = 'education-card';
    educationCard.setAttribute('data-aos', 'fade-right');
    educationCard.setAttribute('data-aos-delay', (index * 100).toString());
    
    const logoSrc = edu.institution.includes('Southern New Hampshire') ? 
      '/images/SNHU.png' :
      '/images/LSC.png';
    
    const logoAlt = edu.institution.includes('Southern New Hampshire') ? 
      'Southern New Hampshire University logo' : 
      'Lone Star College logo';
    
    educationCard.innerHTML = `
      <img src="${logoSrc}" alt="${logoAlt}" onerror="this.style.display='none'">
      <div class="education-info flex-grow-1">
        <h5>${edu.degree}</h5>
        <h6 class="text-muted">${edu.institution}</h6>
        <p class="mb-2">${edu.period} ${edu.status ? `- ${edu.status}` : ''}</p>
        <div class="gpa-badge">GPA: ${edu.gpa}</div>
        ${edu.focus ? `<p class="mt-2"><strong>Focus:</strong> ${edu.focus}</p>` : ''}
        ${edu.achievements ? `<ul class="mt-2">${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}</ul>` : ''}
        ${edu.institution.includes('Southern New Hampshire') ? `
          <div class="mt-3">
            <a href="http://meritpages.com/samuelrincon" target="_blank" class="btn-custom btn-sm">
              <i class="fas fa-award me-2"></i>View Honors & Badges
            </a>
          </div>
        ` : ''}
      </div>
    `;
    
    container.appendChild(educationCard);
  });
}

// Contact form submission handler
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const button = this.querySelector('button[type="submit"]');
  const originalText = button.innerHTML;
  
  button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
  button.disabled = true;

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (result.status === "success") {
      showFormNotification('✅ Message sent successfully! Thank you for reaching out.', 'success');
      this.reset();
    } else {
      showFormNotification('❌ Error: ' + result.message, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showFormNotification('❌ There was an error sending your message. Please try emailing me directly at samuelrinconm@yahoo.com', 'error');
  } finally {
    button.innerHTML = originalText;
    button.disabled = false;
  }
});

// Update navbar active link based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Initialize data loading on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  loadResumeData();
});

// Add dynamic background particles
function createParticles() {
  const hero = document.querySelector('.hero');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.backgroundColor = 'rgba(255,255,255,0.1)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `float ${Math.random() * 20 + 10}s ease-in-out infinite`;
    particle.style.animationDelay = (Math.random() * 20) + 's';
    
    hero.appendChild(particle);
  }
}

// Initialize particles after delay
setTimeout(createParticles, 2000);