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
      observer.disconnect();
    };
  }, []);
}

