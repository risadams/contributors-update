# Contributors Update

This is a custom GitHub action that updates the contributors list. It is intended to be run on a regular basis, and to serve as test playground for learning how to write and maintain custom GitHub actions.

## Install

This action is written in JavaScript and can be configured by adding an action to your project's `actions.yml` file.
You will need to update the `repo` argument with the repository you wish to update.  **this will only work on public repositories**

If the `exclude_bots` flag is disabled, you may see a large number of bots in the output.  There still may be some bots in the output if they are internally classified as users in the github API call.

```yaml
name: Update Contributors
on:
  schedule:
    - cron: "0 0 1 * *"
  workflow_dispatch:
jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: risadams/contributors-update@v2
        with:
          repo: risadams/risadams.com
          exclude_bots: true
```

The file contents will be written to an output variable called `contrib`. Which can be piped to other actions as needed.

## Support

This action is provided as is and is not guaranteed to work. If you have any questions, please open an issue on GitHub.
This action is written as an experiment and learning exercise.

## Contribute

If you think this could be better, please [open an issue](https://github.com/risadams/contributors-update/issues/new)!

Please note that all interactions in this organization fall under our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 1996+ Ris Adams
