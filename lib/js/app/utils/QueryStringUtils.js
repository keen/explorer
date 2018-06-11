import Qs from 'qs';
import _ from 'lodash';

export default {

  getSearchString: function() {
    return window.location.search;
  },

  updateSearchString: function(queryStringData) {
    var urlPath;
    if (_.keys(queryStringData).length) {
      urlPath = '?' + Qs.stringify(queryStringData);
    } else {
      urlPath = window.location.origin + window.location.pathname
    }
    window.history.pushState({ model: queryStringData }, "", urlPath);
  },

  getQueryAttributes: function() {
    return Qs.parse(this.getSearchString().replace('?', ''), { depth: 7 });
  }

};
