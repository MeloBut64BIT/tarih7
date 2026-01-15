import { useState, useEffect } from 'react'
import { Menu, Search } from 'lucide-react'
import SideMenu from './components/SideMenu'
import DateSelectionScreen from './components/DateSelectionScreen'
import EventListScreen from './components/EventListScreen'
import EventDetailScreen from './components/EventDetailScreen'
import SearchModal from './components/SearchModal'
import Footer from './components/Footer'

function App() {
  const [menuAcik, setMenuAcik] = useState(false)
  const [aramaAcik, setAramaAcik] = useState(false)
  const [ekran, setEkran] = useState('date-selection') // 'date-selection', 'event-list', 'event-detail'
  const [seciliTarih, setSeciliTarih] = useState(new Date())
  const [seciliOlay, setSeciliOlay] = useState(null)
  const [tema, setTema] = useState('light')

  // Tema yükleme
  useEffect(() => {
    try {
      const kayitliTema = localStorage.getItem('theme')
      if (kayitliTema === 'dark' || kayitliTema === 'light') {
        setTema(kayitliTema)
        document.documentElement.classList.toggle('dark', kayitliTema === 'dark')
      }
    } catch (error) {
      console.error('Tema yüklenirken hata:', error)
    }
  }, [])

  // Tema değiştiğinde HTML'e class ekle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'dark')
  }, [tema])

  const tarihSecildi = (tarih) => {
    setSeciliTarih(tarih)
  }

  const handleTarihSecildiVeDevam = () => {
    setEkran('event-list')
  }

  const handleGeriTarihSecimine = () => {
    setEkran('date-selection')
    setSeciliOlay(null)
  }

  const handleGeriListeye = () => {
    setEkran('event-list')
    setSeciliOlay(null)
  }

  const olaySecildi = (olay) => {
    setSeciliOlay(olay)
    setEkran('event-detail')
    setMenuAcik(false)
  }

  const anaSayfayaDon = () => {
    setEkran('date-selection')
    setSeciliOlay(null)
    setMenuAcik(false)
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      tema === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-islamic-cream via-islamic-beige to-islamic-light'
    }`}>
      {/* Header */}
      <header className={`shadow-lg sticky top-0 z-40 transition-colors duration-300 ${
        tema === 'dark' ? 'bg-gray-800' : 'bg-islamic-dark'
      } text-white`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setMenuAcik(!menuAcik)}
            className="p-2 hover:bg-islamic-green dark:hover:bg-green-800 rounded-lg transition-colors"
            aria-label="Menü"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-3 flex-1 justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                anaSayfayaDon()
              }}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 md:h-16 w-12 md:w-16 rounded-full object-cover"
              />
              <h1 className="text-lg md:text-xl font-bold font-freshman">Tarihte Bugün</h1>
            </a>
          </div>
          
          <button
            onClick={() => setAramaAcik(true)}
            className="p-2 hover:bg-islamic-green dark:hover:bg-green-800 rounded-lg transition-colors"
            aria-label="Ara"
          >
            <Search size={24} />
          </button>
        </div>
      </header>

      {/* Side Menu */}
      <SideMenu 
        acik={menuAcik} 
        kapat={() => setMenuAcik(false)}
        tema={tema}
        setTema={setTema}
      />

      {/* Overlay */}
      {menuAcik && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={() => setMenuAcik(false)}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        acik={aramaAcik}
        kapat={() => setAramaAcik(false)}
        tema={tema}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-6 flex-1">
        {ekran === 'date-selection' && (
          <DateSelectionScreen
            seciliTarih={seciliTarih}
            onTarihSecildi={tarihSecildi}
            onIleriGec={handleTarihSecildiVeDevam}
          />
        )}
        
        {ekran === 'event-list' && (
          <EventListScreen
            seciliTarih={seciliTarih}
            onGeriDon={handleGeriTarihSecimine}
            onOlaySecildi={olaySecildi}
          />
        )}
        
        {ekran === 'event-detail' && seciliOlay && (
          <EventDetailScreen
            olay={seciliOlay}
            tarih={seciliTarih}
            onGeriDon={handleGeriListeye}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
