import {
  createAllCodeSnipped,
  createBodyCode,
  createHeadCode,
} from './createCodeSnippet';

test('creates head code snippet', () => {
  expect(createHeadCode()).toMatchSnapshot();
});

test('creates body code snippet', () => {
  const settings = {
    widget: 'table',
    widgetSettings: {
      title: { content: '@title' },
      subtitle: { content: '@subtitle' },
    },
    chartSettings: {},
    projectId: '@projectId',
    readKey: '@readKey',
    query: {},
  };

  expect(createBodyCode(settings as any)).toMatchSnapshot();
});

test('creates head code snippet', () => {
  const settings = {
    widget: 'table',
    widgetSettings: {
      title: { content: '@title' },
      subtitle: { content: '@subtitle' },
    },
    chartSettings: {},
    projectId: '@projectId',
    readKey: '@readKey',
    query: {},
  };

  expect(createAllCodeSnipped(settings as any)).toMatchSnapshot();
});
