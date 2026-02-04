self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("research-blog").then(cache => {
            return cache.addAll([
                "index.html",
                "style.css",
                "script.js",
                "posts/ai-adaptive-learning.html",
                "posts/Post2.html"
            ]);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== "research-blog")
                    .map(key => caches.delete(key))
            )
        )
    );
});
