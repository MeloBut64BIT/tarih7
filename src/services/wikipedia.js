// Wikipedia API servisi

/**
 * Wikipedia On This Day API'den belirli bir tarihin olaylarını çeker
 * @param {number} ay - Ay (1-12)
 * @param {number} gun - Gün (1-31)
 * @returns {Promise<Object>} API yanıtı
 */
export async function wikipediaOlaylariGetir(ay, gun) {
  try {
    // Ay ve günü 2 haneli string formatına çevir
    const ayStr = String(ay).padStart(2, '0')
    const gunStr = String(gun).padStart(2, '0')
    
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/tr/onthisday/all/${ayStr}/${gunStr}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Wikipedia API hatası:', error)
    throw error
  }
}

/**
 * Wikipedia API yanıtını işleyip olay listesi oluşturur
 * @param {Object} apiData - Wikipedia API yanıtı
 * @returns {Array} İşlenmiş olay listesi
 */
export function olaylariIsle(apiData) {
  const olaylar = []
  
  // Events (olaylar) kısmını işle
  if (apiData.events && Array.isArray(apiData.events)) {
    apiData.events.forEach((olay) => {
      olaylar.push({
        yil: olay.year || 'Bilinmiyor',
        baslik: olay.text || 'Başlık yok',
        aciklama: olay.text || '',
        wikipedia: olay.pages && olay.pages.length > 0 ? olay.pages[0] : null,
        gorsel: olay.pages && olay.pages.length > 0 && olay.pages[0].thumbnail 
          ? olay.pages[0].thumbnail.source 
          : null,
        tip: 'event'
      })
    })
  }
  
  // Births (doğumlar) kısmını işle
  if (apiData.births && Array.isArray(apiData.births)) {
    apiData.births.forEach((olay) => {
      olaylar.push({
        yil: olay.year || 'Bilinmiyor',
        baslik: olay.text || 'Başlık yok',
        aciklama: olay.text || '',
        wikipedia: olay.pages && olay.pages.length > 0 ? olay.pages[0] : null,
        gorsel: olay.pages && olay.pages.length > 0 && olay.pages[0].thumbnail 
          ? olay.pages[0].thumbnail.source 
          : null,
        tip: 'birth'
      })
    })
  }
  
  // Deaths (ölümler) kısmını işle
  if (apiData.deaths && Array.isArray(apiData.deaths)) {
    apiData.deaths.forEach((olay) => {
      olaylar.push({
        yil: olay.year || 'Bilinmiyor',
        baslik: olay.text || 'Başlık yok',
        aciklama: olay.text || '',
        wikipedia: olay.pages && olay.pages.length > 0 ? olay.pages[0] : null,
        gorsel: olay.pages && olay.pages.length > 0 && olay.pages[0].thumbnail 
          ? olay.pages[0].thumbnail.source 
          : null,
        tip: 'death'
      })
    })
  }
  
  return olaylar
}

/**
 * Wikipedia sayfasından detaylı açıklama çeker
 * @param {string} title - Wikipedia sayfa başlığı
 * @returns {Promise<string>} Sayfa açıklaması
 */
export async function wikipediaDetayGetir(title) {
  try {
    const url = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    const response = await fetch(url)
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data.extract || null
  } catch (error) {
    console.error('Wikipedia detay hatası:', error)
    return null
  }
}

/**
 * Wikipedia'da arama yapar (OpenSearch API)
 * @param {string} query - Arama terimi
 * @returns {Promise<Array>} Arama sonuçları [{title, description, url}]
 */
export async function wikipediaAra(query) {
  try {
    if (!query || query.length < 3) {
      return []
    }

    const url = `https://tr.wikipedia.org/w/api.php?origin=*&action=opensearch&search=${encodeURIComponent(query)}&limit=10&format=json`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    // OpenSearch API yanıt formatı: [query, titles[], descriptions[], urls[]]
    if (Array.isArray(data) && data.length === 4) {
      const titles = data[1] || []
      const descriptions = data[2] || []
      const urls = data[3] || []
      
      return titles.map((title, index) => ({
        title: title,
        description: descriptions[index] || '',
        url: urls[index] || `https://tr.wikipedia.org/wiki/${encodeURIComponent(title)}`
      }))
    }
    
    return []
  } catch (error) {
    console.error('Wikipedia arama hatası:', error)
    throw error
  }
}

/**
 * Wikipedia sayfası detaylarını çeker (query API)
 * @param {string} title - Sayfa başlığı
 * @returns {Promise<Object>} {title, extract, thumbnail}
 */
export async function wikipediaSayfaDetayGetir(title) {
  try {
    const url = `https://tr.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts|pageimages&exintro&titles=${encodeURIComponent(title)}&format=json&piprop=thumbnail&pithumbsize=500`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.query && data.query.pages) {
      const pageId = Object.keys(data.query.pages)[0]
      const page = data.query.pages[pageId]
      
      if (page) {
        return {
          title: page.title || title,
          extract: page.extract || '',
          thumbnail: page.thumbnail ? page.thumbnail.source : null
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Wikipedia sayfa detay hatası:', error)
    throw error
  }
}

