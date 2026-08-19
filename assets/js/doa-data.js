// assets/js/doa-data.js
// Data statis kumpulan doa (Tawaf, Sa'i, Arafah) untuk halaman doa.html.
// Sumber: THAWAF.json, SA_I.json, Doa_Arafah.json.
// File ini MENGGANTIKAN sistem dinamis lama (Google Sheets DoaKategori/
// DoaPutaran/DoaList + endpoint Apps Script doakategori/doaputaran/doalist).
// Kalau isi doa perlu diupdate, edit array di file ini langsung, lalu
// deploy ulang situsnya (lihat PANDUAN_DOA_BARU.md untuk pola build/deploy).

const DoaStaticData = {
  kategori: [
    {
      id: "kat-01",
      nama: "Tawaf",
      urutan: 1,
      tipe: "putaran",
      status: "Publish",
    },
    {
      id: "kat-02",
      nama: "Sa'i",
      urutan: 2,
      tipe: "putaran",
      status: "Publish",
    },
    {
      id: "kat-03",
      nama: "Arafah",
      urutan: 3,
      tipe: "list",
      status: "Publish",
    },
  ],

  putaran: {
    Tawaf: [
      {
        id: "dp-001",
        kategori: "Tawaf",
        putaran: 1,
        urutan: 1,
        judul_bagian: "Do'a di Hajar Aswad (Memulai Putaran ke-1)",
        keterangan:
          "Sebelum mulai: posisi di Hajar Aswad. Posisikan Ka'bah di sebelah kiri. Laki-laki yang melakukan thawaf disunnahkan idhthiba' (membuka bahu kanan). Ketika sejajar dengan Hajar Aswad, menghadap atau memberi isyarat ke arahnya. Jika memungkinkan, cium atau sentuh Hajar Aswad tanpa menyakiti atau mendorong jamaah lain; jika tidak memungkinkan cukup memberi isyarat.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-002",
        kategori: "Tawaf",
        putaran: 1,
        urutan: 2,
        judul_bagian: "Do'a Menuju Rukun Yamani (Putaran ke-1)",
        keterangan: "",
        arab: "سُبْحَانَ اللهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللهُ اللهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ الْعَلِيِّ الْعَظِيمِ. وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ. اللَّهُمَّ إِيمَانًا بِكَ، وَتَصْدِيقًا بِكِتَابِكَ، وَوَفَاءً بِعَهْدِكَ، وَاتِّبَاعًا لِسُنَّةِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ وَالْمُعَافَاةَ الدَّائِمَةَ فِي الدِّينِ وَالدُّنْيَا وَالْآخِرَةِ، وَالْفَوْزَ بِالْجَنَّةِ وَالنَّجَاةَ مِنَ النَّارِ",
        latin:
          "Subḥānallāhi wal-ḥamdu lillāhi wa lā ilāha illallāhu wallāhu akbar, wa lā ḥawla wa lā quwwata illā billāhil-'aliyyil-'aẓīm. Waṣ-ṣalātu was-salāmu 'alā rasūlillāhi ṣallallāhu 'alaihi wa sallam. Allāhumma īmānan bika, wa taṣdīqan bikitābika, wa wafā'an bi'ahdika, wattibā'an lisunnati nabiyyika Muḥammadin ṣallallāhu 'alaihi wa sallam. Allāhumma innī as'alukal-'afwa wal-'āfiyata wal-mu'āfātad-dā'imata fid-dīni wad-dunyā wal-ākhirah, wal-fawza bil-jannati wan-najāta minan-nār.",
        arti: "Mahasuci Allah, segala puji bagi Allah, tidak ada Tuhan selain Allah, Allah Mahabesar. Tidak ada daya dan kekuatan kecuali dengan pertolongan Allah Yang Mahatinggi lagi Mahabesar. Semoga salawat dan salam tercurah kepada Rasulullah ﷺ. Ya Allah, (aku melakukan thawaf ini) dengan keimanan kepada-Mu, membenarkan kitab-Mu, memenuhi janji-Mu, dan mengikuti sunnah Nabi-Mu Muhammad ﷺ. Ya Allah, sesungguhnya aku memohon kepada-Mu ampunan, kesehatan, keselamatan yang terus-menerus dalam agama, dunia, dan akhirat; serta memperoleh kemenangan dengan masuk surga dan keselamatan dari neraka.",
        status: "Publish",
      },
      {
        id: "dp-003",
        kategori: "Tawaf",
        putaran: 1,
        urutan: 3,
        judul_bagian: "Do'a Saat Sampai di Rukun Yamani",
        keterangan:
          "Jika memungkinkan dan tidak mengganggu jamaah lain, sentuh Rukun Yamani dengan tangan kanan. Tidak perlu mencium atau memaksakan diri ketika keadaan ramai.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-004",
        kategori: "Tawaf",
        putaran: 1,
        urutan: 4,
        judul_bagian: "Do'a Setelah Melewati Rukun Yamani",
        keterangan: "",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
        status: "Publish",
      },
      {
        id: "dp-005",
        kategori: "Tawaf",
        putaran: 1,
        urutan: 5,
        judul_bagian: "Do'a Tambahan di Rukun Yamani",
        keterangan:
          "Bacaan tambahan (opsional)",
        arab: "وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
        latin:
          "Wa adkhilnal-jannata ma'al-abrār, yā 'azīzu yā ghaffār, yā rabbal-'ālamīn.",
        arti: "Dan masukkanlah kami ke dalam surga bersama orang-orang yang berbakti, wahai Yang Mahaperkasa, wahai Yang Maha Pengampun, wahai Tuhan seluruh alam.",
        status: "Publish",
      },
      {
        id: "dp-006",
        kategori: "Tawaf",
        putaran: 2,
        urutan: 1,
        judul_bagian: "Do'a di Hajar Aswad (Memulai Putaran ke-2)",
        keterangan:
          "Setelah putaran ke-1 selesai dan kembali ke Hajar Aswad, mulai putaran ke-2. Jika memungkinkan, menghadap/isyarat ke Hajar Aswad. Kemudian mulai berjalan dengan Ka'bah berada di sebelah kiri.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-007",
        kategori: "Tawaf",
        putaran: 2,
        urutan: 2,
        judul_bagian: "Do'a Menuju Rukun Yamani (Putaran ke-2)",
        keterangan: "",
        arab: "اللَّهُمَّ إِنَّ هَذَا الْبَيْتَ بَيْتُكَ، وَهَذَا الْحَرَمَ حَرَمُكَ، وَهَذَا الْأَمْنَ أَمْنُكَ، وَهَذَا مَقَامُ الْعَائِذِ بِكَ مِنَ النَّارِ. اللَّهُمَّ حَبِّبْ إِلَيْنَا الْإِيمَانَ وَزَيِّنْهُ فِي قُلُوبِنَا، وَكَرِّهْ إِلَيْنَا الْكُفْرَ وَالْفُسُوقَ وَالْعِصْيَانَ، وَاجْعَلْنَا مِنَ الرَّاشِدِينَ. اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ. اللَّهُمَّ ارْزُقْنِي الْجَنَّةَ بِغَيْرِ حِسَابٍ",
        latin:
          "Allāhumma inna hādzal-baita baituka, wa hādzal-ḥarama ḥaramuka, wa hādzal-amna amnuka, wa hādzā maqāmul-'ā'idzi bika minan-nār. Allāhumma ḥabbib ilainal-īmāna wa zayyinhu fī qulūbinā, wa karrih ilainal-kufra wal-fusūqa wal-'iṣyāna, waj'alnā minar-rāsyidīn. Allāhumma qinī 'adzābaka yauma tab'atsu 'ibādak. Allāhumma-rzuqnī al-jannata bighairi ḥisāb.",
        arti: "Ya Allah, sesungguhnya rumah ini adalah rumah-Mu, tanah haram ini adalah tanah haram-Mu, keamanan ini adalah keamanan dari-Mu, dan ini adalah tempat berlindung kepada-Mu dari neraka. Ya Allah, cintakanlah kepada kami keimanan dan hiasilah iman itu di dalam hati kami. Jadikanlah kami benci kepada kekufuran, kefasikan, dan kemaksiatan. Dan jadikanlah kami termasuk orang-orang yang mendapat petunjuk. Ya Allah, lindungilah aku dari azab-Mu pada hari Engkau membangkitkan hamba-hamba-Mu. Ya Allah, karuniakanlah kepadaku surga tanpa hisab.",
        status: "Publish",
      },
      {
        id: "dp-008",
        kategori: "Tawaf",
        putaran: 2,
        urutan: 3,
        judul_bagian: "Do'a Saat Sampai di Rukun Yamani",
        keterangan:
          "Jika memungkinkan dan tidak mengganggu jamaah lain, sentuh Rukun Yamani dengan tangan kanan. Tidak perlu mencium atau memaksakan diri ketika keadaan ramai.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-009",
        kategori: "Tawaf",
        putaran: 2,
        urutan: 4,
        judul_bagian: "Do'a Setelah Melewati Rukun Yamani",
        keterangan: "",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
        status: "Publish",
      },
      {
        id: "dp-010",
        kategori: "Tawaf",
        putaran: 2,
        urutan: 5,
        judul_bagian: "Do'a Tambahan di Rukun Yamani",
        keterangan:
          "Bacaan tambahan (opsional)",
        arab: "وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
        latin:
          "Wa adkhilnal-jannata ma'al-abrār, yā 'azīzu yā ghaffār, yā rabbal-'ālamīn.",
        arti: "Dan masukkanlah kami ke dalam surga bersama orang-orang yang berbakti, wahai Yang Mahaperkasa, wahai Yang Maha Pengampun, wahai Tuhan seluruh alam.",
        status: "Publish",
      },
      {
        id: "dp-011",
        kategori: "Tawaf",
        putaran: 3,
        urutan: 1,
        judul_bagian: "Do'a di Hajar Aswad (Memulai Putaran ke-3)",
        keterangan:
          "Setelah putaran ke-2 selesai dan kembali ke Hajar Aswad, mulai putaran ke-3. Jika memungkinkan, menghadap/isyarat ke Hajar Aswad. Kemudian mulai berjalan dengan Ka'bah berada di sebelah kiri.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-012",
        kategori: "Tawaf",
        putaran: 3,
        urutan: 2,
        judul_bagian: "Do'a Menuju Rukun Yamani (Putaran ke-3)",
        keterangan: "",
        arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الشَّكِّ وَالشِّرْكِ وَالشِّقَاقِ وَالنِّفَاقِ وَسُوءِ الْأَخْلَاقِ، وَسُوءِ الْمَنْظَرِ وَالْمَنْظَرِ، وَأَعُوذُ بِكَ مِنْ فَقْرِ الدُّنْيَا وَعَذَابِ الْآخِرَةِ. اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ، وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ، وَأَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ، وَالْعَمَلَ الَّذِي يُقَرِّبُنِي إِلَى حُبِّكَ",
        latin:
          "Allāhumma innī a'ūdzu bika minasy-syakki wasy-syirki wasy-syiqāqi wan-nifāqi wa sū'il-akhlāqi, wa sū'il-manzhari wal-manzhar, wa a'ūdzu bika min faqrid-dunyā wa 'adzābil-ākhirah. Allāhumma innī as'aluka riḍāka wal-jannah, wa a'ūdzu bika min sakhaṭika wan-nār, wa as'aluka ḥubbaka wa ḥubba man yuḥibbuka, wal-'amalal-ladzī yuqarribunī ilā ḥubbik.",
        arti: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari keraguan, kemusyrikan, perselisihan, kemunafikan, akhlak yang buruk, dan pandangan yang buruk. Aku berlindung kepada-Mu dari kefakiran dunia dan azab akhirat. Ya Allah, sesungguhnya aku memohon keridaan-Mu dan surga. Aku berlindung kepada-Mu dari kemurkaan-Mu dan neraka. Aku memohon kepada-Mu cinta-Mu, cinta orang-orang yang mencintai-Mu, dan amal yang mendekatkanku kepada cinta-Mu.",
        status: "Publish",
      },
      {
        id: "dp-013",
        kategori: "Tawaf",
        putaran: 3,
        urutan: 3,
        judul_bagian: "Do'a Saat Sampai di Rukun Yamani",
        keterangan:
          "Jika memungkinkan dan tidak mengganggu jamaah lain, sentuh Rukun Yamani dengan tangan kanan. Tidak perlu mencium atau memaksakan diri ketika keadaan ramai.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-014",
        kategori: "Tawaf",
        putaran: 3,
        urutan: 4,
        judul_bagian: "Do'a Setelah Melewati Rukun Yamani",
        keterangan: "",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
        status: "Publish",
      },
      {
        id: "dp-015",
        kategori: "Tawaf",
        putaran: 3,
        urutan: 5,
        judul_bagian: "Do'a Tambahan di Rukun Yamani",
        keterangan:
          "Bacaan tambahan (opsional)",
        arab: "وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
        latin:
          "Wa adkhilnal-jannata ma'al-abrār, yā 'azīzu yā ghaffār, yā rabbal-'ālamīn.",
        arti: "Dan masukkanlah kami ke dalam surga bersama orang-orang yang berbakti, wahai Yang Mahaperkasa, wahai Yang Maha Pengampun, wahai Tuhan seluruh alam.",
        status: "Publish",
      },
      {
        id: "dp-016",
        kategori: "Tawaf",
        putaran: 4,
        urutan: 1,
        judul_bagian: "Do'a di Hajar Aswad (Memulai Putaran ke-4)",
        keterangan:
          "Setelah putaran ke-3 selesai dan kembali ke Hajar Aswad, mulai putaran ke-4. Jika memungkinkan, menghadap/isyarat ke Hajar Aswad. Kemudian mulai berjalan dengan Ka'bah berada di sebelah kiri.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-017",
        kategori: "Tawaf",
        putaran: 4,
        urutan: 2,
        judul_bagian: "Do'a Menuju Rukun Yamani (Putaran ke-4)",
        keterangan: "",
        arab: "اللَّهُمَّ اجْعَلْهُ حَجًّا مَبْرُورًا، وَسَعْيًا مَشْكُورًا، وَذَنْبًا مَغْفُورًا، وَعَمَلًا صَالِحًا مَقْبُولًا، وَتِجَارَةً لَنْ تَبُورَ. يَا عَالِمَ مَا فِي الصُّدُورِ، أَخْرِجْنِي يَا اللهُ مِنَ الظُّلُمَاتِ إِلَى النُّورِ. اللَّهُمَّ إِنِّي أَسْأَلُكَ مُوجِبَاتِ رَحْمَتِكَ، وَعَزَائِمَ مَغْفِرَتِكَ، وَالسَّلَامَةَ مِنْ كُلِّ إِثْمٍ، وَالْغَنِيمَةَ مِنْ كُلِّ بِرٍّ، وَالْفَوْزَ بِالْجَنَّةِ، وَالنَّجَاةَ مِنَ النَّارِ. رَبِّ قَنِّعْنِي بِمَا رَزَقْتَنِي، وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي، وَأَخْلِفْ عَلَيَّ كُلَّ غَائِبَةٍ لِي مِنْكَ بِخَيْرٍ",
        latin:
          "Allāhummaj'alhu ḥajjan mabrūran, wa sa'yan masykūran, wa dzanban maghfūran, wa 'amalan ṣāliḥan maqbūlan, wa tijāratan lan tabūr. Yā 'ālima mā fiṣ-ṣudūr, akhrijnī yā Allāhu minaẓ-ẓulumāti ilan-nūr. Allāhumma innī as'aluka mūjibāti raḥmatika, wa 'azā'ima maghfiratika, was-salāmata min kulli itsmin, wal-ghanīmata min kulli birrin, wal-fawza bil-jannati, wan-najāta minan-nār. Rabbi qanni'nī bimā razaqtanī, wa bārik lī fīmā a'ṭaitanī, wa akhlif 'alayya kulla ghā'ibatin lī minka bikhair.",
        arti: "Ya Allah, jadikanlah haji ini haji yang mabrur, sa'i yang diterima, dosa yang diampuni, amal saleh yang diterima, dan perdagangan yang tidak merugi. Wahai Yang Maha Mengetahui apa yang ada di dalam dada, keluarkanlah aku, ya Allah, dari kegelapan menuju cahaya. Ya Allah, sesungguhnya aku memohon kepada-Mu hal-hal yang mendatangkan rahmat-Mu, ketetapan-ketetapan ampunan-Mu, keselamatan dari setiap dosa, memperoleh keberuntungan dari setiap kebajikan, memperoleh kemenangan dengan masuk surga, dan keselamatan dari neraka. Ya Tuhanku, jadikanlah aku merasa cukup dengan rezeki yang telah Engkau berikan kepadaku, berkahilah apa yang telah Engkau karuniakan kepadaku, dan gantilah untukku setiap sesuatu yang hilang dariku dengan kebaikan dari-Mu.",
        status: "Publish",
      },
      {
        id: "dp-018",
        kategori: "Tawaf",
        putaran: 4,
        urutan: 3,
        judul_bagian: "Do'a Saat Sampai di Rukun Yamani",
        keterangan:
          "Jika memungkinkan dan tidak mengganggu jamaah lain, sentuh Rukun Yamani dengan tangan kanan. Tidak perlu mencium atau memaksakan diri ketika keadaan ramai.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-019",
        kategori: "Tawaf",
        putaran: 4,
        urutan: 4,
        judul_bagian: "Do'a Setelah Melewati Rukun Yamani",
        keterangan: "",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
        status: "Publish",
      },
      {
        id: "dp-020",
        kategori: "Tawaf",
        putaran: 4,
        urutan: 5,
        judul_bagian: "Do'a Tambahan di Rukun Yamani",
        keterangan:
          "Bacaan tambahan (opsional)",
        arab: "وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
        latin:
          "Wa adkhilnal-jannata ma'al-abrār, yā 'azīzu yā ghaffār, yā rabbal-'ālamīn.",
        arti: "Dan masukkanlah kami ke dalam surga bersama orang-orang yang berbakti, wahai Yang Mahaperkasa, wahai Yang Maha Pengampun, wahai Tuhan seluruh alam.",
        status: "Publish",
      },
      {
        id: "dp-021",
        kategori: "Tawaf",
        putaran: 5,
        urutan: 1,
        judul_bagian: "Do'a di Hajar Aswad (Memulai Putaran ke-5)",
        keterangan:
          "Setelah putaran ke-4 selesai dan kembali ke Hajar Aswad, mulai putaran ke-5. Jika memungkinkan, menghadap/isyarat ke Hajar Aswad. Kemudian mulai berjalan dengan Ka'bah berada di sebelah kiri.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-022",
        kategori: "Tawaf",
        putaran: 5,
        urutan: 2,
        judul_bagian: "Do'a Menuju Rukun Yamani (Putaran ke-5)",
        keterangan: "",
        arab: "اَللّٰهُمَّ أَظِلَّنِيْ تَحْتَ ظِلِّ عَرْشِكَ يَوْمَ لَا ظِلِّ اِلَّا ظِلُّكَ وَلَا بَاقِىَ اِلَّا وَجْهُكَ وَأَسْقِنِيْ مِنْ حَوْضِ نَبِيِّكَ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمْ شُرْبَةً هَنِيَْئَةً مَرِيْئَةً لَا نَظْمَأُ بَعْدَ هَا أَبَدًا اَللّٰهُمَّ اِنِّيْ أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَأَعُوْذُبِكَ مِنْ شَرِّ مَا اسْتَعَاذَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ. اَللّٰهُمَّ إِنِّيْ أَسْأَلُكَ الْجَنَّةَ وَنَعِيْمَهَا وَمَا يُقَرِّبُنِيْ إِلَيْهَا مِنْ قَوْلٍ أَوْ فِعْلٍ أَوْ عَمَلٍ، وَأَعُوْذُبِكَ مِنَ النَّارِ وَمَا يُقَرِّبُنِيْ إِلَيْهَا مِنْ قَوْلٍ أَوْ فِعْلٍ أَوْ عَمَلٍ",
        latin:
          "Allahumma azillanii tahta zhilli 'arsyika yauma laa zilla illaa zhilluka wa laa baaqiya illaa wajhuka wasqinii min haudhi nabiyyika Muhammadin shallallahu 'alaihi wassalam syurbatan haniiatan mariiatan laanazhma'u ba'dahaa abadaa. Allahumma inni as aluka min khairi maa sa alaka minhu Nabiyyuka Muhammadin Sallallaahu 'alaihi wasallam. Wa a'uudzubika minsyarri masta'aadzaka minhu Nabiyyuka Muhammadin Sallallaahu 'alaihi wasallam. Allahumma inni as aluka jannata wana'iimahaa wamaa yuqarribunii ilaiha min qaulin au fi'lin au 'amalin, wa a'uudzubika minannari wamaa yuqorribunii ilaihaa min qaulin au fi'lin au 'amailn.",
        arti: "Ya Allah lindungilah aku dibawah lindungan-Mu pada hari yang tidak ada naungan selain dari naungan-Mu dan tidak ada yang tinggal kekal selain wajah-Mu. Dan berilah aku minuman dari telaga Nabi Muhammad saw. dengan suatu minuman yang lezat nyaman, sesudah itu aku tidak akan haus untuk selamanya. Ya Allah, aku mohon pada-Mu kebaikan yang diminta oleh Nabi Muhammad saw., dan aku berlindung pada-Mu dari kejahatan dan minta perlindungan-Mu daripada yang diminta Nabi Muhammad saw. Ya Allah, aku mohon pada-Mu surga serta nikmat-Nya dan apapun yang dapat mendekatkan aku pada-Nya dari perkataan atau perbuatan ataupun amal. Dan aku berlindung pada-Mu dari neraka serta apapun yang mendekatkan aku kepada-Nya, baik ucapan, perbuatan ataupun amal.",
        status: "Publish",
      },
      {
        id: "dp-023",
        kategori: "Tawaf",
        putaran: 5,
        urutan: 3,
        judul_bagian: "Do'a Saat Sampai di Rukun Yamani",
        keterangan:
          "Jika memungkinkan dan tidak mengganggu jamaah lain, sentuh Rukun Yamani dengan tangan kanan. Tidak perlu mencium atau memaksakan diri ketika keadaan ramai.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-024",
        kategori: "Tawaf",
        putaran: 5,
        urutan: 4,
        judul_bagian: "Do'a Setelah Melewati Rukun Yamani",
        keterangan: "",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
        status: "Publish",
      },
      {
        id: "dp-025",
        kategori: "Tawaf",
        putaran: 5,
        urutan: 5,
        judul_bagian: "Do'a Tambahan di Rukun Yamani",
        keterangan:
          "Bacaan tambahan (opsional)",
        arab: "وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
        latin:
          "Wa adkhilnal-jannata ma'al-abrār, yā 'azīzu yā ghaffār, yā rabbal-'ālamīn.",
        arti: "Dan masukkanlah kami ke dalam surga bersama orang-orang yang berbakti, wahai Yang Mahaperkasa, wahai Yang Maha Pengampun, wahai Tuhan seluruh alam.",
        status: "Publish",
      },
      {
        id: "dp-026",
        kategori: "Tawaf",
        putaran: 6,
        urutan: 1,
        judul_bagian: "Do'a di Hajar Aswad (Memulai Putaran ke-6)",
        keterangan:
          "Setelah putaran ke-5 selesai dan kembali ke Hajar Aswad, mulai putaran ke-6. Jika memungkinkan, menghadap/isyarat ke Hajar Aswad. Kemudian mulai berjalan dengan Ka'bah berada di sebelah kiri.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-027",
        kategori: "Tawaf",
        putaran: 6,
        urutan: 2,
        judul_bagian: "Do'a Menuju Rukun Yamani (Putaran ke-6)",
        keterangan: "",
        arab: "اللّهُمَّ إِنَّ لَكَ عَلَيَّ حُقُوْقًا كَثِيْرَةًفِيْمَا بَيْنِيْ وَبَيْنَكَ وَحُقُوْقًا كَثِيْرَةً فِيْمَا بَيْنِيْ وَبَيْنَ خَلْـقِكَ. اللّهُمَّ مَاكَانَ لَكَ مِنْهَا فَاغْفِرْهُ لِيْ وَمَاكَانَ لِخَلْقِكَ فَتَحَمَّلْهُ عَنِّيْ وَأَغْنِنِى بِحَلاَ لِكَ عَنْ حَرَامِكَ وَبِطَا عَتِكَ عَنْ مَعْصِيَتِكَ وَبِفَضْلِكَ عَمَّنْ سِوَاكَ يَاوَاسِعَ الْمَغْفِرَةِ. اَللّهُمَّ إِنَّ بَيْتَكَ عَظِيْمٌ وَوَجْهَكَ كِرَيْمٌ اَنْتَ يَااللهُ حَلِيْمٌ كَرِيْمٌ عَظِيْمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        latin:
          "Allhamumma inna laka alayya huquuqon katsirotan fiima bainii wabainaka wahuquuqon katsirotan fiima bainii wabaina kholqika. Allaahumma maa kaana laka minhaa fagfirhuu lii wa maa kaana likholqika fatahammalhu annii waagninii bihalaalika waharoomika wabito'oatika an ma'siyatika wabifadlika amman siwaaka yaa waasi'al magfiroh. Allhumma inna baitaka adiim wawajhaka kariim anta ya Allah haliimun kariimun adiimun tuhibbul afwa fa'fu anni.",
        arti: "Ya Allah, sesungguhnya Engkau mempunyai hak yang banyak sekali atas diriku dalam hubungan antara aku dengan-Mu. Dan Engkau juga mempunyai hak yang banyak sekali dalam hubungan antara aku dengan makhluk-Mu. Ya Allah, apa yang menjadi hak-Mu atas diriku, maka ampunilah aku. Dan apa saja yang menjadi hak makhluk-Mu atas diriku, maka tanggungkanlah dariku. Cukupkanlah diriku dengan rizki-Mu yang halal, terhindar dari yang haram. Dan dengan ta'at kepada-Mu, terhindar dari kemaksiatan. Dan dengan anugerah-Mu terhindar daripada mengharap dari selain daripada-Mu, wahai Tuhan Yang Maha Luas pengampunan-Nya. Ya Allah, sesungguhnya rumah-Mu ini agung, Zat-Mu pun sungguh mulia, dan Engkau ya Allah, Maha Penyabar, Maha Pemurah dan Maha Agung, Engkau suka memberi ampun, maka ampunilah aku.",
        status: "Publish",
      },
      {
        id: "dp-028",
        kategori: "Tawaf",
        putaran: 6,
        urutan: 3,
        judul_bagian: "Do'a Saat Sampai di Rukun Yamani",
        keterangan:
          "Jika memungkinkan dan tidak mengganggu jamaah lain, sentuh Rukun Yamani dengan tangan kanan. Tidak perlu mencium atau memaksakan diri ketika keadaan ramai.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-029",
        kategori: "Tawaf",
        putaran: 6,
        urutan: 4,
        judul_bagian: "Do'a Setelah Melewati Rukun Yamani",
        keterangan: "",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
        status: "Publish",
      },
      {
        id: "dp-030",
        kategori: "Tawaf",
        putaran: 6,
        urutan: 5,
        judul_bagian: "Do'a Tambahan di Rukun Yamani",
        keterangan:
          "Bacaan tambahan (opsional)",
        arab: "وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
        latin:
          "Wa adkhilnal-jannata ma'al-abrār, yā 'azīzu yā ghaffār, yā rabbal-'ālamīn.",
        arti: "Dan masukkanlah kami ke dalam surga bersama orang-orang yang berbakti, wahai Yang Mahaperkasa, wahai Yang Maha Pengampun, wahai Tuhan seluruh alam.",
        status: "Publish",
      },
      {
        id: "dp-031",
        kategori: "Tawaf",
        putaran: 7,
        urutan: 1,
        judul_bagian: "Do'a di Hajar Aswad (Memulai Putaran ke-7)",
        keterangan:
          "Setelah putaran ke-6 selesai dan kembali ke Hajar Aswad, mulai putaran ke-7. Jika memungkinkan, menghadap/isyarat ke Hajar Aswad. Kemudian mulai berjalan dengan Ka'bah berada di sebelah kiri.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-032",
        kategori: "Tawaf",
        putaran: 7,
        urutan: 2,
        judul_bagian: "Do'a Menuju Rukun Yamani (Putaran ke-7)",
        keterangan: "",
        arab: "اللّهُمَّ إِنِّيْ أسْأَلُكَ إِيْمَانًا كَا مِلًا وَيَقِيْنًا صَادِقًا وَرِزْقًا وَاسِعًا وَقَلْبًا خَاشِعًا وَلِسَانًا ذَاكِرًا وَحَلَالًا طَيِّبًا وَتَوْبَةً نَصُوْحًا وَتَوْبَةً قَبْلَ الْمَوْتِ وَرَحْمَةً عِنْدَ الْمَوْتِ وَمَغْفِرَةً بَعْدَ الْمَوْتِ وَالْعَفْوَ عِنْدَ الْحِسَابِ وَالْفَوْزَ بِالْجَنَّةِ وَالنَّجَاةَ مِنَ النَّارِ بِرَحْمَتِكَ يَاعَزِيْزُ يَاغَفَّارُ. رَبِّ زِدْنِيْ عِلْمًا وَاَلْحِقْنِي بِالصَّالِحِيْن",
        latin:
          "Allahumma innii as aluka iimanan kaamilan wa yaqiinan shaadiqan wa rizqan halaalan waasian wa qalban khaashi'an wa lisaanan dzaakiran wa taubatan qoblal maut warohmatan ingdal maut wamagfirotan ba'dal maut walafwa indgdal hisaab walfauja biljannah wannajaata minannaar yaa aziiz ya goffar. Robbi zidnii ilman wa'alhiqnii bissholihiin.",
        arti: "Ya Allah, aku mohon kepada-Mu iman yang sempurna, keyakinan yang benar, rizki yang luas, hati yang khusyu', lidah yang selalu berdzikir, rizki yang halal dan baik, tobat yang diterima, taobat sebelum mati, ampunan dan rahmat sesudah mati, ampunan ketika dihisab, keberuntungan memperoleh surga dan selamat dari neraka, dengan kasih sayang-Mu, wahai Tuhan Yang Maha Perkasa, Yang Maha Pengampun. Tuhanku, berilah aku tambahan ilmu pengetahuan dan masukkanlah aku ke dalam golongan orang-orang yang saleh.",
        status: "Publish",
      },
      {
        id: "dp-033",
        kategori: "Tawaf",
        putaran: 7,
        urutan: 3,
        judul_bagian: "Do'a Saat Sampai di Rukun Yamani",
        keterangan:
          "Jika memungkinkan dan tidak mengganggu jamaah lain, sentuh Rukun Yamani dengan tangan kanan. Tidak perlu mencium atau memaksakan diri ketika keadaan ramai.",
        arab: "بِسْمِ اللهِ، اللهُ أَكْبَرُ",
        latin:
          "Bismillāhi, Allāhu Akbar.",
        arti: "Dengan nama Allah, Allah Mahabesar.",
        status: "Publish",
      },
      {
        id: "dp-034",
        kategori: "Tawaf",
        putaran: 7,
        urutan: 4,
        judul_bagian: "Do'a Setelah Melewati Rukun Yamani",
        keterangan: "",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.",
        status: "Publish",
      },
      {
        id: "dp-035",
        kategori: "Tawaf",
        putaran: 7,
        urutan: 5,
        judul_bagian: "Do'a Tambahan di Rukun Yamani",
        keterangan:
          "Bacaan tambahan (opsional)",
        arab: "وَأَدْخِلْنَا الْجَنَّةَ مَعَ الْأَبْرَارِ، يَا عَزِيزُ يَا غَفَّارُ، يَا رَبَّ الْعَالَمِينَ",
        latin:
          "Wa adkhilnal-jannata ma'al-abrār, yā 'azīzu yā ghaffār, yā rabbal-'ālamīn.",
        arti: "Dan masukkanlah kami ke dalam surga bersama orang-orang yang berbakti, wahai Yang Mahaperkasa, wahai Yang Maha Pengampun, wahai Tuhan seluruh alam.",
        status: "Publish",
      },
    ],
    "Sa'i": [
      {
        id: "sp-001",
        kategori: "Sa'i",
        putaran: 1,
        urutan: 1,
        judul_bagian: "Do'a Sa'i Dari Safa ke Marwa (Putaran ke-1)",
        keterangan: "",
        arab: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ بُكْرَةً وَأَصِيلًا. وَمِنَ اللَّيْلِ فَاسْجُدْ لَهُ وَسَبِّحْهُ لَيْلًا طَوِيلًا. لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ، لَا شَيْءَ قَبْلَهُ وَلَا بَعْدَهُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، وَلَا يَفُوتُ أَبَدًا، بِيَدِهِ الْخَيْرُ، وَإِلَيْهِ الْمَصِيرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        latin:
          "Allāhu Akbar, Allāhu Akbar, Allāhu Akbar kabīran, wal-ḥamdu lillāhi katsīran, wa subḥānallāhil-'aẓīmi wa biḥamdihi bukratan wa aṣīlā. Wa minal-laili fasjud lahu wa sabbiḥhu lailan ṭawīlā. Lā ilāha illallāhu waḥdah, anjaza wa'dah, wa naṣara 'abdah, wa hazamal-aḥzāba waḥdah, lā syai'a qablahu wa lā ba'dah, yuḥyī wa yumīt, wa huwa ḥayyul lā yamūt, wa lā yafūt abadan, biyadihil-khairu, wa ilaihil-maṣīr, wa huwa 'alā kulli syai'in qadīr.",
        arti: "Allah Mahabesar, Allah Mahabesar, Allah Mahabesar dengan sebesar-besarnya. Segala puji bagi Allah sebanyak-banyaknya. Mahasuci Allah Yang Mahaagung dan dengan memuji-Nya pada waktu pagi dan petang. Dan pada sebagian malam, bersujudlah kepada-Nya dan bertasbihlah kepada-Nya pada bagian malam yang panjang. Tidak ada Tuhan yang berhak disembah selain Allah Yang Maha Esa. Dia telah menepati janji-Nya, menolong hamba-Nya, dan mengalahkan golongan-golongan musuh seorang diri. Tidak ada sesuatu pun sebelum-Nya dan tidak ada sesuatu pun setelah-Nya. Dia menghidupkan dan mematikan. Dia Mahahidup dan tidak akan mati serta tidak akan pernah luput. Di tangan-Nya segala kebaikan dan kepada-Nya tempat kembali. Dan Dia Mahakuasa atas segala sesuatu.",
        status: "Publish",
      },
      {
        id: "sp-002",
        kategori: "Sa'i",
        putaran: 1,
        urutan: 2,
        judul_bagian: "Doa di Antara Dua Pilar Hijau",
        keterangan:
          "Doa dibaca ketika berjalan/berlari kecil di antara dua pilar hijau (khusus jamaah laki-laki disunnahkan lari-lari kecil/raml)",
        arab: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ وَتَكَرَّمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ اللَّهُ الْأَعَزُّ الْأَكْرَمُ",
        latin:
          "Rabbi'ghfir warḥam, wa'fu wa takarram, wa tajāwaz 'ammā ta'lam, innaka ta'lamu mā lā na'lam, innaka antal-lāhul-a'azzul-akram.",
        arti: "Ya Tuhanku, ampunilah dan rahmatilah aku, maafkanlah dan muliakanlah aku, serta maafkanlah apa yang Engkau ketahui. Sesungguhnya Engkau mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau adalah Allah Yang Mahaperkasa lagi Mahamulia.",
        status: "Publish",
      },
      {
        id: "sp-003",
        kategori: "Sa'i",
        putaran: 1,
        urutan: 3,
        judul_bagian: "Doa Mendekati Bukit Marwa",
        keterangan: "Dibaca ketika mendekati bukit marwa",
        arab: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا، وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
        latin:
          "Innaṣ-ṣafā wal-marwata min sya'ā'irillāh, faman ḥajj al-baita awi'tamara falā junāḥa 'alaihi an yaṭṭawwafa bihimā, wa man taṭawwa'a khairan fa innallāha syākirun 'alīm.",
        arti: "Sesungguhnya Safa dan Marwah merupakan sebagian dari syiar Allah. Maka barang siapa berhaji ke Baitullah atau berumrah, tidak ada dosa baginya mengerjakan sa'i antara keduanya. Dan barang siapa dengan kerelaan hati mengerjakan kebajikan, maka sesungguhnya Allah Maha Mensyukuri, Maha Mengetahui.",
        status: "Publish",
      },
      {
        id: "sp-004",
        kategori: "Sa'i",
        putaran: 2,
        urutan: 1,
        judul_bagian: "Do'a Sa'i Dari Marwa ke Safa (Putaran ke-2)",
        keterangan: "",
        arab: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ. لَا إِلٰهَ إِلَّا اللَّهُ الْوَاحِدُ الْفَرْدُ الصَّمَدُ، لَمْ يَتَّخِذْ صَاحِبَةً وَلَا وَلَدًا، وَلَمْ يَكُنْ لَهُ شَرِيكٌ فِي الْمُلْكِ، وَلَمْ يَكُنْ لَهُ وَلِيٌّ مِنَ الذُّلِّ، وَكَبِّرْهُ تَكْبِيرًا. اللَّهُمَّ إِنَّكَ قُلْتَ فِي كِتَابِكَ الْمُنَزَّلِ: ادْعُونِي أَسْتَجِبْ لَكُمْ، دَعَوْنَاكَ رَبَّنَا فَاغْفِرْ لَنَا كَمَا أَمَرْتَنَا، إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ. رَبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلْإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا، رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ. رَبَّنَا وَآتِنَا مَا وَعَدْتَنَا عَلَى رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ الْقِيَامَةِ، إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ. رَبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ. رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ، وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا، رَبَّنَا إِنَّكَ رَؤُوفٌ رَحِيمٌ",
        latin:
          "Allāhu Akbar, Allāhu Akbar, Allāhu Akbar, wa lillāhil-ḥamd. Lā ilāha illallāhul-wāḥidul-fardhuṣ-ṣamad, lam yattakhidz ṣāḥibatan wa lā waladā, wa lam yakun lahu syarīkun fil-mulk, wa lam yakun lahu waliyyun minadz-dzull, wa kabbirhu takbīrā. Allāhumma innaka qulta fī kitābikal-munazzal: ud'ūnī astajib lakum, da'awnāka rabbanā faghfir lanā kamā amartanā, innaka lā tukhliful-mī'ād. Rabbanā innanā sami'nā munādiyan yunādī lil-īmāni an āminū birabbikum fa āmannā, rabbanā faghfir lanā dzunūbanā wa kaffir 'annā sayyi'ātinā wa tawaffanā ma'al-abrār. Rabbanā wa ātinā mā wa'adtanā 'alā rusulika wa lā tukhzinā yaumal-qiyāmah, innaka lā tukhliful-mī'ād. Rabbanā 'alaika tawakkalnā wa ilaika anabnā wa ilaikal-maṣīr. Rabbanā-ghfir lanā wa li ikhwaninalladzīna sabaqūnā bil-īmān, wa lā taj'al fī qulūbinā ghillan lilladzīna āmanū, rabbanā innaka ra'ūfur-raḥīm.",
        arti: "Allah Mahabesar, Allah Mahabesar, Allah Mahabesar, dan segala puji bagi Allah. Tidak ada Tuhan selain Allah Yang Maha Esa, Yang Tunggal, tempat bergantung. Dia tidak mengambil seorang istri dan tidak pula seorang anak. Tidak ada sekutu bagi-Nya dalam kerajaan dan tidak ada bagi-Nya penolong karena kelemahan. Maka agungkanlah Dia dengan pengagungan yang sebenar-benarnya. Ya Allah, sesungguhnya Engkau telah berfirman dalam kitab-Mu yang diturunkan: 'Berdoalah kepada-Ku, niscaya Aku kabulkan untukmu.' Kami telah berdoa kepada-Mu, wahai Tuhan kami, maka ampunilah kami sebagaimana Engkau telah memerintahkan kami. Sesungguhnya Engkau tidak mengingkari janji. Ya Tuhan kami, sesungguhnya kami telah mendengar orang yang menyeru kepada iman, 'Berimanlah kepada Tuhanmu,' maka kami pun beriman. Ya Tuhan kami, ampunilah dosa-dosa kami, hapuskanlah kesalahan-kesalahan kami, dan wafatkanlah kami bersama orang-orang yang berbakti. Ya Tuhan kami, berikanlah kepada kami apa yang telah Engkau janjikan melalui rasul-rasul-Mu dan janganlah Engkau hinakan kami pada hari kiamat. Sesungguhnya Engkau tidak mengingkari janji. Ya Tuhan kami, kepada-Mulah kami bertawakal, kepada-Mulah kami bertobat, dan kepada-Mulah tempat kembali. Ya Tuhan kami, ampunilah kami dan saudara-saudara kami yang telah lebih dahulu beriman, dan janganlah Engkau jadikan dalam hati kami kedengkian terhadap orang-orang yang beriman. Ya Tuhan kami, sesungguhnya Engkau Maha Penyantun lagi Maha Penyayang.",
        status: "Publish",
      },
      {
        id: "sp-005",
        kategori: "Sa'i",
        putaran: 2,
        urutan: 2,
        judul_bagian: "Doa di Antara Dua Pilar Hijau",
        keterangan:
          "Doa dibaca ketika berjalan/berlari kecil di antara dua pilar hijau (khusus jamaah laki-laki disunnahkan lari-lari kecil/raml)",
        arab: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ وَتَكَرَّمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ اللَّهُ الْأَعَزُّ الْأَكْرَمُ",
        latin:
          "Rabbi'ghfir warḥam, wa'fu wa takarram, wa tajāwaz 'ammā ta'lam, innaka ta'lamu mā lā na'lam, innaka antal-lāhul-a'azzul-akram.",
        arti: "Ya Tuhanku, ampunilah dan rahmatilah aku, maafkanlah dan muliakanlah aku, serta maafkanlah apa yang Engkau ketahui. Sesungguhnya Engkau mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau adalah Allah Yang Mahaperkasa lagi Mahamulia.",
        status: "Publish",
      },
      {
        id: "sp-006",
        kategori: "Sa'i",
        putaran: 2,
        urutan: 3,
        judul_bagian: "Doa Mendekati Bukit Safa",
        keterangan: "Dibaca ketika mendekati bukit safa",
        arab: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا، وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
        latin:
          "Innaṣ-ṣafā wal-marwata min sya'ā'irillāh, faman ḥajj al-baita awi'tamara falā junāḥa 'alaihi an yaṭṭawwafa bihimā, wa man taṭawwa'a khairan fa innallāha syākirun 'alīm.",
        arti: "Sesungguhnya Safa dan Marwah merupakan sebagian dari syiar Allah. Maka barang siapa berhaji ke Baitullah atau berumrah, tidak ada dosa baginya mengerjakan sa'i antara keduanya. Dan barang siapa dengan kerelaan hati mengerjakan kebajikan, maka sesungguhnya Allah Maha Mensyukuri, Maha Mengetahui.",
        status: "Publish",
      },
      {
        id: "sp-007",
        kategori: "Sa'i",
        putaran: 3,
        urutan: 1,
        judul_bagian: "Do'a Sa'i Dari Safa ke Marwa (Putaran ke-3)",
        keterangan: "",
        arab: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ. رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْخَيْرَ كُلَّهُ، عَاجِلَهُ وَآجِلَهُ، وَأَسْتَغْفِرُكَ لِذَنْبِي، وَأَسْأَلُكَ رَحْمَتَكَ يَا أَرْحَمَ الرَّاحِمِينَ",
        latin:
          "Allāhu Akbar, Allāhu Akbar, Allāhu Akbar, wa lillāhil-ḥamd. Rabbanā atmim lanā nūranā waghfir lanā innaka 'alā kulli syai'in qadīr. Allāhumma innī as'alukal-khaira kullahu, 'ājilahu wa ājilahu, wa astaghfiruka li dzanbī, wa as'aluka raḥmataka yā arḥamar-rāḥimīn.",
        arti: "Allah Mahabesar, Allah Mahabesar, Allah Mahabesar, dan segala puji bagi Allah. Ya Tuhan kami, sempurnakanlah cahaya kami dan ampunilah kami. Sesungguhnya Engkau Mahakuasa atas segala sesuatu. Ya Allah, sesungguhnya aku memohon kepada-Mu seluruh kebaikan, baik yang segera maupun yang akan datang. Aku memohon ampun kepada-Mu atas dosaku, dan aku memohon rahmat-Mu, wahai Yang Maha Penyayang di antara para penyayang.",
        status: "Publish",
      },
      {
        id: "sp-008",
        kategori: "Sa'i",
        putaran: 3,
        urutan: 2,
        judul_bagian: "Doa di Antara Dua Pilar Hijau",
        keterangan:
          "Doa dibaca ketika berjalan/berlari kecil di antara dua pilar hijau (khusus jamaah laki-laki disunnahkan lari-lari kecil/raml)",
        arab: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ وَتَكَرَّمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ اللَّهُ الْأَعَزُّ الْأَكْرَمُ",
        latin:
          "Rabbi'ghfir warḥam, wa'fu wa takarram, wa tajāwaz 'ammā ta'lam, innaka ta'lamu mā lā na'lam, innaka antal-lāhul-a'azzul-akram.",
        arti: "Ya Tuhanku, ampunilah dan rahmatilah aku, maafkanlah dan muliakanlah aku, serta maafkanlah apa yang Engkau ketahui. Sesungguhnya Engkau mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau adalah Allah Yang Mahaperkasa lagi Mahamulia.",
        status: "Publish",
      },
      {
        id: "sp-009",
        kategori: "Sa'i",
        putaran: 3,
        urutan: 3,
        judul_bagian: "Doa Mendekati Bukit Marwa",
        keterangan: "Dibaca ketika mendekati bukit marwa",
        arab: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا، وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
        latin:
          "Innaṣ-ṣafā wal-marwata min sya'ā'irillāh, faman ḥajj al-baita awi'tamara falā junāḥa 'alaihi an yaṭṭawwafa bihimā, wa man taṭawwa'a khairan fa innallāha syākirun 'alīm.",
        arti: "Sesungguhnya Safa dan Marwah merupakan sebagian dari syiar Allah. Maka barang siapa berhaji ke Baitullah atau berumrah, tidak ada dosa baginya mengerjakan sa'i antara keduanya. Dan barang siapa dengan kerelaan hati mengerjakan kebajikan, maka sesungguhnya Allah Maha Mensyukuri, Maha Mengetahui.",
        status: "Publish",
      },
      {
        id: "sp-010",
        kategori: "Sa'i",
        putaran: 4,
        urutan: 1,
        judul_bagian: "Do'a Sa'i Dari Marwa ke Safa (Putaran ke-4)",
        keterangan: "",
        arab: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ. اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا تَعْلَمُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا تَعْلَمُ، وَأَسْتَغْفِرُكَ مِنْ كُلِّ مَا تَعْلَمُ، إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ. لَا إِلَهَ إِلَّا اللَّهُ الْمَلِكُ الْحَقُّ الْمُبِينُ، مُحَمَّدٌ رَسُولُ اللَّهِ الصَّادِقُ الْوَعْدِ الْأَمِينُ. اللَّهُمَّ إِنِّي أَسْأَلُكَ كَمَا هَدَيْتَنِي لِلْإِسْلَامِ أَنْ لَا تَنْزِعَهُ مِنِّي حَتَّى تَتَوَفَّانِي عَلَيْهِ وَأَنَا مُسْلِمٌ. اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا. اللَّهُمَّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي، وَأَعُوذُ بِكَ مِنْ وَسْوَاسِ الصَّدْرِ، وَشَتَاتِ الْأَمْرِ، وَفِتْنَةِ الْقَبْرِ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ مَا يَلِجُ فِي اللَّيْلِ، وَمِنْ شَرِّ مَا يَلِجُ فِي النَّهَارِ، وَمِنْ شَرِّ مَا تَهُبُّ بِهِ الرِّيَاحُ، يَا أَرْحَمَ الرَّاحِمِينَ. سُبْحَانَكَ مَا عَبَدْنَاكَ حَقَّ عِبَادَتِكَ يَا اللَّهُ، سُبْحَانَكَ مَا ذَكَرْنَاكَ حَقَّ ذِكْرِكَ يَا اللَّهُ",
        latin:
          "Allāhu Akbar, Allāhu Akbar, Allāhu Akbar, wa lillāhil-ḥamd. Allāhumma innī as'aluka min khairi mā ta'lamu, wa a'ūdzu bika min syarri mā ta'lamu, wa astaghfiruka min kulli mā ta'lamu, innaka anta 'allāmul-ghuyūb. Lā ilāha illallāhul-malakul-ḥaqqul-mubīn, Muḥammadur-rasūlullāhiṣ-ṣādiqul-wa'dil-amīn. Allāhumma innī as'aluka kamā hadaitanī lil-islāmi an lā tanzi'ahu minnī ḥattā tatawaffānī 'alaihi wa anā muslim. Allāhummaj'al fī qalbī nūran, wa fī sam'ī nūran, wa fī baṣarī nūran. Allāhumma isyraḥ lī ṣadrī, wa yassir lī amrī, wa a'ūdzu bika min waswāsiṣ-ṣadr, wa syatātil-amr, wa fitnatil-qabr. Allāhumma innī a'ūdzu bika min syarri mā yaliju fil-laili, wa min syarri mā yaliju fin-nahār, wa min syarri mā tahubbu bihir-riyāḥ, yā arḥamar-rāḥimīn. Subḥānaka mā 'abadnāk ḥaqqa 'ibādatika yā Allāh, subḥānaka mā dzakarnāka ḥaqqa dzikrika yā Allāh.",
        arti: "Allah Mahabesar, Allah Mahabesar, Allah Mahabesar, dan segala puji bagi Allah. Ya Allah, sesungguhnya aku memohon kepada-Mu segala kebaikan yang Engkau ketahui, dan aku berlindung kepada-Mu dari segala keburukan yang Engkau ketahui. Aku memohon ampun kepada-Mu dari segala sesuatu yang Engkau ketahui. Sesungguhnya Engkau Maha Mengetahui segala yang gaib. Tidak ada Tuhan selain Allah, Raja Yang Mahabenar lagi nyata. Muhammad adalah utusan Allah, yang benar janjinya dan terpercaya. Ya Allah, sebagaimana Engkau telah memberikan kepadaku petunjuk kepada Islam, janganlah Engkau mencabutnya dariku sampai Engkau mewafatkanku dalam keadaan Muslim. Ya Allah, jadikanlah cahaya dalam hatiku, cahaya dalam pendengaranku, dan cahaya dalam penglihatanku. Ya Allah, lapangkanlah dadaku dan mudahkanlah urusanku. Aku berlindung kepada-Mu dari bisikan hati, kekacauan urusan, dan fitnah kubur. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari keburukan yang masuk pada malam hari, dari keburukan yang masuk pada siang hari, dan dari keburukan yang dibawa oleh angin. Wahai Yang Maha Penyayang di antara para penyayang. Mahasuci Engkau, kami belum menyembah-Mu dengan sebenar-benar ibadah kepada-Mu, wahai Allah. Mahasuci Engkau, kami belum mengingat-Mu dengan sebenar-benar zikir kepada-Mu, wahai Allah.",
        status: "Publish",
      },
      {
        id: "sp-011",
        kategori: "Sa'i",
        putaran: 4,
        urutan: 2,
        judul_bagian: "Doa di Antara Dua Pilar Hijau",
        keterangan:
          "Doa dibaca ketika berjalan/berlari kecil di antara dua pilar hijau (khusus jamaah laki-laki disunnahkan lari-lari kecil/raml)",
        arab: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ وَتَكَرَّمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ اللَّهُ الْأَعَزُّ الْأَكْرَمُ",
        latin:
          "Rabbi'ghfir warḥam, wa'fu wa takarram, wa tajāwaz 'ammā ta'lam, innaka ta'lamu mā lā na'lam, innaka antal-lāhul-a'azzul-akram.",
        arti: "Ya Tuhanku, ampunilah dan rahmatilah aku, maafkanlah dan muliakanlah aku, serta maafkanlah apa yang Engkau ketahui. Sesungguhnya Engkau mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau adalah Allah Yang Mahaperkasa lagi Mahamulia.",
        status: "Publish",
      },
      {
        id: "sp-012",
        kategori: "Sa'i",
        putaran: 4,
        urutan: 3,
        judul_bagian: "Doa Mendekati Bukit Safa",
        keterangan: "Dibaca ketika mendekati bukit safa",
        arab: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا، وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
        latin:
          "Innaṣ-ṣafā wal-marwata min sya'ā'irillāh, faman ḥajj al-baita awi'tamara falā junāḥa 'alaihi an yaṭṭawwafa bihimā, wa man taṭawwa'a khairan fa innallāha syākirun 'alīm.",
        arti: "Sesungguhnya Safa dan Marwah merupakan sebagian dari syiar Allah. Maka barang siapa berhaji ke Baitullah atau berumrah, tidak ada dosa baginya mengerjakan sa'i antara keduanya. Dan barang siapa dengan kerelaan hati mengerjakan kebajikan, maka sesungguhnya Allah Maha Mensyukuri, Maha Mengetahui.",
        status: "Publish",
      },
      {
        id: "sp-013",
        kategori: "Sa'i",
        putaran: 5,
        urutan: 1,
        judul_bagian: "Do'a Sa'i Dari Safa ke Marwa (Putaran ke-5)",
        keterangan: "",
        arab: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ. سُبْحَانَكَ مَا شَكَرْنَاكَ حَقَّ شُكْرِكَ يَا اللَّهُ، سُبْحَانَكَ مَا أَعْلَى شَأْنَكَ يَا اللَّهُ. اللَّهُمَّ حَبِّبْ إِلَيْنَا الْإِيمَانَ وَزَيِّنْهُ فِي قُلُوبِنَا، وَكَرِّهْ إِلَيْنَا الْكُفْرَ وَالْفُسُوقَ وَالْعِصْيَانَ، وَاجْعَلْنَا مِنَ الرَّاشِدِينَ",
        latin:
          "Allāhu Akbar, Allāhu Akbar, Allāhu Akbar, wa lillāhil-ḥamd. Subḥānaka mā syakarnāka ḥaqqa syukrika yā Allāh, subḥānaka mā a'lā sya'naka yā Allāh. Allāhumma ḥabbib ilainal-īmāna wa zayyinhu fī qulūbinā, wa karrih ilainal-kufra wal-fusūqa wal-'iṣyān, waj'alnā minar-rāsyidīn.",
        arti: "Allah Mahabesar, Allah Mahabesar, Allah Mahabesar, dan segala puji bagi Allah. Mahasuci Engkau, kami belum bersyukur kepada-Mu dengan sebenar-benar rasa syukur, wahai Allah. Mahasuci Engkau, betapa tinggi kemuliaan-Mu, wahai Allah. Ya Allah, cintakanlah kepada kami keimanan dan hiasilah iman itu dalam hati kami. Jadikanlah kami membenci kekufuran, kefasikan, dan kedurhakaan. Dan jadikanlah kami termasuk orang-orang yang mendapat petunjuk.",
        status: "Publish",
      },
      {
        id: "sp-014",
        kategori: "Sa'i",
        putaran: 5,
        urutan: 2,
        judul_bagian: "Doa di Antara Dua Pilar Hijau",
        keterangan:
          "Doa dibaca ketika berjalan/berlari kecil di antara dua pilar hijau (khusus jamaah laki-laki disunnahkan lari-lari kecil/raml)",
        arab: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ وَتَكَرَّمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ اللَّهُ الْأَعَزُّ الْأَكْرَمُ",
        latin:
          "Rabbi'ghfir warḥam, wa'fu wa takarram, wa tajāwaz 'ammā ta'lam, innaka ta'lamu mā lā na'lam, innaka antal-lāhul-a'azzul-akram.",
        arti: "Ya Tuhanku, ampunilah dan rahmatilah aku, maafkanlah dan muliakanlah aku, serta maafkanlah apa yang Engkau ketahui. Sesungguhnya Engkau mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau adalah Allah Yang Mahaperkasa lagi Mahamulia.",
        status: "Publish",
      },
      {
        id: "sp-015",
        kategori: "Sa'i",
        putaran: 5,
        urutan: 3,
        judul_bagian: "Doa Mendekati Bukit Marwa",
        keterangan: "Dibaca ketika mendekati bukit marwa",
        arab: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا، وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
        latin:
          "Innaṣ-ṣafā wal-marwata min sya'ā'irillāh, faman ḥajj al-baita awi'tamara falā junāḥa 'alaihi an yaṭṭawwafa bihimā, wa man taṭawwa'a khairan fa innallāha syākirun 'alīm.",
        arti: "Sesungguhnya Safa dan Marwah merupakan sebagian dari syiar Allah. Maka barang siapa berhaji ke Baitullah atau berumrah, tidak ada dosa baginya mengerjakan sa'i antara keduanya. Dan barang siapa dengan kerelaan hati mengerjakan kebajikan, maka sesungguhnya Allah Maha Mensyukuri, Maha Mengetahui.",
        status: "Publish",
      },
      {
        id: "sp-016",
        kategori: "Sa'i",
        putaran: 6,
        urutan: 1,
        judul_bagian: "Do'a Sa'i Dari Marwa ke Safa (Putaran ke-6)",
        keterangan: "",
        arab: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ. لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ، صَدَقَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ. لَا إِلٰهَ إِلَّا اللَّهُ، مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى، وَالْعَمَلَ لِمَا تُحِبُّ وَتَرْضَى. اللَّهُمَّ لَكَ الْحَمْدُ كَالَّذِي تَقُولُ، وَخَيْرًا مِمَّا تَقُولُ. اللَّهُمَّ إِنِّي أَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ، وَأَعُوذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ، وَمَا يُقَرِّبُنِي إِلَيْهَا مِنْ قَوْلٍ أَوْ فِعْلٍ أَوْ عَمَلٍ. اللَّهُمَّ بِنُورِكَ اهْتَدَيْنَا، وَبِفَضْلِكَ اسْتَغْنَيْنَا، وَفِي كَنَفِكَ وَإِنْعَامِكَ وَعَطَائِكَ وَإِحْسَانِكَ أَصْبَحْنَا وَأَمْسَيْنَا. اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَا قَبْلَكَ شَيْءٌ، وَأَنْتَ الْآخِرُ فَلَا بَعْدَكَ شَيْءٌ، وَالظَّاهِرُ فَلَا شَيْءَ فَوْقَكَ، وَالْبَاطِنُ فَلَا دُونَكَ شَيْءٌ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْعَجْزِ وَالْكَسَلِ وَالْجُبْنِ وَالْهَرَمِ وَالْبُخْلِ وَعَذَابِ الْقَبْرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ. وَنَسْأَلُكَ الْفَوْزَ بِالْجَنَّةِ",
        latin:
          "Allāhu Akbar, Allāhu Akbar, Allāhu Akbar, wa lillāhil-ḥamd. Lā ilāha illallāhu waḥdah, ṣadaqa wa'dah, wa naṣara 'abdah, wa hazamal-aḥzāba waḥdah. Lā ilāha illallāhu, mukhliṣīna lahud-dīna walau karihal-kāfirūn. Allāhumma innī as'alukal-hudā wat-tuqā wal-'afāfa wal-ghinā, wal-'amala limā tuḥibbu wa tarḍā. Allāhumma lakal-ḥamdu kalladzī taqūlu, wa khairan mimmā taqūlu. Allāhumma innī as'aluka riḍāka wal-jannah, wa a'ūdzu bika min sakhaṭika wan-nār, wa mā yuqarribunī ilaihā min qaulin au fi'lin au 'amal. Allāhumma binūrika ihtadainā, wa bifaḍlika istaghnainā, wa fī kanafika wa in'āmika wa 'aṭā'ika wa iḥsānika aṣbaḥnā wa amsainā. Allāhumma antal-awwalu falā qablaka syai'un, wa antal-ākhiru falā ba'daka syai'un, waẓ-ẓāhiru falā syai'a fauqaka, wal-bāṭinu falā dūnaka syai'un. Allāhumma innī a'ūdzu bika minal-'ajzi wal-kasali wal-jubni wal-harami wal-bukhli wa 'adzābil-qabr, wa a'ūdzu bika min fitnatil-maḥyā wal-mamāt. Wa nas'alukal-fauza bil-jannah.",
        arti: "Allah Mahabesar, Allah Mahabesar, Allah Mahabesar, dan segala puji bagi Allah. Tidak ada Tuhan selain Allah Yang Maha Esa. Dia menepati janji-Nya, menolong hamba-Nya, dan mengalahkan golongan-golongan musuh seorang diri. Tidak ada Tuhan selain Allah. Kami memurnikan ketaatan kepada-Nya, sekalipun orang-orang kafir membencinya. Ya Allah, sesungguhnya aku memohon kepada-Mu petunjuk, ketakwaan, kesucian diri, kecukupan, dan amal yang Engkau cintai dan Engkau ridhai. Ya Allah, bagi-Mulah segala puji sebagaimana yang Engkau firmankan, dan lebih baik daripada apa yang kami ucapkan. Ya Allah, sesungguhnya aku memohon keridaan-Mu dan surga. Aku berlindung kepada-Mu dari kemurkaan-Mu dan neraka, serta dari segala perkataan, perbuatan, atau amal yang mendekatkanku kepadanya. Ya Allah, dengan cahaya-Mu kami mendapat petunjuk, dengan karunia-Mu kami merasa cukup, dan dalam naungan-Mu, nikmat-Mu, pemberian-Mu, dan kebaikan-Mu kami berada pada pagi dan petang. Ya Allah, Engkaulah Yang Awal, tidak ada sesuatu pun sebelum-Mu. Engkaulah Yang Akhir, tidak ada sesuatu pun setelah-Mu. Engkaulah Yang Zahir, tidak ada sesuatu pun di atas-Mu. Engkaulah Yang Batin, tidak ada sesuatu pun yang lebih dekat daripada-Mu. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari kelemahan, kemalasan, sifat pengecut, kepikunan, kekikiran, dan azab kubur. Aku juga berlindung kepada-Mu dari fitnah kehidupan dan kematian. Dan kami memohon kepada-Mu kemenangan dengan mendapatkan surga.",
        status: "Publish",
      },
      {
        id: "sp-017",
        kategori: "Sa'i",
        putaran: 6,
        urutan: 2,
        judul_bagian: "Doa di Antara Dua Pilar Hijau",
        keterangan:
          "Doa dibaca ketika berjalan/berlari kecil di antara dua pilar hijau (khusus jamaah laki-laki disunnahkan lari-lari kecil/raml)",
        arab: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ وَتَكَرَّمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ اللَّهُ الْأَعَزُّ الْأَكْرَمُ",
        latin:
          "Rabbi'ghfir warḥam, wa'fu wa takarram, wa tajāwaz 'ammā ta'lam, innaka ta'lamu mā lā na'lam, innaka antal-lāhul-a'azzul-akram.",
        arti: "Ya Tuhanku, ampunilah dan rahmatilah aku, maafkanlah dan muliakanlah aku, serta maafkanlah apa yang Engkau ketahui. Sesungguhnya Engkau mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau adalah Allah Yang Mahaperkasa lagi Mahamulia.",
        status: "Publish",
      },
      {
        id: "sp-018",
        kategori: "Sa'i",
        putaran: 6,
        urutan: 3,
        judul_bagian: "Doa Mendekati Bukit Safa",
        keterangan: "Dibaca ketika mendekati bukit safa",
        arab: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا، وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
        latin:
          "Innaṣ-ṣafā wal-marwata min sya'ā'irillāh, faman ḥajj al-baita awi'tamara falā junāḥa 'alaihi an yaṭṭawwafa bihimā, wa man taṭawwa'a khairan fa innallāha syākirun 'alīm.",
        arti: "Sesungguhnya Safa dan Marwah merupakan sebagian dari syiar Allah. Maka barang siapa berhaji ke Baitullah atau berumrah, tidak ada dosa baginya mengerjakan sa'i antara keduanya. Dan barang siapa dengan kerelaan hati mengerjakan kebajikan, maka sesungguhnya Allah Maha Mensyukuri, Maha Mengetahui.",
        status: "Publish",
      },
      {
        id: "sp-019",
        kategori: "Sa'i",
        putaran: 7,
        urutan: 1,
        judul_bagian: "Do'a Sa'i Dari Safa ke Marwa (Putaran ke-7)",
        keterangan: "",
        arab: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا. اللَّهُمَّ حَبِّبْ إِلَيَّ الْإِيمَانَ وَزَيِّنْهُ فِي قَلْبِي، وَكَرِّهْ إِلَيَّ الْكُفْرَ وَالْفُسُوقَ وَالْعِصْيَانَ، وَاجْعَلْنِي مِنَ الرَّاشِدِينَ",
        latin:
          "Allāhu Akbar, Allāhu Akbar, Allāhu Akbar kabīran, wal-ḥamdu lillāhi kaṡīran. Allāhumma ḥabbib ilayyal-īmāna wa zayyinhu fī qalbī, wa karrih ilayyal-kufra wal-fusūqa wal-'iṣyāna, waj'alnī minar-rāsyidīn.",
        arti: "Allah Mahabesar, Allah Mahabesar, Allah Mahabesar dengan sebesar-besarnya, dan segala puji bagi Allah dengan sebanyak-banyaknya. Ya Allah, cintakanlah kepadaku keimanan dan hiasilah iman itu di dalam hatiku. Jadikanlah aku membenci kekufuran, kefasikan, dan kedurhakaan. Dan jadikanlah aku termasuk orang-orang yang mendapat petunjuk.",
        status: "Publish",
      },
      {
        id: "sp-020",
        kategori: "Sa'i",
        putaran: 7,
        urutan: 2,
        judul_bagian: "Doa di Antara Dua Pilar Hijau",
        keterangan:
          "Doa dibaca ketika berjalan/berlari kecil di antara dua pilar hijau (khusus jamaah laki-laki disunnahkan lari-lari kecil/raml)",
        arab: "رَبِّ اغْفِرْ وَارْحَمْ، وَاعْفُ وَتَكَرَّمْ، وَتَجَاوَزْ عَمَّا تَعْلَمُ، إِنَّكَ تَعْلَمُ مَا لَا نَعْلَمُ، إِنَّكَ أَنْتَ اللَّهُ الْأَعَزُّ الْأَكْرَمُ",
        latin:
          "Rabbi'ghfir warḥam, wa'fu wa takarram, wa tajāwaz 'ammā ta'lam, innaka ta'lamu mā lā na'lam, innaka antal-lāhul-a'azzul-akram.",
        arti: "Ya Tuhanku, ampunilah dan rahmatilah aku, maafkanlah dan muliakanlah aku, serta maafkanlah apa yang Engkau ketahui. Sesungguhnya Engkau mengetahui apa yang tidak kami ketahui. Sesungguhnya Engkau adalah Allah Yang Mahaperkasa lagi Mahamulia.",
        status: "Publish",
      },
      {
        id: "sp-021",
        kategori: "Sa'i",
        putaran: 7,
        urutan: 3,
        judul_bagian: "Doa Mendekati Bukit Marwa",
        keterangan: "Dibaca ketika mendekati bukit marwa",
        arab: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ، فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا، وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
        latin:
          "Innaṣ-ṣafā wal-marwata min sya'ā'irillāh, faman ḥajj al-baita awi'tamara falā junāḥa 'alaihi an yaṭṭawwafa bihimā, wa man taṭawwa'a khairan fa innallāha syākirun 'alīm.",
        arti: "Sesungguhnya Safa dan Marwah merupakan sebagian dari syiar Allah. Maka barang siapa berhaji ke Baitullah atau berumrah, tidak ada dosa baginya mengerjakan sa'i antara keduanya. Dan barang siapa dengan kerelaan hati mengerjakan kebajikan, maka sesungguhnya Allah Maha Mensyukuri, Maha Mengetahui.",
        status: "Publish",
      },
    ],
  },

  list: {
    Arafah: [
      {
        id: "dl-001",
        kategori: "Arafah",
        kategori_doa: "Dzikir Utama",
        judul: "Dzikir Terbaik di Hari Arafah",
        arab: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        latin:
          "Lā ilāha illallāhu waḥdahu lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa 'alā kulli syai'in qadīr.",
        arti: "Tidak ada sesembahan yang berhak disembah kecuali Allah semata, tidak ada sekutu bagi-Nya, bagi-Nya kerajaan dan segala pujian, dan Dia Maha Berkuasa atas segala sesuatu.",
        status: "Publish",
      },
      {
        id: "dl-002",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul:
          "Ampunilah dosa-dosaku, istriku, ibu bapakku, dan anak-anakku (kecil/besar, sengaja/tidak).",
        arab: "رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
        latin:
          "Rabbanā zhalamnā anfusanā wa in lam taghfir lanā wa tarḥamnā lanakūnanna minal-khāsirīn.",
        arti: "Ya Tuhan kami, kami telah menzhalimi diri kami sendiri. Jika Engkau tidak mengampuni dan tidak merahmati kami, niscaya kami termasuk orang-orang yang merugi.",
        status: "Publish",
      },
      {
        id: "dl-003",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul: "Berkatilah hidup kami ya Allah.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ",
        latin:
          "Allāhumma innī as'alukal-'afwa wal-'āfiyata fid-dunyā wal-ākhirah.",
        arti: "Ya Allah, sesungguhnya aku memohon maaf kepada-Mu dan memohon keselamatan di dunia dan akhirat.",
        status: "Publish",
      },
      {
        id: "dl-004",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul: "Berikanlah kami taufiq dan hidayah-Mu.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        latin: "Allāhumma innī as'alukal-hudā wat-tuqā wal-'afāfa wal-ghinā.",
        arti: "Ya Allah, aku memohon kepada-Mu petunjuk, ketaqwaan, penjagaan terhadap kehormatan, dan merasa cukup.",
        status: "Publish",
      },
      {
        id: "dl-005",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul:
          "Jadikanlah kami orang yang istiqamah melakukan ibadah dan kebaikan.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الثَّبَاتَ فِي الْأَمْرِ وَالْعَزِيمَةَ عَلَى الرُّشْدِ",
        latin:
          "Allāhumma innī as'alukats-tsabāta fil-amri wal-'azīmata 'alar-rusyd.",
        arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu keteguhan dalam segala urusan dan tekad yang kuat dalam berbuat lurus.",
        status: "Publish",
      },
      {
        id: "dl-006",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul:
          "Jangan Engkau bolak-balikkan hati kami & tetapkanlah iman kami.",
        arab: "اللَّهُمَّ مُصَرِّفَ الْقُلُوبِ صَرِّفْ قُلُوبَنَا عَلَى طَاعَتِكَ",
        latin: "Allāhumma muṣarrifal-qulūb, ṣarrif qulūbanā 'alā ṭā'atik.",
        arti: "Ya Allah, yang membolak-balikkan hati, balikanlah hati kami di atas ketaatan kepada-Mu.",
        status: "Publish",
      },
      {
        id: "dl-007",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul:
          "Bantulah kami untuk senantiasa khusyuk dalam shalat & hadirkan rasa cinta ibadah.",
        arab: "اللَّهُمَّ أَعِنَّا عَلَى شُكْرِكَ، وَذِكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
        latin:
          "Allāhumma a'innā 'alā syukrika, wa dzikrika, wa ḥusni 'ibādatik.",
        arti: "Ya Allah, bantulah kami untuk bersyukur kepada-Mu, mengingat-Mu, dan beribadah kepada-Mu dengan sebaik-baiknya.",
        status: "Publish",
      },
      {
        id: "dl-008",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul:
          "Jauhkanlah kami dari penyakit hati (ria & sombong) & jadikan hamba yang bersyukur.",
        arab: "اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا",
        latin:
          "Allāhumma āti nafsī taqwāhā wa zakkihā anta khairu man zakkāhā.",
        arti: "Ya Allah, berikanlah ketaqwaan pada jiwaku dan bersihkanlah jiwaku; sesungguhnya Engkau adalah sebaik-baik Dzat yang membersihkan jiwa.",
        status: "Publish",
      },
      {
        id: "dl-009",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul:
          "Jadikanlah setiap usaha ibadah kami diterima oleh-Mu walau banyak kekurangan.",
        arab: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
        latin: "Rabbanā taqabbal minnā innaka antas-samī'ul-'alīm.",
        arti: "Ya Tuhan kami, terimalah (amal) dari kami. Sesungguhnya Engkau Maha Mendengar lagi Maha Mengetahui.",
        status: "Publish",
      },
      {
        id: "dl-010",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul:
          "Berikan kesabaran tinggi ketika ujian datang, jauhkan dari sifat putus asa.",
        arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الْأَعْدَاءِ",
        latin:
          "Allāhumma innī a'ūdzu bika min jahdil-balā'i, wa darakisy-syaqā'i, wa sū'il-qaḍā'i, wa syamātatil-a'dā'.",
        arti: "Ya Allah, aku berlindung kepada-Mu dari cobaan yang berat, turunnya kesusahan, buruknya ketentuan, dan kegembiraan musuh atas musibah.",
        status: "Publish",
      },
      {
        id: "dl-011",
        kategori: "Arafah",
        kategori_doa: "Taubat & Hati",
        judul: "Jauhkan kami dari bisikan syaitan & maksiat anggota tubuh.",
        arab: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ، وَأَعُوذُ بِكَ رَبِّ أَنْ يَحْضُرُونِ",
        latin:
          "Rabbi a'ūdzu bika min hamazātisy-syayāṭīn, wa a'ūdzu bika rabbi an yaḥḍurūn.",
        arti: "Ya Rabbku, aku berlindung kepada-Mu dari bisikan-bisikan syetan, dan aku berlindung kepada-Mu wahai Rabbku dari hadirnya syetan-syetan dalam urusanku.",
        status: "Publish",
      },
      {
        id: "dl-012",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul: "Mudahkanlah rezeki kami ya Allah.",
        arab: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        latin:
          "Allāhummakfinī biḥalālika 'an ḥarāmik, wa aghninī bifaḍlika 'amman siwāk.",
        arti: "Ya Allah, berilah aku kecukupan dengan rezeki yang halal, sehingga aku tidak memerlukan yang haram, dan berilah aku kekayaan dengan karunia-Mu, sehingga aku tidak memerlukan bantuan selain diri-Mu.",
        status: "Publish",
      },
      {
        id: "dl-013",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul: "Berikanlah kami sakinah (ketenangan) dalam keluarga.",
        arab: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        latin:
          "Rabbanā hab lanā min azwājinā wa dzurriyyātinā qurrata a'yunin waj'alnā lil-muttaqīna imāmā.",
        arti: "Ya Tuhan kami, anugerahkanlah kepada kami istri-istri dan keturunan kami sebagai penyejuk hati, dan jadikanlah kami imam bagi orang-orang yang bertaqwa.",
        status: "Publish",
      },
      {
        id: "dl-014",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul: "Peliharalah dan lindungilah anak-anak kami.",
        arab: "رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
        latin:
          "Rabbi hab lī min ladunka dzurriyyatan ṭayyibatan innaka samī'ud-du'ā'.",
        arti: "Ya Rabbku, berikanlah kepadaku dari sisi-Mu keturunan yang baik, sesungguhnya Engkau adalah Dzat Yang Maha Mendengarkan doa.",
        status: "Publish",
      },
      {
        id: "dl-015",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul:
          "Berkatilah rezeki kami, berikanlah rezeki yang berkat dan halal.",
        arab: "اللَّهُمَّ أَكْثِرْ مَالِي وَوَلَدِي وَبَارِكْ لِي فِيمَا أَعْطَيْتَنِي وَأَطِلْ حَيَاتِي عَلَى طَاعَتِكَ وَأَحْسِنْ عَمَلِي وَاغْفِرْ لِي",
        latin:
          "Allāhumma aktsir mālī wa waladī wa bārik lī fīmā a'ṭaitanī wa aṭil ḥayātī 'alā ṭā'atika wa aḥsin 'amalī waghfir lī.",
        arti: "Ya Allah perbanyaklah harta dan anakku serta berkahilah karunia yang Engkau beri. Panjangkanlah umurku dalam ketaatan pada-Mu dan baguskanlah amalku serta ampunilah dosa-dosaku.",
        status: "Publish",
      },
      {
        id: "dl-016",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul:
          "Jauhkanlah kami dari musibah, bala bencana, penyakit berbahaya.",
        arab: "اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي",
        latin:
          "Allāhumma 'āfinī fī badanī, Allāhumma 'āfinī fī sam'ī, Allāhumma 'āfinī fī baṣarī.",
        arti: "Ya Allah, berikanlah keselamatan pada badanku. Ya Allah, berikanlah keselamatan pada pendengaranku. Ya Allah, berikanlah keselamatan pada penglihatanku.",
        status: "Publish",
      },
      {
        id: "dl-017",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul: "Jauhkanlah kami dari ujian yang tak mampu untuk kami tanggung.",
        arab: "رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ... وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ",
        latin:
          "Rabbanā lā tu'ākhidznā in nasīnā au akhṭa'nā ... wa lā tuḥammilnā mā lā ṭāqata lanā bih.",
        arti: "Ya Tuhan kami, janganlah engkau siksa kami jika kami lupa atau kami bersalah... janganlah Engkau bebankan kepada kami sesuatu yang kami tidak mampu.",
        status: "Publish",
      },
      {
        id: "dl-018",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul:
          "Kami memohon supaya hati kami dan keluarga tidak terpecah belah.",
        arab: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
        latin:
          "Rabbanā lā tuzigh qulūbanā ba'da idz hadaitanā wa hab lanā min ladunka raḥmatan innaka antal-wahhāb.",
        arti: "Ya Tuhan kami, janganlah Engkau palingkan hati-hati kami setelah Engkau memberi hidayah kepada kami, dan berikanlah rahmat kepada kami dari sisi-Mu.",
        status: "Publish",
      },
      {
        id: "dl-019",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul: "Jauhkanlah kami dari orang yang dengki, khianat, iri hati.",
        arab: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا",
        latin:
          "Rabbanaghfir lanā wa li ikhwāninalladzīna sabaqūnā bil-īmāni wa lā taj'al fī qulūbinā ghillan lilladzīna āmanū.",
        arti: "Ya Tuhan kami, ampunilah dosa kami dan janganlah Engkau jadikan di dalam hati kami rasa hasad kepada orang-orang yang beriman.",
        status: "Publish",
      },
      {
        id: "dl-020",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul:
          "Sehatkanlah tubuh badan kami, jauhkan kami dari penyakit berbahaya.",
        arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبَرَصِ وَالْجُنُونِ وَالْجُذَامِ وَمِنْ سَيِّئِ الْأَسْقَامِ",
        latin:
          "Allāhumma innī a'ūdzu bika minal-baraṣi wal-junūni wal-judzāmi wa min sayyi'il-asqām.",
        arti: "Ya Allah, aku berlindung kepada-Mu dari penyakit belang, gila, kusta dan penyakit-penyakit buruk.",
        status: "Publish",
      },
      {
        id: "dl-021",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul: "Lunaskanlah hutang dan tanggungan kami.",
        arab: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ وَرَبَّ الْأَرْضِ ... اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ",
        latin:
          "Allāhumma rabbas-samāwāti wa rabbal-arḍ ... aqḍi 'annad-daina wa aghninā minal-faqr.",
        arti: "Ya Allah, Rabb bagi langit dan bumi... tunaikanlah hutang kami dan berikanlah kami kecukupan dari kefakiran.",
        status: "Publish",
      },
      {
        id: "dl-022",
        kategori: "Arafah",
        kategori_doa: "Keperluan Masa Kehidupan",
        judul:
          "Berikan rezeki yang luas, yang bahkan kami tak menyangka-nyangka akan mendapatkannya.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْخَيْرَ كُلَّهُ عَاجِلِهِ وَآجِلِهِ مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
        latin:
          "Allāhumma innī as'alukal-khaira kullahu 'ājilihi wa ājilihi mā 'alimtu minhu wa mā lam a'lam.",
        arti: "Ya Allah, aku mohon kepada-Mu kebaikan semuanya, yang sekarang maupun yang akan datang, yang aku ketahui maupun yang tidak aku ketahui.",
        status: "Publish",
      },
      {
        id: "dl-023",
        kategori: "Arafah",
        kategori_doa: "Urusan Ketika Kematian",
        judul: "Matikanlah kami dalam husnul khatimah.",
        arab: "اللَّهُمَّ بِعِلْمِكَ الْغَيْبَ وَقُدْرَتِكَ عَلَى الْخَلْقِ أَحْيِنِي مَا عَلِمْتَ الْحَيَاةَ خَيْرًا لِي وَتَوَفَّنِي إِذَا عَلِمْتَ الْوَفَاةَ خَيْرًا لِي",
        latin:
          "Allāhumma bi'ilmikal-ghaiba wa qudratika 'alal-khalqi aḥyinī mā 'alimtal-ḥayāta khairan lī wa tawaffanī idzā 'alimtal-wafāta khairan lī.",
        arti: "Ya Allah, dengan ilmu-Mu terhadap perkara yang ghaib dan dengan kekuasaan-Mu atas ciptaan-Mu, hidupkanlah aku apabila Engkau mengetahui bahwa hidup itu baik bagiku, dan matikanlah aku apabila kematian itu lebih baik bagiku.",
        status: "Publish",
      },
      {
        id: "dl-024",
        kategori: "Arafah",
        kategori_doa: "Urusan Ketika Kematian",
        judul: "Matikanlah kami dalam keadaan dijauhkan dari fitnah.",
        arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ وَالْهَرَمِ وَالْمَغْرَمِ وَمِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ النَّارِ وَعَذَابِ النَّارِ",
        latin:
          "Allāhumma innī a'ūdzu bika minal-kasali wal-harami wal-maghrami wa min fitnatil-qabri wa 'adzābil-qabri wa min fitnatin-nāri wa 'adzābin-nār.",
        arti: "Ya Allah, aku berlindung kepada-Mu dari rasa malas, kepikunan, hutang, fitnah kubur dan adzab kubur, fitnah neraka dan adzab neraka.",
        status: "Publish",
      },
      {
        id: "dl-025",
        kategori: "Arafah",
        kategori_doa: "Urusan Ketika Kematian",
        judul:
          "Sempatkanlah kami untuk mengucap syahadah 'La ilaha illallah, muhammadur rasulullah'.",
        arab: "رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ",
        latin:
          "Rabbanā faghfir lanā dzunūbanā wa kaffir 'annā sayyi'ātinā wa tawaffanā ma'al-abrār.",
        arti: "Ya Tuhan kami, ampunilah dosa-dosa kami, hapuskanlah kesalahan-kesalahan kami, dan wafatkanlah kami bersama orang-orang yang berbuat kebaikan.",
        status: "Publish",
      },
      {
        id: "dl-026",
        kategori: "Arafah",
        kategori_doa: "Urusan Ketika Kematian",
        judul: "Matikanlah kami dalam iman.",
        arab: "رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        latin:
          "Rabbanā atmim lanā nūranā waghfir lanā innaka 'alā kulli syai'in qadīr.",
        arti: "Ya Rabb kami, sempurnakanlah bagi kami cahaya kami dan ampunilah kami. Sesungguhnya Engkau Maha Kuasa atas segala sesuatu.",
        status: "Publish",
      },
      {
        id: "dl-027",
        kategori: "Arafah",
        kategori_doa: "Alam Barzakh",
        judul: "Ya Allah, jadikan kubur kami dari taman-taman syurga.",
        arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبُخْلِ وَالْجُبْنِ وَأَعُوذُ بِكَ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ",
        latin:
          "Allāhumma innī a'ūdzu bika minal-bukhli wal-jubni wa a'ūdzu bika an uradda ilā ardzalil-'umuri wa a'ūdzu bika min fitnatid-dunyā wa a'ūdzu bika min 'adzābil-qabr.",
        arti: "Ya Allah, aku berlindung kepada-Mu dari sifat bakhil, pengecut, dikembalikan kepada usia paling hina (pikun), fitnah dunia, dan adzab kubur.",
        status: "Publish",
      },
      {
        id: "dl-028",
        kategori: "Arafah",
        kategori_doa: "Alam Barzakh",
        judul:
          "Jangan jadikan kubur kami dari lubang api neraka — terangkanlah kubur kami.",
        arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ وَالْهَرَمِ وَالْمَأْثَمِ وَالْمَغْرَمِ وَمِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ النَّارِ وَعَذَابِ النَّارِ",
        latin:
          "Allāhumma innī a'ūdzu bika minal-kasali wal-harami wal-ma'tsami wal-maghrami wa min fitnatil-qabri wa 'adzābil-qabri wa min fitnatin-nāri wa 'adzābin-nār.",
        arti: "Ya Allah, aku berlindung kepada-Mu dari rasa malas dan kepikunan, dari dosa dan hutang berat, dari fitnah kubur dan adzab kubur, dari fitnah neraka dan adzab neraka.",
        status: "Publish",
      },
      {
        id: "dl-029",
        kategori: "Arafah",
        kategori_doa: "Alam Barzakh",
        judul: "Ya Allah lapangkanlah kubur kami sejauh mata memandang.",
        arab: "اللَّهُمَّ اجْعَلْ لِي فِي قَلْبِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا",
        latin:
          "Allāhummaj'al lī fī qalbī nūran, wa fī sam'ī nūran, wa fī baṣarī nūran.",
        arti: "Ya Allah, jadikanlah untukku cahaya di dalam hatiku, cahaya di dalam lisanku, cahaya di pendengaranku, cahaya dalam penglihatanku.",
        status: "Publish",
      },
      {
        id: "dl-030",
        kategori: "Arafah",
        kategori_doa: "Ketika Di Padang Mahsyar",
        judul:
          "Ya Allah, selamatkanlah kami di padang mahsyar & jadikan di bawah perlindungan Arasy-Mu.",
        arab: "رَبَّنَا لَا تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ",
        latin: "Rabbanā lā tukhzinā yaumal-qiyāmati innaka lā tukhliful-mī'ād.",
        arti: "Ya Tuhan kami, janganlah Kau hinakan kami pada hari kiamat. Sesungguhnya Engkau tidak menyelisihi janji.",
        status: "Publish",
      },
      {
        id: "dl-031",
        kategori: "Arafah",
        kategori_doa: "Ketika Di Padang Mahsyar",
        judul:
          "Berikanlah suratan amal kami dari tangan kanan & padamkan dosa-dosa dalam catatan amal.",
        arab: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ دِقَّهُ وَجِلَّهُ وَأَوَّلَهُ وَآخِرَهُ وَعَلَانِيَتَهُ وَسِرَّهُ",
        latin:
          "Allāhummaghfir lī dzanbī kullahu diqqahu wa jillahu wa awwalahu wa ākhirahu wa 'alāniyatahu wa sirrahu.",
        arti: "Ya Allah, ampunilah dosaku seluruhnya, yang kecil maupun yang besar, yang awal maupun yang akhir, yang dinampakkan maupun yang disembunyikan.",
        status: "Publish",
      },
      {
        id: "dl-032",
        kategori: "Arafah",
        kategori_doa: "Ketika Di Padang Mahsyar",
        judul:
          "Tutup dan lindungilah aib-aib dosa-dosa kami — masukkan kami golongan syurga tanpa hisab.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ إِيمَانًا لَا يَرْتَدُّ وَنَعِيمًا لَا يَنْفَدُ وَمُرَافَقَةَ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ فِي أَعْلَى جَنَّةِ الْخُلْدِ",
        latin:
          "Allāhumma innī as'aluka īmānan lā yartaddu wa na'īman lā yanfadu wa murāfaqata Muḥammadin ṣallallāhu 'alaihi wa sallam fī a'lā jannatil-khuld.",
        arti: "Ya Allah, sesungguhnya aku memohon kepada-Mu iman yang tidak akan lepas, nikmat yang tidak akan habis, dan menyertai Muhammad shallallahu alaihi wa sallam di surga yang paling tinggi selama-lamanya.",
        status: "Publish",
      },
      {
        id: "dl-033",
        kategori: "Arafah",
        kategori_doa: "Ketika Di Padang Mahsyar",
        judul: "Kurniakanlah kami syafaat Rasulullah.",
        arab: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ",
        latin:
          "Allāhumma ṣalli 'alā Muḥammadin wa 'alā āli Muḥammadin kamā ṣallaita 'alā Ibrāhīma wa 'alā āli Ibrāhīm.",
        arti: "Ya Allah, berikanlah shalawat kepada Nabi Muhammad dan keluarga beliau, sebagaimana Engkau memberikan shalawat kepada Nabi Ibrahim dan keluarga beliau.",
        status: "Publish",
      },
      {
        id: "dl-034",
        kategori: "Arafah",
        kategori_doa: "Lintasan Titian Sirat",
        judul:
          "Permudahkanlah kami untuk melintasi Sirat & percepat kami dengan secepat kilat.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ وَأَعُوذُ بِكَ مِنَ النَّارِ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ",
        latin:
          "Allāhumma innī as'alukal-jannata wa mā qarraba ilaihā min qaulin au 'amal, wa a'ūdzu bika minan-nāri wa mā qarraba ilaihā min qaulin au 'amal.",
        arti: "Ya Allah, aku meminta kepada-Mu surga dan apa yang mendekatkan kepada surga, baik berupa ucapan maupun amalan. Dan aku berlindung kepada-Mu dari neraka dan apa yang mendekatkan kepadanya.",
        status: "Publish",
      },
      {
        id: "dl-035",
        kategori: "Arafah",
        kategori_doa: "Lintasan Titian Sirat",
        judul:
          "Jangan jatuhkan kami ke dalam neraka ketika melintasi titian sirat.",
        arab: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ إِنَّ عَذَابَهَا كَانَ غَرَامًا",
        latin:
          "Rabbanaṣrif 'annā 'adzāba jahannama inna 'adzābahā kāna gharāmā.",
        arti: "Ya Tuhan kami, jauhkanlah neraka Jahannam dari kami; sesungguhnya adzab Jahannam adalah melazimi seseorang.",
        status: "Publish",
      },
      {
        id: "dl-036",
        kategori: "Arafah",
        kategori_doa: "Masuk Syurga",
        judul: "Ya Allah, kurniakan kami syurga Firdaus-Mu.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ",
        latin:
          "Allāhumma innī as'alukal-jannata wa mā qarraba ilaihā min qaulin au 'amal.",
        arti: "Ya Allah, aku meminta kepada-Mu surga dan apa yang mendekatkan kepada surga, baik berupa ucapan maupun amalan.",
        status: "Publish",
      },
      {
        id: "dl-037",
        kategori: "Arafah",
        kategori_doa: "Masuk Syurga",
        judul:
          "Bangkitkan kami bersama Nabi Muhammad SAW & berilah peluang berdampingan dengan beliau.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ إِيمَانًا لَا يَرْتَدُّ وَنَعِيمًا لَا يَنْفَدُ وَمُرَافَقَةَ مُحَمَّدٍ فِي أَعْلَى جَنَّةِ الْخُلْدِ",
        latin:
          "Allāhumma innī as'aluka īmānan lā yartaddu wa na'īman lā yanfadu wa murāfaqata Muḥammadin fī a'lā jannatil-khuld.",
        arti: "Ya Allah, aku memohon iman yang tidak akan lepas, nikmat yang tidak akan habis, dan menyertai Nabi Muhammad di surga tertinggi selama-lamanya.",
        status: "Publish",
      },
      {
        id: "dl-038",
        kategori: "Arafah",
        kategori_doa: "Masuk Syurga",
        judul: "Ya Allah, jauhkanlah kami dari azab api neraka.",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari siksa neraka.",
        status: "Publish",
      },
      {
        id: "dl-039",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Anak-Anak & Keturunan",
        judul: "Ya Allah, kurniakanlah kami zuriat dan keturunan yang baik.",
        arab: "رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
        latin:
          "Rabbi hab lī min ladunka dzurriyyatan ṭayyibatan innaka samī'ud-du'ā'.",
        arti: "Ya Rabbku, berikanlah kepadaku dari sisi-Mu keturunan yang baik; sesungguhnya Engkau adalah Dzat Yang Maha Mendengarkan doa.",
        status: "Publish",
      },
      {
        id: "dl-040",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Anak-Anak & Keturunan",
        judul: "Jadikanlah kami & keturunan kami orang yang mendirikan sholat.",
        arab: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
        latin:
          "Rabbij'alnī muqīmaṣ-ṣalāti wa min dzurriyyatī rabbanā wa taqabbal du'ā'.",
        arti: "Ya Rabbku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan shalat. Ya Tuhan kami, dan terimalah doaku.",
        status: "Publish",
      },
      {
        id: "dl-041",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Anak-Anak & Keturunan",
        judul:
          "Jadikan anak kami berkarakter pemimpin, bertanggungjawab, jujur & amanah.",
        arab: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        latin:
          "Rabbanā hab lanā min azwājinā wa dzurriyyātinā qurrata a'yunin waj'alnā lil-muttaqīna imāmā.",
        arti: "Ya Tuhan kami, anugerahkanlah kepada kami pasangan dan keturunan kami sebagai penyejuk hati, dan jadikanlah kami imam (pemimpin) bagi orang-orang yang bertaqwa.",
        status: "Publish",
      },
      {
        id: "dl-042",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Anak-Anak & Keturunan",
        judul:
          "Jadikanlah kami bersyukur atas nikmat-Mu dan jadikan kami & keturunan beramal shaleh.",
        arab: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي",
        latin:
          "Rabbi auzi'nī an asykura ni'matakal-latī an'amta 'alayya wa 'alā wālidayya wa an a'mala ṣāliḥan tarḍāhu wa aṣliḥ lī fī dzurriyyatī.",
        arti: "Ya Tuhanku, jadikanlah aku orang yang bersyukur dengan nikmat-nikmat-Mu yang telah Engkau berikan kepadaku dan kepada kedua orang tuaku, dan jadikanlah aku beramal dengan amal saleh yang Engkau ridhai dan perbaikilah untukku keturunanku.",
        status: "Publish",
      },
      {
        id: "dl-043",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Ibu Bapa",
        judul:
          "Ampunkanlah dosa ibu bapa kami & sayangilah mereka sebagaimana mereka menyayangiku.",
        arab: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        latin: "Rabbir-ḥamhumā kamā rabbayānī ṣaghīrā.",
        arti: "Ya Rabbku, sayangilah keduanya (ibu bapakku) sebagaimana keduanya telah menyayangiku di waktu kecil.",
        status: "Publish",
      },
      {
        id: "dl-044",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Ibu Bapa",
        judul: "Ampunilah dosaku dan dosa ibu bapakku di hari perhitungan.",
        arab: "رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ",
        latin:
          "Rabbanaghfir lī wa liwālidayya wa lil-mu'minīna yauma yaqūmul-ḥisāb.",
        arti: "Ya Rabbku, ampunilah dosaku dan juga orang tuaku dan juga orang-orang yang beriman di hari perhitungan.",
        status: "Publish",
      },
      {
        id: "dl-045",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Ibu Bapa",
        judul:
          "Jadikan kami anak yang berbakti kepada mereka & jadikanlah kami bersyukur atas nikmat-Mu.",
        arab: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ",
        latin:
          "Rabbi auzi'nī an asykura ni'matakal-latī an'amta 'alayya wa 'alā wālidayya wa an a'mala ṣāliḥan tarḍāhu wa adkhilnī biraḥmatika fī 'ibādikaṣ-ṣāliḥīn.",
        arti: "Ya Tuhanku, jadikanlah aku bersyukur atas nikmat-Mu yang telah Engkau berikan kepadaku dan kepada kedua orang tuaku, dan jadikanlah aku beramal saleh yang Engkau ridhai, dan masukanlah aku dalam golongan hamba-hamba-Mu yang saleh.",
        status: "Publish",
      },
      {
        id: "dl-046",
        kategori: "Arafah",
        kategori_doa: "Pekerjaan",
        judul:
          "Ya Allah bimbinglah kami untuk mencari rezeki yang halal dan berkah.",
        arab: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
        latin:
          "Allāhummakfinī biḥalālika 'an ḥarāmik, wa aghninī bifaḍlika 'amman siwāk.",
        arti: "Ya Allah, berilah aku kecukupan dengan rezeki yang halal sehingga aku tidak memerlukan yang haram, dan berilah aku kekayaan dengan karunia-Mu sehingga aku tidak memerlukan bantuan selain diri-Mu.",
        status: "Publish",
      },
      {
        id: "dl-047",
        kategori: "Arafah",
        kategori_doa: "Pekerjaan",
        judul:
          "Permudahkanlah urusan kami & jadikanlah pekerjaan ini ikhlas karena-Mu.",
        arab: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
        latin: "Rabbisyraḥ lī ṣadrī wa yassir lī amrī.",
        arti: "Ya Rabbku, lapangkanlah untukku dadaku, dan mudahkanlah bagiku urusanku.",
        status: "Publish",
      },
      {
        id: "dl-048",
        kategori: "Arafah",
        kategori_doa: "Pekerjaan",
        judul:
          "Ya Allah, kami memohon kepada-Mu manfaat, rezeki yang baik, dan amal yang diterima.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
        latin:
          "Allāhumma innī as'aluka 'ilman nāfi'an wa rizqan ṭayyiban wa 'amalan mutaqabbalā.",
        arti: "Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.",
        status: "Publish",
      },
      {
        id: "dl-049",
        kategori: "Arafah",
        kategori_doa: "Perkawinan",
        judul:
          "Ya Allah, wujudkan Sakinah Mawaddah Warahmah dalam perkawinan kami.",
        arab: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        latin:
          "Rabbanā hab lanā min azwājinā wa dzurriyyātinā qurrata a'yunin waj'alnā lil-muttaqīna imāmā.",
        arti: "Ya Tuhan kami, anugerahkanlah kepada kami pasangan-pasangan dan keturunan kami sebagai penyejuk hati, dan jadikanlah kami imam bagi orang-orang yang bertaqwa.",
        status: "Publish",
      },
      {
        id: "dl-050",
        kategori: "Arafah",
        kategori_doa: "Perkawinan",
        judul:
          "Satukanlah hati kami & jadikan kami pasangan yang saling bermaafan.",
        arab: "رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنْتَ خَيْرُ الرَّاحِمِينَ",
        latin: "Rabbanā āmannā faghfir lanā warḥamnā wa anta khairur-rāḥimīn.",
        arti: "Ya Tuhan kami, kami beriman maka ampunilah dosa kami, dan rahmatilah kami; sesungguhnya Engkau adalah sebaik-baik Dzat yang memberikan kasih sayang.",
        status: "Publish",
      },
      {
        id: "dl-051",
        kategori: "Arafah",
        kategori_doa: "Perkawinan",
        judul: "Jauhkanlah kami dari sifat ego, dendam, dan berselisih faham.",
        arab: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِلَّذِينَ آمَنُوا",
        latin:
          "Rabbanaghfir lanā wa li ikhwāninalladzīna sabaqūnā bil-īmāni wa lā taj'al fī qulūbinā ghillan lilladzīna āmanū.",
        arti: "Ya Tuhan kami, ampunilah dosa kami dan janganlah Engkau jadikan di dalam hati kami rasa hasad dan dengki kepada orang-orang yang beriman.",
        status: "Publish",
      },
      {
        id: "dl-052",
        kategori: "Arafah",
        kategori_doa: "Untuk Insan Yang Telah Pergi",
        judul:
          "Bersihkanlah mereka dari dosa Ya Allah & lapangkanlah kubur mereka.",
        arab: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مَدْخَلَهُ",
        latin:
          "Allāhummaghfir lahu warḥamhu wa 'āfihi wa'fu 'anhu wa akrim nuzulahu wa wassi' madkhalahu.",
        arti: "Ya Allah, ampunilah dia, rahmatilah dia, berikanlah 'afiat kepadanya, dan muliakanlah tempat tinggalnya serta luaskanlah tempat masuknya.",
        status: "Publish",
      },
      {
        id: "dl-053",
        kategori: "Arafah",
        kategori_doa: "Untuk Insan Yang Telah Pergi",
        judul:
          "Kumpulkanlah kami kembali bersama mereka di syurga-Mu Ya Allah.",
        arab: "رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدْتَّهُمْ وَمَنْ صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ",
        latin:
          "Rabbanā wa adkhilhum jannāti 'adnin allatī wa'attahum wa man ṣalaḥa min ābā'ihim wa azwājihim wa dzurriyyātihim.",
        arti: "Ya Tuhan kami, dan masukkanlah mereka ke dalam surga 'Adn yang telah Engkau janjikan kepada mereka beserta orang-orang yang saleh dari bapak-bapak, istri-istri, dan keturunan mereka.",
        status: "Publish",
      },
      {
        id: "dl-054",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Kakak Adik & Keluarga",
        judul:
          "Ya Allah, eratkan ukhuwah kami, jadikan kami yang saling menyayangi tanpa dengki.",
        arab: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ وَلَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا",
        latin:
          "Rabbanaghfir lanā wa li ikhwāninalladzīna sabaqūnā bil-īmāni wa lā taj'al fī qulūbinā ghillā.",
        arti: "Ya Tuhan kami, ampunilah dosa kami dan saudara-saudara kami dan janganlah Engkau jadikan di dalam hati kami rasa hasad kepada orang-orang yang beriman.",
        status: "Publish",
      },
      {
        id: "dl-055",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Kakak Adik & Keluarga",
        judul:
          "Ampunkanlah dosa-dosa mereka dan lindungilah mereka & lancarkan rezeki mereka.",
        arab: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        latin:
          "Rabbanā ātinā fid-dunyā ḥasanatan wa fil-ākhirati ḥasanatan wa qinā 'adzāban-nār.",
        arti: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari siksa neraka.",
        status: "Publish",
      },
      {
        id: "dl-056",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Sahabat-Sahabat",
        judul:
          "Ya Allah, mudahkanlah sahabat yang sedang mencari kerja & sembuhkanlah sahabat yang sakit.",
        arab: "اللَّهُمَّ أَحْسِنْ عَاقِبَتَنَا فِي الْأُمُورِ كُلِّهَا وَأَجِرْنَا مِنْ خِزْيِ الدُّنْيَا وَعَذَابِ الْآخِرَةِ",
        latin:
          "Allāhumma aḥsin 'āqibatanā fil-umūri kullihā wa ajirnā min khizyid-dunyā wa 'adzābil-ākhirah.",
        arti: "Ya Allah, baguskanlah setiap akhir urusan kami, dan selamatkanlah kami dari kebinasaan di dunia dan dari siksa akhirat.",
        status: "Publish",
      },
      {
        id: "dl-057",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Sahabat-Sahabat",
        judul:
          "Untuk sahabat yang masih bujang — temukanlah mereka dengan pasangan yang soleh/solehah.",
        arab: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
        latin: "Rabbanā hab lanā min azwājinā wa dzurriyyātinā qurrata a'yun.",
        arti: "Ya Tuhan kami, anugerahkanlah kepada kami pasangan-pasangan dan keturunan kami sebagai penyejuk hati.",
        status: "Publish",
      },
      {
        id: "dl-058",
        kategori: "Arafah",
        kategori_doa: "Orang Yang Menitip Doa & Berbuat Baik",
        judul:
          "Ya Allah, kabulkanlah hajat mereka yang menitipkan doa & bahagiakanlah yang berbuat baik.",
        arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ عَاجِلِهِ وَآجِلِهِ",
        latin:
          "Allāhumma innī as'aluka minal-khairi kullihi 'ājilihi wa ājilih.",
        arti: "Ya Allah, aku mohon kepada-Mu kebaikan semuanya, yang sekarang maupun yang akan datang, yang aku ketahui maupun yang tidak aku ketahui.",
        status: "Publish",
      },
      {
        id: "dl-059",
        kategori: "Arafah",
        kategori_doa: "Orang Yang Menitip Doa & Berbuat Baik",
        judul:
          "Lembutkan hati orang yang pernah kami sakiti agar memaafkan kami.",
        arab: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي",
        latin:
          "Allāhumma innī zhalamtu nafsī zhulman katsīran wa lā yaghfirudz-dzunūba illā anta faghfir lī maghfiratan min 'indika warḥamnī.",
        arti: "Ya Allah, sesungguhnya aku menzhalimi diriku dengan kezaliman yang banyak, dan tidak ada yang mengampuni dosa kecuali Engkau, maka ampunilah diriku dan sayangilah aku.",
        status: "Publish",
      },
      {
        id: "dl-060",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Guru",
        judul: "Ampunkanlah dosa guru-guru kami & muliakanlah mereka.",
        arab: "رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ",
        latin: "Rabbanaghfir lanā wa li ikhwāninalladzīna sabaqūnā bil-īmān.",
        arti: "Ya Tuhan kami, ampunilah dosa kami dan saudara-saudara kami yang telah mendahului kami dengan keimanan.",
        status: "Publish",
      },
      {
        id: "dl-061",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Guru",
        judul:
          "Berikanlah ganjaran yang hebat untuk segala ilmu yang mereka curahkan & alirkan pahala tak putus.",
        arab: "رَبِّ زِدْنِي عِلْمًا",
        latin: "Rabbi zidnī 'ilmā.",
        arti: "Ya Rabbku, tambahkanlah ilmu kepadaku.",
        status: "Publish",
      },
      {
        id: "dl-062",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Palestina",
        judul:
          "Ya Allah peliharalah saudara Islam di Palestina dari kekejaman & kezaliman.",
        arab: "رَبِّ نَجِّنِي مِنَ الْقَوْمِ الظَّالِمِينَ",
        latin: "Rabbi najjinī minal-qaumizh-zhālimīn.",
        arti: "Ya Tuhanku, selamatkanlah aku dari orang-orang yang zalim.",
        status: "Publish",
      },
      {
        id: "dl-063",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Palestina",
        judul:
          "Hentikanlah kezaliman ini ya Allah & kurniakanlah mereka kekuatan dan ketabahan.",
        arab: "رَبِّ انْصُرْنِي عَلَى الْقَوْمِ الْمُفْسِدِينَ",
        latin: "Rabbinṣurnī 'alal-qaumil-mufsidīn.",
        arti: "Ya Tuhanku, tolonglah aku (dengan menimpakan azab) atas kaum yang berbuat kerusakan.",
        status: "Publish",
      },
      {
        id: "dl-064",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Negeri Indonesia",
        judul:
          "Ya Allah, jadikanlah Indonesia negeri yang aman, damai & penuh berkah.",
        arab: "رَبِّ اجْعَلْ هَذَا الْبَلَدَ آمِنًا وَاجْنُبْنِي وَبَنِيَّ أَنْ نَعْبُدَ الْأَصْنَامَ",
        latin:
          "Rabbij'al hādzal-balada āminan wajnubnī wa baniyya an na'budal-aṣnām.",
        arti: "Ya Tuhanku, jadikanlah negeri ini negeri yang aman dan jauhkanlah aku beserta anak cucuku dari menyembah berhala.",
        status: "Publish",
      },
      {
        id: "dl-065",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Negeri Indonesia",
        judul:
          "Satukanlah hati kami dalam persaudaraan, jauhkan dari kebencian dan permusuhan.",
        arab: "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
        latin: "Rabbanā lā taj'alnā ma'al-qaumizh-zhālimīn.",
        arti: "Ya Tuhan kami, janganlah Engkau jadikan kami bersama orang-orang yang zhalim.",
        status: "Publish",
      },
      {
        id: "dl-066",
        kategori: "Arafah",
        kategori_doa: "Doa Untuk Negeri Indonesia",
        judul:
          "Angkatlah pemimpin-pemimpin yang adil, amanah, jujur dan takut kepada-Mu.",
        arab: "رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا وَاغْفِرْ لَنَا رَبَّنَا إِنَّكَ أَنْتَ الْعَزِيزُ الْحَكِيمُ",
        latin:
          "Rabbanā lā taj'alnā fitnatan lilladzīna kafarū waghfir lanā rabbanā innaka antal-'azīzul-ḥakīm.",
        arti: "Ya Tuhan kami, janganlah Engkau jadikan kami (sasaran) fitnah bagi orang-orang kafir. Dan ampunilah kami ya Tuhan kami. Sesungguhnya Engkaulah Yang Maha Perkasa lagi Maha Bijaksana.",
        status: "Publish",
      },
    ],
  },
};

// === Helper baca data statis (menggantikan HCApi.getDoaKategori/
// getDoaPutaran/getDoaList yang dulu fetch ke Google Sheets) ===========
function getDoaKategoriStatic() {
  return DoaStaticData.kategori
    .filter((r) => r.status === "Publish")
    .sort((a, b) => Number(a.urutan || 0) - Number(b.urutan || 0));
}

function getDoaPutaranStatic(kategori) {
  const rows = DoaStaticData.putaran[kategori] || [];
  return rows
    .filter((r) => r.status === "Publish")
    .sort(
      (a, b) =>
        Number(a.putaran || 0) - Number(b.putaran || 0) ||
        Number(a.urutan || 0) - Number(b.urutan || 0),
    );
}

function getDoaListStatic(kategori, kategoriDoa) {
  const rows = (DoaStaticData.list[kategori] || []).filter(
    (r) => r.status === "Publish",
  );
  return kategoriDoa
    ? rows.filter((r) => r.kategori_doa === kategoriDoa)
    : rows;
}
