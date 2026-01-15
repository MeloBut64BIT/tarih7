import { createContext, useContext, useEffect, useState } from 'react'
import { Preferences } from '@capacitor/preferences'

const LANGUAGE_KEY = 'app_language'

const translations = {
  tr: {
    app: {
      title: 'Tarihte Bugün',
    },
    header: {
      appName: 'Tarihte Bugün',
      menu: 'Menü',
      search: 'Ara',
    },
    menu: {
      title: 'Menü',
      close: 'Menüyü Kapat',
      about: 'Hakkımızda',
      thank: 'Teşekkür Et',
      settings: 'Ayarlar',
      aboutTitle: 'Hakkımızda',
      aboutText: 'Sosyal medya hesaplarımızdan bizi takip edebilirsiniz.',
      instagram: 'Instagram',
      youtube: 'YouTube',
      copyright: "Tüm hakları Leblebi Soft'a aittir",
      thankTitle: 'Bizi Destekle',
      thankText: 'Çalışmalarımızı beğendiyseniz bize destek olabilirsiniz',
      thankSoon: 'Destek özelliği yakında aktif olacak',
      thankButton: 'Teşekkür Et',
      settingsTitle: 'Tema Ayarları',
      themeLight: '☀️ Aydınlık Tema',
      themeDark: '🌙 Koyu Tema',
      languageTitle: 'Dil / Language',
      languageCurrentTr: 'Mevcut Dil: Türkçe',
      languageCurrentEn: 'Current Language: English',
    },
    footer: {
      copyright: "Tüm hakları Leblebi Soft'a aittir",
    },
    date: {
      selectTitle: 'Bir Tarih Seçin',
      dayLabel: 'Gün',
      monthLabel: 'Ay',
      selectedDateLabel: 'Seçilen Tarih',
      previous: 'Önceki Tarih',
      next: 'Sonraki Tarih',
      continue: 'Devam Et',
    },
    events: {
      back: 'Geri',
      filter: 'Filtrele',
      filterLabel: 'Filtre',
      loading: 'Olaylar yükleniyor...',
      error: 'Olaylar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.',
      noneForFilter: 'Bu kategoride olay bulunamadı.',
      noneForDate: 'Bu tarihte kayıtlı olay bulunamadı.',
      count: '{count} olay bulundu',
      filterPrefix: 'Filtre: {name}',
      clearFilterAria: 'Filtreyi Temizle',
      birth: 'Doğum',
      death: 'Vefat',
      event: 'Olay',
    },
    eventDetail: {
      back: 'Geri',
      hijri: 'Hicri Takvim',
      rumi: 'Rumi Takvim',
      birth: 'Doğum',
      death: 'Vefat',
      event: 'Olay',
      loading: 'Detaylar yükleniyor...',
      wikipediaMore: "Wikipedia'da daha fazla bilgi →",
      youtubeButton: "YouTube'da İzle",
    },
    search: {
      placeholder: 'Olay, kişi veya tarih ara...',
      closeAria: 'Kapat',
      back: '← Geri',
      loading: 'Yükleniyor...',
      searching: 'Aranıyor...',
      error: 'Arama yapılırken bir hata oluştu. Lütfen tekrar deneyin.',
      retry: 'Tekrar Dene',
      minChars: 'Arama yapmak için en az 3 karakter girin',
      noResults: 'Sonuç bulunamadı',
      youtubeButton: "YouTube'da İzle",
      wikipediaButton: "Wikipedia'da Oku",
    },
  },
  en: {
    app: {
      title: 'Today in History',
    },
    header: {
      appName: 'Today in History',
      menu: 'Menu',
      search: 'Search',
    },
    menu: {
      title: 'Menu',
      close: 'Close Menu',
      about: 'About',
      thank: 'Support',
      settings: 'Settings',
      aboutTitle: 'About',
      aboutText: 'You can follow us on our social media accounts.',
      instagram: 'Instagram',
      youtube: 'YouTube',
      copyright: 'All rights reserved by Leblebi Soft',
      thankTitle: 'Support Us',
      thankText: 'If you like our work, you can support us',
      thankSoon: 'Support feature will be available soon',
      thankButton: 'Support',
      settingsTitle: 'Theme Settings',
      themeLight: '☀️ Light Theme',
      themeDark: '🌙 Dark Theme',
      languageTitle: 'Dil / Language',
      languageCurrentTr: 'Mevcut Dil: Türkçe',
      languageCurrentEn: 'Current Language: English',
    },
    footer: {
      copyright: 'All rights reserved by Leblebi Soft',
    },
    date: {
      selectTitle: 'Select a Date',
      dayLabel: 'Day',
      monthLabel: 'Month',
      selectedDateLabel: 'Selected Date',
      previous: 'Previous Date',
      next: 'Next Date',
      continue: 'Continue',
    },
    events: {
      back: 'Back',
      filter: 'Filter',
      filterLabel: 'Filter',
      loading: 'Loading events...',
      error: 'An error occurred while loading events. Please try again.',
      noneForFilter: 'No events found in this category.',
      noneForDate: 'No recorded events for this date.',
      count: '{count} events found',
      filterPrefix: 'Filter: {name}',
      clearFilterAria: 'Clear filter',
      birth: 'Birth',
      death: 'Death',
      event: 'Event',
    },
    eventDetail: {
      back: 'Back',
      hijri: 'Hijri Calendar',
      rumi: 'Rumi Calendar',
      birth: 'Birth',
      death: 'Death',
      event: 'Event',
      loading: 'Loading details...',
      wikipediaMore: 'More on Wikipedia →',
      youtubeButton: 'Watch on YouTube',
    },
    search: {
      placeholder: 'Search event, person or date...',
      closeAria: 'Close',
      back: '← Back',
      loading: 'Loading...',
      searching: 'Searching...',
      error: 'An error occurred while searching. Please try again.',
      retry: 'Try Again',
      minChars: 'Enter at least 3 characters to search',
      noResults: 'No results found',
      youtubeButton: 'Watch on YouTube',
      wikipediaButton: 'Read on Wikipedia',
    },
  },
}

