import React, { Component, Fragment } from 'react';
import Prism from 'prismjs';
import { connect } from 'react-redux';

import { copyToClipboard } from '../../utils/text';

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = {
};

class EmbedHTML extends Component {
  renderIfDefined({ key, value }) {
    const {
      savedQuery,
    } = this.props.ui;
    if (this.props.ui[key]) {
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
      projectId,
      readKey,
    } = this.props;

    const {
      analysisType,
      eventCollection,
      targetProperty,
      timeframe,
      timezone,
      filters,
      interval,
      groupBy,
      orderBy,
      limit,
      savedQuery,
    } = this.props.ui;

    const params = [];
    params.push(this.renderIfDefined({ key: 'analysisType', value: `'${analysisType}'` }));
    params.push(this.renderIfDefined({ key: 'eventCollection', value: `'${eventCollection}'` }));
    params.push(this.renderIfDefined({ key: 'targetProperty', value: `'${targetProperty}'` }));
    params.push(this.renderIfDefined({ key: 'timeframe', value: `${JSON.stringify(timeframe)}` }));
    params.push(this.renderIfDefined({ key: 'interval', value: `'${interval}'` }));
    params.push(this.renderIfDefined({ key: 'groupBy', value: `${JSON.stringify(groupBy)}` }));
    params.push(this.renderIfDefined({ key: 'limit', value: `'${limit}'` }));
    params.push(this.renderIfDefined({ key: 'orderBy', value: `${JSON.stringify(orderBy)}` }));
    params.push(this.renderIfDefined({ key: 'filters', value: `${JSON.stringify(filters)}` }));
    params.push(this.renderIfDefined({ key: 'timezone', value: `${timezone}` }));

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmbedHTML);
