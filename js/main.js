/* =====================================================
   RANDY ODAWUTEY - PORTFOLIO WEBSITE
   Main JavaScript
   ===================================================== */

(function () {
  "use strict";

  // ==================== DOM READY ====================
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
  });

  // ==================== LOADING SCREEN ====================
  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;

    window.addEventListener("load", function () {
      setTimeout(function () {
        loader.classList.add("hidden");
        document.body.style.overflow = "";
      }, 1200);
    });

    // Fallback - hide loader after 4 seconds no matter what
    setTimeout(function () {
      loader.classList.add("hidden");
      document.body.style.overflow = "";
    }, 4000);
  }

  // ==================== AOS (Animate On Scroll) ====================
  function initAOS() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 800,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        disable: function () {
          return window.innerWidth < 768 && "phone";
        },
      });
    }
  }

  // ==================== TYPING EFFECT ====================
  function initTypingEffect() {
    const typedElement = document.getElementById("typed-text");
    if (!typedElement) return;

    const strings = [
      "Information Technology Student",
      "Software Engineer",
      "Tech Enthusiast",
      "AI Explorer",
      "Entreprenuer",
    ];

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
      const currentString = strings[stringIndex];

      if (isDeleting) {
        typedElement.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typedElement.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentString.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % strings.length;
        typingSpeed = 500; // Pause before next string
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing after a short delay
    setTimeout(type, 1000);
  }

  // ==================== NAVIGATION ====================
  function initNavigation() {
    const navbar = document.getElementById("navbar");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Scroll handler - sticky navbar
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Active section highlighting
      updateActiveNav();
    });

    // Hamburger menu toggle
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains("active")
          ? "hidden"
          : "";
      });
    }

    // Close mobile menu on link click
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (hamburger) hamburger.classList.remove("active");
        if (navMenu) navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close mobile menu on outside click
    document.addEventListener("click", function (e) {
      if (
        navMenu &&
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Update active navigation link based on scroll position
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollPos = window.scrollY + 100;

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

  // ==================== THEME TOGGLE ====================
  function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const html = document.documentElement;

    // Check for saved theme preference
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
      if (themeIcon) {
        if (theme === "dark") {
          themeIcon.className = "fas fa-moon";
        } else {
          themeIcon.className = "fas fa-sun";
        }
      }
    }
  }

  // ==================== SCROLL PROGRESS BAR ====================
  function initScrollProgress() {
    const progressBar = document.getElementById("scroll-progress");
    if (!progressBar) return;

    window.addEventListener("scroll", function () {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    });
  }

  // ==================== BACK TO TOP ====================
  function initBackToTop() {
    const backToTop = document.getElementById("backToTop");
    if (!backToTop) return;

    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    });

    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // ==================== ANIMATED COUNTERS ====================
  function initCounters() {
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function - ease out cubic
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

  // ==================== CONTACT FORM ====================
  function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Clear previous errors
      clearFormErrors();

      // Validate form
      if (!validateForm()) return;

      // Show loading state
      const submitBtn = document.getElementById("submitBtn");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Try EmailJS if available, otherwise simulate
      if (typeof emailjs !== "undefined" && emailjs.send) {
        // Initialize EmailJS - Replace with your actual User ID
        // emailjs.init('YOUR_USER_ID');

        // Send email - Replace with your actual Service ID and Template ID
        /*
                emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
                    .then(function() {
                        showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                        form.reset();
                    }, function(error) {
                        showFormStatus('error', 'Failed to send message. Please try again later.');
                        console.error('EmailJS Error:', error);
                    })
                    .finally(function() {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
                */

        // Fallback simulation (remove when EmailJS is configured)
        simulateFormSubmit(submitBtn, originalText);
      } else {
        // Simulate form submission
        simulateFormSubmit(submitBtn, originalText);
      }
    });
  }

  function simulateFormSubmit(submitBtn, originalText) {
    setTimeout(function () {
      showFormStatus(
        "success",
        "Message sent successfully! I'll get back to you soon.",
      );
      document.getElementById("contactForm").reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  }

  function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");
    let isValid = true;

    if (!name.value.trim()) {
      showFormError("nameError", "Please enter your name");
      name.style.borderColor = "var(--error)";
      isValid = false;
    }

    if (!email.value.trim()) {
      showFormError("emailError", "Please enter your email");
      email.style.borderColor = "var(--error)";
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showFormError("emailError", "Please enter a valid email");
      email.style.borderColor = "var(--error)";
      isValid = false;
    }

    if (!subject.value.trim()) {
      showFormError("subjectError", "Please enter a subject");
      subject.style.borderColor = "var(--error)";
      isValid = false;
    }

    if (!message.value.trim()) {
      showFormError("messageError", "Please enter your message");
      message.style.borderColor = "var(--error)";
      isValid = false;
    }

    return isValid;
  }

  function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function showFormError(elementId, message) {
    var element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
    }
  }

  function showFormStatus(type, message) {
    var status = document.getElementById("formStatus");
    if (status) {
      status.className = "form-status " + type;
      status.textContent = message;
      status.style.display = "block";

      setTimeout(function () {
        status.style.display = "none";
      }, 5000);
    }
  }

  function clearFormErrors() {
    var errors = document.querySelectorAll(".form-error");
    errors.forEach(function (error) {
      error.textContent = "";
    });

    var inputs = document.querySelectorAll(
      ".form-group input, .form-group textarea",
    );
    inputs.forEach(function (input) {
      input.style.borderColor = "";
    });
  }

  // ==================== CUSTOM CURSOR ====================
  function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth < 768) return;

    var cursor = document.querySelector(".custom-cursor");
    var follower = document.querySelector(".custom-cursor-follower");

    if (!cursor || !follower) return;

    var mouseX = 0;
    var mouseY = 0;
    var followerX = 0;
    var followerY = 0;

    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.transform =
        "translate(" + (mouseX - 6) + "px, " + (mouseY - 6) + "px)";
    });

    // Smooth follower animation
    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      follower.style.transform =
        "translate(" + (followerX - 18) + "px, " + (followerY - 18) + "px)";

      requestAnimationFrame(animateFollower);
    }

    animateFollower();

    // Cursor hover effects on interactive elements
    var interactiveElements = document.querySelectorAll(
      "a, button, .btn, .tech-item, .project-card, .cert-card",
    );

    interactiveElements.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        follower.style.width = "50px";
        follower.style.height = "50px";
        follower.style.borderColor = "var(--secondary)";
        cursor.style.transform = cursor.style.transform + " scale(0.5)";
      });

      el.addEventListener("mouseleave", function () {
        follower.style.width = "36px";
        follower.style.height = "36px";
        follower.style.borderColor = "var(--primary)";
      });
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", function () {
      cursor.style.opacity = "0";
      follower.style.opacity = "0";
    });

    document.addEventListener("mouseenter", function () {
      cursor.style.opacity = "1";
      follower.style.opacity = "1";
    });
  }

  // ==================== CURRENT YEAR ====================
  function initCurrentYear() {
    var yearElement = document.getElementById("currentYear");
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // ==================== SMOOTH SCROLL (Polyfill) ====================
  // Smooth scroll for anchor links - enhanced version
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navbarHeight = document.getElementById("navbar")
          ? document.getElementById("navbar").offsetHeight
          : 0;
        var targetPosition =
          target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ==================== TILT EFFECT ON CARDS ====================
  // Optional subtle tilt effect on project cards
  if (window.innerWidth > 768) {
    var tiltCards = document.querySelectorAll(".project-card, .cert-card");

    tiltCards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 20;
        var rotateY = (centerX - x) / 20;

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

  // ==================== TECH ITEM HOVER SOUND EFFECT ====================
  // Visual pulse on tech items
  var techItems = document.querySelectorAll(".tech-item");
  techItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.05)";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // ==================== PARALLAX EFFECT ON HERO ====================
  var heroSection = document.querySelector(".hero-section");
  if (heroSection && window.innerWidth > 768) {
    window.addEventListener("scroll", function () {
      var scrolled = window.scrollY;
      var heroImage = document.querySelector(".hero-image");
      var heroText = document.querySelector(".hero-text");

      if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = "translateY(" + scrolled * 0.15 + "px)";
      }
      if (heroText && scrolled < window.innerHeight) {
        heroText.style.transform = "translateY(" + scrolled * 0.05 + "px)";
      }
    });
  }
})();
