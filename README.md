# Data Explorer

[![written in typescript](https://img.shields.io/badge/written%20in-typescript-blue.svg)](https://www.typescriptlang.org) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-yellow.svg)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://facebook.github.io/jest/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![yarn](https://img.shields.io/badge/maintained%20with-yarn-cc00ff.svg)](https://yarnpkg.com/en/) [![codecov](https://codecov.io/gh/keen/explorer/branch/master/graph/badge.svg?token=FOUVoqkgGc)](https://codecov.io/gh/keen/explorer)

The Data Explorer is an open source point-and-click interface for querying and visualizing your event data. It's maintained by the team at [Keen IO](https://keen.io/).

<img width="100%" src="https://user-images.githubusercontent.com/7753369/91156939-fc5aa980-e6c4-11ea-913b-d2984d5a843e.png">

### Install

```ssh
npm install keen-explorer --save
```

or

```ssh
yarn add keen-explorer
```

### Visualizations Theme

The Data Explorer `@keen.io/dataviz` theme could be overridden during initialization of application instance.

```typescript
const explorer = new KeenExplorer({
  container: '#root',
  modalContainer: '#modal-root',
  dataviz: {
    theme: {
      colors: ['red', 'blue', 'yellow']
    }
  }
 });
```

### Settings

The Data Explorer components configuration could be specified during creation of application instance.

##### Set default timezone for queries

Specify default `timezone` used for new created queries. Provided argument must be compatible with **IANA** [Time Zone Database](https://www.iana.org/time-zones) standard.

```typescript
const explorer = new KeenExplorer({
  defaultTimezoneForQuery: 'Africa/Nairobi',
});
```

##### Disable timezone selection

Disables possibility to change `timezone` from user interface.

```typescript
const explorer = new KeenExplorer({
  disableTimezoneSelection: true,
});
```

##### Disable filter suggestions

Disable query creator filter suggestions

```typescript
const explorer = new KeenExplorer({
  disableQueryFilterSuggestions: true,
});
```

### Translations

The default translations files for application are hosted on `jsdelivr` CDN. You can easily replace the translations by overriding the `loadPath` for files.

```typescript
const explorer = new KeenExplorer({
  container: '#root',
  modalContainer: '#modal-root',
  translations: {
    backend: {
      loadPath: 'https://cdn.jsdelivr.net/npm/@keen.io/explorer@$VERSION/dist/locales/{{lng}}/{{ns}}.json'
    }
  }
});
```

### Confirm extraction limit

The `default` threshold for rendering confirmation modal is `100` properties in event collection schema used for extraction.
You can easily change it by providing additional argument to constructor.

```typescript
const explorer = new KeenExplorer({
  confirmExtractionLimit: 50
});
```

### PubSub interface

The Data Explorer could be controlled dynamically by using global `@keen.io/pubsub` instance. By default after component is mounted in browser environment the `pubsub` instance should be accessible in `global` object.

#### Pubsub Events

| Event                   | Meta                 | Description                                               |
| ----------------------- | -------------------- | --------------------------------------------------------- |
| `@explorer/new-query`   | n/a                  | Changes view to `editor` mode with default query settings |
| `@explorer/change-view` | { view: `ViewMode` } | Changes Explorer view mode                                |

#### Examples

##### Creating new query

```typescript
window.KeenPubSub.publish('@explorer/new-query');
```

##### Change  view

```typescript
type ViewMode = 'browser' | 'editor';

window.KeenPubSub.publish('@explorer/change-view', { view: 'browser' });
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

### deployments

The all commits pushed into `master` branch will be picked by CircleCI workflow that perform npm packages version and publish.

##### test environments

The all commits pushed into `develop` branch will be picked by CircleCI workflow that allows to deploy artifiact on specific test environment.
