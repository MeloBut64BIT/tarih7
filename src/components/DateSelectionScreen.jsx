import { useState, useEffect } from 'react'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { formatKisaTarih } from '../utils/calendar'
import { useLanguage } from '../i18n.jsx'

function DateSelectionScreen({ seciliTarih, onTarihSecildi, onIleriGec }) {
  const [ay, setAy] = useState(seciliTarih.getMonth() + 1)
  const [gun, setGun] = useState(seciliTarih.getDate())
  const { language, t } = useLanguage()

  useEffect(() => {
    setAy(seciliTarih.getMonth() + 1)
    setGun(seciliTarih.getDate())
  }, [seciliTarih])

  const aylar = t('date.months') || [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ]

  const oncekiTarih = () => {
    const yeniTarih = new Date(seciliTarih)
    yeniTarih.setDate(yeniTarih.getDate() - 1)
    setAy(yeniTarih.getMonth() + 1)
    setGun(yeniTarih.getDate())
    onTarihSecildi(yeniTarih)
  }

  const sonrakiTarih = () => {
    const yeniTarih = new Date(seciliTarih)
    yeniTarih.setDate(yeniTarih.getDate() + 1)
    setAy(yeniTarih.getMonth() + 1)
    setGun(yeniTarih.getDate())
    onTarihSecildi(yeniTarih)
  }

  const handleDevamEt = () => {
    onIleriGec()
  }

  // Ay için gün sayısı
  const getGunSayisi = (ayNumarasi) => {
    const yil = seciliTarih.getFullYear()
    return new Date(yil, ayNumarasi, 0).getDate()
  }

  return (
    <div className="max-w-2xl mx-auto w-full flex items-center justify-center min-h-[50vh]">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-5 md:p-6 border border-islamic-light/20 dark:border-gray-700 w-full max-h-[60vh] overflow-y-auto">
        <div className="text-center mb-4">
          <Calendar className="mx-auto mb-2 text-islamic-green dark:text-green-400" size={36} />
          <h2 className="text-xl md:text-2xl font-bold text-islamic-dark dark:text-white">
            {t('date.selectTitle')}
          </h2>
        </div>

        {/* Tarih Seçici */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4">
            {/* Gün Seçici */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-islamic-dark dark:text-gray-300 mb-1.5">
                {t('date.dayLabel')}
              </label>
              <select
                value={gun}
                onChange={(e) => {
                  setGun(parseInt(e.target.value))
                  const yeniTarih = new Date(seciliTarih.getFullYear(), ay - 1, parseInt(e.target.value))
                  onTarihSecildi(yeniTarih)
                }}
                className="w-full px-3 py-2 rounded-lg border border-islamic-light dark:border-gray-600 bg-white dark:bg-gray-700 text-islamic-dark dark:text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-islamic-green dark:focus:ring-green-500"
              >
                {Array.from({ length: getGunSayisi(ay) }, (_, i) => i + 1).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Ay Seçici */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-islamic-dark dark:text-gray-300 mb-1.5">
                {t('date.monthLabel')}
              </label>
              <select
                value={ay}
                onChange={(e) => {
                  const yeniAy = parseInt(e.target.value)
                  setAy(yeniAy)
                  const maxGun = getGunSayisi(yeniAy)
                  const yeniGun = Math.min(gun, maxGun)
                  setGun(yeniGun)
                  const yeniTarih = new Date(seciliTarih.getFullYear(), yeniAy - 1, yeniGun)
                  onTarihSecildi(yeniTarih)
                }}
                className="w-full px-3 py-2 rounded-lg border border-islamic-light dark:border-gray-600 bg-white dark:bg-gray-700 text-islamic-dark dark:text-white text-base font-medium focus:outline-none focus:ring-2 focus:ring-islamic-green dark:focus:ring-green-500"
              >
                {aylar.map((ayAdi, index) => (
                  <option key={index} value={index + 1}>
                    {ayAdi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Seçilen Tarih Gösterimi */}
          <div className="text-center mb-4">
            <div className="inline-block px-4 py-2 bg-islamic-green/10 dark:bg-green-900/30 rounded-lg border border-islamic-green/20 dark:border-green-700/50">
              <p className="text-xs text-islamic-green dark:text-green-400 font-medium mb-0.5">
                {t('date.selectedDateLabel')}
              </p>
              <p className="text-lg font-bold text-islamic-dark dark:text-white">
                {formatKisaTarih(seciliTarih, language)}
              </p>
            </div>
          </div>

          {/* Önceki/Sonraki Butonları */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={oncekiTarih}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-islamic-dark dark:text-gray-300 bg-islamic-light/20 dark:bg-gray-700/50 hover:bg-islamic-light/30 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft size={16} />
              <span>{t('date.previous')}</span>
            </button>
            <button
              onClick={sonrakiTarih}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-islamic-dark dark:text-gray-300 bg-islamic-light/20 dark:bg-gray-700/50 hover:bg-islamic-light/30 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span>{t('date.next')}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Devam Et Butonu */}
        <div className="text-center mt-4">
          <button
            onClick={handleDevamEt}
            className="px-6 py-2.5 bg-islamic-green hover:bg-islamic-dark text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 text-sm md:text-base"
          >
            {t('date.continue')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DateSelectionScreen

