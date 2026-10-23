// Tärningsriket – service worker.
// Egna filer: nätet först (så uppdateringar syns direkt), cachen som reserv när man är offline.
// GitHub-API:t (hjältarnas sparfil) cachas aldrig.
const CACHE = "tarningsriket-v3";
const SHELL = ["./", "./index.html", "./aventyr.js", "./manifest.json", "./icons/icon-180.png", "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function put(req, res) {
  if (res && (res.ok || res.type === "opaque")) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "api.github.com") return;

  if (url.origin === location.origin) {
    e.respondWith(
      // cache: "no-cache" = fråga alltid GitHub om filen har ändrats, så att nya texter syns direkt
      fetch(req, { cache: "no-cache" }).then(res => put(req, res))
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => put(req, res))));
  }
});
