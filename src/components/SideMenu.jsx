import { useState } from 'react'
import { X, User, Heart, Settings, LogIn, LogOut, Sun, Moon } from 'lucide-react'

function SideMenu({ acik, kapat, kullanici, setKullanici, tema, setTema }) {
  const [aktifSekme, setAktifSekme] = useState('bilgilerim') // bilgilerim, tesekkur, ayarlar
  const [girisFormuAcik, setGirisFormuAcik] = useState(false)
  const [kullaniciAdi, setKullaniciAdi] = useState('')

  const handleGirisYap = () => {
    if (kullaniciAdi.trim()) {
      const yeniKullanici = { username: kullaniciAdi.trim() }
      try {
        localStorage.setItem('userData', JSON.stringify(yeniKullanici))
        setKullanici(yeniKullanici)
        setKullaniciAdi('')
        setGirisFormuAcik(false)
      } catch (error) {
        console.error('Kullanıcı kaydedilirken hata:', error)
        alert('Kullanıcı kaydedilemedi. Lütfen tekrar deneyin.')
      }
    }
  }

  const handleCikisYap = () => {
    try {
      localStorage.removeItem('userData')
      setKullanici(null)
    } catch (error) {
      console.error('Kullanıcı çıkışı yapılırken hata:', error)
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
        <h2 className="text-xl font-bold">Menü</h2>
        <button
          onClick={kapat}
          className="p-2 hover:bg-islamic-green dark:hover:bg-green-800 rounded-lg transition-colors"
          aria-label="Menüyü Kapat"
        >
          <X size={24} />
        </button>
      </div>

      {/* Sekmeler */}
      <div className="flex border-b border-islamic-green/20 dark:border-green-700/50">
        <button
          onClick={() => setAktifSekme('bilgilerim')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            aktifSekme === 'bilgilerim'
              ? 'bg-islamic-green/30 dark:bg-green-900/30 text-white border-b-2 border-islamic-green dark:border-green-400'
              : 'text-islamic-beige dark:text-gray-400 hover:bg-islamic-green/10 dark:hover:bg-green-900/20'
          }`}
        >
          Bilgilerim
        </button>
        <button
          onClick={() => setAktifSekme('tesekkur')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            aktifSekme === 'tesekkur'
              ? 'bg-islamic-green/30 dark:bg-green-900/30 text-white border-b-2 border-islamic-green dark:border-green-400'
              : 'text-islamic-beige dark:text-gray-400 hover:bg-islamic-green/10 dark:hover:bg-green-900/20'
          }`}
        >
          Teşekkür Et
        </button>
        <button
          onClick={() => setAktifSekme('ayarlar')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            aktifSekme === 'ayarlar'
              ? 'bg-islamic-green/30 dark:bg-green-900/30 text-white border-b-2 border-islamic-green dark:border-green-400'
              : 'text-islamic-beige dark:text-gray-400 hover:bg-islamic-green/10 dark:hover:bg-green-900/20'
          }`}
        >
          Ayarlar
        </button>
      </div>

      {/* İçerik */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Bilgilerim Sekmesi */}
        {aktifSekme === 'bilgilerim' && (
          <div className="space-y-4">
            {!kullanici ? (
              <>
                {!girisFormuAcik ? (
                  <div className="text-center py-8">
                    <User size={48} className="mx-auto mb-4 text-islamic-beige dark:text-gray-400 opacity-70" />
                    <p className="text-islamic-beige dark:text-gray-300 mb-4">
                      Giriş yapmak için kullanıcı adınızı girin
                    </p>
                    <button
                      onClick={() => setGirisFormuAcik(true)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-islamic-green hover:bg-islamic-green/80 text-white font-semibold rounded-lg transition-colors mx-auto"
                    >
                      <LogIn size={20} />
                      <span>Giriş Yap</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Giriş Yap</h3>
                    <div>
                      <label className="block text-sm font-medium text-islamic-beige dark:text-gray-300 mb-2">
                        Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        value={kullaniciAdi}
                        onChange={(e) => setKullaniciAdi(e.target.value)}
                        placeholder="Kullanıcı adınızı girin"
                        className="w-full px-4 py-2 rounded-lg bg-islamic-dark/50 dark:bg-gray-800 border border-islamic-green/30 dark:border-green-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-islamic-green dark:focus:ring-green-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleGirisYap()
                          }
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleGirisYap}
                        className="flex-1 px-4 py-2 bg-islamic-green hover:bg-islamic-green/80 text-white font-semibold rounded-lg transition-colors"
                      >
                        Giriş Yap
                      </button>
                      <button
                        onClick={() => {
                          setGirisFormuAcik(false)
                          setKullaniciAdi('')
                        }}
                        className="px-4 py-2 bg-islamic-dark/50 dark:bg-gray-800 hover:bg-islamic-dark/70 dark:hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        İptal
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <User size={48} className="mx-auto mb-4 text-islamic-green dark:text-green-400" />
                  <p className="text-lg font-semibold mb-2">
                    Hoş geldin, {kullanici.username}!
                  </p>
                </div>
                <button
                  onClick={handleCikisYap}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-300 font-semibold rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span>Çıkış Yap</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Teşekkür Et Sekmesi */}
        {aktifSekme === 'tesekkur' && (
          <div className="space-y-4 py-4">
            <div className="text-center">
              <Heart size={48} className="mx-auto mb-4 text-red-500 opacity-70" />
              <h3 className="text-xl font-bold mb-2">Bizi Destekle</h3>
              <p className="text-islamic-beige dark:text-gray-300 mb-6 leading-relaxed">
                Çalışmalarımızı beğendiyseniz bize destek olabilirsiniz
              </p>
              <div className="bg-islamic-dark/50 dark:bg-gray-800/50 rounded-lg p-6 border border-islamic-green/20 dark:border-green-700/50">
                <p className="text-sm text-islamic-beige dark:text-gray-400 mb-4">
                  Destek özelliği yakında aktif olacak
                </p>
                <button
                  disabled
                  className="px-6 py-3 bg-islamic-green/30 dark:bg-green-900/30 text-islamic-beige dark:text-gray-400 font-semibold rounded-lg cursor-not-allowed opacity-50"
                >
                  Teşekkür Et
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
              <h3 className="text-xl font-bold mb-2">Tema Ayarları</h3>
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
                      {tema === 'light' ? '☀️ Aydınlık Tema' : '🌙 Koyu Tema'}
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
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideMenu
