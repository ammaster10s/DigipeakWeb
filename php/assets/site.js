const GLYPHS = "#$%&*+<>?/\\0123456789";

function runBootLoader() {
  const boot = document.getElementById("boot-loader");
  const progressBar = document.getElementById("boot-progress-bar");
  const progressValue = document.getElementById("boot-progress-value");
  const skip = document.getElementById("boot-skip");

  if (!boot || !progressBar || !progressValue) return;

  const hasLoaded = sessionStorage.getItem("digipeak_boot_complete") === "1";
  if (hasLoaded) {
    boot.style.display = "none";
    return;
  }

  let finished = false;
  const duration = 2200;
  const start = performance.now();

  const finalize = () => {
    if (finished) return;
    finished = true;
    sessionStorage.setItem("digipeak_boot_complete", "1");
    boot.classList.add("boot-hidden");
    setTimeout(() => {
      boot.style.display = "none";
    }, 480);
  };

  const loop = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const value = Math.round(t * 100);
    progressValue.textContent = `[${value}%]`;
    progressBar.style.width = `${value}%`;

    if (t < 1) {
      requestAnimationFrame(loop);
    } else {
      setTimeout(finalize, 400);
    }
  };

  if (skip) {
    skip.addEventListener("click", finalize);
  }

  requestAnimationFrame(loop);
}

function scrambleText(el, speed = 0.8) {
  const text = el.getAttribute("data-scramble-text") || el.textContent || "";
  el.setAttribute("data-scramble-text", text);
  el.textContent = text.replace(/./g, " ");

  const chars = text.split("");
  const total = chars.length;
  let frame = 0;
  const clampedSpeed = Math.max(0.1, speed);

  const step = () => {
    const progress = Math.min(1, frame / (total + 8));
    const revealed = Math.floor(progress * total);
    const next = chars.map((ch, idx) => {
      if (idx < revealed || ch === " ") return ch;
      if (Math.random() < 0.5) {
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      return ch;
    });
    el.textContent = next.join("");
    frame += clampedSpeed;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

function initScramble() {
  document.querySelectorAll("[data-scramble]").forEach((el) => {
    const speedAttr = el.getAttribute("data-scramble-speed");
    const speed = speedAttr ? Number(speedAttr) : 0.8;
    scrambleText(el, Number.isFinite(speed) ? speed : 0.8);
  });
}

function initGallery() {
  const modal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("gallery-modal-image");
  const modalLabel = document.getElementById("gallery-modal-label");
  const modalClose = document.getElementById("gallery-modal-close");

  if (!modal || !modalImage || !modalClose || !modalLabel) return;

  const openModal = (src, alt, label) => {
    modalImage.src = src;
    modalImage.alt = alt || "";
    modalLabel.textContent = label || "";
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll("[data-gallery-item]").forEach((button) => {
    button.addEventListener("click", () => {
      const src = button.getAttribute("data-src");
      const alt = button.getAttribute("data-alt");
      const label = button.getAttribute("data-label");
      if (src) {
        openModal(src, alt, label);
      }
    });
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modalClose.addEventListener("click", closeModal);
}

function initMassCalculator() {
  const unitsInput = document.getElementById("units-input");
  const weightInput = document.getElementById("weight-input");
  const totalOutput = document.getElementById("total-output");
  const unitsPerKgOutput = document.getElementById("units-per-kg-output");

  if (!unitsInput || !weightInput || !totalOutput || !unitsPerKgOutput) return;

  const update = () => {
    const units = Number(unitsInput.value) || 0;
    const weightPerUnit = Number(weightInput.value) || 0;
    const totalWeight = units * weightPerUnit;
    totalOutput.textContent = `${totalWeight.toFixed(1)} G`;
    unitsPerKgOutput.textContent =
      totalWeight > 0 && weightPerUnit > 0
        ? (1000 / weightPerUnit).toFixed(1)
        : "0.0";
  };

  unitsInput.addEventListener("input", update);
  weightInput.addEventListener("input", update);
  update();
}

function initInView() {
  const targets = document.querySelectorAll("[data-inview]");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  targets.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  runBootLoader();
  initScramble();
  initGallery();
  initMassCalculator();
  initInView();
});