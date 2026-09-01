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
    });
    const jam = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    liveClock.textContent = `${tanggal} — ${jam}`;
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
      name: "UHC SMART",
      url: "https://mail.google.com",
      icon: "fa-solid fa-envelope",
    },
    {
      name: "Tingkepan",
      url: "https://drive.google.com",
      icon: "fa-brands fa-google-drive",
    },
    {
      name: "Wedding Ratu & Ismail",
      url: "https://notion.so",
      icon: "fa-solid fa-note-sticky",
    },
    {
      name: "my Archive",
      url: "https://github.com",
      icon: "fa-brands fa-google-drive",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@ratuismailTV",
      icon: "fa-brands fa-youtube",
    },
  ];

  apps.forEach((app) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";
    col.innerHTML = `
      <a class="app-btn" href="${app.url}" target="_blank" rel="noopener noreferrer">
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
