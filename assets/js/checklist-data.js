// assets/js/checklist-data.js
// Data checklist perlengkapan Haji & Umrah — dipisah dari content-data.js
// supaya mudah diperbarui tanpa menyentuh data lain.
//
// Struktur setiap item: { n: nama, q: jumlah, note: catatan (string ATAU
// {1:"...",2:"..."} untuk catatan yang beda per gelombang), bag: 'kecil'
// (tas kabin/tenteng) atau 'besar' (koper bagasi), wave: null atau '2'
// (item hanya relevan/ditampilkan untuk Gelombang tersebut).
//
// Sumber isi Haji: spreadsheet "Kebutuhan Haji" (sheet Wanita & Pria).\n// Penempatan tas mengikuti kebutuhan perjalanan: "kecil" = kabin/tenteng, "besar" = koper bagasi.\n// Item bertanda wave:"2" hanya ditampilkan pada Gelombang 2.
(function () {
  "use strict";

  function I(n, q, note, bag, wave) {
    return { n: n, q: q, note: note || "", bag: bag || "besar", wave: wave || null };
  }

  var HCChecklistData = {
    icons: {
      "Pakaian": "bi-person-standing",
      "Perlengkapan Mandi & Mencuci": "bi-droplet",
      "Alat Makan": "bi-cup-straw",
      "Obat-Obatan": "bi-heart-pulse",
      "Bekal Makanan Kering": "bi-basket",
      "Pakaian & Ihram": "bi-person-standing",
      "Perlengkapan Pribadi": "bi-bag",
      "Obat-Obatan Ringan": "bi-heart-pulse",
      "Dokumen & Lainnya": "bi-file-earmark-text"
    },

    waveInfo: {
      "1": "<strong>Gelombang 1</strong> mendarat di Madinah. Jamaah berangkat memakai batik nasional — kain/baju ihram baru dikenakan saat mengambil miqat di Bir Ali menjelang perjalanan ke Mekkah.",
      "2": "<strong>Gelombang 2</strong> mendarat di Jeddah. Jamaah sudah mengenakan ihram sejak dari embarkasi Indonesia, dan mengambil miqat di atas Yalamlam. Barang bertanda <span class=\"wave-chip\">Khusus G2</span> di bawah lebih diprioritaskan karena suhu bisa mencapai ~40°C."
    },

    haji: {
      wanita: [
        { cat: "Pakaian", items: [
          I("Baju Putih Ihram", "2", {1:"Disiapkan untuk dipakai saat mengambil miqat di Bir Ali, sekitar hari ke-8/9 setelah tiba di Madinah.", 2:"Dikenakan sejak dari embarkasi Indonesia — sebaiknya sudah dipakai di badan, bukan disimpan di koper."}, "besar"),
          I("Baju Batik", "1", {1:"Dikenakan saat naik pesawat pada hari keberangkatan.", 2:"Dikenakan saat acara sebelum keberangkatan (walimatul safar) — saat naik pesawat sudah memakai ihram."}, "besar"),
          I("Gamis Proper (hitam / lainnya)", "2", "Untuk ziarah / jalan-jalan, bisa dibawa dari Indonesia atau beli di sana", "besar"),
          I("Gamis Harian", "4", "Pilih yang nyaman untuk tidur juga, biar tidak sering ganti baju", "besar"),
          I("Bergo Putih Ihram", "2", "", "besar"),
          I("Jilbab untuk Ziarah", "2", "Bebas: segi empat / pashmina / bergo", "besar"),
          I("Bergo Dagu Big Size", "2", "Untuk harian ke masjid, sekalian bisa dipakai sholat — cari yang menutup dagu", "besar"),
          I("Sarung Tangan Ihram", "1", "", "besar"),
          I("Manset Tangan", "3", "", "besar"),
          I("Celana Dalaman Gamis", "4", "Pilih bahan yang adem dan nyaman untuk dipakai harian", "besar"),
          I("Pakaian Dalam", "7 set", "", "besar"),
          I("Handuk Kecil", "1", "", "besar"),
          I("Inner Hijab Dagu", "3", "", "besar"),
          I("Mukenah", "2", "1 set travelling, 1 set biasa untuk di hotel", "besar"),
          I("Kaos Kaki Wudhu", ">5", "Jika bawa sandal jepit, pilih kaos kaki wudhu model jempol", "besar"),
          I("Sepatu Tawaf", "2", "", "besar"),
          I("Payung UPV 50+", "1", "Suhu bisa langsung ~40°C sejak hari kedatangan", "kecil", "2"),
          I("Topi", "1", "Suhu bisa langsung ~40°C sejak hari kedatangan", "kecil", "2"),
          I("Kacamata Hitam", "1", "Suhu bisa langsung ~40°C sejak hari kedatangan", "kecil", "2"),
          I("Powerbank (opsional)", "1", "Wajib di tas kabin / tenteng — tidak boleh masuk bagasi", "kecil"),
          I("Kipas Portable (opsional)", "1", "Wajib di tas kabin / tenteng — tidak boleh masuk bagasi", "kecil"),
          I("Adaptor International", "1", "", "kecil"),
          I("Colokan Rawun (opsional)", "1", "1–2 per kamar", "besar"),
          I("Lakban Besar (opsional)", "1", "", "besar"),
          I("Gunting Kecil", "1", "Wajib di koper bagasi, tidak boleh di kabin", "besar"),
          I("Gunting Kuku", "1", "Wajib di koper bagasi, tidak boleh di kabin", "besar"),
          I("Sajadah Sedang", "1", "", "besar"),
          I("Sandal", "1", "", "besar"),
          I("Sepatu", "1", "", "besar")
        ]},
        { cat: "Perlengkapan Mandi & Mencuci", items: [
          I("Sabun", "1", "", "besar"),
          I("Shampo", "1", "", "besar"),
          I("Odol", "1", "", "besar"),
          I("Deodorant", "1", "", "besar"),
          I("Detergen Bubuk Sachet", "15", "", "besar"),
          I("Kantong Plastik Besar", "10", "Untuk sandal ke masjid, baju kotor, atau mencuci", "besar"),
          I("Hanger Baju", ">5", "", "besar"),
          I("Jepitan Baju", "1 set", "Jika lansia, cukup mencuci di kamar mandi hotel — tidak perlu bawa", "besar"),
          I("Tali Jemuran", "1", "", "besar")
        ]},
        { cat: "Alat Makan", items: [
          I("Botol Minum Hemat Space", "1", "Tahan hingga suhu 80°C", "kecil"),
          I("Sendok + Garpu", "1", "", "besar"),
          I("Piring Plastik", "1", "", "besar"),
          I("Kotak / Mangkok", "1", "", "besar")
        ]},
        { cat: "Obat-Obatan", items: [
          I("Obat Batuk Kering", "", "Persiapan maksimal untuk 1 bulan. Sebagian sudah disediakan tim kesehatan di asrama haji — bawa juga jika punya merek pribadi", "kecil"),
          I("Obat Batuk Basah", "", "", "kecil"),
          I("Obat Flu", "", "", "kecil"),
          I("Obat Demam", "", "", "kecil"),
          I("Obat Radang", "", "", "kecil"),
          I("Vitamin", "", "", "kecil"),
          I("Obat Rutin Pribadi", "", "", "kecil"),
          I("Obat Penunda Haid", "", "Konsultasi dokter kandungan minimal H-1 bulan", "besar"),
          I("Obat Kaki", "", "", "besar"),
          I("Pempers Dewasa (Lansia)", "", "", "besar"),
          I("Pembalut", "", "", "besar"),
          I("Pantyliner", "", "Bawa cukup banyak — harga di sana relatif mahal", "besar"),
          I("Vaseline", "", "", "besar"),
          I("Sunscreen Spray", "", "Paparan matahari langsung lebih tinggi sejak hari pertama", "besar", "2"),
          I("Pelembab Wajah & Lip Balm", "", "", "kecil"),
          I("Minyak Kayu Putih / Freshcare", "", "", "kecil"),
          I("Tolak Angin", "", "", "kecil")
        ]},
        { cat: "Bekal Makanan Kering", items: [
          I("Abon", "", "Sesuaikan selera dan makanan daerah asal", "besar"),
          I("Sambal Sachet / Sambal Terasi", "", "", "besar"),
          I("Rendang Kering", "", "", "besar"),
          I("Mie Instan", "", "", "besar"),
          I("Energen", "", "", "besar"),
          I("Kentang Mustofa", "", "", "besar"),
          I("Sambal Kemasan Siap Makan", "", "", "besar")
        ]}
      ],
      pria: [
        { cat: "Pakaian", items: [
          I("Kain Ihram", "2 pasang", {1:"Disiapkan untuk dipakai saat mengambil miqat di Bir Ali, sekitar hari ke-8/9 setelah tiba di Madinah.", 2:"Dikenakan sejak dari embarkasi Indonesia — sebaiknya sudah dipakai di badan, bukan disimpan di koper."}, "besar"),
          I("Baju Batik", "1", {1:"Dikenakan saat naik pesawat pada hari keberangkatan.", 2:"Dikenakan saat acara sebelum keberangkatan (walimatul safar) — saat naik pesawat sudah memakai ihram."}, "besar"),
          I("Celana Panjang", "2", "Warna gelap", "besar"),
          I("Baju Koko / Gamis / Stelan Pakistan", "2", "Untuk ziarah / jalan-jalan, bisa dibawa dari Indonesia atau beli di sana", "besar"),
          I("Gamis Putih", "1", "Untuk hari kepulangan, biasanya serba putih", "besar"),
          I("Baju Dalam", "4", "Nyaman untuk tidur, warna putih / hitam", "besar"),
          I("Pakaian Dalam", "7 set", "", "besar"),
          I("Handuk Kecil", "1", "", "besar"),
          I("Ikat Pinggang Ihram", "1", "", "besar"),
          I("Sandal Ihram", "1", "Tidak menutup jari dan mata kaki", "besar"),
          I("Celana Dalam Gamis", "2", "", "besar"),
          I("Kaos Rumahan", "2", "", "besar"),
          I("Celana Tidur", "2", "", "besar"),
          I("Peci Haji", "2", "", "besar"),
          I("Sarung", "2", "", "besar"),
          I("Payung UPV 50+", "1", "Suhu bisa langsung ~40°C sejak hari kedatangan", "kecil", "2"),
          I("Kacamata Hitam", "1", "Suhu bisa langsung ~40°C sejak hari kedatangan", "kecil", "2"),
          I("Powerbank (opsional)", "1", "Wajib di tas kabin / tenteng — tidak boleh masuk bagasi", "kecil"),
          I("Kipas Portable (opsional)", "1", "Wajib di tas kabin / tenteng — tidak boleh masuk bagasi", "kecil"),
          I("Adaptor International", "1", "", "kecil"),
          I("Colokan Rawun (opsional)", "1", "1–2 per kamar", "besar"),
          I("Lakban Besar (opsional)", "1", "", "besar"),
          I("Gunting Kecil", "1", "Wajib di koper bagasi, tidak boleh di kabin", "besar"),
          I("Gunting Kuku", "1", "Wajib di koper bagasi, tidak boleh di kabin", "besar"),
          I("Sajadah Sedang", "1", "", "besar"),
          I("Sandal", "1", "", "besar")
        ]},
        { cat: "Perlengkapan Mandi & Mencuci", items: [
          I("Sabun", "1", "", "besar"),
          I("Shampo", "1", "", "besar"),
          I("Odol", "1", "", "besar"),
          I("Deodorant", "1", "", "besar"),
          I("Detergen Bubuk Sachet", "15", "", "besar"),
          I("Kantong Plastik Besar", "10", "Untuk sandal ke masjid, baju kotor, atau mencuci", "besar"),
          I("Hanger Baju", ">5", "", "besar"),
          I("Jepitan Baju", "1 set", "Jika lansia, cukup mencuci di kamar mandi hotel — tidak perlu bawa", "besar"),
          I("Tali Jemuran", "1", "", "besar")
        ]},
        { cat: "Alat Makan", items: [
          I("Botol Minum Hemat Space", "1", "", "kecil"),
          I("Sendok + Garpu", "1", "", "besar"),
          I("Piring Plastik", "1", "", "besar"),
          I("Kotak / Mangkok", "1", "", "besar")
        ]},
        { cat: "Obat-Obatan", items: [
          I("Obat Batuk Kering", "", "Persiapan minimal untuk 1 bulan. Sebagian sudah disediakan tim kesehatan di asrama haji — bawa juga jika punya merek pribadi", "kecil"),
          I("Obat Batuk Basah", "", "", "kecil"),
          I("Obat Flu", "", "", "kecil"),
          I("Obat Demam", "", "", "kecil"),
          I("Obat Radang", "", "", "kecil"),
          I("Vitamin", "", "", "kecil"),
          I("Obat Rutin Pribadi", "", "", "kecil"),
          I("Obat Kaki", "", "", "besar"),
          I("Pempers Dewasa (Lansia)", "", "", "besar"),
          I("Tikar Piknik", "", "Untuk digunakan di Muzdalifah", "besar"),
          I("Vaseline", "", "", "besar"),
          I("Sunscreen Spray", "", "Paparan matahari langsung lebih tinggi sejak hari pertama", "besar", "2"),
          I("Pelembab Wajah & Lip Balm", "", "", "kecil"),
          I("Minyak Kayu Putih / Freshcare", "", "", "kecil"),
          I("Tolak Angin", "", "", "kecil")
        ]},
        { cat: "Bekal Makanan Kering", items: [
          I("Abon", "", "Sesuaikan selera dan makanan daerah asal", "besar"),
          I("Sambal Sachet / Sambal Terasi", "", "", "besar"),
          I("Rendang Kering", "", "", "besar"),
          I("Mie Instan", "", "", "besar"),
          I("Energen", "", "", "besar"),
          I("Kentang Mustofa", "", "", "besar"),
          I("Sambal Kemasan Siap Makan", "", "", "besar"),
          I("Kopi Sachet", "", "", "besar")
        ]}
      ]
    },

    umrah: [
      { cat: "Pakaian & Ihram", items: [
        I("Kain / Mukena Ihram", "1–2 set", "Sesuaikan dengan jenis kelamin: kain ihram (pria) atau baju + bergo putih (wanita)", "besar"),
        I("Baju Harian", "4–5", "Cukup untuk ±10 hari, bisa dicuci di tengah perjalanan", "besar"),
        I("Baju Batik / Seragam Rombongan", "1", "", "besar"),
        I("Pakaian Dalam", "5–7 set", "", "besar"),
        I("Sandal Jepit", "1", "", "besar"),
        I("Sepatu / Sandal Tertutup", "1", "Untuk tawaf dan berjalan jauh", "besar"),
        I("Jaket / Outer Tipis", "1", "Untuk AC pesawat dan malam hari", "kecil"),
        I("Ikat Pinggang / Sabuk Ihram (pria)", "1", "", "besar")
      ]},
      { cat: "Perlengkapan Pribadi", items: [
        I("Sajadah Lipat", "1", "", "besar"),
        I("Mukenah Travelling (wanita)", "1", "", "kecil"),
        I("Peci / Kerudung Cadangan", "2", "", "besar"),
        I("Alat Mandi Travel Size", "1 set", "Sabun, shampo, odol, sikat gigi", "besar"),
        I("Handuk Kecil Microfiber", "1", "", "besar"),
        I("Kantong Plastik", "5", "Untuk sandal, baju kotor, dan pemisah barang", "besar"),
        I("Botol Minum Lipat", "1", "", "kecil"),
        I("Payung / Topi", "1", "Cuaca Mekkah & Madinah cenderung panas", "kecil"),
        I("Powerbank & Adaptor", "1 set", "Wajib di tas kabin, tidak boleh di bagasi", "kecil")
      ]},
      { cat: "Obat-Obatan Ringan", items: [
        I("Obat Pribadi / Resep Dokter", "", "Bawa sesuai kebutuhan pribadi, cukup untuk durasi perjalanan", "kecil"),
        I("Obat Flu, Demam & Sakit Kepala", "", "", "kecil"),
        I("Vitamin & Suplemen Daya Tahan Tubuh", "", "", "kecil"),
        I("Minyak Angin / Freshcare", "", "", "kecil"),
        I("Plester & Obat Lecet Kaki", "", "Banyak berjalan kaki saat tawaf & sa'i", "besar"),
        I("Masker", "", "Untuk kepadatan jamaah di area masjid", "kecil")
      ]},
      { cat: "Dokumen & Lainnya", items: [
        I("Paspor & Visa Umroh", "", "Simpan salinan terpisah dari dokumen asli", "kecil"),
        I("Tiket & Bukti Booking Hotel", "", "", "kecil"),
        I("Kartu Identitas & Kartu Kesehatan", "", "", "kecil"),
        I("Uang Tunai Riyal Secukupnya", "", "", "kecil"),
        I("Buku Doa / Panduan Manasik Umroh", "", "", "kecil")
      ]}
    ]
  };

  window.HCChecklistData = HCChecklistData;
})();
