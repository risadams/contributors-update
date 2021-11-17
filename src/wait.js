const wait = (ms) => new Promise((resolve) => {
  if (typeof ms !== 'number') {
    throw new Error('wait: ms must be a number');
  }
  setTimeout(() => resolve("done!"), ms);
});

module.exports = wait;
