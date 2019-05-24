!function(name,path,ctx){
  var latest,prev=name!=='Keen'&&window.Keen?window.Keen:false;ctx[name]=ctx[name]||{ready:function(fn){var h=document.getElementsByTagName('head')[0],s=document.createElement('script'),w=window,loaded;s.onload=s.onerror=s.onreadystatechange=function(){if((s.readyState&&!(/^c|loade/.test(s.readyState)))||loaded){return}s.onload=s.onreadystatechange=null;loaded=1;latest=w.Keen;if(prev){w.Keen=prev}else{try{delete w.Keen}catch(e){w.Keen=void 0}}ctx[name]=latest;ctx[name].ready(fn)};s.async=1;s.src=path;h.parentNode.insertBefore(s,h)}}
}('KeenTracker','assets/vendor/keen-tracking/dist/keen-tracking.min.js',this);

// Executes when the library is loaded and ready
KeenTracker.ready(function(){

  // KeenTracker.debug = true;

  // Create a new client instance
  var tracker = window.tracker = new KeenTracker({
    projectId: '557a0832c2266c48aa9977fd',
    writeKey: '16e4effde55c09ce3541a5b323e4e5e032b5bd278f43f57d57be720c6c500afb7a81fa7c99d1f9886ad9da08da7956d1e25853305e8dd79da3e0ecb0a8160ca9904c25b892b92b53b999b7ea35f531ea04fee5634a43e2b673711814cded8691135824d11f7ff80be4d8cd0eb421c7cb'
  });

  var sessionCookie = window.sessionCookie = KeenTracker.utils.cookie('keen-data-explorer-demo');
  if (!sessionCookie.get('guest_id')) {
    sessionCookie.set('guest_id', KeenTracker.helpers.getUniqueId());
  }

  var sessionTimer = KeenTracker.utils.timer();
  sessionTimer.start();

  KeenTracker.listenTo({
    'click a.keen-track': function(e){
      tracker.recordEvent('click_link', {
        el: KeenTracker.helpers.getDomNodePath(e.target),
        link_href: e.target.href
      });
    }
  });

  // Dynamic data model for every event
  tracker.extendEvents(function(){
    return {
      page: {
        title: document.title,
        url: document.location.href
        // info: {} (add-on)
      },
      referrer: {
        url: document.referrer
        // info: {} (add-on)
      },
      tech: {
        browser: KeenTracker.helpers.getBrowserProfile(),
        // info: {} (add-on)
        ip: '${keen.ip}',
        ua: '${keen.user_agent}'
      },
      time: KeenTracker.helpers.getDatetimeIndex(),
      visitor: {
        id: sessionCookie.get('guest_id'),
        time_on_page: sessionTimer.value()
      },
      // geo: {} (add-on)
      keen: {
        timestamp: new Date().toISOString(),
        addons: [
          {
            name: 'keen:ip_to_geo',
            input: {
              ip: 'tech.ip'
            },
            output: 'geo'
          },
          {
            name: 'keen:ua_parser',
            input: {
              ua_string: 'tech.ua'
            },
            output: 'tech.info'
          },
          {
            name: 'keen:url_parser',
            input: {
              url: 'page.url'
            },
            output: 'page.info'
          },
          {
            name: 'keen:referrer_parser',
            input: {
              page_url: 'page.url',
              referrer_url: 'referrer.url'
            },
            output: 'referrer.info'
          }
        ]
      }
    };
  });

  tracker.recordEvent('pageviews');
});
