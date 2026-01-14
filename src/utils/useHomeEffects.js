import { useEffect } from "react";

export default function useHomeEffects() {
  useEffect(() => {
    /* =============================
       PRELOADER - SIMPLE AND RELIABLE
    ============================= */
    const preloader = document.getElementById("preloader");
    const progress = document.getElementById("loader-progress");

    // Start progress animation
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 20;
      if (value > 100) value = 100;
      
      if (progress) {
        progress.style.width = `${value}%`;
      }

      // When progress reaches 100%, hide preloader
      if (value >= 100) {
        clearInterval(interval);
        
        // Hide preloader after short delay
        setTimeout(() => {
          if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.pointerEvents = "none";
            preloader.classList.add("loaded");
          }
        }, 500);
      }
    }, 100);

    // Force hide preloader after 2 seconds max
    const forceHideTimer = setTimeout(() => {
      clearInterval(interval);
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
        preloader.classList.add("loaded");
      }
    }, 2000);

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
       CLEANUP
    ============================= */
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      clearInterval(interval);
      clearTimeout(forceHideTimer);
      observer.disconnect();
    };
  }, []);
}

