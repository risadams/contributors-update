const wait = require('../src/wait');
const process = require('process');
const cp = require('child_process');
const path = require('path');

describe('environmental variables', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  // shows how the runner will run a javascript action with env / stdout protocol
  test('run with input', () => {
    // Set the variables
    process.env.NODE_ENV = 'dev';
    process.env.INPUT_MS = 50;
    process.env.INPUT_REPO = 'risadams/risadams.com';
    process.env.INPUT_OUTPUT = 'CONTRIBUTORS.md';
    process.env.INPUT_EXCLUDE_BOTS = true;
    process.env.INPUT_GH_TOKEN = '';

    const ip = path.join('src', 'index.js');
    const result = cp.execSync(`node ${ip}`, { env: process.env }).toString();
    console.log(result);
  });
});

test('throws invalid number', async () => {
  await expect(wait('foo')).rejects.toThrow('wait: ms must be a number');
});

test('wait 500 ms', async () => {
  const start = new Date();
  await wait(500);
  const end = new Date();
  var delta = Math.abs(end - start);
  expect(delta).toBeGreaterThanOrEqual(500);
});
