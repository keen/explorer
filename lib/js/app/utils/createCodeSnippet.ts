export const createCodeSnippet = ({
  widget,
  query,
  projectId,
  readKey,
}: {
  widget: string;
  query: Record<string, any>;
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
