# 📱 Mobil Uygulama Kurulum ve APK Build Kılavuzu (GitHub Actions ile)

Bu kılavuz, "Tarihte Bugün" uygulamasını **Android Studio KURMADAN**, sadece **GitHub Actions** kullanarak APK dosyasını oluşturmanız için gerekli tüm adımları içermektedir.

## 🎯 Bu Yöntemin Avantajları

- ✅ Android Studio kurmanıza gerek yok
- ✅ Bilgisayarınızda Android SDK kurmanıza gerek yok
- ✅ GitHub üzerinden otomatik APK build
- ✅ APK'yı direkt GitHub'dan indirebilirsiniz
- ✅ Her kod değişikliğinde otomatik yeni APK oluşturulur

---

## 📋 Gereksinimler

### 1. Node.js ve npm (Sadece İlk Kurulum İçin)
- Node.js 18 veya üzeri kurulu olmalı
- npm paket yöneticisi

### 2. Git
- Git kurulu olmalı
- GitHub hesabı

**NOT:** Android Studio veya Android SDK'ya ihtiyacınız yok! Tüm build işlemi GitHub'da otomatik yapılacak.

---

## 🚀 Adım 1: İlk Kurulum (Sadece Bir Kez)

### 1.1. Bağımlılıkları Yükleme

Terminal/Command Prompt'u açın ve proje klasörüne gidin:

```bash
cd C:\Users\Melih\OneDrive\Masaüstü\tarih7
npm install
```

### 1.2. Android Platformunu Ekleme (Sadece İlk Kez)

