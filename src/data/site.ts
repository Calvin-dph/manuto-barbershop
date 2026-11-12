// Data sementara untuk website client. Bentuknya mengikuti rencana tabel Supabase
// (docs/1-stack-dan-info.md), jadi nanti cukup ganti sumbernya ke query database.

export type ServiceCategory = { id: string; nama: string; foto: string; urutan: number };
export type Service = {
  id: string;
  categoryId: string;
  nama: string;
  harga: number;
  hargaMulai: boolean; // true = "mulai dari"
  aktif: boolean;
  urutan: number;
};
export type Barber = { id: string; nama: string; foto: string; keahlian: string; aktif: boolean; urutan: number };
export type Review = {
  id: string;
  nama: string;
  rating: number;
  teks: string;
  waktu: string;
  sumber: "google" | "manual";
  tampil: boolean;
  unggulan: boolean;
};
export type Photo = { src: string; alt: string };

export const settings = {
  nama: "Manut'o Barbershop",
  tagline: "Mens Hair Stylist",
  whatsapp: "6287831108342",
  whatsappTampil: "0878-3110-8342",
  alamatJalan: "Jl. HOS Cokroaminoto No.357",
  alamatArea: "Krajan, Ungaran Barat, Kab. Semarang",
  alamatLengkap:
    "Jl. HOS Cokroaminoto No.357, Krajan, Ungaran, Kec. Ungaran Barat, Kabupaten Semarang, Jawa Tengah 50511",
  mapsUrl: "https://maps.app.goo.gl/vPAb1eZ6z1p8htw36",
  mapsEmbed:
    "https://maps.google.com/maps?q=Manuto%20Barbershop%2C%20Jl.%20Hos.%20Cokroaminoto%20No.357%2C%20Ungaran&output=embed",
  instagram: "https://www.instagram.com/manutobarbershop2025/",
  tiktok: "https://www.tiktok.com/@manuto.barbershop",
  jamBuka: "10:00",
  jamTutup: "22:00",
  hariBuka: "Setiap hari",
  ratingGoogle: 4.9,
  jumlahUlasan: 132,
  pesanBooking: "Halo Manut'o, saya mau booking potong rambut.",
};

export const categories: ServiceCategory[] = [
  { id: "potong", nama: "Potong Rambut", foto: "/photos/barber-bekerja.jpg", urutan: 1 },
  { id: "perawatan", nama: "Perawatan Rambut", foto: "/photos/potong-rambut.jpg", urutan: 2 },
  { id: "styling", nama: "Styling & Produk", foto: "/photos/produk-1.jpg", urutan: 3 },
];

const s = (categoryId: string, urutan: number, nama: string, harga: number, hargaMulai = false): Service => ({
  id: `${categoryId}-${urutan}`,
  categoryId,
  nama,
  harga,
  hargaMulai,
  aktif: true,
  urutan,
});

// Sumber: pict/pricelist.jpeg
export const services: Service[] = [
  s("potong", 1, "Potong Rambut Pria (Paket A)", 25000),
  s("potong", 2, "Potong Rambut + Keramas (Paket B)", 30000),
  s("potong", 3, "Potong Rambut Plontos Bersih", 40000),
  s("potong", 4, "Potong Jenggot / Shaving", 10000),
  s("potong", 5, "Tato Rambut", 10000),
  s("potong", 6, "Potong Rambut Wanita", 40000),
  s("perawatan", 1, "Cuci Rambut", 10000),
  s("perawatan", 2, "Creambath", 50000),
  s("perawatan", 3, "Bleaching, Highlight", 75000, true),
  s("perawatan", 4, "Bleaching Full", 100000, true),
  s("perawatan", 5, "Perming, Keratin", 200000),
  s("perawatan", 6, "Down Perm", 150000),
  s("styling", 1, "Semir Rambut Warna Gelap", 60000),
  s("styling", 2, "Semir Rambut Warna Terang", 60000),
  s("styling", 3, "Vitamin", 5000),
  s("styling", 4, "Pomade, Hair Tonic, Hair Powder", 25000),
  s("styling", 5, "Creambath Wanita", 50000),
];

// shortcut: nama dan keahlian barber belum diberikan pemilik, ganti saat data asli ada (nanti dari dashboard admin).
export const barbers: Barber[] = [
  { id: "b1", nama: "Barber Manut'o", foto: "/photos/barber-1.jpg", keahlian: "Potong rambut pria & fade", aktif: true, urutan: 1 },
  { id: "b2", nama: "Barber Manut'o", foto: "/photos/barber-2.jpg", keahlian: "Potong rambut & perawatan", aktif: true, urutan: 2 },
];

