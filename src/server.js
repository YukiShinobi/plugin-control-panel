import http from 'node:http';

const PORT = Number(process.env.PORT ?? 8899);

const config = {
  serverName: 'DYKRETH Lab',
  maintenanceMode: false,
  modules: {
    crossplay: { enabled: true, provider: 'Geyser + Floodgate' },
    permissions: { enabled: true, provider: 'LuckPerms' },
    economy: { enabled: true, provider: 'Jobs + QuickShop' },
    voice: { enabled: true, provider: 'Simple Voice Chat' }
  },
  ranks: ['owner', 'dev', 'admin', 'mod', 'helper', 'member']
};

export function validateConfig(input) {
  const errors = [];
  if (!input || typeof input !== 'object') return ['Config must be an object'];
  if (!String(input.serverName ?? '').trim()) errors.push('serverName is required');
  if (!Array.isArray(input.ranks) || input.ranks.length === 0) errors.push('At least one rank is required');
  if (Array.isArray(input.ranks) && new Set(input.ranks).size !== input.ranks.length) errors.push('Ranks must be unique');
  if (!input.modules || typeof input.modules !== 'object') errors.push('modules must be an object');
  return errors;
}

export function diffConfig(before, after) {
  const changes = [];
  const walk = (a, b, path = '') => {
    const keys = new Set([...Object.keys(a ?? {}), ...Object.keys(b ?? {})]);
    for (const key of keys) {
      const nextPath = path ? `${path}.${key}` : key;
      const av = a?.[key];
      const bv = b?.[key];
      if (av && bv && typeof av === 'object' && typeof bv === 'object' && !Array.isArray(av) && !Array.isArray(bv)) walk(av, bv, nextPath);
      else if (JSON.stringify(av) !== JSON.stringify(bv)) changes.push({ path: nextPath, before: av, after: bv });
    }
  };
  walk(before, after);
  return changes;
}

function page() {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Plugin Control Panel</title><style>body{font-family:Inter,system-ui;background:#090a0c;color:#f4f4f5;margin:0}.wrap{max-width:980px;margin:auto;padding:48px 20px}h1{font-size:3rem;margin:.2rem 0}p{color:#a1a1aa}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}.card{padding:18px;border:1px solid #27272a;border-radius:16px;background:#111317}.on{color:#4ade80}.off{color:#f87171}code{color:#d4d4d8}.tag{display:inline-block;background:#2b1217;color:#fca5a5;padding:6px 10px;border-radius:999px}</style></head><body><main class="wrap"><span class="tag">SERVER CONTROL PLANE</span><h1 id="name">Loading…</h1><p>Quick visibility into the plugin stack and rank model before touching production config.</p><div id="grid" class="grid"></div><h2>Rank order</h2><code id="ranks"></code></main><script>fetch('/api/config').then(r=>r.json()).then(c=>{name.textContent=c.serverName;ranks.textContent=c.ranks.join(' > ');grid.innerHTML=Object.entries(c.modules).map(([k,v])=>`<div class="card"><strong>${k}</strong><p class="${v.enabled?'on':'off'}">${v.enabled?'enabled':'disabled'}</p><small>${v.provider}</small></div>`).join('')})</script></body></html>`;
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/config') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify(config));
  }
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ ok: true, validationErrors: validateConfig(config) }));
  }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(page());
});

if (process.env.NODE_ENV !== 'test') server.listen(PORT, () => console.log(`Plugin Control Panel: http://localhost:${PORT}`));

export { config, server };
