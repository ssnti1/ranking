// ======================================
// Datos del ranking: top 3 por año
// (Calculado a partir de Ranking_Vendedores_2019_2025.xlsx)
// ======================================

const PODIUM_YEARS = [
  {
    year: 2019,
    winners: [
      {
        place: 1,
        name: 'GRAJALES MUÑOZ DIEGO ALEJANDRO',
        meta: 'Neto: 1.84 mil millones COP',
        photo: '/static/img/grajales.jpg'
      },
      {
        place: 2,
        name: 'PINO JESUS',
        meta: 'Neto: 1.31 mil millones COP',
        photo: '/static/img/pino.jpg'
      },
      {
        place: 3,
        name: 'CABRALES ANDREA JULIANA',
        meta: 'Neto: 803 millones COP',
        photo: '/static/img/cabrales.jpg'
      },
    ]
  },
  {
    year: 2020,
    winners: [
      {
        place: 1,
        name: 'GRAJALES MUÑOZ DIEGO ALEJANDRO',
        meta: 'Neto: 1.77 mil millones COP',
        photo: '/static/img/grajales.jpg'
      },
      {
        place: 2,
        name: 'CABRALES ANDREA JULIANA',
        meta: 'Neto: 1.19 mil millones COP',
        photo: '/static/img/cabrales.jpg'
      },
      {
        place: 3,
        name: 'PINO JESUS',
        meta: 'Neto: 1.09 mil millones COP',
        photo: '/static/img/pino.jpg'
      },
    ]
  },
  {
    year: 2021,
    winners: [
      {
        place: 1,
        name: 'GRAJALES MUÑOZ DIEGO ALEJANDRO',
        meta: 'Neto: 1.61 mil millones COP',
        photo: '/static/img/grajales.jpg'
      },
      {
        place: 2,
        name: 'CABRALES ANDREA JULIANA',
        meta: 'Neto: 1.54 mil millones COP',
        photo: '/static/img/cabrales.jpg'
      },
      {
        place: 3,
        name: 'PINO JESUS',
        meta: 'Neto: 1.17 mil millones COP',
        photo: '/static/img/pino.jpg'
      },
    ]
  },
  {
    year: 2022,
    winners: [
      {
        place: 1,
        name: 'CABRALES ANDREA JULIANA',
        meta: 'Neto: 2.03 mil millones COP',
        photo: '/static/img/cabrales.jpg'
      },
      {
        place: 2,
        name: 'GRAJALES MUÑOZ DIEGO ALEJANDRO',
        meta: 'Neto: 1.65 mil millones COP',
        photo: '/static/img/grajales.jpg'
      },
      {
        place: 3,
        name: 'PINO JESUS',
        meta: 'Neto: 1.17 mil millones COP',
        photo: '/static/img/pino.jpg'
      },
    ]
  },
  {
    year: 2023,
    winners: [
      {
        place: 1,
        name: 'CABRALES ANDREA JULIANA',
        meta: 'Neto: 1.81 mil millones COP',
        photo: '/static/img/cabrales.jpg'
      },
      {
        place: 2,
        name: 'GRAJALES MUÑOZ DIEGO ALEJANDRO',
        meta: 'Neto: 1.39 mil millones COP',
        photo: '/static/img/grajales.jpg'
      },
      {
        place: 3,
        name: 'PINO JESUS',
        meta: 'Neto: 1.18 mil millones COP',
        photo: '/static/img/pino.jpg'
      },
    ]
  },
  {
    year: 2024,
    winners: [
      {
        place: 1,
        name: 'CABRALES ANDREA JULIANA',
        meta: 'Neto: 1.65 mil millones COP',
        photo: '/static/img/cabrales.jpg'
      },
      {
        place: 2,
        name: 'MARTINEZ GUERRERO NUBIA YANETH',
        meta: 'Neto: 1.64 mil millones COP',
        photo: '/static/img/martinez.jpg'
      },
      {
        place: 3,
        name: 'GRAJALES MUÑOZ DIEGO ALEJANDRO',
        meta: 'Neto: 1.30 mil millones COP',
        photo: '/static/img/grajales.jpg'
      },
    ]
  },
  {
    year: 2025,
    winners: [
      {
        place: 1,
        name: 'MARTINEZ GUERRERO NUBIA YANETH',
        meta: 'Neto: 1.99 mil millones COP',
        photo: '/static/img/martinez.jpg'
      },
      {
        place: 2,
        name: 'CABRALES ANDREA JULIANA',
        meta: 'Neto: 1.91 mil millones COP',
        photo: '/static/img/cabrales.jpg'
      },
      {
        place: 3,
        name: 'PINO JESUS',
        meta: 'Neto: 1.47 mil millones COP',
        photo: '/static/img/pino.jpg'
      },
    ]
  },
];


