# Sip the Warmth (prototipe web)

Prototipe aplikasi pelacak tumbler: posisi perangkat, petunjuk arah, riwayat lokasi,
tambah barang, dan panduan penempatan tag. Berjalan di laptop, iPad, iPhone, dan Android.

## Struktur
```
sip-the-warmth/
├── index.html   halaman utama
├── style.css    tampilan (tema terang dan gelap)
├── app.js       logika peta, rute, tambah barang, panduan
└── assets/      logo dan gambar prototipe
```

## Cara menjalankan di Visual Studio Code
1. Ekstrak zip, lalu di VS Code pilih **File > Open Folder** dan buka folder `sip-the-warmth`.
2. Pasang ekstensi **Live Server** (Ritwick Dey) dari tab Extensions.
3. Klik kanan `index.html`, pilih **Open with Live Server**. Browser terbuka di `http://127.0.0.1:5500`.

Tanpa ekstensi: klik dua kali `index.html` untuk membukanya di browser, atau jalankan di terminal VS Code:
```
python -m http.server 8000
```
lalu buka `http://localhost:8000`.

## Uji di HP dan iPad
Hubungkan HP ke Wi-Fi yang sama dengan laptop, lalu buka `http://IP-LAPTOP:5500`
(Live Server) atau `http://IP-LAPTOP:8000` (python). Cek IP laptop dengan `ipconfig` (Windows)
atau `ifconfig` (Mac/Linux).

## Catatan
- Peta, lokasi, dan data barang adalah contoh. Pairing dan navigasi bersifat simulasi.
- Pelacakan sungguhan ke tag fisik (Bluetooth) memakai tag yang kompatibel dengan Apple Find My
  atau Google Find Hub, dipasangkan lewat aplikasi bawaan di HP — ini tidak bisa dilakukan dari
  website mana pun, termasuk prototipe ini, karena jaringan Find My/Find Hub tertutup dan hanya
  bisa diakses lewat aplikasi resmi Apple/Google.
- Font (Fredoka dan Plus Jakarta Sans) dimuat dari Google Fonts, jadi butuh internet.
  Tanpa internet, halaman memakai font sistem.
- Data tambahan Anda tersimpan di browser (localStorage). Tombol **Atur ulang contoh** di menu
  mengembalikan data awal.

## Lacak dari HP ini (GPS real-time) — fitur baru
Di halaman **Lokasi** dan **Arah & petunjuk** ada kartu **"Lacak dari HP ini (GPS real-time)"**.
Saat diaktifkan:
- Halaman meminta izin lokasi ke browser (prompt izin lokasi Safari/Chrome), lalu memakai
  `navigator.geolocation.watchPosition` untuk membaca GPS HP yang sedang membuka halaman.
- Titik "Posisi saya" di peta ilustrasi bergerak real-time mengikuti pergerakan Anda yang
  sesungguhnya (jarak dan arah dari titik awal saat GPS dinyalakan dihitung dari koordinat GPS
  asli, lalu diproyeksikan ke peta ilustrasi).
- Di langkah **Tandai lokasi** pada alur Tambah barang, ada tombol **"Pakai lokasi GPS saya
  sekarang"** untuk menandai posisi barang sesuai lokasi Anda saat itu.
- Koordinat GPS hanya dipakai di browser Anda sendiri (tidak dikirim ke server mana pun — tidak
  ada server di prototipe ini) dan tidak disimpan ke localStorage demi privasi; status aktif/mati
  akan kembali nonaktif setiap halaman dimuat ulang.

### Agar GPS benar-benar jalan di iPhone 11 Anda
1. **Wajib HTTPS** (atau `localhost`). Safari di iOS menolak memberi akses lokasi lewat alamat
   `http://` biasa, termasuk saat diakses lewat IP laptop di Wi-Fi yang sama
   (`http://IP-LAPTOP:5500`). Pilihan termudah:
   - Deploy gratis ke **GitHub Pages**, **Netlify**, atau **Vercel** (otomatis dapat HTTPS), lalu
     buka alamat tersebut di Safari iPhone. Atau
   - Jalankan tunnel HTTPS ke laptop, misalnya `npx localtunnel --port 5500` atau `ngrok http 5500`,
     lalu buka alamat `https://...` yang diberikan di Safari iPhone.
2. Buka halaman itu di **Safari** pada iPhone 11, masuk ke tab **Lokasi**, lalu ketuk sakelar
   **"Lacak dari HP ini"**. Izinkan akses lokasi saat diminta. Untuk akurasi terbaik, izinkan
   "Precise Location" (Lokasi Tepat) di Pengaturan > Privasi & Keamanan > Layanan Lokasi > Safari
   Websites.
3. GPS hanya aktif selagi tab Safari terbuka di depan (bukan pelacakan latar belakang) — ini
   batasan browser di semua HP, bukan hanya iPhone.
4. Yang **tidak** bisa dilakukan lewat website: pairing Bluetooth sungguhan ke tag Find My/Find Hub,
   notifikasi lokasi di latar belakang, atau mengakses jaringan Find My Apple. Itu perlu aplikasi
   native dan di luar cakupan prototipe berbasis web ini.
