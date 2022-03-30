console.log("[SW] Hello from service worker");


const VERSION = "1";
const CACHE_NAME = `cache-${VERSION}`;
const PREFETCH_FILES = [
  // CSS
  "/lib/bootstrap-5.1.3/css/bootstrap.min.css",
  "/css/style.css",

  // PAGES
  "/",
  "/tags/",
  "/about/",
  "/favicon/favicon.png",
];


self.addEventListener("install", (e) => {
  console.log("[SW] install");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PREFETCH_FILES);
    })
  );
});


self.addEventListener("activate", (e) => {
  console.log("[SW] activate");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting out of date cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
      if (r) {
        console.log("[SW] hit cache " + e.request.url);
        return r;
      }

      console.log("[SW] request " + e.request.url);
      return fetch(e.request).then((response) => {
        if (e.request.method === "GET") {
          return caches.open(CACHE_NAME).then((cache) => {
            console.log("[SW] Caching new resource: " + e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        } else {
          return response;
        }
      });
    })
  );
});


self.addEventListener("push", function (event) {
  console.log("SW push event", event);
  const payload = event.data ? event.data.text() : "no payload";

  event.waitUntil(
    self.registration.showNotification("Notification", {
      body: payload,
    })
  );
});
