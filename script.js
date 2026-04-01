/**
 * ZIONLAB PREMIUM FUNNEL - JAVASCRIPT
 * Features:
 * - Dynamic Sticky Header
 * - Scroll Reveal Animations (Intersection Observer)
 * - Smooth Anchor Scrolling
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ============================================
  // 1. DYNAMIC STICKY HEADER
  // ============================================
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.position = "fixed";
      header.style.background = "rgba(46, 46, 46, 0.98)";
      header.style.backdropFilter = "blur(10px)";
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
      header.style.padding = "0.8rem 0"; // Snappier padding
    } else {
      header.style.position = "absolute";
      header.style.background = "transparent";
      header.style.backdropFilter = "none";
      header.style.boxShadow = "none";
      header.style.padding = "1.5rem 0";
    }
  });

  // ============================================
  // 2. SCROLL REVEAL ANIMATIONS
  // ============================================
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add("reveal-visible");

        // FIXED: Remove the transition delay after the entrance animation finishes
        // This ensures hover effects happen INSTANTLY afterward.
        setTimeout(() => {
          el.style.transitionDelay = "0s";
        }, 1000);

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll(
    ".offer-row, .dark-card, .pillar-card, .section-title, .banner-text",
  );

  elementsToReveal.forEach((el, index) => {
    el.classList.add("reveal-hidden");

    // Apply staggered delay only for the initial entrance
    if (
      el.classList.contains("dark-card") ||
      el.classList.contains("pillar-card")
    ) {
      el.style.transitionDelay = `${(index % 3) * 0.1}s`; // Limit max delay
    }

    scrollObserver.observe(el);
  });

  // ============================================
  // 3. SMOOTH SCROLLING FOR NAV LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId !== "#") {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
