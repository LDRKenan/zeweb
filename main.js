class ZeuphApp {
  constructor() {
    this.init();
  }

  init() {
    gsap.registerPlugin(ScrollTrigger);
    this.setupLoader();
    this.setupNavigation();
    this.setupHero();
    this.setupFeatures();
    this.setupParticles();
  }

  setupLoader() {
    window.addEventListener('load', () => {
      gsap.to('.loader', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          document.querySelector('.loader').style.display = 'none';
          this.animateOnScroll();
        }
      });
    });
  }

  setupNavigation() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  setupHero() {
    const heroTimeline = gsap.timeline();
    heroTimeline
      .from('.hero-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.cta-btn', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3');
  }

  setupFeatures() {
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "back.out(1.7)"
      });
    });
  }

  setupParticles() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
          move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" }
          }
        }
      });
    }
  }

  animateOnScroll() {
    gsap.utils.toArray('[data-animate]').forEach(element => {
      const animation = element.dataset.animate;
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        [animation]: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ZeuphApp();
});
