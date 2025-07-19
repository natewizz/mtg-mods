// MTG Mods Service Worker - Smart PWA Caching
const CACHE_NAME = 'mtg-mods-v1.2.0'; // Update this version to force cache refresh
const STATIC_CACHE = 'mtg-mods-static-v1.2.0';
const DYNAMIC_CACHE = 'mtg-mods-dynamic-v1.2.0';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/recipes',
  '/learn',
  '/contact',
  '/manifest.json',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png'
];

// Network-first strategies for dynamic content
const NETWORK_FIRST_URLS = [
  '/api/',
  '/auth/',
  '/profile/',
  '/recipes/'
];

// Cache-first strategies for static assets
const CACHE_FIRST_URLS = [
  '.js',
  '.css',
  '.woff2',
  '.woff',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.ico'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker version:', CACHE_NAME);
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        // Force activation of new service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker version:', CACHE_NAME);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old versions of our caches
            if (cacheName.startsWith('mtg-mods-') && 
                cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Claim all clients to ensure new SW takes control immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests (except for known CDNs)
  if (url.origin !== location.origin && !url.hostname.includes('googleapis.com')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  try {
    // Strategy 1: Network-first for dynamic content (API, auth, profiles)
    if (NETWORK_FIRST_URLS.some(pattern => pathname.startsWith(pattern))) {
      return await networkFirst(request);
    }
    
    // Strategy 2: Cache-first for static assets
    if (CACHE_FIRST_URLS.some(ext => pathname.endsWith(ext))) {
      return await cacheFirst(request);
    }
    
    // Strategy 3: Stale-while-revalidate for pages
    return await staleWhileRevalidate(request);
    
  } catch (error) {
    console.error('[SW] Fetch error:', error);
    
    // Fallback for page requests
    if (request.headers.get('accept')?.includes('text/html')) {
      const cachedResponse = await caches.match('/');
      if (cachedResponse) {
        return cachedResponse;
      }
    }
    
    // Return error response
    return new Response('Network error', { 
      status: 408, 
      statusText: 'Network timeout' 
    });
  }
}

// Network-first strategy with cache fallback
async function networkFirst(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Only cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache (network failed):', request.url);
      return cachedResponse;
    }
    throw error;
  }
}

// Cache-first strategy with network fallback
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Not in cache, fetch from network
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Start network request regardless of cache status
  const networkPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch((error) => {
    console.log('[SW] Network request failed for:', request.url);
    return null;
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    // Update cache in background
    networkPromise;
    return cachedResponse;
  }
  
  // No cached version, wait for network
  return networkPromise || new Response('Offline', { status: 503 });
}

// Message handler for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_UPDATE') {
    // Force update by clearing caches
    caches.keys().then((cacheNames) => {
      cacheNames.forEach(cacheName => {
        if (cacheName.startsWith('mtg-mods-')) {
          caches.delete(cacheName);
        }
      });
    });
  }
});

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'recipe-sync') {
    event.waitUntil(syncRecipes());
  }
});

async function syncRecipes() {
  // Future: Handle offline recipe submissions
  console.log('[SW] Syncing recipes in background');
} 