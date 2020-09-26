if ("serviceWorker" in navigator) {
  try {
    navigator.serviceWorker.register(`${process.env.BASE_URL}service-worker.js`);
    console.log("Service worker registered.");
  } catch (error) {
    console.log("Service worker registration failed.", error);
  }
}

const urlsToCache = ["/"];

self.addEventListener("install", async event => {
  const cache = await caches.open("static-cache");
  cache.addAll(urlsToCache);
});

self.addEventListener("fetch", async fetchEvent => {
  const req = fetchEvent.request;
  fetchEvent.respondWith(networkFirst(req));
});

//Cache falling back to network
async function cacheFirst(req) {
  try {
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
  } catch(err){
    return caches.match(`${process.env.BASE_URL}offline.js`)
  }
}

//Network falling back to cache
async function networkFirst(req) {
  const cache = await caches.open("dynamic-cache");
  const { method } = req;

  try {
    const res = await fetch(req);

    if (method === "GET") {
      cache.put(req, res.clone());
    }

    return res;
  } catch (error) {
    const cacheResp = await cache.match(req);
    if(cacheResp) {
      return cacheResp;
    } else {
      return caches.match(`${process.env.BASE_URL}offline.js`)
    }
  }
}
