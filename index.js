// ── Hamburger / Drawer ──────────────────────────────────────────────────────
const header = document.getElementById("main-header");
const hamburgerBtn = document.getElementById("hamburger-btn");
const overlay = document.getElementById("nav-overlay");
const drawer = document.getElementById("nav-drawer");
const closeBtn = document.getElementById("drawer-close-btn");

function openDrawer() {
  drawer.classList.add("is-open");
  overlay.classList.add("is-open");
  hamburgerBtn.classList.add("is-active");
  hamburgerBtn.setAttribute("aria-expanded", "true");
  drawer.setAttribute("aria-hidden", "false");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  overlay.classList.remove("is-open");
  hamburgerBtn.classList.remove("is-active");
  hamburgerBtn.setAttribute("aria-expanded", "false");
  drawer.setAttribute("aria-hidden", "true");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

hamburgerBtn.addEventListener("click", () => {
  drawer.classList.contains("is-open") ? closeDrawer() : openDrawer();
});
closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

// Close drawer when a nav link is clicked
document.querySelectorAll(".nav-drawer-link, .nav-drawer-cta").forEach((el) => {
  el.addEventListener("click", closeDrawer);
});

// ── Sticky header scroll shadow ──────────────────────────────────────────────
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  },
  { passive: true }
);

// ── Active nav link highlight on scroll ─────────────────────────────────────
const sections = [
  { id: "overview", link: ".button4" },
  { id: "services", link: ".button5" },
  { id: "technology", link: ".button6" },
  { id: "advantage", link: ".button7" },
];

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(({ id, link }) => {
    const section = document.getElementById(id);
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const el = document.querySelector(link);
    if (el) {
      el.classList.toggle("nav-active", scrollY >= top && scrollY < bottom);
    }
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

// ── Scroll-triggered fade-up animations ─────────────────────────────────────
const animateEls = document.querySelectorAll(
  ".section2, .section3, .section4, .section5, .section6, .section7, .section8, " +
    ".container3, .container35, .container44, .container60, .container63, .container65, " +
    ".container69, .container70, .container71, .container78, .container84, .container96, " +
    ".container111, .container112, .container113, .container114, .container122, " +
    ".container128, .container132"
);

animateEls.forEach((el, i) => {
  el.classList.add("animate-hidden");
  // stagger delay for siblings
  const siblings = el.parentElement
    ? [...el.parentElement.children].filter((c) =>
        c.classList.contains("animate-hidden")
      )
    : [];
  const sibIdx = siblings.indexOf(el);
  el.style.transitionDelay = sibIdx > 0 ? `${sibIdx * 80}ms` : "0ms";
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);

animateEls.forEach((el) => observer.observe(el));

// ── Hero fade-in ─────────────────────────────────────────────────────────────
const heroContent = document.querySelector(".container148");
const heroImg = document.querySelector(".imagewithfallback-icon");
if (heroContent) heroContent.classList.add("hero-fade-in");
if (heroImg) heroImg.classList.add("hero-img-zoom");

// ── Back to top ───────────────────────────────────────────────────────────────
const backToTopBtn = document.querySelector(".container147 .button");
if (backToTopBtn) {
  backToTopBtn.style.cursor = "pointer";
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
