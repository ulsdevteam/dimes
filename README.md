# DIMES

A React web application which provides the front-end user interface for the online discovery of archival collections, objects, and agents at the Rockefeller Archive Center.

DIMES is part of [Project Electron](https://github.com/RockefellerArchiveCenter/project_electron), an initiative to build sustainable, open and user-centered infrastructure for the archival management of digital records at the [Rockefeller Archive Center](http://rockarch.org/).

## Local Development

Install [git](https://git-scm.com/) and clone the repository

    $ git clone https://github.com/RockefellerArchiveCenter/dimes.git

Install dependencies and run the development server:

    $ yarn install
    $ yarn start

### Visual regression testing

The repository includes [BackstopJS](https://github.com/garris/BackstopJS) to test visual changes to the site by comparing a set of reference images for different screen sizes. Anytime the CSS styles are changed, use BackstopJS to test locally:

1. Run the development server: `yarn start`
2. Run [Docker](https://www.docker.com/).
3. In another terminal, run the BackstopJS tests: `yarn backstop-test`.
4. Review the results in the browser and look at the diff of any failed tests.
5. To update the reference image files with the results of the last test images use: `yarn backstop-approve`. Subsequent tests will be compared against these updated reference files.
6. Commit any updated reference images to the repository so that future tests will be compared against the most recent images.

To add or update reference images, edit the scenarios in `backstop.json` and run `yarn backstop-reference`.

### Translation Development

DIMES is currently translated into the following languages:
  * Chinese (Simplified)
  * French
  * German
  * Italian
  * Japanese
  * Korean
  * Portuguese (Brazilian)
  * Spanish
  * Turkish

The repository includes [linguijs](https://lingui.dev/) which is an [Open-source](https://github.com/lingui/js-lingui) Internationalization Framework.  This allows you to translate static UI elements into other languages.

Lingui requires a configuration file (located in the base directory and named `lingui.config.js`). See the [official documentation](https://lingui.dev/ref/conf) for full instructions on configuration.

DIMES uses a [macro implementation](https://lingui.dev/guides/message-extraction#macro-usages) for message extraction. This means that all text with a `<Trans></Trans>` block will be automatically extracted for localization files.

You must update the extractions any time new translation objects or languages are found:

1. If adding a new language translation, add a new directory named after the language's ISO 639-1 code to
  `/src/locales/`. Then add that ISO 639-1 code to the `locales` array in `lingui.config.js`.
2. Run `$ yarn lingui-extract` to extract translation strings from application code. This should be run every
  time the HTML structure of the application changes. Failure to run this will result in translated
  strings being presented as random numbers and letters in the built application. It will automatically generate
  a `messages.po` file in the language's `/src/locales/` directory.
3. Add translations to each `msgstr` line in the created messages file.
4. Run `$ yarn lingui-compile` to compile the locale files into Javascript files which are used by the application
  to present translated strings. This command should be run whenever changes are made to any of the
  locale files.
5. Commit updated code to the GitHub repository.

## License

This code is released under an [MIT License](LICENSE).
