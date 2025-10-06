JAMIASTO — PWA package (TWA-ready)
=================================

W tym katalogu znajdziesz prostą wersję PWA przygotowaną do opublikowania
jako Trusted Web Activity (TWA) w Google Play. Pliki:

  - index.html            (twoja strona — zmieniono ścieżki na relatywne)
  - manifest.json         (manifest PWA)
  - service-worker.js     (prosty service worker — caching core assets)
  - icons/                (placeholder icons 192x192 i 512x512)

Kroki aby opublikować bez użycia Cordova (używamy TWA + Bubblewrap):

1) Hostowanie (musisz udostępnić pliki na HTTPS)
   - Najprostsze: GitHub Pages, Netlify, Vercel, Firebase Hosting.
   - Przykład (Firebase Hosting):
     a) zainstaluj Firebase CLI: `npm install -g firebase-tools`
     b) `firebase login`
     c) `firebase init hosting` (wybierz public = 'public' lub folder, wskaż /)
     d) skopiuj pliki z tego katalogu do folderu publikacji i `firebase deploy --only hosting`
   - Ważne: Twoja strona musi być dostępna po HTTPS i manifest.json musi być pod adresem: https://twojadomena.pl/manifest.json

2) Sprawdź PWA
   - Otwórz stronę w Chrome, otwórz DevTools -> Application -> Manifest.
   - Sprawdź, czy service worker jest zarejestrowany (Application -> Service Workers).
   - Upewnij się że strona działa jako PWA (instalowalna).

3) Użyj Bubblewrap (TWA) aby stworzyć AAB (bez Cordova)
   - Zainstaluj Bubblewrap: `npm install -g @bubblewrap/cli`
   - Zainicjuj projekt: 
       `bubblewrap init --manifest=https://twojadomena.pl/manifest.json`
     (Bubblewrap pobierze manifest i przeprowadzi kreator.)
   - Zbuduj paczkę:
       `bubblewrap build`
     Wynik: `app-release-bundle.aab` — gotowy do uploadu do Google Play.

4) Publikacja w Google Play
   - Zaloguj się do Google Play Console, utwórz aplikację, wgraj `.aab`.
   - Uzupełnij opis, grafiki (ikony, screenshoty), politykę prywatności.
   - Przejdź proces weryfikacji i opublikuj.

Uwagi i wskazówki:
 - Twoja strona używa zewnętrznych API (Overpass, Nominatim, MapTiler). Upewnij się, że wywołania z aplikacji hostowanej w TWA są dozwolone (CORS, limity).
 - Jeżeli chcesz, mogę przygotować wersję manifest.json z Twoimi nazwami i ikonami oraz bardziej zaawansowany service worker (Workbox) — daj znać.
 - Jeśli nie masz serwera/hostingu, mogę pomóc w skonfigurowaniu GitHub Pages lub Firebase Hosting (przygotuję instrukcje i pliki).

Plik ZIP zawiera tę paczkę gotową do deploy.
