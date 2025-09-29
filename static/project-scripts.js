/* 
  Project-specific JavaScript that extends your main site functionality
  Works seamlessly with your existing main.js
  Use with: <script src="/static/project-scripts.js"></script>
*/

// Initialize project-specific functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initProjectPage();
});

// Main project page initialization - following your main.js pattern
function initProjectPage() {
  // Initialize AOS animations if available (same as your main.js)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true
    });
  }

  // Set dynamic year in footer (same as your main.js)
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Initialize navbar scroll effect (same as your main.js)
  initNavbarScroll();
  
  // Initialize project-specific features
  initBackToTop();
  initSmoothScrolling();
  initMobileNavbar();
  initProjectAnimations();
  initQuickNavigation();
}

// Navbar scroll effect - exact same as your main.js
function initNavbarScroll() {
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  });
}

// Back to top button functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Smooth scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Smooth scrolling for anchor links - enhanced version of your main.js
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || targetId === '#home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const target = document.querySelector(targetId);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Mobile navbar functionality - same as your main.js
function initMobileNavbar() {
  // Close mobile navbar on link click
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Use Bootstrap's collapse if available
        if (typeof bootstrap !== 'undefined') {
          new bootstrap.Collapse(navbarCollapse).toggle();
        } else {
          // Fallback for manual toggle
          navbarCollapse.classList.remove('show');
        }
      }
    });
  });
}

// Project-specific animations and interactions
function initProjectAnimations() {
  // Tech badge hover effects
  const techBadges = document.querySelectorAll('.tech-badge');
  techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    badge.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Feature card interactions
  const featureCards = document.querySelectorAll('.feature-item');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });

  // Sidebar card hover effects
  const sidebarCards = document.querySelectorAll('.sidebar-card');
  sidebarCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Challenge and roadmap item animations
  const animatedItems = document.querySelectorAll('.challenge-item, .roadmap-item');
  animatedItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.challenge-icon, .roadmap-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.challenge-icon, .roadmap-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });
}

// Quick navigation functionality
function initQuickNavigation() {
  const navLinks = document.querySelectorAll('.nav-link-item[data-scroll-to]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSelector = this.getAttribute('data-scroll-to');
      
      // Try to find the target by ID or by section title
      let target = document.getElementById(targetSelector);
      
      if (!target) {
        // Try to find by section title containing the text
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
          const title = section.querySelector('.section-title');
          if (title && title.textContent.toLowerCase().includes(targetSelector.toLowerCase())) {
            target = section;
          }
        });
      }
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Add active state to clicked link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}

// Intersection Observer for active navigation highlighting
function initScrollSpy() {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link-item[data-scroll-to]');
  
  const observerOptions = {
    rootMargin: '-80px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Find corresponding nav link and add active class
        const sectionTitle = entry.target.querySelector('.section-title');
        if (sectionTitle) {
          const titleText = sectionTitle.textContent.toLowerCase();
          navLinks.forEach(link => {
            const linkTarget = link.getAttribute('data-scroll-to').toLowerCase();
            if (titleText.includes(linkTarget) || linkTarget.includes(titleText.split(' ')[0])) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Enhanced window resize handling - following your main.js pattern
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // Recalculate any responsive elements if needed
    adjustLayoutForScreenSize();
  }, 250);
});

// Adjust layout based on screen size
function adjustLayoutForScreenSize() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const sidebar = document.querySelector('.project-sidebar');
  
  if (sidebar) {
    if (isMobile) {
      sidebar.style.position = 'static';
      sidebar.style.top = 'auto';
    } else {
      sidebar.style.position = 'sticky';
      sidebar.style.top = '100px';
    }
  }
}

// Initialize additional features after a small delay
setTimeout(() => {
  initScrollSpy();
  adjustLayoutForScreenSize();
}, 100);

// Add loading states for external links
function initExternalLinks() {
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      const originalText = this.innerHTML;
      const isGitHub = this.href.includes('github.com');
      const isDemo = this.href.includes('demo') || this.textContent.includes('Demo');
      
      // Add loading state for a brief moment
      if (isGitHub) {
        this.innerHTML = '<i class="fab fa-github me-2"></i>Opening...';
      } else if (isDemo) {
        this.innerHTML = '<i class="fas fa-external-link-alt me-2"></i>Loading...';
      }
      
      // Restore original text after delay
      setTimeout(() => {
        this.innerHTML = originalText;
      }, 1000);
    });
  });
}

// Initialize external links after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initExternalLinks, 500);
});

// Add CSS animation classes dynamically for enhanced interactions
const additionalStyles = `
  .tech-badge {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .feature-icon {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-link-item.active {
    background: var(--primary-color) !important;
    color: white !important;
    transform: translateX(5px);
  }
  
  .content-card:hover {
    transform: translateY(-5px);
  }
  
  .sidebar-card:hover {
    transform: translateY(-3px);
  }
`;

// Inject additional styles into the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Analytics tracking for project interactions (optional)
function trackProjectInteraction(action, element) {
  // Only track if analytics is available
  if (typeof gtag !== 'undefined') {
    gtag('event', 'project_interaction', {
      'action': action,
      'element': element,
      'page': window.location.pathname
    });
  }
  
  // Console log for debugging
  console.log(`Project interaction: ${action} on ${element}`);
}

// Enhanced error handling for missing elements
function safeElementOperation(selector, operation) {
  try {
    const element = document.querySelector(selector);
    if (element && typeof operation === 'function') {
      operation(element);
    }
  } catch (error) {
    console.warn(`Error with element ${selector}:`, error);
  }
}

// Lazy loading for images (performance optimization)
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
    });
  }
}

// Performance monitoring
function initPerformanceMonitoring() {
  // Track page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // Track to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_load_time', {
        'value': Math.round(loadTime),
        'custom_parameter': 'project_page'
      });
    }
  });
}

// Accessibility enhancements
function initAccessibilityFeatures() {
  // Add skip link functionality
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.focus();
        target.scrollIntoView();
      }
    });
  }

  // Enhance keyboard navigation for custom elements
  const interactiveElements = document.querySelectorAll('.tech-badge, .feature-item, .nav-link-item');
  interactiveElements.forEach(element => {
    // Make focusable if not already
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }
    
    // Add keyboard event listeners
    element.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Trigger click event
        this.click();
      }
    });
  });

  // Announce dynamic content changes to screen readers
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Example usage for navigation
  document.querySelectorAll('.nav-link-item').forEach(link => {
    link.addEventListener('click', function() {
      const targetText = this.textContent.trim();
      announceToScreenReader(`Navigating to ${targetText} section`);
    });
  });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
  // Small delays to ensure proper initialization order
  setTimeout(initLazyLoading, 100);
  setTimeout(initPerformanceMonitoring, 200);
  setTimeout(initAccessibilityFeatures, 300);
});

// Export functions for potential external use or debugging
window.ProjectPageUtils = {
  initProjectPage,
  initNavbarScroll,
  initBackToTop,
  initSmoothScrolling,
  initMobileNavbar,
  initProjectAnimations,
  initQuickNavigation,
  trackProjectInteraction,
  safeElementOperation
};

// Global error handler for project page
window.addEventListener('error', function(e) {
  console.warn('Project page error:', e.error);
  // Optionally report to analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      'description': e.error.toString(),
      'fatal': false
    });
  }
});