# ProPlayer (Birleşik Kütüphane: Online + Klasör)

Bu paket, mevcut ProPlayer özelliklerini kırpmadan **Online kütüphane (library.json)** ve **Cihaz klasör tarama** özelliklerini ekler.

## Kurulum (GitHub Pages /ProPlayer/)
1. Bu klasördeki dosyaları `ProPlayer` reposunun köküne koyun:
   - `index.html`, `manifest.json`, `sw.js`, `library.json`
   - `icons/` klasörü
2. GitHub Pages yayınladıktan sonra tarayıcıda açın.

> Eğer farklı bir alt klasörde yayınlayacaksanız `manifest.json` içindeki `start_url` ve `scope` alanlarını buna göre değiştirin.

## Online kütüphane
- `library.json` içindeki `items` listesini güncelleyin.
- Uygulama açılışta ve 30 dakikada bir otomatik günceller.

## Klasör tarama
- Menü > Ayarlar > **Kütüphane Senkron** bölümünden **Klasör seç** ile klasör seçin.
- **Şimdi tara** ile yeniden tarayabilirsiniz.

## Notlar
- Klasör tarama, File System Access API isteyen tarayıcılarda (Chrome/Edge) çalışır.
- SW `library.json` için network-first kullanır.
