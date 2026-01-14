# Tarihte Bugün - Mobil Uygulama

İslami temalı, modern ve responsive bir "Tarihte Bugün" React uygulaması. Web ve Android mobil uygulama olarak çalışabilir.

## Özellikler

- 📅 Son 30 günün tarihi olaylarını görüntüleme
- 🕌 İslami tema (kum beji - koyu yeşil renk paleti)
- 📱 Tam responsive mobil uyumlu tasarım
- 🗓️ Hicri ve Rumi takvim bilgileri
- 🎬 YouTube entegrasyonu
- 🎨 Smooth animasyonlar ve geçişler
- 📱 Android APK desteği (Capacitor)

## Kurulum

### Web Uygulaması Olarak

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

### Android Mobil Uygulaması Olarak (GitHub Actions ile - Önerilen)

**Android Studio kurmanıza gerek yok!** GitHub Actions otomatik olarak APK build eder.

Detaylı kurulum kılavuzu için: **[MOBIL_KURULUM_KILAVUZU.md](./MOBIL_KURULUM_KILAVUZU.md)** dosyasına bakın.

**Kısa özet:**
1. Kodu GitHub'a push edin
2. GitHub Actions otomatik APK build eder
3. Releases bölümünden APK'yı indirin
4. Telefona yükleyin

## Teknolojiler

- React 18
- Vite
- Tailwind CSS
- Lucide React (İkonlar)
- Capacitor (Mobil uygulama)

## Kullanım

1. Sol üstteki hamburger menüye tıklayarak son 30 günü görüntüleyin
2. İstediğiniz tarihe tıklayarak o günün tarihi olayını görüntüleyin
3. "YouTube'da İzle" butonuna tıklayarak ilgili videoları izleyin

## Mobil Uygulama Build

APK oluşturma ve GitHub'a yükleme adımları için lütfen **[MOBIL_KURULUM_KILAVUZU.md](./MOBIL_KURULUM_KILAVUZU.md)** dosyasını okuyun.

## Tasarım

Uygulama, İslami temaya uygun renk paleti kullanır:
- Koyu yeşil (#1a3a2a, #2d5f3f)
- Kum beji tonları (#8b7355, #d4c4a8, #f5f0e8)

## Lisans

MIT

