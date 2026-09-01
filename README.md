# Ruang Kerja Pribadi

Website statis multi-halaman (HTML, CSS, JS — memakai framework **Bootstrap 5**
lewat CDN, tanpa build tool) untuk:
- membuka & mengedit dokumen berbentuk tabel (mirip spreadsheet) langsung di browser,
- impor/ekspor file `.xlsx` dan `.csv`,
- kumpulan tombol pintasan ke aplikasi lain yang sering Anda pakai.

Setiap menu di navbar punya halamannya sendiri, dan tiap halaman memakai struktur
yang sama: **navbar → hero → isi → footer**.

## Struktur folder

```
website-pribadi/
├── index.html          -> halaman Beranda (hero + ringkasan)
├── dokumen.html         -> halaman Dokumen (hero + editor spreadsheet)
├── aplikasi.html        -> halaman Aplikasi (hero + grid pintasan)
├── tentang.html         -> halaman Tentang (hero + profil singkat)
├── css/
│   └── style.css        -> override tema Bootstrap + gaya kustom
├── js/
│   └── script.js        -> semua logika (navbar, jam, spreadsheet, daftar aplikasi)
├── assets/               -> taruh gambar/foto Anda sendiri di sini (opsional)
└── README.md
```

## Cara pakai

Cukup buka `index.html` di browser — tidak perlu instalasi apa pun.
Untuk hosting online, unggah seluruh folder ini ke layanan seperti GitHub Pages,
Netlify, atau Vercel (drag-and-drop folder sudah cukup). Karena navigasi memakai
tautan antar-file (`dokumen.html`, `aplikasi.html`, dst.), semua file HTML harus
tetap berada di folder yang sama dengan `css/` dan `js/`.

## Framework & pustaka yang dipakai

- **Bootstrap 5.3** — grid, navbar responsif (dengan menu hamburger bawaan), tombol.
- **Font Awesome 6** — ikon.
- **SheetJS (xlsx)** — baca/tulis file Excel & CSV (hanya dimuat di `dokumen.html`).
- Font **Fraunces** (judul) dan **Manrope** (isi) dari Google Fonts.

Semua di atas dimuat lewat CDN, jadi tidak perlu `npm install`.

## Cara menambah halaman menu baru

1. Salin salah satu file halaman (misalnya `tentang.html`) menjadi file baru,
   contoh `catatan.html`.
2. Ubah judul, isi hero, dan isi bagian `<section id="isi">` sesuai kebutuhan.
3. Tambahkan tautan menu baru di bagian `<ul class="navbar-nav">` pada **semua**
   file HTML (index, dokumen, aplikasi, tentang, dan halaman baru Anda), contoh:
   ```html
   <li class="nav-item"><a class="nav-link" href="catatan.html">Catatan</a></li>
   ```

## Cara menambah aplikasi baru

Buka `js/script.js`, cari bagian **"APLIKASI"**, lalu tambahkan baris baru ke daftar `apps`:

```js
const apps = [
  { name: 'Nama Aplikasi', url: 'https://contoh.com', icon: 'fa-solid fa-star' },
  // tambahkan baris seperti ini untuk setiap aplikasi baru
];
```

Nama ikon (`icon`) diambil dari [Font Awesome Free](https://fontawesome.com/search?ic=free) —
salin nilai kelas ikonnya (contoh: `fa-brands fa-spotify`).

## Tentang dokumen (spreadsheet)

- Klik langsung pada sel untuk mengetik/mengubah isinya — tersimpan otomatis di
  browser perangkat ini (localStorage), sehingga tetap ada meski Anda menutup tab.
- Tombol **Baris** / **Kolom** menambah di akhir tabel; tombol hapus (−) menghapus
  baris/kolom tempat kursor Anda terakhir berada.
- Tombol **Buka** membaca file `.xlsx` atau `.csv` dari komputer Anda.
- Tombol **Unduh** menyimpan isi tabel saat ini sebagai file `dokumen.xlsx`.
- Data tabel disimpan per-browser/per-perangkat — jika membuka di perangkat lain,
  gunakan **Buka** untuk memuat file yang sama, atau **Unduh** untuk memindahkannya.

## Kustomisasi tampilan

Warna, jenis huruf, dan jarak diatur lewat variabel CSS di bagian paling atas
`css/style.css` (di dalam `:root, [data-bs-theme="dark"] { ... }`) yang menimpa
variabel bawaan Bootstrap, jadi mudah diubah tanpa menyentuh bagian lain.

## Mengganti nama, foto profil, dan teks di tiap halaman

Semua teks yang tampil (judul hero, deskripsi, isi "Tentang") ada langsung di
masing-masing file `.html` — cari teksnya dan ganti sesuai kebutuhan Anda.
