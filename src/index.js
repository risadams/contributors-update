const core = require('@actions/core');
const fetch = require('node-fetch');

async function run() {
  try {
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    const repo = core.getInput('repo');
    const exclude_bots = core.getInput('exclude_bots');

    const NEW_LINE = '\n';

    let $TEXT = '# Contributors' + NEW_LINE + NEW_LINE;
    $TEXT = $TEXT + 'Thank you to our top contributors!' + NEW_LINE + NEW_LINE;

    core.info(`Gathering info for repo: ${repo}`);
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

    core.info($TEXT);

    core.info((new Date()).toTimeString());
    core.setOutput('contribs', $TEXT);

  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