// ======================================
// Lógica del reel / carrusel
// ======================================

const reelTrack = document.getElementById("reel-track");
const timelineContainer = document.getElementById("year-timeline");
const currentYearEl = document.getElementById("current-year");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const footerYearEl = document.getElementById("footer-year");

let currentIndex = PODIUM_YEARS.length - 1;
let autoTimer = null;
const AUTO_INTERVAL = 13000;

function buildSlides() {
  PODIUM_YEARS.forEach(({ year, winners }) => {
    const slide = document.createElement("div");
    slide.className = "year-slide";

    const slideHeader = document.createElement("div");
    slideHeader.className = "year-slide-header";

    const first = winners.find(w => w.place === 1);

    slideHeader.innerHTML = `
      <h3>Ranking ${year}</h3>
      <p>
         ${
          first
            ? `🥇 <strong>${first.name}</strong>.`
            : ""
        }
      </p>
    `;

    const grid = document.createElement("div");
    grid.className = "podium-grid";

    const layoutOrder = [2, 1, 3];

    layoutOrder.forEach(placeNum => {
      const winner = winners.find(w => w.place === placeNum);
      if (!winner) return;

      const column = document.createElement("div");
      column.className = `podium-column place-${winner.place}`;

      const tagText =
        winner.place === 1
          ? "1º lugar"
          : winner.place === 2
          ? "2º lugar"
          : "3º lugar";

column.innerHTML = `
        <strong><div class="place-number">${winner.place}</div></strong>
        <div class="podium-block">
          <div class="podium-tag">${tagText}</div>
          <div class="podium-avatar">
            <img src="${winner.photo}" alt="${winner.name}">
          </div>
        </div>
        <div class="podium-info">
          <div class="podium-name">${winner.name}</div>
          <div class="podium-meta">${winner.meta}</div>
        </div>
      `;



      grid.appendChild(column);
    });

    slide.appendChild(slideHeader);
    slide.appendChild(grid);
    reelTrack.appendChild(slide);
  });
}

function buildTimeline() {
  PODIUM_YEARS.forEach((entry, index) => {
    const btn = document.createElement("button");
    btn.className = "timeline-year";
    btn.textContent = entry.year;
    btn.dataset.index = String(index);

    btn.addEventListener("click", () => {
      currentIndex = index;
      updateUI();
      restartAutoPlay();
    });

    timelineContainer.appendChild(btn);
  });
}

function updateUI() {
  reelTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  const { year } = PODIUM_YEARS[currentIndex];
  currentYearEl.textContent = year;

  const timelineButtons = timelineContainer.querySelectorAll(".timeline-year");
  timelineButtons.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === currentIndex);
  });

  if (btnPrev && btnNext) {
    btnPrev.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === PODIUM_YEARS.length - 1;
  }
}

function goToPrev() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    updateUI();
    restartAutoPlay();
  }
}

function goToNext() {
  if (currentIndex < PODIUM_YEARS.length - 1) {
    currentIndex += 1;
    updateUI();
    restartAutoPlay();
  }
}

function restartAutoPlay() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % PODIUM_YEARS.length;
    updateUI();
  }, AUTO_INTERVAL);
}

function initRankingPage() {
  if (footerYearEl) {
    footerYearEl.textContent = new Date().getFullYear();
  }

  buildSlides();
  buildTimeline();

  // Arrancamos mostrando el último año (2025)
  currentIndex = PODIUM_YEARS.length - 1;
  updateUI();
  restartAutoPlay();

  if (btnPrev) btnPrev.addEventListener("click", goToPrev);
  if (btnNext) btnNext.addEventListener("click", goToNext);
}

document.addEventListener("DOMContentLoaded", initRankingPage);
