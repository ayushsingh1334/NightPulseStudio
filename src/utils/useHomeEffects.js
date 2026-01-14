import { useEffect } from "react";

export default function useHomeEffects() {
  useEffect(() => {
    /* =============================
       CUSTOM CURSOR
    ============================= */
    const cursor = document.getElementById("cursor");

    const moveCursor = (e) => {
      if (!cursor) return;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", moveCursor);

    /* =============================
       PRELOADER FIX (IMPORTANT)
    ============================= */
    const preloader = document.getElementById("preloader");
    const progress = document.getElementById("loader-progress");

    let value = 0;
    let preloaderTimeout;

    const hidePreloader = () => {
      if (preloader && !preloader.classList.contains("loaded")) {
        preloader.classList.add("loaded");
      }
    };

    const interval = setInterval(() => {
      value += Math.random() * 15;

      if (progress) {
        progress.style.width = `${Math.min(value, 100)}%`;
      }

      if (value >= 100) {
        clearInterval(interval);

        // Small delay for smooth exit
        setTimeout(() => {
          hidePreloader();
        }, 300);
      }
    }, 120);

    // Fallback: Force hide preloader after 3 seconds max
    preloaderTimeout = setTimeout(() => {
      clearInterval(interval);
      if (progress) {
        progress.style.width = "100%";
      }
      hidePreloader();
    }, 3000);

    // Hide preloader when page fully loads
    window.addEventListener("load", () => {
      clearTimeout(preloaderTimeout);
      clearInterval(interval);
      hidePreloader();
    });

    /* =============================
       REVEAL ANIMATION ON SCROLL
    ============================= */
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    /* =============================
       CLEANUP (IMPORTANT)
    ============================= */
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      clearInterval(interval);
      clearTimeout(preloaderTimeout);
      observer.disconnect();
    };
  }, []);
}

