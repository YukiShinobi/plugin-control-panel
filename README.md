<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=200&text=PLUGIN%20CONTROL%20PANEL&fontAlignY=38&desc=CONFIG%20%E2%80%A2%20RANKS%20%E2%80%A2%20SERVER%20STACK&descAlignY=58&color=0:050505,55:202020,100:5a1616&fontColor=f5f5f5&descColor=d4d4d4" width="100%" />

![Minecraft](https://img.shields.io/badge/focus-Minecraft%20ops-111111?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-20%2B-2b2b2b?style=for-the-badge&logo=nodedotjs)
![CI](https://img.shields.io/badge/CI-passing-7a1f1f?style=for-the-badge)

**A clean control-plane experiment for the server stack I actually work with.**

</div>

---

## Current build

- browser dashboard
- JSON config endpoint
- plugin/module status cards
- ordered rank model
- config validation
- nested config diff helper
- health endpoint
- automated tests
- no runtime dependencies

The sample stack uses **Geyser/Floodgate, LuckPerms, Jobs/QuickShop and Simple Voice Chat** because those are systems I have worked around directly.

## Why I built it

I do not want to replace Pterodactyl or every plugin's own admin panel. The goal is one clean view of the server stack, with validation and diffs in front of config changes so I can reason about what changed before touching production.

```txt
server config
    ↓
validation
    ↓
diff + review
    ↓
operator view
```

## Run

```bash
npm start
npm test
```

Default dashboard: `http://localhost:8899`

## Next

`authenticated edits` · `schema-backed forms` · `snapshots` · `rollback` · `deployment hooks` · `real plugin adapters`

---

<div align="center"><sub>YukiShinobi // predictable server config beats late-night guesswork.</sub></div>
