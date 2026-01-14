import { useState, useEffect, useRef } from 'react'
import { X, Search as SearchIcon, ExternalLink } from 'lucide-react'
import { wikipediaAra, wikipediaSayfaDetayGetir } from '../services/wikipedia'

function SearchModal({ acik, kapat, tema }) {
  const [aramaTerimi, setAramaTerimi] = useState('')
  const [sonuclar, setSonuclar] = useState([])
  const [yukleniyor, setYukleniyor] = useState(false)
  const [hata, setHata] = useState(null)
  const [seciliSonuc, setSeciliSonuc] = useState(null)
  const [detayYukleniyor, setDetayYukleniyor] = useState(false)
  const inputRef = useRef(null)
  const timeoutRef = useRef(null)

  // Modal açıldığında input'a focus
  useEffect(() => {
    if (acik && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      // Modal kapandığında temizle
      setAramaTerimi('')
      setSonuclar([])
      setSeciliSonuc(null)
      setHata(null)
    }
  }, [acik])

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && acik) {
        kapat()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [acik, kapat])

  // Debounce ile arama
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (aramaTerimi.trim().length < 3) {
      setSonuclar([])
      setHata(null)
      return
    }

    setYukleniyor(true)
    setHata(null)

    timeoutRef.current = setTimeout(async () => {
      try {
        const aramaSonuclari = await wikipediaAra(aramaTerimi.trim())
        setSonuclar(aramaSonuclari)
        setHata(null)
      } catch (error) {
        console.error('Arama hatası:', error)
        setHata('Arama yapılırken bir hata oluştu. Lütfen tekrar deneyin.')
        setSonuclar([])
      } finally {
        setYukleniyor(false)
      }
    }, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [aramaTerimi])

  const handleSonucSecildi = async (sonuc) => {
    setDetayYukleniyor(true)
    try {
      const detay = await wikipediaSayfaDetayGetir(sonuc.title)
      if (detay) {
        setSeciliSonuc({
          ...sonuc,
          ...detay
        })
      } else {
        setSeciliSonuc(sonuc)
      }
    } catch (error) {
      console.error('Detay yüklenirken hata:', error)
      setSeciliSonuc(sonuc)
    } finally {
      setDetayYukleniyor(false)
    }
  }

  const handleGeriSonuclara = () => {
    setSeciliSonuc(null)
  }

  const youtubeAra = (baslik) => {
    const encoded = encodeURIComponent(baslik)
    window.open(`https://www.youtube.com/results?search_query=${encoded}`, '_blank')
  }

  if (!acik) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300"
        onClick={kapat}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto transition-all duration-300 ${
            acik ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1 flex items-center gap-3">
              <SearchIcon className="text-islamic-green dark:text-green-400" size={24} />
              <input
                ref={inputRef}
                type="text"
                value={aramaTerimi}
                onChange={(e) => setAramaTerimi(e.target.value)}
                placeholder="Olay, kişi veya tarih ara..."
                className="flex-1 bg-transparent border-none outline-none text-lg text-islamic-dark dark:text-white placeholder-gray-400"
              />
            </div>
            <button
              onClick={kapat}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Kapat"
            >
              <X size={24} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4 md:p-6">
            {seciliSonuc ? (
              // Sonuç Detayı
              <div className="space-y-4">
                <button
                  onClick={handleGeriSonuclara}
                  className="flex items-center gap-2 text-islamic-green dark:text-green-400 hover:text-islamic-dark dark:hover:text-green-300 transition-colors font-medium mb-4"
                >
                  ← Geri
                </button>

                {detayYukleniyor ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-islamic-green dark:border-green-400"></div>
                    <span className="ml-4 text-islamic-dark dark:text-white">Yükleniyor...</span>
                  </div>
                ) : (
                  <>
                    {/* Görsel */}
                    {seciliSonuc.thumbnail && (
                      <div className="w-full h-64 md:h-80 overflow-hidden rounded-xl mb-4">
                        <img
                          src={seciliSonuc.thumbnail}
                          alt={seciliSonuc.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      </div>
                    )}

                    {/* Başlık */}
                    <h2 className="text-2xl md:text-3xl font-bold text-islamic-dark dark:text-white mb-4">
                      {seciliSonuc.title}
                    </h2>

                    {/* İçerik */}
                    {seciliSonuc.extract ? (
                      <div
                        className="prose prose-lg max-w-none text-islamic-dark/90 dark:text-gray-300 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: seciliSonuc.extract }}
                      />
                    ) : seciliSonuc.description ? (
                      <p className="text-islamic-dark/90 dark:text-gray-300 text-lg leading-relaxed">
                        {seciliSonuc.description}
                      </p>
                    ) : null}

                    {/* Butonlar */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <button
                        onClick={() => youtubeAra(seciliSonuc.title)}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={20} />
                        <span>YouTube'da İzle</span>
                      </button>
                      <a
                        href={seciliSonuc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-islamic-green hover:bg-islamic-dark text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 text-center"
                      >
                        <ExternalLink size={20} />
                        <span>Wikipedia'da Oku</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Arama Sonuçları
              <>
                {yukleniyor ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-islamic-green dark:border-green-400"></div>
                    <span className="ml-4 text-islamic-dark dark:text-white">Aranıyor...</span>
                  </div>
                ) : hata ? (
                  <div className="text-center py-12">
                    <p className="text-red-600 dark:text-red-400 mb-2">{hata}</p>
                    <button
                      onClick={() => setAramaTerimi('')}
                      className="px-4 py-2 bg-islamic-green hover:bg-islamic-dark text-white rounded-lg transition-colors"
                    >
                      Tekrar Dene
                    </button>
                  </div>
                ) : aramaTerimi.trim().length < 3 ? (
                  <div className="text-center py-12">
                    <SearchIcon size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600 opacity-50" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Arama yapmak için en az 3 karakter girin
                    </p>
                  </div>
                ) : sonuclar.length === 0 ? (
                  <div className="text-center py-12">
                    <SearchIcon size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600 opacity-50" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Sonuç bulunamadı
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sonuclar.map((sonuc, index) => (
                      <button
                        key={index}
                        onClick={() => handleSonucSecildi(sonuc)}
                        className="w-full text-left bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl p-4 md:p-5 border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:shadow-lg"
                      >
                        <h3 className="text-lg font-semibold text-islamic-dark dark:text-white mb-2">
                          {sonuc.title}
                        </h3>
                        {sonuc.description && (
                          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                            {sonuc.description}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal

