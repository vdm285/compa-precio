// A cómo moved from /compa-precio/ to /a-como/ on 2026-10-22. The old app registered /compa-precio/sw.js,
// so the browser's next update check fetches this file: it replaces the old worker, cleans up after it,
// and leaves. No fetch handler: every request under /compa-precio/ goes to the network (the forwarding page).
const OLD = '/compa-precio/';
const NEW = `${self.location.origin}/a-como/`;

// install: take over at once, without waiting for the old app's tabs to close
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // the old app's caches share their names with the new app's (acomo-boot, acomo-data): drop only the old address's entries
    for (const name of await caches.keys()) {
      if (!name.startsWith('acomo-')) continue;
      const c = await caches.open(name);
      let removed = 0;
      for (const req of await c.keys()) if (new URL(req.url).pathname.startsWith(OLD)) { await c.delete(req); removed++; }
      // a shell cache this emptied was the old address's alone (an empty one it did not empty may be
      // the new address's worker filling its own, so it stays)
      if (name.startsWith('acomo-shell-') && removed > 0 && (await c.keys()).length === 0) await caches.delete(name);
    }
    // control every open tab of the old address, so each can be sent on below
    await self.clients.claim();
    // leave: no worker answers for /compa-precio/ any more
    await self.registration.unregister();
    // reload each tab of the old address through the network, at the new address with its query and hash (its own URL with a hash would only scroll)
    for (const client of await self.clients.matchAll({ type: 'window' })) {
      const u = new URL(client.url);
      if (u.pathname.startsWith(OLD)) await client.navigate(NEW + u.search + u.hash).catch(() => {});
    }
  })());
});
