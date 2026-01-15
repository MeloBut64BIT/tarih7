import { useState, useEffect } from 'react'
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react'
import { formatTarih, miladiToHicri, miladiToRumi } from '../utils/calendar'
import { wikipediaDetayGetir } from '../services/wikipedia'
import { useLanguage } from '../i18n.jsx'

function EventDetailScreen({ olay, tarih, onGeriDon }) {
  const [detayliAciklama, setDetayliAciklama] = useState(null)
  const [yukleniyor, setYukleniyor] = useState(false)
  const { language, t } = useLanguage()

  const hicri = miladiToHicri(tarih.getFullYear(), tarih.getMonth() + 1, tarih.getDate())
  const rumi = miladiToRumi(tarih.getFullYear(), tarih.getMonth() + 1, tarih.getDate())

  useEffect(() => {
    setDetayliAciklama(null)
    if (olay.wikipedia && olay.wikipedia.title) {
      setYukleniyor(true)
      wikipediaDetayGetir(olay.wikipedia.title, language)
        .then((detay) => {
          if (detay) {
            setDetayliAciklama(detay)
          } else {
            setDetayliAciklama(olay.aciklama || '')
          }
          setYukleniyor(false)
        })
        .catch(() => {
          setDetayliAciklama(olay.aciklama || '')
          setYukleniyor(false)
        })
    } else {
      setDetayliAciklama(olay.aciklama || '')
    }
  }, [olay, language])

  const youtubeAra = () => {
    const aramaTerimi = `${olay.baslik} ${olay.yil}`
    const encoded = encodeURIComponent(aramaTerimi)
    window.open(`https://www.youtube.com/results?search_query=${encoded}`, '_blank')
  }

  const gorselUrl = olay.gorsel || 
    (olay.wikipedia && olay.wikipedia.thumbnail ? olay.wikipedia.thumbnail.source : null) ||
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* Geri Butonu */}
      <button
        onClick={onGeriDon}
        className="flex items-center gap-2 mb-4 text-islamic-dark dark:text-white hover:text-islamic-green dark:hover:text-green-400 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        <span>{t('eventDetail.back')}</span>
      </button>

      {/* Tarih Bilgisi */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-islamic-light/20 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-islamic-green dark:text-green-400" size={24} />
          <h2 className="text-2xl font-bold text-islamic-dark dark:text-white font-basketball">
            {formatTarih(tarih, language)}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-islamic-green/10 dark:bg-green-900/30 rounded-lg p-4 border border-islamic-green/20 dark:border-green-700/50 transition-all hover:bg-islamic-green/20 dark:hover:bg-green-900/40">
            <div className="text-sm text-islamic-green dark:text-green-400 font-semibold mb-1">{t('eventDetail.hijri')}</div>
            <div className="text-islamic-dark dark:text-white font-medium font-basketball">
              {hicri.gun} {hicri.ayAdi} {hicri.yil}
            </div>
          </div>
          
          <div className="bg-islamic-light/10 dark:bg-gray-700/50 rounded-lg p-4 border border-islamic-light/20 dark:border-gray-600 transition-all hover:bg-islamic-light/20 dark:hover:bg-gray-700/70">
            <div className="text-sm text-islamic-light dark:text-gray-400 font-semibold mb-1">{t('eventDetail.rumi')}</div>
            <div className="text-islamic-dark dark:text-white font-medium font-basketball">
              {rumi.gun} {rumi.ayAdi} {rumi.yil}
            </div>
          </div>
        </div>
      </div>

      {/* Olay İçeriği */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-islamic-light/20 dark:border-gray-700">
        {/* Görsel */}
        {gorselUrl && (
          <div className="w-full h-64 md:h-80 overflow-hidden bg-islamic-dark">
            <img
              src={gorselUrl}
              alt={olay.baslik}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
              }}
            />
          </div>
        )}

        {/* İçerik */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-4 py-2 bg-islamic-green/20 dark:bg-green-900/30 text-islamic-green dark:text-green-400 rounded-lg font-semibold">
              {olay.yil}
            </span>
            {olay.tip === 'birth' && (
              <span className="px-3 py-1 bg-blue-500/20 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm">
                {t('eventDetail.birth')}
              </span>
            )}
            {olay.tip === 'death' && (
              <span className="px-3 py-1 bg-red-500/20 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded text-sm">
                {t('eventDetail.death')}
              </span>
            )}
            {olay.tip === 'event' && (
              <span className="px-3 py-1 bg-purple-500/20 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-sm">
                {t('eventDetail.event')}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-islamic-dark dark:text-white mb-6">
            {olay.baslik}
          </h1>

          {yukleniyor ? (
            <div className="flex items-center gap-3 py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-islamic-green dark:border-green-400"></div>
              <span className="text-islamic-dark/70 dark:text-gray-400">{t('eventDetail.loading')}</span>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none text-islamic-dark/90 dark:text-gray-300 leading-relaxed">
              {detayliAciklama ? (
                <p className="mb-4 text-base md:text-lg whitespace-pre-line">
                  {detayliAciklama}
                </p>
              ) : (
                <p className="mb-4 text-base md:text-lg">
                  {olay.aciklama}
                </p>
              )}
            </div>
          )}

          {olay.wikipedia && (
            <a
              href={`https://${language === 'en' ? 'en' : 'tr'}.wikipedia.org/wiki/${encodeURIComponent(
                olay.wikipedia.title,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-islamic-green dark:text-green-400 hover:text-islamic-dark dark:hover:text-green-300 text-sm font-medium transition-colors"
            >
              {t('eventDetail.wikipediaMore')}
            </a>
          )}

          {/* YouTube Butonu */}
          <button
            onClick={youtubeAra}
            className="mt-8 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3"
          >
            <ExternalLink size={20} />
            <span>{t('eventDetail.youtubeButton')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventDetailScreen

