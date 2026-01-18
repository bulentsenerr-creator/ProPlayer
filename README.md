# Pro Player v16.1 — GitHub Pages için "Yükle" düzeltmesi

Hedef URL: https://bulentsenerr-creator.github.io/ProPlayer/

## Neler değişti?
- Manifest **manifest.json** oldu (GitHub Pages'te JSON doğru content-type ile sunulur).
- Manifest `start_url` ve `scope` **/ProPlayer/** altına sabitlendi.
- SW `scope:'./'` ile register edilir.
- Menü açıkken **aşağı kaydırınca kapanma** jesti var.

## Yayınlama
Repo köküne şu dosyaları koy:
- index.html
- manifest.json
- sw.js
- icons/ (4 ikon)

GitHub Pages yayınladıktan sonra:
1) Telefonda Chrome ile siteyi aç
2) 30-60 sn bekle ve 1-2 etkileşim yap
3) Menüde **Uygulamayı yükle** görünmeli.

Not: Service Worker'lar yalnızca HTTPS/localhost'ta çalışır.
