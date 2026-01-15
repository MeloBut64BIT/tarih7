// Filtreleme yardımcı fonksiyonları

/**
 * Olayı kategorilere ayırır (başlık ve açıklama analizi)
 * @param {Object} olay - Olay objesi
 * @returns {string} Kategori ('all', 'events', 'births', 'deaths', 'foundations', 'celebrations', 'discoveries')
 */
export function olayKategorisiBelirle(olay) {
  const baslik = (olay.baslik || '').toLowerCase()
  const aciklama = (olay.aciklama || '').toLowerCase()
  const metin = `${baslik} ${aciklama}`

  // Doğumlar (zaten API'den 'birth' olarak geliyor)
  if (olay.tip === 'birth' || metin.includes('doğ') || metin.includes('birth')) {
    return 'births'
  }

  // Vefatlar (zaten API'den 'death' olarak geliyor)
  if (olay.tip === 'death' || metin.includes('öl') || metin.includes('vefat') || metin.includes('death')) {
    return 'deaths'
  }

  // Kurullar
  const kurulKelime = ['kurul', 'found', 'establish', 'kuruluş', 'devlet', 'imparatorluk', 'cumhuriyet', 'kingdom', 'empire', 'republic', 'institution', 'kurum', 'şirket', 'company']
  if (kurulKelime.some(kelime => metin.includes(kelime))) {
    return 'foundations'
  }

  // Kutlamalar
  const kutlamaKelime = ['bayram', 'holiday', 'celebration', 'festival', 'tatil', 'national day', 'ulusal gün', 'resmi', 'independence', 'bağımsızlık']
  if (kutlamaKelime.some(kelime => metin.includes(kelime))) {
    return 'celebrations'
  }

  // Keşifler
  const kesifKelime = ['keşf', 'invent', 'discover', 'buluş', 'icat', 'patent', 'invention', 'discovery', 'icat', 'found', 'bul']
  if (kesifKelime.some(kelime => metin.includes(kelime))) {
    return 'discoveries'
  }

  // Olaylar (varsayılan, tip 'event' ise veya yukarıdaki kategorilere uymuyorsa)
  if (olay.tip === 'event') {
    return 'events'
  }

  // Eğer tip belirsizse, varsayılan olarak 'events'
  return 'events'
}

/**
 * Filtre kategorilerini tanımlar
 * @returns {Array} Kategori listesi
 */
export function filtreKategorileri() {
  return [
    { id: 'all', ad: 'Tüm Olaylar', ikon: '📅', renk: 'text-gray-600 dark:text-gray-400' },
    { id: 'events', ad: 'Olaylar', ikon: '⚔️', renk: 'text-purple-600 dark:text-purple-400' },
    { id: 'births', ad: 'Doğumlar', ikon: '👶', renk: 'text-blue-600 dark:text-blue-400' },
    { id: 'deaths', ad: 'Vefatlar', ikon: '💀', renk: 'text-red-600 dark:text-red-400' },
    { id: 'foundations', ad: 'Kurullar', ikon: '🏛️', renk: 'text-orange-600 dark:text-orange-400' },
    { id: 'celebrations', ad: 'Kutlamalar', ikon: '🎉', renk: 'text-yellow-600 dark:text-yellow-400' },
    { id: 'discoveries', ad: 'Keşifler', ikon: '🔬', renk: 'text-green-600 dark:text-green-400' }
  ]
}

/**
 * Olayları kategoriye göre filtreler
 * @param {Array} olaylar - Olay listesi
 * @param {string} kategoriId - Seçili kategori ID
 * @returns {Array} Filtrelenmiş olay listesi
 */
export function olaylariFiltrele(olaylar, kategoriId) {
  if (kategoriId === 'all') {
    return olaylar
  }

  return olaylar.filter(olay => {
    const olayKategori = olayKategorisiBelirle(olay)
    return olayKategori === kategoriId
  })
}

/**
 * Kategori başına olay sayısını hesaplar
 * @param {Array} olaylar - Olay listesi
 * @returns {Object} Kategori ID'lerine göre sayılar
 */
export function kategoriSayilariHesapla(olaylar) {
  const sayilar = {
    all: olaylar.length,
    events: 0,
    births: 0,
    deaths: 0,
    foundations: 0,
    celebrations: 0,
    discoveries: 0
  }

  olaylar.forEach(olay => {
    const kategori = olayKategorisiBelirle(olay)
    if (sayilar.hasOwnProperty(kategori)) {
      sayilar[kategori]++
    } else {
      sayilar.events++ // Varsayılan olarak olaylar
    }
  })

  return sayilar
}

