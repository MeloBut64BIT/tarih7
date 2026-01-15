// Hicri ve Rumi takvim hesaplama fonksiyonları

const HICRI_BASLANGIC = 227015; // 16 Temmuz 622 Miladi = 1 Muharrem 1 Hicri
const RUMI_BASLANGIC = 584; // 13 Mart 1840 Miladi = 1 Mart 1256 Rumi

// Miladi yılı Hicri yıla çevir
export function miladiToHicri(miladiYil, miladiAy, miladiGun) {
  const miladiTarih = new Date(miladiYil, miladiAy - 1, miladiGun);
  const referansTarih = new Date(622, 6, 16); // 16 Temmuz 622
  
  const gunFarki = Math.floor((miladiTarih - referansTarih) / (1000 * 60 * 60 * 24));
  const hicriGun = (gunFarki % 354) + 1;
  const hicriYil = Math.floor(gunFarki / 354) + 1;
  
  // Basitleştirilmiş ay hesaplama
  const hicriAy = Math.floor((gunFarki % 354) / 29.5) + 1;
  const hicriAyAdlari = [
    'Muharrem', 'Safer', 'Rebiülevvel', 'Rebiülahir',
    'Cemaziyelevvel', 'Cemaziyelahir', 'Recep', 'Şaban',
    'Ramazan', 'Şevval', 'Zilkade', 'Zilhicce'
  ];
  
  return {
    yil: hicriYil,
    ay: hicriAy > 12 ? 12 : hicriAy < 1 ? 1 : hicriAy,
    gun: hicriGun > 30 ? 30 : hicriGun < 1 ? 1 : hicriGun,
    ayAdi: hicriAyAdlari[Math.min(hicriAy - 1, 11)]
  };
}

// Miladi yılı Rumi yıla çevir (basitleştirilmiş)
export function miladiToRumi(miladiYil, miladiAy, miladiGun) {
  // Rumi takvim 13 Mart'ta başlar
  let rumiYil = miladiYil - 584;
  let rumiAy = miladiAy;
  let rumiGun = miladiGun;
  
  if (miladiAy < 3 || (miladiAy === 3 && miladiGun < 13)) {
    rumiYil -= 1;
  }
  
  const rumiAyAdlari = [
    'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim',
    'Kasım', 'Aralık', 'Ocak', 'Şubat'
  ];
  
  // Rumi takvimde Mart ayı başlangıç
  let ayIndex = (miladiAy + 9) % 12;
  
  return {
    yil: rumiYil,
    ay: rumiAy,
    gun: rumiGun,
    ayAdi: rumiAyAdlari[ayIndex]
  };
}

// Tarih formatı (dil destekli)
export function formatTarih(tarih, language = 'tr') {
  const gunlerTr = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
  const aylarTr = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ]

  const gunlerEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const aylarEn = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const gunler = language === 'en' ? gunlerEn : gunlerTr
  const aylar = language === 'en' ? aylarEn : aylarTr

  const gun = tarih.getDate()
  const ay = aylar[tarih.getMonth()]
  const yil = tarih.getFullYear()
  const gunAdi = gunler[tarih.getDay()]

  return `${gun} ${ay} ${yil} ${gunAdi}`
}

// Kısa tarih formatı (13 Ocak / 13 January)
export function formatKisaTarih(tarih, language = 'tr') {
  const aylarTr = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ]

  const aylarEn = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const aylar = language === 'en' ? aylarEn : aylarTr

  return `${tarih.getDate()} ${aylar[tarih.getMonth()]}`
}