Android platformunu ekleyin (bu klasör GitHub'a commit edilecek):

```bash
npx cap add android
npx cap sync
```

Bu komut `android` klasörü oluşturacaktır. Bu klasörü GitHub'a yükleyeceğiz.

---

## 💾 Adım 2: GitHub'a Yükleme

### 2.1. Git Repository'sini Başlatma (İlk Kez)

Eğer Git repository'si henüz başlatılmadıysa:

```bash
git init
git add .
git commit -m "İlk commit: Mobil uygulama GitHub Actions ile hazır"
```

### 2.2. GitHub'da Yeni Repository Oluşturma

1. GitHub.com'a gidin ve giriş yapın
2. Sağ üstteki "+" ikonuna tıklayın
3. "New repository" seçeneğini seçin
4. Repository adını girin (örn: `tarihte-bugun-mobil`)
5. "Public" veya "Private" seçin
6. **"Initialize this repository with a README" seçeneğini İŞARETLEMEYİN**
7. "Create repository" butonuna tıklayın

### 2.3. GitHub'a Push Etme

GitHub'da repository oluşturduktan sonra, size verilen komutları çalıştırın. Genellikle şöyledir:

```bash
git remote add origin https://github.com/KULLANICI_ADINIZ/tarihte-bugun-mobil.git
git branch -M main
git push -u origin main
```

**Not:** `KULLANICI_ADINIZ` kısmını kendi GitHub kullanıcı adınızla değiştirin.

---

## 🤖 Adım 3: GitHub Actions Otomatik Build

GitHub'a push ettiğinizde, GitHub Actions otomatik olarak çalışmaya başlayacaktır!

### 3.1. GitHub Actions İşlemini İzleme

1. GitHub repository'nize gidin
2. Üst menüden **"Actions"** sekmesine tıklayın
3. Build işleminin durumunu görebilirsiniz
4. Build işlemi genellikle 5-10 dakika sürer

### 3.2. Build Başarılı Olduğunda

Build işlemi başarılı olduğunda:

1. **"Actions"** sekmesinde yeşil tik işareti görünecek
2. Repository ana sayfasında sağ tarafta **"Releases"** bölümünde yeni bir release göreceksiniz
3. **"Releases"** sekmesine tıklayın
4. En son release'e tıklayın
5. **"Assets"** bölümünde `app-debug.apk` dosyasını göreceksiniz
6. **`app-debug.apk`** dosyasına tıklayarak indirin!

---

## 📱 Adım 4: APK'yı Telefona Yükleme

### 4.1. APK'yı Telefona Kopyalama

İndirdiğiniz `app-debug.apk` dosyasını telefonunuza kopyalayın:
- USB kablosu ile
- Email ile kendinize gönderin
- Google Drive/Dropbox gibi cloud servislerle
- WhatsApp ile kendinize gönderin

### 4.2. Telefonda Yükleme

1. Telefonunuzda **Ayarlar → Güvenlik** menüsüne gidin
2. **"Bilinmeyen Kaynaklardan Uygulama Yükleme"** veya **"Install unknown apps"** seçeneğini açın
3. Dosya yöneticisinde APK dosyasını bulun
4. APK dosyasına tıklayın
5. Yükleme iznini verin
6. **"Yükle"** veya **"Install"** butonuna tıklayın
7. Uygulama yüklendikten sonra açabilirsiniz!

---

## 🔄 Adım 5: Kod Güncellediğinizde

Kodunuzu güncellediğinizde:

1. **Değişiklikleri commit edin:**
   ```bash
   git add .
   git commit -m "Güncelleme açıklaması"
   ```

2. **GitHub'a push edin:**
   ```bash
   git push
   ```

3. **GitHub Actions otomatik çalışacak:**
   - GitHub Actions sekmesinden build işlemini izleyin
   - Build tamamlandığında yeni release otomatik oluşturulacak
   - Yeni APK'yı Releases bölümünden indirin

**ÖNEMLİ:** `npm run build` veya `npx cap sync` yapmanıza gerek yok! GitHub Actions bunları otomatik yapacak.

---

## 🎛️ Manuel Build (İsteğe Bağlı)

Eğer manuel olarak build başlatmak isterseniz:

1. GitHub repository'nize gidin
2. **"Actions"** sekmesine tıklayın
3. Sol menüden **"Build Android APK"** workflow'una tıklayın
4. Sağ üstte **"Run workflow"** butonuna tıklayın
5. Branch seçin (genellikle `main` veya `master`)
6. **"Run workflow"** butonuna tıklayın

---

## 🐛 Sorun Giderme

### GitHub Actions Build Başarısız Oldu

1. **"Actions"** sekmesine gidin
2. Başarısız build'e tıklayın
3. Hata mesajlarını okuyun
4. Genellikle şu sorunlar olabilir:
   - `android` klasörü eksikse: `npx cap add android && npx cap sync` yapıp GitHub'a push edin
   - Kod hataları varsa: Kodunuzu kontrol edin
   - Bağımlılık sorunları: `package.json` dosyasını kontrol edin

### APK Release'de Görünmüyor

- Build işleminin tamamen bitmesini bekleyin (yeşil tik)
- Repository ana sayfasında sağ tarafta **"Releases"** linkine tıklayın
- Veya doğrudan: `https://github.com/KULLANICI_ADINIZ/REPO_ADI/releases`

### APK Yüklenmiyor

- Telefonunuzda "Bilinmeyen kaynaklardan yükleme" iznini verdiğinizden emin olun
- APK dosyasının tamamen indirildiğinden emin olun
- APK dosyasının bozuk olmadığından emin olun (yeniden indirin)

---

## ✅ Kontrol Listesi

- [ ] Node.js ve npm kurulu (sadece ilk kurulum için)
- [ ] Git kurulu
- [ ] GitHub hesabı var
- [ ] `npm install` çalıştırıldı
- [ ] `npx cap add android` çalıştırıldı (sadece ilk kez)
- [ ] GitHub'da repository oluşturuldu
- [ ] Kod GitHub'a push edildi
- [ ] GitHub Actions build'i başarılı
- [ ] APK Release'den indirildi
- [ ] APK telefona yüklendi

---

## 🎉 Özet

**Basitçe:**
1. ✅ Kodu GitHub'a push edin
2. ✅ GitHub Actions otomatik APK build eder
3. ✅ Releases bölümünden APK'yı indirin
4. ✅ Telefona yükleyin

**Android Studio'ya ihtiyacınız yok!** 🚀

---

## 📞 Yardım

Sorun yaşarsanız:
1. GitHub Actions sekmesindeki hata mesajlarını kontrol edin
2. GitHub Issues bölümünde sorun açabilirsiniz
3. Capacitor dokümantasyonuna bakın: https://capacitorjs.com/docs

---

**İyi çalışmalar! 🎉**