export const member = {
  harga: 50000,
  periode: "1 tahun",
  foto: "/photos/kartu-member.jpg",
  benefit: [
    "Diskon 10% untuk semua perawatan rambut",
    "Potong rambut 10x, gratis 1x",
    "Diskon 5% untuk produk perawatan rambut",
    "Gratis potong rambut di hari ulang tahun",
  ],
};

const r = (i: number, nama: string, rating: number, waktu: string, teks: string, unggulan = false): Review => ({
  id: `g${i}`,
  nama,
  rating,
  teks,
  waktu,
  sumber: "google",
  tampil: rating >= 4,
  unggulan,
});

// Sumber: Google Maps, diambil 2026-11-12 (docs/1-stack-dan-info.md)
export const reviews: Review[] = [
  r(1, "Naufal Nur Aziz", 5, "3 bulan lalu", "Recomended nihh yang mau cari tempat cukur, kesini aja broo tempatnya full Ac, Free Wifi dan bisa menunggu sambil nonton Tv wkwk. Untuk pelayanannya cukup bagus barberman ny sangat ramah bisa sambil konsultasi cara merawat rambut, bisa untuk anak2 maupun dewasa yaa, harga standar 25k kalo mau plus keramas jadi 30k 👌", true),
  r(2, "091_Ayn Mashia", 5, "1 tahun lalu", "nganterin ayah sama adek potong disini, overall bagus semua. mulai dari pelayanan, hasil potongan, dan tempatnya juga oke. rapih dan bersih, kemaren dapet potongan harga juga hehe. thank u manuto barbershop!", true),
  r(3, "Kinant Nasya", 2, "5 bulan lalu", "Minggu 17 Mei jam 10 an, nunggu 1 orang, kapsternya mas yg kurus..terlalu byk ngobrol, ngalor ngidul..jd ngganggu dan lama.. yah, cari yang lain."),
  r(4, "Dihya Nuha", 5, "1 bulan lalu", "Josss pelayanan sama hasil cukurannya, rekomend bgt buat yg bingung cari babershop Ungaran"),
  r(5, "Kpg United", 2, "3 bulan lalu", "sangat tidak sesuai ekspektasi gradasi tidak sesuai model tidak sesuai yang diinginkan padahal dari awal masnya sudah bilang bisa alias sanggup dan akhirnya modelnya kek tukang potong pemula"),
  r(6, "Ray I", 5, "5 bulan lalu", "Udh 2 kali potong rambut dan keramas disini dan saya suka hasilnya, staff nya juga ramah dan suka kasih tips untuk berbagai macam tipe rambut cara perawatan nya dan semacamnya, bakal balik ke sini terus sih", true),
  r(7, "Ali Sodikin", 5, "1 bulan lalu", "Jos jis pelayanannya Karyawannya sangat ramah dan bisa bantu merekomendasikan yang cocok untuk tamu nya."),
  r(8, "Angga Krisdhianto", 5, "10 bulan lalu", "Pelayanan terbaik, ramah, dan solutif. Recomended barbershop, tempat nyaman, parkir luas, bisa ngopi juga 👍"),
  r(9, "Abia Lintang", 5, "4 bulan lalu", "keren parah, tempat nyaman dan barbernya super ramah, cust dikasih saran dan mantap pol semangat dan sukses"),
  r(10, "Rini Semesta", 5, "3 bulan lalu", "recommended buat orang orang luar kota yang bingung nyari barber bisa kesini hasil nya sangat bagus, rapi"),
  r(11, "Asif Akhsani", 5, "1 tahun lalu", "Orangnya asik . Tempat bersih luas dan nyaman , area tunggu + parkir enak buat nyante dan ngobrol."),
  r(12, "Sales Fireshop 01", 5, "1 tahun lalu", "Lokasi parkir luas, tempat nyaman bersih, sangat rekomended....kapster nya baik baik. Ada tambahan pijatan kepala nya enak banget bikin rileks."),
  r(13, "Nurul Oktriana Lestari", 5, "6 bulan lalu", "Potong rambut kedua kalinya disini Best lah 👍👍👍"),
  r(14, "Muhamad Dhoni", 5, "3 bulan lalu", "Potong rambut di sini kualitas bagus dan harga terjangkau, mantap pokok nya❤️"),
  r(15, "Arbi Sinaga", 5, "5 bulan lalu", "Mantap.. harga terjangkau untuk di kota Ungaran.. hasil potongan rapi dan pelayanan bagus dan ramah"),
  r(16, "Helga adinata", 5, "4 bulan lalu", "Pertama kali potong disini, pelayanan nya oke banget, ramah dan asik, hasil nya baguss"),
  r(17, "Rezaldi Akbar", 5, "6 bulan lalu", "pelayanan bintang 5 barberman sangat ramah, untuk hasil sesuai permintaan bagus rapi detail harga terjangkau the bestt"),
  r(18, "Pa oK", 5, "1 bulan lalu", "Jos jis potongan nya, agus ndower gondrong asik 😁"),
  r(19, "alia sabilalee", 5, "10 bulan lalu", "Warga pria ungaran harus tau tempat ini sih . Pelayanan chapster cekatan ramah dan yang paling penting potongannya rapi . Potong pria only 25k sudah include keramas . dengan fasilitas dan pelayanan sprt yg dikasih sangat worth it / murahh . Pertahankan ya☺️☺️😍😍 Bakal jadi langganan suami sih iniii"),
  r(20, "Wisnu Indra Asmoro", 5, "4 bulan lalu", "Potongan nya bagus rapi, pelayanan nya mantap. Rekomendasi banget."),
];

