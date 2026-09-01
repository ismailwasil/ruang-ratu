/* =========================================================
   0. NAVBAR: tutup menu mobile Bootstrap saat sebuah link diklik
   ========================================================= */
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  mainNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(mainNav).hide();
      }
    });
  });
}

/* =========================================================
   1. JAM HIDUP DI HERO (hanya ada di Beranda)
   ========================================================= */
const liveClock = document.getElementById('liveClock');
if (liveClock) {
  function updateClock() {
    const now = new Date();
    const tanggal = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
    const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    liveClock.textContent = `${tanggal} — ${jam}`;
  }
  updateClock();
  setInterval(updateClock, 1000 * 30);
}

/* =========================================================
   2. DOKUMEN / SPREADSHEET EDITOR (hanya ada di halaman Dokumen)
   ========================================================= */
const table = document.getElementById('sheetTable');

if (table) {
  const STORAGE_KEY = 'ruangPribadi.sheetData';
  const sheetStatus = document.getElementById('sheetStatus');

  // Data disimpan sebagai array 2 dimensi, mis. data[baris][kolom]
  let sheetData = loadSheet() || [
    ['Item', 'Kategori', 'Catatan'],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  let activeCell = { row: 0, col: 0 };

  function loadSheet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.warn('Gagal membaca data tersimpan:', err);
      return null;
    }
  }

  function saveSheet() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sheetData));
      sheetStatus.textContent = 'Tersimpan otomatis di peramban ini';
    } catch (err) {
      sheetStatus.textContent = 'Gagal menyimpan otomatis';
      console.warn(err);
    }
  }

  let saveTimer = null;
  function scheduleSave() {
    sheetStatus.textContent = 'Menyimpan…';
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveSheet, 500);
  }

  function columnLetter(index) {
    let letter = '';
    let n = index;
    while (n >= 0) {
      letter = String.fromCharCode((n % 26) + 65) + letter;
      n = Math.floor(n / 26) - 1;
    }
    return letter;
  }

  function renderTable() {
    const colCount = Math.max(...sheetData.map(row => row.length), 1);
    table.innerHTML = '';

    // Baris header huruf kolom (A, B, C, ...)
    const headRow = document.createElement('tr');
    const corner = document.createElement('th');
    corner.className = 'corner-cell';
    headRow.appendChild(corner);
    for (let c = 0; c < colCount; c++) {
      const th = document.createElement('th');
      th.className = 'cell-letter';
      th.textContent = columnLetter(c);
      headRow.appendChild(th);
    }
    table.appendChild(headRow);

    // Baris data, dengan nomor baris di kolom paling kiri
    sheetData.forEach((row, r) => {
      const tr = document.createElement('tr');

      const indexCell = document.createElement('th');
      indexCell.className = 'cell-index';
      indexCell.textContent = String(r + 1);
      tr.appendChild(indexCell);

      for (let c = 0; c < colCount; c++) {
        const td = document.createElement('td');
        td.contentEditable = 'true';
        td.textContent = row[c] ?? '';
        td.dataset.row = String(r);
        td.dataset.col = String(c);

        td.addEventListener('focus', () => {
          activeCell = { row: r, col: c };
        });

        td.addEventListener('input', () => {
          sheetData[r][c] = td.textContent;
          scheduleSave();
        });

        tr.appendChild(td);
      }

      table.appendChild(tr);
    });
  }

  function addRow() {
    const colCount = Math.max(...sheetData.map(row => row.length), 1);
    sheetData.push(new Array(colCount).fill(''));
    renderTable();
    saveSheet();
  }

  function addColumn() {
    sheetData.forEach(row => row.push(''));
    renderTable();
    saveSheet();
  }

  function deleteRow() {
    if (sheetData.length <= 1) return;
    sheetData.splice(activeCell.row, 1);
    activeCell.row = Math.max(0, activeCell.row - 1);
    renderTable();
    saveSheet();
  }

  function deleteColumn() {
    const colCount = Math.max(...sheetData.map(row => row.length), 1);
    if (colCount <= 1) return;
    sheetData.forEach(row => row.splice(activeCell.col, 1));
    activeCell.col = Math.max(0, activeCell.col - 1);
    renderTable();
    saveSheet();
  }

  function newSheet() {
    const confirmReset = confirm('Buat sheet kosong baru? Data yang belum diunduh akan hilang.');
    if (!confirmReset) return;
    sheetData = [['', '', ''], ['', '', ''], ['', '', '']];
    renderTable();
    saveSheet();
  }

  document.getElementById('btnAddRow').addEventListener('click', addRow);
  document.getElementById('btnAddCol').addEventListener('click', addColumn);
  document.getElementById('btnDelRow').addEventListener('click', deleteRow);
  document.getElementById('btnDelCol').addEventListener('click', deleteColumn);
  document.getElementById('btnNew').addEventListener('click', newSheet);

  // Buka file .xlsx / .csv menggunakan SheetJS
  const fileInput = document.getElementById('fileInput');
  document.getElementById('btnOpen').addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
      sheetData = rows.length ? rows : [['']];
      renderTable();
      saveSheet();
    };
    reader.readAsArrayBuffer(file);
    fileInput.value = '';
  });

  // Unduh sheet sebagai file .xlsx
  document.getElementById('btnSave').addEventListener('click', () => {
    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dokumen');
    XLSX.writeFile(workbook, 'dokumen.xlsx');
  });

  renderTable();
}

/* =========================================================
   3. APLIKASI (hanya ada di halaman Aplikasi)
   ---------------------------------------------------------
   Setiap entri butuh:
     name : nama yang tampil pada tombol
     url  : alamat aplikasi yang dituju
     icon : nama ikon dari Font Awesome (https://fontawesome.com/icons)
   ========================================================= */
const appsGrid = document.getElementById('appsGrid');

if (appsGrid) {
  const apps = [
    { name: 'Gmail', url: 'https://mail.google.com', icon: 'fa-solid fa-envelope' },
    { name: 'Google Drive', url: 'https://drive.google.com', icon: 'fa-brands fa-google-drive' },
    { name: 'Notion', url: 'https://notion.so', icon: 'fa-solid fa-note-sticky' },
    { name: 'GitHub', url: 'https://github.com', icon: 'fa-brands fa-github' },
    { name: 'Kalender', url: 'https://calendar.google.com', icon: 'fa-regular fa-calendar' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'fa-brands fa-youtube' },
  ];

  apps.forEach(app => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4 col-lg-3';
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
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
