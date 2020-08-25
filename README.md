# Data Explorer

[![written in typescript](https://img.shields.io/badge/written%20in-typescript-blue.svg)](https://www.typescriptlang.org) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-yellow.svg)](https://github.com/prettier/prettier) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://facebook.github.io/jest/) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![yarn](https://img.shields.io/badge/maintained%20with-yarn-cc00ff.svg)](https://yarnpkg.com/en/)

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