// Fasilitas yang disebut pelanggan di ulasan Google.
export const fasilitas = ["Full AC", "Free WiFi", "Nonton TV sambil menunggu", "Parkir luas", "Pijat kepala", "Ramah anak", "Bisa ngopi"];

export const gallery: Photo[] = [
  { src: "/photos/barber-bekerja.jpg", alt: "Barber sedang mencukur pelanggan di Manut'o" },
  { src: "/photos/potong-rambut.jpg", alt: "Pelanggan dipotong rambutnya sementara yang lain menunggu" },
  { src: "/photos/suasana-ramai.jpg", alt: "Dua kursi barber terisi pelanggan" },
  { src: "/photos/papan-nama.jpg", alt: "Papan nama lampu Manut'o Barbershop di samping pintu hijau" },
  { src: "/photos/pintu-open.jpg", alt: "Pintu kaca bertuliskan Manut'o Barbershop, we're open" },
  { src: "/photos/kursi-barber.jpg", alt: "Deretan kursi barber dan cermin" },
  { src: "/photos/interior-depan.jpg", alt: "Interior Manut'o dari arah depan" },
  { src: "/photos/interior-lorong.jpg", alt: "Lorong interior dengan lampu gantung" },
  { src: "/photos/ruang-tunggu.jpg", alt: "Ruang tunggu dengan bingkai foto hitam putih" },
  { src: "/photos/meja-cermin.jpg", alt: "Meja kerja barber dan cermin" },
  { src: "/photos/produk-1.jpg", alt: "Produk perawatan rambut Manut'o" },
  { src: "/photos/produk-2.jpg", alt: "Pomade, hair tonic, dan alat cukur di meja barber" },
  { src: "/photos/neon-sign.jpg", alt: "Papan nama Manut'o menyala di malam hari" },
  { src: "/photos/suasana-sore.jpg", alt: "Suasana barbershop saat ramai pelanggan" },
  { src: "/photos/area-tunggu.jpg", alt: "Area tunggu pelanggan" },
];

export const faq = [
  { q: "Perlu booking dulu atau bisa langsung datang?", a: "Dua-duanya bisa. Booking lewat WhatsApp supaya tidak perlu antre lama, atau langsung datang di jam buka." },
  { q: "Jam berapa Manut'o buka?", a: "Setiap hari, pukul 10.00 sampai 22.00." },
  { q: "Bisa untuk anak-anak?", a: "Bisa. Kami melayani potong rambut anak dan dewasa." },
  { q: "Ada tempat parkir?", a: "Ada, area parkirnya luas." },
  { q: "Bagaimana cara jadi member?", a: "Daftar langsung di tempat atau lewat WhatsApp. Biayanya Rp50.000 untuk 1 tahun." },
];

export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");

export const servicesByCategory = (id: string) =>
  services.filter((x) => x.categoryId === id && x.aktif).sort((a, b) => a.urutan - b.urutan);

export const visibleReviews = () => reviews.filter((x) => x.tampil);
export const featuredReviews = () => reviews.filter((x) => x.tampil && x.unggulan);

export const waLink = (text = settings.pesanBooking) =>
  `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
