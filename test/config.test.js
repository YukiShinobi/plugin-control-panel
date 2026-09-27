import test from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
const { config, diffConfig, validateConfig } = await import('../src/server.js');

test('sample server config is valid', () => {
  assert.deepEqual(validateConfig(config), []);
});

test('detects duplicate ranks', () => {
  const bad = structuredClone(config);
  bad.ranks = ['admin', 'admin'];
  assert.ok(validateConfig(bad).includes('Ranks must be unique'));
});

test('returns nested config changes', () => {
  const next = structuredClone(config);
  next.modules.voice.enabled = false;
  const changes = diffConfig(config, next);
  assert.equal(changes[0].path, 'modules.voice.enabled');
});
