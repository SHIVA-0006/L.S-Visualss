const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 1350);
});

const cursor = document.querySelector(".cursor-dot");
if (cursor && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .gallery-item").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
}

// Subtle reveal-on-scroll without a heavy animation library.
const revealTargets = document.querySelectorAll(
  ".intro-grid > *, .about-image, .about-copy, .gallery-item, .story-grid > *, .cert-card, .contact-top, .contact-bottom"
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(28px)";
  el.style.transition = "opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1)";
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".revealed").forEach(el => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
});

// Mutation observer keeps the reveal inline styles simple and reliable.
const revealObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.target.classList.contains("revealed")) {
      m.target.style.opacity = "1";
      m.target.style.transform = "translateY(0)";
    }
  });
});
revealTargets.forEach(el => revealObserver.observe(el, { attributes: true, attributeFilter: ["class"] }));

// Certificate lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = () => {
  lightbox.classList.remove("open");
  lightboxImage.src = "";
  document.body.style.overflow = "";
};

document.querySelectorAll(".cert-card").forEach(card => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.full;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

// Gentle parallax for the hero image.
window.addEventListener("scroll", () => {
  const img = document.querySelector(".hero-image img");
  if (!img) return;
  const y = Math.min(window.scrollY * 0.08, 55);
  img.style.transform = `translateY(${y}px) scale(1.04)`;
}, { passive: true });
const galleryItems = document.querySelectorAll('.gallery-item');

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('reveal');
            galleryObserver.unobserve(entry.target);
        }
    });
}, {
    threshold:0.12
});

galleryItems.forEach(item => {
    galleryObserver.observe(item);
});
const revealTexts = document.querySelectorAll('.reveal-text');

const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            textObserver.unobserve(entry.target);
        }
    });
}, {
    threshold:0.15
});

revealTexts.forEach(el => {
    textObserver.observe(el);
});
