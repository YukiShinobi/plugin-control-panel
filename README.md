# Plugin Control Panel

A small server control plane built around the kind of Minecraft infrastructure I actually work with: cross-play, permissions, economy, voice, ranks and configuration changes.

The point is not to replace Pterodactyl or plugin-native admin panels. It is to keep one clean view of the server stack and put validation/diff logic in front of config edits so changes are easier to reason about.

## Current build

- browser dashboard
- JSON config endpoint
- plugin/module status cards
- ordered rank model
- config validation
- nested config diff helper
- health endpoint
- no runtime dependencies

```bash
npm start
```

Default dashboard: `http://localhost:8899`

The sample stack uses Geyser/Floodgate, LuckPerms, Jobs/QuickShop and Simple Voice Chat because those are systems I have worked around directly.

## Next direction

The useful next layer would be authenticated edits, schema-backed plugin forms, config snapshots/rollback, deployment hooks and server-side adapters that can read actual plugin config rather than the in-memory demo object.
