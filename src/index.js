const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');
const wait = require('./wait');
const fs = require('fs');

async function run() {
  try {
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    const waitTime = core.getInput('ms');
    const repo = core.getInput('repo');
    const exclude_bots = core.getInput('exclude_bots');
    const output = core.getInput('output');

    //const ghToken = core.getInput('gh_token');
    //const octokit = github.getOctokit(ghToken);


    const NEW_LINE = '\n';

    let $TEXT = '# Contributors' + NEW_LINE + NEW_LINE;
    $TEXT = $TEXT + 'Thank you to our top contributors!' + NEW_LINE + NEW_LINE;

    core.info(`Waiting ${waitTime} milliseconds`);
    core.info(`Gathering info for repo: ${repo}`);
    core.info(`Writing contributors to: ${output}`);
    core.info(`Skipping bots?: ${exclude_bots}`);

    const contribJsonUrl = `https://api.github.com/repos/${repo}/contributors`;
    core.info(`Gathering contrib info from api: ${contribJsonUrl}`);

    var contribJson = await fetch(contribJsonUrl);
    var contributors = await contribJson.json();

    contributors.forEach((contributor) => {
      if (exclude_bots) {
        if (contributor.type === 'Bot') {
          core.debug(`Skipping bot: ${contributor.login}`);
          return;
        }
      }
      $TEXT += `[${contributor.login}](${contributor.url})` + NEW_LINE;
    });

    await wait(parseInt(waitTime));
    core.info($TEXT);

    core.info((new Date()).toTimeString());
    core.setOutput('time', (new Date()).toTimeString());

    fs.writeFile(output, $TEXT, (err) => {
      if (err) {
        core.setFailed(err.message);
      }
    });



  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
