import { Youtube } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-islamic-dark dark:bg-gray-800 text-white mt-auto border-t border-islamic-green/20 dark:border-green-700/50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-5">
          {/* Üst Bölüm - İkon ve Metin */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Youtube 
              size={36} 
              className="text-red-600 hover:text-red-500 transition-all duration-200 hover:scale-110" 
            />
            <p className="text-islamic-beige dark:text-gray-300 text-center sm:text-left text-base md:text-lg font-medium">
              Daha Fazlası İçin YouTube Kanalımız
            </p>
          </div>
          
          {/* Buton */}
          <a
            href="https://www.youtube.com/@tarihtebugunde"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Youtube size={20} />
            <span>YouTube Kanalına Git</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

