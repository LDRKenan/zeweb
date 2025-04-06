document.addEventListener("DOMContentLoaded", () => {
  console.log("Zeuph landing page loaded!");
  
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      themeToggle.textContent = isDarkMode ? 'Light Theme' : 'Dark Theme';
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = 'Light Theme';
    }
  }

  
  // Enhanced smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Update URL without page reload
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  
  // Enhanced animations on scroll
  const animateElements = () => {
    const elements = document.querySelectorAll('.card, .testimonial');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Add special animation for testimonials
          if (entry.target.classList.contains('testimonial')) {
            entry.target.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
          }
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  };

  // Social links interaction
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'scale(1.05)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'scale(1)';
    });
  });

  // Initialize animations
  animateElements();

});
