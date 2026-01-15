import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Calendar, User, XCircle, Filter, X } from 'lucide-react'
import { formatTarih } from '../utils/calendar'
import { wikipediaOlaylariGetir, olaylariIsle } from '../services/wikipedia'
import { useLanguage } from '../i18n'
import { filtreKategorileri, olaylariFiltrele, kategoriSayilariHesapla } from '../utils/filterUtils'

function EventListScreen({ seciliTarih, onGeriDon, onOlaySecildi }) {
  const [tumOlaylar, setTumOlaylar] = useState([]) // Tüm olaylar (filtrelenmemiş)
  const [olaylar, setOlaylar] = useState([]) // Filtrelenmiş olaylar
  const [yukleniyor, setYukleniyor] = useState(true)
  const [hata, setHata] = useState(null)
  const [seciliFiltre, setSeciliFiltre] = useState('all')
  const [filtreAcik, setFiltreAcik] = useState(false)
  const [kategoriSayilari, setKategoriSayilari] = useState({})
  const dropdownRef = useRef(null)
  const { language, t } = useLanguage()

  useEffect(() => {
    olaylariYukle()
  }, [seciliTarih, language])

  // Dropdown dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFiltreAcik(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Filtre değiştiğinde olayları filtrele
  useEffect(() => {
    if (tumOlaylar.length > 0) {
      const filtrelenmis = olaylariFiltrele(tumOlaylar, seciliFiltre)
      setOlaylar(filtrelenmis)
      const sayilar = kategoriSayilariHesapla(tumOlaylar)
      setKategoriSayilari(sayilar)
    }
  }, [seciliFiltre, tumOlaylar])

  const olaylariYukle = async () => {
    setYukleniyor(true)
    setHata(null)
    
    try {
      const ay = seciliTarih.getMonth() + 1
      const gun = seciliTarih.getDate()
      const apiData = await wikipediaOlaylariGetir(ay, gun, language)
      const islenmisOlaylar = olaylariIsle(apiData)
      setTumOlaylar(islenmisOlaylar)
      const sayilar = kategoriSayilariHesapla(islenmisOlaylar)
      setKategoriSayilari(sayilar)
    } catch (error) {
      console.error('Olaylar yüklenirken hata:', error)
      setHata(t('events.error'))
      setTumOlaylar([])
      setOlaylar([])
    } finally {
      setYukleniyor(false)
    }
  }

  const handleFiltreSecildi = (kategoriId) => {
    setSeciliFiltre(kategoriId)
    setFiltreAcik(false)
  }

  const handleFiltreTemizle = () => {
    setSeciliFiltre('all')
  }

  const getIcon = (tip) => {
    switch (tip) {
      case 'birth':
        return <User size={20} />
      case 'death':
        return <XCircle size={20} />
      default:
        return <Calendar size={20} />
    }
  }

  const getTipEtiketi = (tip) => {
    switch (tip) {
      case 'birth':
        return 'Doğum'
      case 'death':
        return 'Vefat'
      default:
        return 'Olay'
    }
  }

  const getTipRenk = (tip) => {
    switch (tip) {
      case 'birth':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30'
      case 'death':
        return 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30'
      default:
        return 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30'
    }
  }

  const kategoriler = filtreKategorileri(language)
  const seciliKategori = kategoriler.find(k => k.id === seciliFiltre)

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Geri Butonu */}
      <button
        onClick={onGeriDon}
        className="flex items-center gap-2 mb-4 text-islamic-dark dark:text-white hover:text-islamic-green dark:hover:text-green-400 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        <span>{t('events.back')}</span>
      </button>

      {/* Tarih Bilgisi ve Filtre */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-islamic-light/20 dark:border-gray-700 flex-1">
          <div className="flex items-center gap-3">
            <Calendar className="text-islamic-green dark:text-green-400" size={24} />
            <h2 className="text-2xl font-bold text-islamic-dark dark:text-white font-basketball">
              {formatTarih(seciliTarih, language)}
            </h2>
          </div>
        </div>

        {/* Filtre Butonu */}
        {!yukleniyor && !hata && tumOlaylar.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setFiltreAcik(!filtreAcik)}
              className="flex items-center gap-2 px-4 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-islamic-light/20 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Filter size={20} className="text-islamic-green dark:text-green-400" />
              <span className="text-islamic-dark dark:text-white font-medium">{t('events.filter')}</span>
            </button>

            {/* Dropdown Menü */}
            {filtreAcik && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                <div className="p-2">
                  {kategoriler.map((kategori) => {
                    const sayi = kategoriSayilari[kategori.id] || 0
                    const secili = seciliFiltre === kategori.id
                    return (
                      <button
                        key={kategori.id}
                        onClick={() => handleFiltreSecildi(kategori.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                          secili
                            ? 'bg-islamic-green/20 dark:bg-green-900/30 text-islamic-green dark:text-green-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-islamic-dark dark:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{kategori.ikon}</span>
                          <span className="font-medium">{kategori.ad}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${secili ? 'text-islamic-green dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                            ({sayi})
                          </span>
                          {secili && (
                            <span className="text-islamic-green dark:text-green-400">✓</span>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Aktif Filtre Göstergesi */}
      {!yukleniyor && !hata && seciliFiltre !== 'all' && olaylar.length > 0 && (
        <div className="mb-4 flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 bg-islamic-green/10 dark:bg-green-900/30 rounded-lg border border-islamic-green/20 dark:border-green-700/50">
            <span className="text-lg">{seciliKategori?.ikon}</span>
              <span className="text-sm font-medium text-islamic-dark dark:text-white">
                {t('events.filterPrefix', { name: seciliKategori?.ad || '' })}
              </span>
            <button
              onClick={handleFiltreTemizle}
              className="ml-2 p-1 hover:bg-islamic-green/20 dark:hover:bg-green-900/40 rounded transition-colors"
              aria-label={t('events.clearFilterAria')}
            >
              <X size={16} className="text-islamic-green dark:text-green-400" />
            </button>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {t('events.count', { count: olaylar.length })}
          </span>
        </div>
      )}

      {/* Olay Listesi */}
      {yukleniyor ? (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-islamic-light/20 dark:border-gray-700 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-islamic-green dark:border-green-400"></div>
            <span className="text-islamic-dark dark:text-white">{t('events.loading')}</span>
          </div>
        </div>
      ) : hata ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl shadow-xl p-8 text-center">
          <p className="text-red-700 dark:text-red-300">{hata}</p>
        </div>
      ) : olaylar.length === 0 ? (
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-islamic-light/20 dark:border-gray-700 text-center">
          <XCircle size={48} className="mx-auto mb-4 text-islamic-dark/50 dark:text-gray-500" />
          <p className="text-islamic-dark dark:text-gray-300">
            {seciliFiltre !== 'all'
              ? t('events.noneForFilter')
              : t('events.noneForDate')}
          </p>
        </div>
      ) : (
        <>
          {seciliFiltre === 'all' && tumOlaylar.length > 0 && (
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {t('events.count', { count: olaylar.length })}
            </div>
          )}
          <div className="space-y-3">
            {olaylar.map((olay, index) => (
              <button
                key={index}
                onClick={() => onOlaySecildi(olay)}
                className="w-full text-left bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-islamic-light/20 dark:border-gray-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1 text-islamic-green dark:text-green-400">
                    {getIcon(olay.tip)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-3 py-1 bg-islamic-green/20 dark:bg-green-900/30 text-islamic-green dark:text-green-400 rounded-lg text-sm font-semibold">
                        {olay.yil}
                      </span>
                      <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getTipRenk(olay.tip)}`}>
                        {getTipEtiketi(olay.tip)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-islamic-dark dark:text-white leading-relaxed">
                      {olay.baslik}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default EventListScreen
