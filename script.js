const body = document.body;
const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const openButton = document.getElementById("openInvitation");
const countdown = document.getElementById("countdown");
const dateSection = document.getElementById("dateSection");
const scribblePath = document.querySelector(".date__scribble-path");
const revealItems = document.querySelectorAll(".reveal");
const weddingDate = new Date("2026-12-12T11:30:00+05:30");

let invitationOpened = false;

if (scribblePath) {
  const pathLength = scribblePath.getTotalLength();
  scribblePath.style.strokeDasharray = `${pathLength}`;
  scribblePath.style.strokeDashoffset = `${pathLength}`;
}

const openInvitation = () => {
  if (invitationOpened) {
    return;
  }

  invitationOpened = true;
  body.classList.add("is-opening");
  openButton.setAttribute("aria-expanded", "true");
  invitation.setAttribute("aria-hidden", "false");

  window.setTimeout(() => {
    body.classList.add("is-open");
    body.classList.remove("is-locked");
    intro.setAttribute("aria-hidden", "true");
  }, 1200);

  window.setTimeout(() => {
    body.classList.remove("is-opening");
  }, 2100);
};

if (openButton) {
  openButton.addEventListener("click", openInvitation);
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target === dateSection && scribblePath) {
        scribblePath.animate(
          [
            { strokeDashoffset: scribblePath.style.strokeDasharray },
            { strokeDashoffset: "0" },
          ],
          {
            duration: 1500,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "forwards",
          }
        );
      }

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealItems.forEach((item) => {
  if (!item.classList.contains("reveal--visible")) {
    revealObserver.observe(item);
  }
});

const formatCountdown = () => {
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  if (difference <= 0) {
    countdown.textContent = "0 Days · 0 Hours · 0 Minutes";
    return;
  }

  const totalMinutes = Math.floor(difference / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [
    `${days} ${days === 1 ? "Day" : "Days"}`,
    `${String(hours).padStart(2, "0")} Hours`,
    `${String(minutes).padStart(2, "0")} Minutes`,
  ];

  countdown.textContent = parts.join(" · ");
};

formatCountdown();
window.setInterval(formatCountdown, 30000);
