const CACHE_NAME = 'planner-cache-v1';

const urlsToCache = [
  'index.html',
  'next-day.html',
  'before-work.html',
  'week.html',
  'style.css',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'screenshots/desktop-home.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      const results = await Promise.allSettled(
        urlsToCache.map(u => cache.add(u))
      );
      /* Log any bad ones so you know what still 404s */
      results.forEach((res, i) => {
        if (res.status === 'rejected') {
          console.warn('❌ Failed to cache:', urlsToCache[i]);
        }
      });
    })
  );
});
