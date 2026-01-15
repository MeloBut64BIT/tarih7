import { useState, useEffect } from 'react'
import { Calendar, ExternalLink } from 'lucide-react'
import { formatTarih, miladiToHicri, miladiToRumi } from '../utils/calendar'
import { wikipediaDetayGetir } from '../services/wikipedia'

function ContentArea({ olay, tarih }) {
  const [detayliAciklama, setDetayliAciklama] = useState(null)
  const [yukleniyor, setYukleniyor] = useState(false)

  const hicri = miladiToHicri(tarih.getFullYear(), tarih.getMonth() + 1, tarih.getDate())
  const rumi = miladiToRumi(tarih.getFullYear(), tarih.getMonth() + 1, tarih.getDate())

  // Wikipedia'dan detaylı açıklama çek
  useEffect(() => {
    setDetayliAciklama(null)
    if (olay.wikipedia && olay.wikipedia.title) {
      setYukleniyor(true)
      wikipediaDetayGetir(olay.wikipedia.title)
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
  }, [olay])

  const youtubeAra = () => {
    // Yıl + başlık formatında arama yap
    const aramaTerimi = `${olay.baslik} ${olay.yil}`
    const encoded = encodeURIComponent(aramaTerimi)
    window.open(`https://www.youtube.com/results?search_query=${encoded}`, '_blank')
  }

  // Görsel URL'i belirle
  const gorselUrl = olay.gorsel || 
    (olay.wikipedia && olay.wikipedia.thumbnail ? olay.wikipedia.thumbnail.source : null) ||
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tarih Bilgisi */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-islamic-light/20">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-islamic-green" size={24} />
          <h2 className="text-2xl font-bold text-islamic-dark font-basketball">
            {formatTarih(tarih)}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-islamic-green/10 rounded-lg p-4 border border-islamic-green/20 transition-all hover:bg-islamic-green/20">
            <div className="text-sm text-islamic-green font-semibold mb-1">Hicri Takvim</div>
            <div className="text-islamic-dark font-medium font-basketball">
              {hicri.gun} {hicri.ayAdi} {hicri.yil}
            </div>
          </div>
          
          <div className="bg-islamic-light/10 rounded-lg p-4 border border-islamic-light/20 transition-all hover:bg-islamic-light/20">
            <div className="text-sm text-islamic-light font-semibold mb-1">Rumi Takvim</div>
            <div className="text-islamic-dark font-medium font-basketball">
              {rumi.gun} {rumi.ayAdi} {rumi.yil}
            </div>
          </div>
        </div>
      </div>

      {/* Olay İçeriği */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-islamic-light/20">
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
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-2 bg-islamic-green/20 text-islamic-green rounded-lg font-semibold">
              {olay.yil}
            </span>
            {olay.tip === 'birth' && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                Doğum
              </span>
            )}
            {olay.tip === 'death' && (
              <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded text-sm">
                Vefat
              </span>
            )}
            {olay.tip === 'event' && (
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">
                Olay
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-islamic-dark mb-6">
            {olay.baslik}
          </h1>

          {yukleniyor ? (
            <div className="flex items-center gap-3 py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-islamic-green"></div>
              <span className="text-islamic-dark/70">Detaylar yükleniyor...</span>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none text-islamic-dark/90 leading-relaxed">
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
              href={`https://tr.wikipedia.org/wiki/${encodeURIComponent(olay.wikipedia.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-islamic-green hover:text-islamic-dark text-sm font-medium"
            >
              Wikipedia'da daha fazla bilgi →
            </a>
          )}

          {/* YouTube Butonu */}
          <button
            onClick={youtubeAra}
            className="mt-8 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center justify-center gap-3"
          >
            <ExternalLink size={20} />
            <span>YouTube'da İzle</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentArea

