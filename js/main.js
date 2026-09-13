/* =====================================================
   RANDY ODAWUTEY - PORTFOLIO WEBSITE
   Main JavaScript
   ===================================================== */
const EMAILJS_CONFIG = {
  publicKey: "fah_wTK5f5cps6zYu",
  serviceId: "service_nhidz0s",
  templateId: "template_xsdg0m9",
};

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    initLoader();
    initAOS();
    initParticles();
    initTypingEffect();
    initNavigation();
    initThemeToggle();
    initScrollProgress();
    initBackToTop();
    initCounters();
    initContactForm();
    initCustomCursor();
    initCurrentYear();
    initSmoothScroll();
    initTiltEffects();
  });

  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    window.addEventListener("load", function () {
      setTimeout(function () {
        loader.classList.add("hidden");
        document.body.style.overflow = "";
      }, 1200);
    });

    setTimeout(function () {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
    }, 4000);
  }

  function initAOS() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        disable: function () {
          return window.innerWidth < 768;
        },
      });
    }
  }

  function initParticles() {
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#7c3aed" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#8b5cf6",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    }
  }

  function initTypingEffect() {
    const typedElement = document.getElementById("typed-text");
    if (!typedElement) return;

    const strings = [
      "Information Technology Student",
      "Software Developer",
      "Tech Enthusiast",
      "AI Explorer",
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
      const currentString = strings[stringIndex];
      if (isDeleting) {
        typedElement.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedElement.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentString.length) {
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 800);
  }

  function initNavigation() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!navbar) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      updateActiveNav();
    });

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains("active")
          ? "hidden"
          : "";
      });
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (hamburger) hamburger.classList.remove("active");
        if (navMenu) navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("click", function (e) {
      if (
        navMenu &&
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        hamburger &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    updateActiveNav();
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;
    const themeIcon = document.getElementById("themeIcon");

    const savedTheme = localStorage.getItem("theme") || "dark";
    html.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener("click", function () {
        const currentTheme = html.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
      });
    }

    function updateThemeIcon(theme) {
      if (!themeIcon) return;
      if (theme === "dark") {
        themeIcon.className = "fas fa-moon";
      } else {
        themeIcon.className = "fas fa-sun";
      }
    }
  }

  function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + "%";
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress);
  }

  function initBackToTop() {
    const backToTop = document.getElementById("backToTop");
    if (!backToTop) return;

    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });

    function animateCounter(element) {
      const target = Number(element.getAttribute("data-target"));
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
    }
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const submitBtn = document.getElementById("submitBtn");
    const status = document.getElementById("formStatus");

    if (window.emailjs) {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!validateForm(form)) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      if (status) {
        status.className = "form-status";
        status.textContent = "";
      }

      if (!window.emailjs) {
        if (status) {
          status.className = "form-status error";
          status.textContent = "EmailJS is not loaded.";
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }
        return;
      }

      emailjs
        .sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, form)
        .then(function () {
          if (status) {
            status.className = "form-status success";
            status.textContent = "Message sent successfully!";
          }
          form.reset();
        })
        .catch(function () {
          if (status) {
            status.className = "form-status error";
            status.textContent =
              "Something went wrong. Please email me directly.";
          }
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
          }
        });
    });
  }

  function validateForm(form) {
    const fields = {
      name: form.querySelector("#name"),
      email: form.querySelector("#email"),
      subject: form.querySelector("#subject"),
      message: form.querySelector("#message"),
    };

    let isValid = true;

    Object.keys(fields).forEach(function (key) {
      const input = fields[key];
      if (!input) return;

      input.style.borderColor = "";
      const errorEl = document.getElementById(key + "Error");
      if (errorEl) errorEl.textContent = "";

      if (!input.value.trim()) {
        input.style.borderColor = "var(--error)";
        if (errorEl) errorEl.textContent = "This field is required.";
        isValid = false;
      }
    });

    const emailInput = fields.email;
    if (emailInput && emailInput.value.trim()) {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        emailInput.value.trim(),
      );
      if (!validEmail) {
        emailInput.style.borderColor = "var(--error)";
        const errorEl = document.getElementById("emailError");
        if (errorEl) errorEl.textContent = "Enter a valid email address.";
        isValid = false;
      }
    }

    return isValid;
  }

  function initCustomCursor() {
    if (window.innerWidth < 768) return;

    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".custom-cursor-follower");
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform =
        "translate(" + (mouseX - 6) + "px, " + (mouseY - 6) + "px)";
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform =
        "translate(" + (followerX - 18) + "px, " + (followerY - 18) + "px)";
      requestAnimationFrame(animateFollower);
    }

    animateFollower();

    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .tech-item, .project-card, .cert-card",
    );
    interactiveElements.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        follower.style.width = "50px";
        follower.style.height = "50px";
        follower.style.borderColor = "var(--secondary)";
      });

      el.addEventListener("mouseleave", function () {
        follower.style.width = "36px";
        follower.style.height = "36px";
        follower.style.borderColor = "var(--primary)";
      });
    });

    document.addEventListener("mouseleave", function () {
      cursor.style.opacity = "0";
      follower.style.opacity = "0";
    });

    document.addEventListener("mouseenter", function () {
      cursor.style.opacity = "1";
      follower.style.opacity = "1";
    });
  }

  function initCurrentYear() {
    const yearElement = document.getElementById("currentYear");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const navbarHeight = document.getElementById("navbar")
          ? document.getElementById("navbar").offsetHeight
          : 0;
        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      });
    });
  }

  function initTiltEffects() {
    if (window.innerWidth <= 768) return;

    const tiltCards = document.querySelectorAll(".project-card, .cert-card");
    tiltCards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 18;
        const rotateY = (centerX - x) / 18;

        card.style.transform =
          "perspective(1000px) rotateX(" +
          rotateX +
          "deg) rotateY(" +
          rotateY +
          "deg) translateY(-4px)";
      });

      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }
})();
