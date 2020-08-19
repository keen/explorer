# Keen Explorer

<a href="https://keen.io/"><img src="https://img.shields.io/github/release/keen/explorer.svg?style=flat-square&maxAge=600" alt=""></a>
<a href="https://github.com/keen/explorer/graphs/contributors" alt="Contributors"><img src="https://img.shields.io/github/contributors/keen/explorer.svg" /></a>
<a href="https://github.com/keen/explorer/pulse" alt="Activity"><img src="https://img.shields.io/github/last-commit/keen/explorer.svg" /></a>
<a href="#" alt="License"><img src="https://img.shields.io/github/license/keen/explorer.svg" /></a>
<a href="http://slack.keen.io/"><img src="https://img.shields.io/badge/slack-keen-orange.svg?style=flat-square&maxAge=3600" alt="Slack"></a>
<a href="https://www.jsdelivr.com/package/npm/keen-explorer"><img src="https://data.jsdelivr.com/v1/package/npm/keen-explorer/badge" alt=""></a>
<a href="https://www.npmjs.com/package/keen-explorer"><img src="https://img.shields.io/npm/dm/keen-explorer.svg" alt=""></a>

## Install

```ssh
npm install keen-explorer --save
```

## Live Demo

http://keen.github.io/explorer/

## Example

```javascript
import KeenExplorer from 'keen-explorer';

const myExplorer = new KeenExplorer({
  container: '#keen-explorer-container', // querySelector

  keenAnalysis: {
    // configuration for KeenAnalysis
    // https://github.com/keen/keen-analysis.js
    config: {
      projectId: 'PROJECT_ID',
      masterKey: 'MASTER_KEY',
      readKey: 'READ_KEY',
    },
  },

  keenDataviz: {
    // OPTIONAL configuration for KeenDataviz
    // https://github.com/keen/keen-dataviz.js
  }

  // Customize explorer UI
  // Default configuration:
  components: {
    eventCollection: true,
    previewCollections: true,
    analysisType: true,
    timeframe: true,
    timezone: true,
    filters: true,
    groupBy: true,
    interval: true,
    apiQueryUrl: true,
    actorProperty: true,
    step: true,
    savedQueryBrowser: true,
    results: true,
    saveButton: true,
    downloadButton: true,
    embedButton: true,
  },
});
```

[Check out the demo here.](http://keen.github.io/explorer/) The Keen IO Explorer is an open source point-and-click interface for querying and visualizing your event data. It's maintained by the team at [Keen IO](https://keen.io/).

## Install from CDN

```html
<head>
  <link href="https://fonts.googleapis.com/css?family=Montserrat%7CMontserrat:600%7CHind" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/keen-explorer@6/dist/keen-explorer.min.css">
  <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-explorer@6/dist/keen-explorer.bundle.min.js"></script>
</head>

<body class="keen-explorer-template">
  <div id="keen-explorer-container"></div>
  <script>
  const myExplorer = new KeenExplorer({
  container: '#keen-explorer-container', // querySelector

  keenAnalysis: {
    // configuration for KeenAnalysis
    // https://github.com/keen/keen-analysis.js
    config: {
      projectId: 'PROJECT_ID',
      masterKey: 'MASTER_KEY',
      readKey: 'READ_KEY',
    },
  },

  keenDataviz: {
    // OPTIONAL configuration for KeenDataviz
    // https://github.com/keen/keen-dataviz.js
  }
  });
  </script>
</body>
```

#### Get your project ID & API keys

If you don't have an account [talk to our team](https://try.keen.io/contact) to get started today. If you do, [login to Keen IO to create a project](https://keen.io/add-project) for your app. The Project ID and API Keys are available on the Project Overview page. You will need these for the next steps.

## Custom builds of the Explorer

  1. Clone our repo `git clone https://github.com/keen/explorer.git`
  2. Configure the Keen.js client in the demo file at test/demo/demo-config.js with your project ID and Keen IO API keys.
  3. Install the dependencies with `npm install`.
  4. Run the development script with `npm run start`.
  5. You can now view the demo locally at `http://localhost:8080/` or your specified port.

### Building the project:

The project is built with [Webpack](https://github.com/webpack/webpack).

* Run `npm run build` from the root directory of the project to build ALL files, including the minified versions for production use.

#### Testing

**Run Unit Tests**
* Run `npm run test` to run all the tests. Currently there are only unit tests.

### FAQ

**Is this open source Keen Explorer different than the one on keen.io?**
Nope! We have recently moved all our development on the Keen Explorer to this open source version.  

**I have questions about using the project! Where/who do I ask?**
If you have any questions about using this project, Explorer feel free to contact us anytime at [team@keen.io](mailto:team@keen.io).

### Contributing:
To contribute to this project:

* Fork the repo.
* Submit a Pull Request **with** test coverage.
* Follow our PR template, which includes the following sections:

```markdown

## What does this PR do? How does it affect users?

## How should this be tested?

Step through the code line by line. Things to keep in mind as you review:
 - Are there any edge cases not covered by this code?
 - Does this code follow conventions (naming, formatting, modularization, etc) where applicable?

Fetch the branch and/or deploy to staging to test the following:

- [ ] Does the code compile without warnings (check shell, console)?
- [ ] Do all tests pass?
- [ ] Does the UI, pixel by pixel, look exactly as expected (check various screen sizes, including mobile)?
- [ ] If the feature makes requests from the browser, inspect them in the Web Inspector. Do they look as expected (parameters, headers, etc)?
- [ ] If the feature sends data to Keen, is the data visible in the project if you run an extraction (include link to collection/query)?
- [ ] If the feature saves data to a database, can you confirm the data is indeed created in the database?

## Related tickets?

```

Screenshots encouraged! Would an animated GIF be more informative than a screenshot? Then we recommend [Recordit](http://recordit.co/).

### Tech used in this project

These are the major technologies used in the project.

* [ReactJS](http://facebook.github.io/react/) for UI Components & input handling.
* [NPM](https://www.npmjs.org/) for dependency management.

## Deployments

The all commits pushed into master branch will be picked by CircleCI workflow that perform npm packages version and publish.
