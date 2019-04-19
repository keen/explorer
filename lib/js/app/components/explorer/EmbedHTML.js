import React, { Component, Fragment } from 'react';
import Prism from 'prismjs';

import { copyToClipboard } from '../../utils/text';

class EmbedHTML extends Component {
  renderIfDefined({ key, value }) {
    const {
      queryParams,
      savedQuery,
    } = this.props;
    if (queryParams[key]) {
      return `            ${key}: ${value},
`
    }
    if (savedQuery && savedQuery.name && savedQuery.exists) {
      return `            ${key}: '${savedQuery.name}',
`
    }
    return '';
  }

  render() {
    const {
      queryParams,
      projectId,
      readKey,
      savedQuery,
    } = this.props;

    const params = [];
    params.push(this.renderIfDefined({ key: 'analysisType', value: `'${queryParams.analysisType}'` }));
    params.push(this.renderIfDefined({ key: 'eventCollection', value: `'${queryParams.eventCollection}'` }));
    params.push(this.renderIfDefined({ key: 'timeframe', value: `${JSON.stringify(queryParams.timeframe)}` }));
    params.push(this.renderIfDefined({ key: 'interval', value: `'${queryParams.interval}'` }));
    params.push(this.renderIfDefined({ key: 'groupBy', value: `${JSON.stringify(queryParams.groupBy)}` }));
    params.push(this.renderIfDefined({ key: 'limit', value: `'${queryParams.limit}'` }));
    params.push(this.renderIfDefined({ key: 'orderBy', value: `${JSON.stringify(queryParams.orderBy)}` }));
    params.push(this.renderIfDefined({ key: 'filters', value: `${JSON.stringify(queryParams.filters)}` }));
    params.push(this.renderIfDefined({ key: 'timezone', value: `${queryParams.timezone}` }));

    if (savedQuery && savedQuery.name && savedQuery.exists) {
      params.length = 0;
    }

    params.push(this.renderIfDefined({ key: 'savedQueryName' }));
    
    const code = `<html>
    <head>
      <meta charset="utf-8">
      <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-analysis@3"></script>
      <link href="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.css" rel="stylesheet" />
      <script crossorigin src="https://cdn.jsdelivr.net/npm/keen-dataviz@3/dist/keen-dataviz.min.js"></script>
    </head>
    <body>
      <div id="demo_container"></div>
      <style>
        #demo_container{
          min-height: 300px;
        }
      </style>
  
      <script>
        const chart = new KeenDataviz({
          container: '#demo_container', // querySelector
          title: false
        });
  
        // Use keen-analysis.js to run a query
        const client = new KeenAnalysis({
          projectId: '${projectId}',
          readKey: '${readKey}'
        });
  
        client
          .query({
${params.join('')}          })
          .then(function(results){
            chart
              .render(results);
          })
          .catch(function(error){
            chart
              .message(error.message);
          });
      </script>
    </body>
  </html>`;

  const prismedHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript');

  return (
       <Fragment>
          <div
            className='container'
            dangerouslySetInnerHTML={{__html: prismedHtml}} />
          <div className='button-copy' onClick={() => copyToClipboard(code)}>
            Copy <i className="fas fa-copy"></i>
          </div>
        </Fragment>
    );
  }
}

export default EmbedHTML;
