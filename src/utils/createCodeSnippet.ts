import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';
import { Theme } from '@keen.io/charts';

type Snippet = 'body' | 'head';

type SnippetProps = {
  widget: PickerWidgets;
  query: Record<string, any>;
  chartSettings?: ChartSettings & { theme?: Theme };
  widgetSettings?: WidgetSettings;
  projectId: string;
  readKey: string;
  type?: Snippet;
};

export const createHeadCode = () => `
  <link rel="stylesheet" type="text/css" href="https://static.keen.io/assets/keen-fonts.css" />
  <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-analysis@3"></script>
  <script crossorigin src="https://cdn.jsdelivr.net/npm/@keen.io/dataviz@latest/dist/dataviz.min.js"></script>
  <style>
    #container {
        height: 300px;
    }
  </style>
`;

export const createBodyCode = ({
  widget,
  widgetSettings,
  chartSettings,
  projectId,
  readKey,
  query,
}: Partial<SnippetProps>) => {
  return `
  <div id="container"></div>
  <script type="text/javascript">
    const dataviz = new KeenDataviz({
      type: '${widget}',
      container: '#container',
      widget: ${
        widgetSettings ? JSON.stringify(widgetSettings, null, ' ') : {}
      },
      settings: ${
        chartSettings ? JSON.stringify(chartSettings, null, ' ') : {}
      },
    });
    
    const client = new KeenAnalysis({
      projectId: '${projectId}',
      readKey: '${readKey}'
    });
    
    client.query(${JSON.stringify(
      query,
      null,
      ' '
    )}).then((res) => dataviz.render(res));
  </script>
`;
};

export const createAllCodeSnipped = ({
  widget,
  widgetSettings,
  chartSettings,
  projectId,
  readKey,
  query,
}: Partial<SnippetProps>) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="https://static.keen.io/assets/keen-fonts.css" />
    <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-analysis@3"></script>
    <script crossorigin src="https://cdn.jsdelivr.net/npm/@keen.io/dataviz@latest/dist/dataviz.min.js"></script>
    <style>
      #container {
        height: 300px;
      }
    </style>
  </head>
  <body>
  <div id="container"></div>
  <script type="text/javascript">
    const dataviz = new KeenDataviz({
      type: '${widget}',
      container: '#container',
      widget: ${
        widgetSettings ? JSON.stringify(widgetSettings, null, ' ') : {}
      },
      settings: ${
        chartSettings ? JSON.stringify(chartSettings, null, ' ') : {}
      },
    });
    
    const client = new KeenAnalysis({
      projectId: '${projectId}',
      readKey: '${readKey}'
    });
    
    client.query(${JSON.stringify(
      query,
      null,
      ' '
    )}).then((res) => dataviz.render(res));
    
  </script>
  </body>
</html>
`;
