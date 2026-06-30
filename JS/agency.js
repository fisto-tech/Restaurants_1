// GSAP Scroll Animations for Restaurant Website
document.addEventListener("DOMContentLoaded", () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger is not loaded.");
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Testimonial Heading Animation
  gsap.from(".pappers-heading .main-text", {
    scrollTrigger: {
      trigger: ".pappers-heading",
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".pappers-heading .scrabble img", {
    scrollTrigger: {
      trigger: ".pappers-heading",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    scaleX: 0,
    transformOrigin: "left center",
    opacity: 0,
    duration: 1.2,
    delay: 0.3,
    ease: "power2.out"
  });

  // 2. Testimonial Cards Animation
  // Since they are scattered papers/cards, we will make them fly in/rotate organically on scroll
  const testimonialCards = [
    { selector: ".testimonial-green-papper", x: -100, rotation: -15 },
    { selector: ".testimonial-pink-papper", x: 100, rotation: 12 },
    { selector: ".testimonial-greenbox-papper", y: 150, rotation: -5 },
    { selector: ".testimonial-purple-papper", x: -120, rotation: 8 },
    { selector: ".testimonial-yellow-papper", x: 120, rotation: -10 }
  ];

  testimonialCards.forEach((card) => {
    const element = document.querySelector(card.selector);
    if (element) {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "top 50%",
          scrub: 1, // Smoothly link animation to scroll position
          toggleActions: "play none none reverse"
        },
        x: card.x || 0,
        y: card.y || 0,
        rotation: card.rotation * 1.5,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power1.out"
      });
    }
  });

  // 3. Rotating Gallery CTA / Heading Animation
  const circleHeading = document.querySelector(".circle-wrapper-heading");
  if (circleHeading) {
    gsap.from(circleHeading.children, {
      scrollTrigger: {
        trigger: circleHeading,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }

  // 4. Footer Staggered Animation
  const footerColumns = document.querySelectorAll(".footer-column");
  if (footerColumns.length > 0) {
    gsap.from(footerColumns, {
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });
  }
});
