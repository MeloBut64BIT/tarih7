import { useState } from 'react'
import { X, Heart, Settings, Sun, Moon, Instagram, Youtube, Info } from 'lucide-react'
import { useLanguage } from '../i18n'

function SideMenu({ acik, kapat, tema, setTema }) {
  const [aktifSekme, setAktifSekme] = useState('hakkimizda') // hakkimizda, tesekkur, ayarlar
  const { language, setLanguage, t } = useLanguage()

  const handleTesekkurEt = () => {
    try {
      const yeniPencere = window.open('https://www.buymeacoffee.com/tarihtebugun', '_blank')

      if (!yeniPencere) {
        throw new Error('Pencere engellendi')
      }
    } catch (error) {
      console.error('Teşekkür sayfası açılamadı:', error)
      alert('Maalesef teşekkür sayfası açılamadı. Lütfen daha sonra tekrar deneyin.')
    }
  }

  const handleTemaDegistir = () => {
    const yeniTema = tema === 'light' ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', yeniTema)
      setTema(yeniTema)
      document.documentElement.classList.toggle('dark', yeniTema === 'dark')
    } catch (error) {
      console.error('Tema kaydedilirken hata:', error)
    }
  }

  return (
    <div
      className={`fixed left-0 top-0 h-full w-80 bg-islamic-dark dark:bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${
        acik ? 'translate-x-0' : '-translate-x-full'
      } shadow-2xl flex flex-col`}
    >
      {/* Menu Header */}
      <div className="flex items-center justify-between p-4 border-b border-islamic-green dark:border-green-700">
        <h2 className="text-xl font-bold">{t('menu.title')}</h2>
        <button
          onClick={kapat}
          className="p-2 hover:bg-islamic-green dark:hover:bg-green-800 rounded-lg transition-colors"
          aria-label={t('menu.close')}
        >
          <X size={24} />
        </button>
      </div>

      {/* Sekmeler */}
      <div className="flex border-b border-islamic-green/20 dark:border-green-700/50">
        <button
          onClick={() => setAktifSekme('hakkimizda')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            aktifSekme === 'hakkimizda'
              ? 'bg-islamic-green/30 dark:bg-green-900/30 text-white border-b-2 border-islamic-green dark:border-green-400'
              : 'text-islamic-beige dark:text-gray-400 hover:bg-islamic-green/10 dark:hover:bg-green-900/20'
          }`}
        >
          {t('menu.about')}
        </button>
        <button
          onClick={() => setAktifSekme('tesekkur')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            aktifSekme === 'tesekkur'
              ? 'bg-islamic-green/30 dark:bg-green-900/30 text-white border-b-2 border-islamic-green dark:border-green-400'
              : 'text-islamic-beige dark:text-gray-400 hover:bg-islamic-green/10 dark:hover:bg-green-900/20'
          }`}
        >
          {t('menu.thank')}
        </button>
        <button
          onClick={() => setAktifSekme('ayarlar')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            aktifSekme === 'ayarlar'
              ? 'bg-islamic-green/30 dark:bg-green-900/30 text-white border-b-2 border-islamic-green dark:border-green-400'
              : 'text-islamic-beige dark:text-gray-400 hover:bg-islamic-green/10 dark:hover:bg-green-900/20'
          }`}
        >
          {t('menu.settings')}
        </button>
      </div>

      {/* İçerik */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Hakkımızda Sekmesi */}
        {aktifSekme === 'hakkimizda' && (
          <div className="space-y-4 py-2">
            <div className="text-center">
              <Info size={44} className="mx-auto mb-3 text-islamic-green dark:text-green-400 opacity-80" />
              <h3 className="text-xl font-bold mb-2">{t('menu.aboutTitle')}</h3>
              <p className="text-islamic-beige dark:text-gray-300 leading-relaxed text-sm">
                {t('menu.aboutText')}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <a
                href="https://www.instagram.com/dunyatarihindbugun/?hl=tr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <Instagram size={20} />
                <span>{t('menu.instagram')}</span>
              </a>

              <a
                href="https://www.youtube.com/@tarihtebugunde"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <Youtube size={20} />
                <span>{t('menu.youtube')}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-islamic-green/20 dark:border-green-700/50">
              <p className="text-center text-xs text-islamic-beige/80 dark:text-gray-400">
                {t('menu.copyright')}
              </p>
            </div>
          </div>
        )}

        {/* Teşekkür Et Sekmesi */}
        {aktifSekme === 'tesekkur' && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <Heart size={48} className="mx-auto mb-4 text-red-500 opacity-70" />
              <h3 className="text-xl font-bold mb-2">{t('menu.thankTitle')}</h3>
              <p className="text-islamic-beige dark:text-gray-300 mb-6 leading-relaxed">
                {t('menu.thankText')}
              </p>
              <div className="bg-islamic-dark/50 dark:bg-gray-800/50 rounded-lg p-6 border border-islamic-green/20 dark:border-green-700/50">
                <p className="text-sm text-islamic-beige dark:text-gray-400 mb-4">
                  {t('menu.thankSoon')}
                </p>
                <button
                  onClick={handleTesekkurEt}
                  className="px-6 py-3 bg-islamic-green hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white font-semibold rounded-lg shadow-lg transition-colors"
                >
                  {t('menu.thankButton')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ayarlar Sekmesi */}
        {aktifSekme === 'ayarlar' && (
          <div className="space-y-4 py-4">
            <div className="text-center mb-6">
              <Settings size={48} className="mx-auto mb-4 text-islamic-green dark:text-green-400 opacity-70" />
              <h3 className="text-xl font-bold mb-2">{t('menu.settingsTitle')}</h3>
            </div>
            
            <div className="bg-islamic-dark/50 dark:bg-gray-800/50 rounded-lg p-6 border border-islamic-green/20 dark:border-green-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {tema === 'light' ? (
                    <Sun size={24} className="text-yellow-400" />
                  ) : (
                    <Moon size={24} className="text-blue-400" />
                  )}
                  <div>
                    <div className="font-semibold">
                      {tema === 'light' ? t('menu.themeLight') : t('menu.themeDark')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleTemaDegistir}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    tema === 'dark' ? 'bg-islamic-green dark:bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      tema === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Dil Ayarı */}
              <div className="mt-6 pt-4 border-t border-islamic-green/20 dark:border-green-700/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold">{t('menu.languageTitle')}</div>
                    <div className="text-xs text-islamic-beige/80 dark:text-gray-400 mt-1">
                      {language === 'tr' ? t('menu.languageCurrentTr') : t('menu.languageCurrentEn')}
                    </div>
                  </div>
                </div>
                <div className="inline-flex rounded-full bg-gray-700/60 border border-islamic-green/40 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setLanguage('tr')}
                    className={`px-4 py-1 text-xs font-semibold transition-colors ${
                      language === 'tr'
                        ? 'bg-islamic-green text-white'
                        : 'text-islamic-beige hover:bg-gray-600'
                    }`}
                  >
                    {t('menu.languageTr')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-4 py-1 text-xs font-semibold transition-colors border-l border-islamic-green/40 ${
                      language === 'en'
                        ? 'bg-islamic-green text-white'
                        : 'text-islamic-beige hover:bg-gray-600'
                    }`}
                  >
                    {t('menu.languageEn')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideMenu
