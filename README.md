# Pro Player v16

## V16 değişikliği
- Menü (drawer) açıkken **aşağı kaydır (swipe down)** ile menü kapanır.

## PWA (telefon uygulaması gibi kurulum)
Bu sürümde **manifest + service worker** eklendi, böylece uygulama "ana ekrana ekle" ile **standalone** çalışabilir.

### Önemli not
- Kurulum için sayfa **HTTPS** veya **localhost** üzerinden açılmalıdır. `file://` ile açarsan service worker çalışmaz.

### Kurulum adımı
1) Bu klasörü bir HTTPS sitede yayınla (GitHub Pages / Netlify / kendi sunucun).
2) Telefonda Chrome/Samsung Internet ile aç.
3) Menüden "Ana ekrana ekle" / "Uygulamayı yükle".

Ayarlar/Debug sekmesinde **"📲 Uygulamayı Kur"** butonu, tarayıcı `beforeinstallprompt` verdiğinde görünür.
