import { Calendar, User, XCircle } from 'lucide-react'
import { useLanguage } from '../i18n.jsx'

function EventList({ olaylar = [], seciliOlay, olaySecildi, yukleniyor }) {
  const { t } = useLanguage()

  if (yukleniyor) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-islamic-green"></div>
        <span className="ml-4 text-islamic-beige">{t('list.loading')}</span>
      </div>
    )
  }

  // Array güvenliği ekleyin
  const safeOlaylar = Array.isArray(olaylar) ? olaylar : []

  if (safeOlaylar.length === 0) {
    return (
      <div className="text-center py-12 text-islamic-beige">
        <XCircle size={48} className="mx-auto mb-4 opacity-50" />
        <p>{t('list.empty')}</p>
      </div>
    )
  }

  const getIcon = (tip) => {
    switch (tip) {
      case 'birth':
        return <User size={18} />
      case 'death':
        return <XCircle size={18} />
      default:
        return <Calendar size={18} />
    }
  }

  return (
    <div className="space-y-2">
      {safeOlaylar.map((olay, index) => {
        const seciliMi = seciliOlay && seciliOlay.baslik === olay.baslik && seciliOlay.yil === olay.yil
        
        return (
          <button
            key={`${olay.yil}-${olay.baslik}-${index}`}
            onClick={() => olaySecildi(olay)}
            className={`w-full text-right p-4 rounded-lg border transition-all duration-200 ${
              seciliMi
                ? 'bg-islamic-green/30 border-islamic-green text-white'
                : 'bg-islamic-dark/50 border-islamic-green/20 hover:bg-islamic-green/20 text-islamic-beige hover:text-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 mt-1 ${
                seciliMi ? 'text-islamic-beige' : 'text-islamic-green'
              }`}>
                {getIcon(olay.tip)}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-islamic-green">
                    {olay.yil}
                  </span>
                </div>
                <div className="text-sm leading-relaxed">
                  {olay.baslik}
                </div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export default EventList