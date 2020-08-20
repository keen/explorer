# Keen Explorer

[![written in typescript](https://img.shields.io/badge/written%20in-typescript-blue.svg)](https://www.typescriptlang.org) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-yellow.svg)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://facebook.github.io/jest/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![yarn](https://img.shields.io/badge/maintained%20with-yarn-cc00ff.svg)](https://yarnpkg.com/en/)

### overview

<a href="https://keen.io/"><img src="https://img.shields.io/github/release/keen/explorer.svg?style=flat-square&maxAge=600" alt=""></a>
<a href="https://github.com/keen/explorer/graphs/contributors" alt="Contributors"><img src="https://img.shields.io/github/contributors/keen/explorer.svg" /></a>
<a href="https://github.com/keen/explorer/pulse" alt="Activity"><img src="https://img.shields.io/github/last-commit/keen/explorer.svg" /></a>
<a href="#" alt="License"><img src="https://img.shields.io/github/license/keen/explorer.svg" /></a>
<a href="http://slack.keen.io/"><img src="https://img.shields.io/badge/slack-keen-orange.svg?style=flat-square&maxAge=3600" alt="Slack"></a>
<a href="https://www.jsdelivr.com/package/npm/keen-explorer"><img src="https://data.jsdelivr.com/v1/package/npm/keen-explorer/badge" alt=""></a>
<a href="https://www.npmjs.com/package/keen-explorer"><img src="https://img.shields.io/npm/dm/keen-explorer.svg" alt=""></a>

### install

```ssh
npm install keen-explorer --save
```

### npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command    | Description                                          |
| ---------- | ---------------------------------------------------- |
| `lint`     | run linter against current application codebase.     |
| `test`     | run unit tests.                                      |
| `build`    | builds application distribution.                     |
| `prettier` | run code formatter process against current codebase. |

### commit

This project uses [Conventional Commits](https://www.conventionalcommits.org) to enforce common commit standards.

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `npx git-cz` | run commit command line interface. |

## Live Demo

<http://keen.github.io/explorer/>

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
