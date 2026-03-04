"use strict";

function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error(`Cannot GET ${file} (HTTP ${res.status})`);
      return res.text();
    })
    .then((html) => {
      el.innerHTML = html;
    })
    .catch((err) => console.error(`loadComponent(${id}):`, err));
}

document.addEventListener("DOMContentLoaded", () => {
  const base = window.location.pathname.includes("/pages/") ? "../" : "";
  loadComponent("site-header", base + "components/navbar.html");
  loadComponent("footer-container", base + "components/footer.html");

  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 50) {
        header.style.position = "fixed";
        header.style.background = "rgba(46, 46, 46, 0.95)";
        header.style.backdropFilter = "blur(10px)";
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        header.style.padding = "1rem 0";
      } else {
        header.style.position = "absolute";
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        header.style.boxShadow = "none";
        header.style.padding = "1.5rem 0";
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  const elementsToReveal = document.querySelectorAll(
    ".offer-row, .dark-card, .pillar-card, .section-title, .banner-text",
  );

  if (elementsToReveal.length) {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.15 };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elementsToReveal.forEach((el, index) => {
      el.classList.add("reveal-hidden");

      if (
        el.classList.contains("dark-card") ||
        el.classList.contains("pillar-card")
      ) {
        el.style.transitionDelay = `${index * 0.1}s`;
      }

      scrollObserver.observe(el);
    });
  }

  const anchors = document.querySelectorAll('a[href^="#"]');

  anchors.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    });
  });
});
