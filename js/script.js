// PENTING, mencegah Klik kanan
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "F12" ||
    (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(event.key)) ||
    (event.ctrlKey && event.key === "u")
  ) {
    event.preventDefault();
  }
});
// /PENTING, mencegah Klik kanan

/* =========================================================
   0. NAVBAR: tutup menu mobile Bootstrap saat sebuah link diklik
   ========================================================= */
const mainNav = document.getElementById("mainNav");
if (mainNav) {
  mainNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(mainNav).hide();
      }
    });
  });
}

/* =========================================================
   1. JAM HIDUP DI HERO (hanya ada di Beranda)
   ========================================================= */
const liveClock = document.getElementById("liveClock");
if (liveClock) {
  function updateClock() {
    const now = new Date();
    const tanggal = now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const jam = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    liveClock.textContent = `${tanggal} — ${jam}` + " WIB";
  }
  updateClock();
  setInterval(updateClock, 1000 * 30);
}

/* =========================================================
   2. DOKUMEN / SPREADSHEET EDITOR (hanya ada di halaman Dokumen)
   ========================================================= */

/* =========================================================
   3. APLIKASI (hanya ada di halaman Aplikasi)
   ---------------------------------------------------------
   Setiap entri butuh:
     name : nama yang tampil pada tombol
     url  : alamat aplikasi yang dituju
     icon : nama ikon dari Font Awesome (https://fontawesome.com/icons)
   ========================================================= */
const appsGrid = document.getElementById("appsGrid");

if (appsGrid) {
  const apps = [
    {
      name: "ASYRAF Doc",
      idApp: "asyraf",
      url: "https://drive.google.com/drive/folders/1qEd-fjEvx6R5_0SWGpk9cSuOg27SBoAI",
      icon: "fa-solid fa-child",
    },
    {
      name: "UHC SMART",
      idApp: "UHC",
      url: "https://docs.google.com/spreadsheets/d/1ZurvJPdQcg447ESRXNT74KcMNjfrrmIHV4Qeq0JITB0",
      icon: "fa-solid fa-group-arrows-rotate",
    },
    {
      name: "Tingkepan",
      idApp: "tingkepan",
      url: "https://drive.google.com/drive/folders/1Ws5-WJR8fZJr9HmqcpoX99HcL75WEJsY",
      icon: "fa-solid fa-shower",
    },
    {
      name: "Wedding Ratu & Ismail",
      idApp: "wedding",
      url: "https://drive.google.com/drive/folders/1MsqWlcD3ilybI25UlUW2X6SkJ5__XICo",
      icon: "fa-solid fa-restroom",
    },
    {
      name: "my Archive",
      idApp: "myArchive",
      url: "https://drive.google.com/drive/folders/1P5x-SI8UBZ69mpsiUYDI1Tv3pbDRDeZs",
      icon: "fa-brands fa-google-drive",
    },
    {
      name: "YouTube",
      idApp: "youtube",
      url: "https://www.youtube.com/@ratuismailTV",
      icon: "fa-brands fa-youtube",
    },
  ];

  apps.forEach((app) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <a class="app-btn" href="${app.url}" target="_blank" id="${app.idApp}" rel="noopener noreferrer">
        <i class="${app.icon}" aria-hidden="true"></i><span>${app.name}</span>
      </a>`;
    appsGrid.appendChild(col);
  });
}

/* =========================================================
   4. TAHUN DI FOOTER (ada di semua halaman)
   ========================================================= */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