function interpolate(template, vars = {}) {
  return Object.keys(vars).reduce((str, key) => {
    const value = vars[key]
    return str.replace(new RegExp(`{${key}}`, 'g'), String(value))
  }, template)
}

function getNested(obj, path) {
  return path.split('.').reduce((acc, part) => (acc && acc[part] != null ? acc[part] : null), obj)
}

const LanguageContext = createContext({
  language: 'tr',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key, vars) => interpolate(key, vars),
})

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState('tr')

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const stored = await Preferences.get({ key: LANGUAGE_KEY })
        if (stored && stored.value) {
          setLanguageState(stored.value === 'en' ? 'en' : 'tr')
          return
        }

        // İlk açılışta sistem diline göre ayarla
        const browserLang = navigator.language || navigator.userLanguage || 'tr'
        if (browserLang.toLowerCase().startsWith('tr')) {
          setLanguageState('tr')
        } else {
          setLanguageState('en')
        }
      } catch {
        setLanguageState('tr')
      }
    }

    loadLanguage()
  }, [])

  const saveLanguage = async (lang) => {
    try {
      await Preferences.set({ key: LANGUAGE_KEY, value: lang })
    } catch {
      // fallback olarak bir şey yapmıyoruz
    }
  }

  const setLanguage = (lang) => {
    const normalized = lang === 'en' ? 'en' : 'tr'
    setLanguageState(normalized)
    saveLanguage(normalized)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr')
  }

  const t = (key, vars) => {
    const value = getNested(translations[language] || translations.tr, key)
    if (typeof value === 'string') {
      return interpolate(value, vars)
    }
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)


