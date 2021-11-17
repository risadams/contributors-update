const core = require('@actions/core');
const wait = require('./wait');

async function run() {
  try {
    const waitTime = core.getInput('ms');

    core.info(`Waiting ${waitTime} milliseconds`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(waitTime));
    core.info((new Date()).toTimeString());

    core.setOutput('time', (new Date()).toTimeString());

  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
