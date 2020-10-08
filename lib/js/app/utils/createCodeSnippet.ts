import {
  PickerWidgets,
  ChartSettings,
  WidgetSettings,
} from '@keen.io/widget-picker';

export const createCodeSnippet = ({
  widget,
  query,
  widgetSettings,
  chartSettings,
  projectId,
  readKey,
}: {
  widget: PickerWidgets;
  query: Record<string, any>;
  chartSettings?: ChartSettings;
  widgetSettings?: WidgetSettings;
  projectId: string;
  readKey: string;
}) => `
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
  widget: ${widgetSettings ? JSON.stringify(widgetSettings, null, ' ') : {}},
  settings: ${chartSettings ? JSON.stringify(chartSettings, null, ' ') : {}},
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
