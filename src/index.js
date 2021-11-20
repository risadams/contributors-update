const core = require('@actions/core');
const fetch = require('node-fetch');
const fs = require('fs');

async function run() {
  try {
    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    const repo = core.getInput('repo');
    const output = core.getInput('output');
    const exclude_bots = core.getInput('exclude_bots');

    const NEW_LINE = '\n';

    let $TEXT = '# Contributors' + NEW_LINE + NEW_LINE;
    $TEXT = $TEXT + 'Thank you to our top contributors!' + NEW_LINE + NEW_LINE;

    core.info(`Gathering info for repo: ${repo}`);
    core.info(`Skipping bots?: ${exclude_bots}`);
    core.info(`Writing contributors to: ${output}`);

    const contribJsonUrl = `https://api.github.com/repos/${repo}/contributors`;
    core.info(`Gathering contrib info from api: ${contribJsonUrl}`);

    var contribJson = await fetch(contribJsonUrl);
    var contributors = await contribJson.json();

    if (contributors.message && contributors.message === 'Not Found') {
      core.setFailed(err.message);
    }

    contributors.forEach((contributor) => {
      if (exclude_bots) {
        if (contributor.type === 'Bot') {
          core.debug(`Skipping bot: ${contributor.login}`);
          return;
        }
      }
      $TEXT += ` - @[${contributor.login}](${contributor.html_url})`;
      $TEXT += NEW_LINE;
    });

    core.info($TEXT);
    fs.writeFile(output, $TEXT, (err) => {
      if (err) {
        core.setFailed(err.message);
      }
    });

    core.info((new Date()).toTimeString());
    core.setOutput('contribs', $TEXT);

  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
