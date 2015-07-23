# keen-tracking.js [![Build Status](https://travis-ci.org/keen/keen-tracking.js.svg?branch=master)](https://travis-ci.org/keen/keen-tracking.js)

This project contains the most advanced event tracking functionality available for [Keen IO](https://keen.io), and will soon be built directly into [keen-js](https://github.com/keen/keen-js), replacing and upgrading the current tracking capabilities of that library.

Why did we split this library out of [keen-js](https://github.com/keen/keen-js)? Tracking and Analysis+Dataviz are two distinct workflows and it rarely makes sense for these tools to be duct-taped together. Monolithic codebases bring more heartache than Nirvana.

**Upgrading from keen-js?** [Read this](#upgrading-from-keen-js).

This [example setup](#example-setup) demonstrates how to put this library to work.

**Getting started:**

If you haven't done so already, login to Keen IO to create a project. The Project ID and API Keys are available on the Project Overview page. You will need these for the next steps.

* [Install the library](#install-the-library)
* [Connect](#connect) a new client instance for each project
* [Record events](#record-events) to the API individually or in batches
* [Defer events](#defer-events) to be recorded at a given interval, or when the queue reaches a given capacity
* [Extend events](#extend-events) to build intricate, useful data models and ease instrumentation

**Helpful utilities:**

* [Cookies](#cookies) (browser-only) for persisting data from one page to the next
* [Listeners](#listeners) (browser-only) for capturing and taking action during common DOM events like click, scroll, and submit
* [Timers](#timers) for tracking time before and between user or system interactions

**Helpful helpers:**

* [Datetime index](#datetime-index) for decomposing a date object into a set of properties like "hour_of_day" or "day_of_month"
* [Unique ID](#unique-id) for generating UUIDs
* [DOM node path](#dom-node-path) for returning the xPath for a given DOM element
* [Screen profile](#screen-profile) for generating a set of properties describing the current device screen, like "height", "availHeight", and "orientation"
* [Window profile](#window-profile) for generating a set of properties describing the current window, like "height", "scrollHeight", and "ratio" to screen dimensions
* [Browser profile](#browser-profile) for generating a set of properties describing the current browser, like "useragent", "online" status, and "language", plus [screen](#screen-profile) and [window](#window-profile) profiles

<a name="upgrading-from-keen-js"></a>
**Upgrading from keen-js:**

There are several new methods and name changes from keen-js, but fear not! We have included shims and legacy methods to make this library fully backward-compatible with the core functionality of keen-js, aside from one breaking change to the `client.url()` method (detailed below). Here are the methods and their replacement methods:
* `addEvent` and `addEvents` are now [`recordEvent`](#record-a-single-event) and [`recordEvents`](#record-multiple-events)
* `setGlobalProperties` is now handled by the [`extendEvents`](#extend-events) methods
* `trackExternalLinks` is now handled by the [DOM listeners](#listeners) utility (browser-only)

Please avoid using these deprecated methods, as they will eventually get axed. Deprecation messages will be visible in the developer console if [debugging](#debugging) is enabled.

**Breaking change from keen-js:** the previous implementation of `client.url()` automatically included `https://api.keen.io/3.0/projects/PROJECT_ID` + a `path` argument ('/events/whatever'), which severely limited its value. It now only returns `https://api.keen.io` + the path argument.

You can also now pass in an object to append a serialized query string to the result, like so:

```javascript
var url = client.url('/3.0/projects', { key: 'value'} );
// https://api.keen.io/3.0/projects?key=value
```

<a name="additional-resources"></a>
**Additional resources:**

* [Example setup](#example-setup) demonstrates how to put all of this to work
* [Debugging](#debugging) options can make life a little easier
* [Contributing](#contributing) is awesome and we hope you do!
* [Custom builds](#custom-builds) are encouraged as well - have fun!

<a name="support"></a>
**Support:**

Need a hand with something? Shoot us an email at [contact@keen.io](mailto:contact@keen.io). We're always happy to help, or just hear what you're building! Here are a few other resources worth checking out:

* [API status](http://status.keen.io/)
* [API reference](https://keen.io/docs/api)
* [How-to guides](https://keen.io/guides)
* [Data modeling guide](https://keen.io/guides/data-modeling-guide/)
* [Slack (public)](http://slack.keen.io/)




## Install the library

This library is best loaded asynchronously with the copy-paste technique outlined below, but can also be installed via [npm](https://www.npmjs.com/package/keen-tracking) or [bower](http://bower.io/search/?q=keen-tracking):

```ssh
# via npm
$ npm install keen-tracking

# or bower
$ bower install keen-tracking
```

Copy/paste this snippet of JavaScript above the </head> tag of your page to load the tracking library asynchronously. This technique sneaks the library into your page without significantly impacting page load speed.

```html
<script>
// Loads the library asynchronously from any URI
!function(name,path,ctx){
  var latest,prev=name!=='Keen'&&window.Keen?window.Keen:false;ctx[name]=ctx[name]||{ready:function(fn){var h=document.getElementsByTagName('head')[0],s=document.createElement('script'),w=window,loaded;s.onload=s.onerror=s.onreadystatechange=function(){if((s.readyState&&!(/^c|loade/.test(s.readyState)))||loaded){return}s.onload=s.onreadystatechange=null;loaded=1;latest=w.Keen;if(prev){w.Keen=prev}else{try{delete w.Keen}catch(e){w.Keen=void 0}}ctx[name]=latest;ctx[name].ready(fn)};s.async=1;s.src=path;h.parentNode.insertBefore(s,h)}}
}('Keen','https://d26b395fwzu5fz.cloudfront.net/keen-tracking-0.0.1.min.js',this);

// Executes when the library is loaded and ready
Keen.ready(function(){

	// Create a new client instance
	var client = new Keen({
		projectId: 'YOUR_PROJECT_ID',
		writeKey: 'YOUR_WRITE_KEY'
	});

	// Record an event!
	client.recordEvent('pageviews', {
		// Define your event data model
		title: document.title
	});

});
</script>
```

This loader works a little differently than all the previous versions we have released.

Notice the last line of the asynchronous loader snippet: `}('Keen', './filename.js', this);`. These three arguments can be overwritten, allowing you to customize important details about the installation process.

1. **Namespace:** Define a custom namespace for the library, instead of the default `Keen`, like `MyCustomKeenBuild`.
2. **Script URI:** Define the location of the script to load. You don't need to rely on our CDN. You can use your own, or host the file locally.
3. **Context:** Define where the library should be installed. Global pollution is a problem. This helps you fight back.

Here's an example that uses all of these features together:

```javascript
var modules = {};
!function(name,path,ctx){
  //~ .etc
}('MyKeenBuild','/assets/js/custom-keen-tracking.js', modules);

modules.MyKeenBuild.ready(function(){
	var client = new modules.MyKeenBuild.Client({
		projectId: 'YOUR_PROJECT_ID',
		writeKey: 'YOUR_WRITE_KEY'
	});
	// client.recordEvent('pageviews', {});
});
```

**Important:** This update brings an important change to note. In past versions of keen-js, we shimmed tracking-methods so you could begin using them immediately without the `.ready()` callback wrapper. This created a lot of strange edge cases and version conflicts. Now, everything must be initialized from within the `.ready(function(){ ... })` wrapper.

**RequireJS**

The library is published with an explicitly named module ID of 'keen-tracking'. This presents a light configuration step, but prevents anonymous define() mismatch mayhem.

To use this module, configure a paths record, like so:

```html
<script data-main="path/to/app.js" src="require.js"></script>
```

```javascript
// app.js
requirejs.config({
  paths: {
    'keen-tracking': 'path/to/keen-tracking.js'
  }
});

require([
    'keen-tracking'
  ], function(KeenAMD) {

    var client = new KeenAMD.Client({
      projectId: "123",
      writeKey: "456"
    });
});
```

Also note a global `Keen` object will still be defined. This is meant to ensure the library can initialize in environments where neighboring scripts are unknown or uncontrollable.


## Connect

The client instance is the core of the library and will be required for all API-related functionality. The `client` variable defined below will also be used throughout this document.

```javascript
var client = new Keen({
	projectId: 'YOUR_PROJECT_ID',
	writeKey: 'YOUR_WRITE_KEY',

	/* Additional options (defaults shown):

	writePath: '/3.0/projects/YOUR_PROJECT_ID/events'
	host: 'api.keen.io'
	protocol: 'https'
	requestType: 'jsonp' // Also: 'xhr', 'beacon'

	*/
});

// Optional accessor methods are available too
client.projectId('PROJECT_ID');
client.writeKey('WRITE_KEY');
```

**Important notes about client configuration options:**

* `host` and `writePath`: these options can be overwritten to make it easier than ever to proxy events through your own intermediary host.
* `protocol`: older versions of IE feature a fun little quirk where cross-domain requests to a secure resource (https) from an insecure host (!https) fail. In these rare cases the library will match the current host's protocol.
* `requestType`: this option sets a default for GET requests, which is only supported when recording single events. There are limits to the URL string length of a request, so if this limit is exceeded we'll attempt to execute a POST instead, using XHR. In rare cases where XHR isn't supported, the request will fail.




## Record events

These methods push single or multiple events to their respective API endpoints. Wondering what you should record? Browse our [data modeling guide](https://keen.io/guides/data-modeling-guide/), and let us know if you don't find what you're looking for.

### Record a single event

Here is an example for recording a "purchases" event. Note that dollar amounts are tracked in cents:

```javascript
// Create a data object with the properties you want to record
var purchaseEvent = {
	item: 'golden gadget',
	price: 2550, // track dollars as cents
	referrer: document.referrer,
	keen: {
		timestamp: new Date().toISOString()
	}
};

client.recordEvent('purchases', purchaseEvent, function(err, res){
	if (err) {
		// there was an error!
	}
	else {
		// see sample response below
	}
});
```

**API response for recording a single event:**

```jsonp
{
	"created": true
}
```

### Record multiple events

Here is an example for how to record multiple events with a single API call. Note that dollar amounts are tracked in cents:

```javascript
var multipleEvents = {
	purchases: [
		{
			item: 'golden gadget',
			price: 2550,
			transaction_id: 'f029342'
		},
		{
			item: 'a different gadget',
			price: 1775,
			transaction_id: 'f029342'
		}
	],
	transactions: [
		{
			id: 'f029342',
			items: 2,
			total: 4325
		}
	]
};

// Send multiple events to several collections
client.recordEvents(multipleEvents, function(err, res){
	if (err) {
		// there was an error!
	}
	else {
		// see sample response below
	}
});
```

**API response for recording multiple events:**

```json
{
	"purchases": [
		{
			"success": true
		},
		{
			"success": true
		}
	],
	"transactions": [
		{
			"success": true
		}
	]
}
```


## Defer events

These methods handle an internal queue of events, which is pushed to the [events](https://keen.io/docs/api/#record-multiple-events) API resource on a given interval (default: 15 seconds), or when the queue reaches a maximum capacity (default: 5000).

```javascript
// Single event from the previous example
client.deferEvent('purchase', purchaseEvent);

// Multiple events from the previous example
client.deferEvents(multipleEvents);

// Flush the deferred queue
client.recordDeferredEvents();

// Record events when queue contains at least N events (default: 5000)
client.queueCapacity(5000);
client.queueCapacity(); // 5000

// Record events every N seconds (default: 15)
client.queueInterval(15);
client.queueInterval(); // 15
```


## Extend events

These methods extend the event body of every event sent through `recordEvent()` or `recordEvents()`, for all or specified collections, and accepts either a predefined object (static) or a function that returns an object (dynamic). This returned object is then grafted into the original event body with a deep-extend operation that seamlessly blends nested objects.

`extendEvents` transforms will be applied first, followed by collection-specific `extendEvent` transforms. In either case, transforms will be applied in the order that they are defined. Properties provided in the originating `recordEvent/s()` call will override any matching properties (static or dynamic) returned by these methods.

```javascript
// Extend events for a single collection
client.extendEvent('transaction', {});
client.extendEvent('transaction', function(){
	return {};
});

// Extend events for all collections
client.extendEvents({});
client.extendEvents(function(){
	return {};
});

// Example usage

var userProps = {
	full_name: 'User Dude',
	email: 'name@domain.com',
	id: 'f1233423h',
	username: 'userdude213'
};

// Include a predefined 'user' object with every purchase event
client.extendEvent('purchases', {
	'user': userProps
});

// Include a predefined 'user' object with every event
client.extendEvents({
	'user': userProps
});

// Include a dynamic 'keen.timestamp' property with every event
client.extendEvents(function(){
	return {
		keen: {
			timestamp: new Date().toISOString()
		}
	};
});
```

**Example usage:**

```javascript
// Object (static)
client.extendEvents({
	page: {
		href: document.location.href,
		title: document.title
	},
	referrer: document.referrer,
	user: {
		email: 'name@domain.com',
		id: 'f1233423h',
		username: 'someuser123'
	}
});

// Function that returns an object (dynamic)
// Useful for attaching time-sensitive data
client.extendEvents(function(){
	return {
		keen: {
			timestamp: new Date().toISOString()
		}
	}
});

//
client.recordEvent('pageviews');

/* Resulting event body:
{
	user: {
		email: 'name@domain.com',
		id: 'f1233423h',
		username: 'someuser123'
	},
	page: {
		href: 'https://github.com/keen/keen-tracking.js#extend-events',
		title: document.title
	},
	referrer: 'https://github.com/keen/',
	keen: {
		timestamp: '2015-06-28T22:01:38.824Z'
	}
}
*/
```


## Utilities

### Cookies

`Keen.utils.cookie(key)` finds or creates a cookie with a given key (string) value, and returns an object with several methods for managing the data contained in that cookie.

```javascript
var session = Keen.utils.cookie('visitor-stats');

// Set a single value
session.set('user_id', '222323843234');

// Set multiple values
session.set({
	user_id: '222323843234',
	first_referrer: 'https://github.com/keen/keen-tracking.js'
})

// Get a single value
session.get('user_id'); // '222323843234'

// Get all values
session.get(); // { user_id: '222323843234' }

// Expire the cookie
session.expire();

// Set options on the cookie
session.options({
	domain: '...',
	secure: true
});
```

This utility uses [ScottHamper's](https://github.com/ScottHamper) wonderfully simple [Cookies.js](https://github.com/ScottHamper/Cookies) library. Read all options for Cookies.js [here](https://github.com/ScottHamper/Cookies#cookiessetkey-value--options).


### Listeners

`Keen.utils.listener()` helps surface common DOM element events like "click", "scroll", and "submit". There is also a `Keen.listenTo()` method for quickly setting a series of listeners (below)

**Important:** Form submits and clicks will be delayed by 500ms, unless the event is cancelled within a given listener's callback.

<!-- Should we add this? http://jsfiddle.net/hm514aj8/10/ -->

```javascript
// Listen to DOM events

// Create a new element listener (assigned)
var navLinks = Keen.utils.listener('.nav li > a');

// Listen for a given event
navLinks.on('click', function(e){
	// You have 500ms to record an event!
});

// Listen for event once
myClicker.once('click', function(e){
	// First click!
});

// Cancel a given event listener
function clickHandler(e){
	// do something!
}
myClicker.on('click', clickHandler);
myClicker.off('click', clickHandler);

// Cancel all listeners for a given event
myClicker.off('click');
// .. or all events
myClicker.off();


var formListener = Keen.utils.listener('form#signup');
formListener.on('submit', function(e){
  client.recordEvent('signup', {
    // record signup data
  });
});

// TODO: Override DOM event timeouts (defaults shown)
// Keen.deferDomEvents('A', 'click', 500);
// Keen.deferDomEvents('FORM', 'submit', 500);
```

#### Keen.listenTo()

This is a convenience function for quickly creating multiple listeners. These listeners are constructed with the `Keen.utils.listener` utility, so the behavior will be identical to calling `Keen.utils.listener(selector).on(eventType, callback);`.

```javascript
Keen.listenTo({
	'click .nav li > a': function(e){
		// You have 500ms to record an event!
	},
	'submit form#signup': function(e){
		// Record a signup event
	}
});
```

This technique does not return a reference to the listener, but can be deactivated by defining a listener with the same selector and calling the `.off(eventType)` event:

```JavaScript
Keen.utils.listener('.nav li > a').off('click');
Keen.utils.listener('form#signup').off('submit');
```

#### Window events

```javascript
var winListener = Keen.utils.listener('window')
	.once('scroll', function(e){
		// user is interacting with the page
	})
	.on('hashchange', function(e){
		// user clicked an internal anchor (eg: /#some-heading)
	})
	.on('resize', function(e){
		// ...
	});
```

**Generally supported events:**

* click (see below for `<a>` clicks)
* submit (see below for `<form>` submits)
* keydown
* keypress
* keyup
* mousedown
* mousemove
* mouseout
* mouseover
* mouseup


**Important note about `<a>` and `<form>` elements:** `<a>` tag **clicks** (when navigating away from the current page) and `<form>` **submits** are deferred for 500ms to allow for quick, asynchronous API calls.

**`window` events:**

* blur
* focus
* hashchange
* resize
* scroll

**Not currently supported:**

* dblclick
* error
* onload
* unload



### Timers

`Keen.utils.timer()` creates an object that tracks time, and can be paused, restarted, or initialized with a known value (seconds). It seems simple, but these little do-dads are excellent for recording the duration of sessions or specific interactions.

```javascript
var userActivity = Keen.utils.timer();

// Start the timer
userActivity.start();

// Pause the timer
userActivity.pause();

// Return the vale of the timer (seconds)
userActivity.value(); // 10

// Clear the current value of the timer
userActivity.clear();

// Start from a given number
var historicalActivity = Keen.utils.timer(3132).start();
historicalActivity.pause();
```


## Helpers

These helpers are designed to generate useful properties and objects for event data models, and can be used when recording, deferring or extending events.

### Datetime index

`Keen.utils.getDatetimeIndex()` returns a set of properties like "hour_of_day" or "day_of_month". This helper accepts an optional Date object as an argument, otherwise it will construct and return a datetime index object based on "now".

```javascript
var datetimeIndex = Keen.helpers.getDatetimeIndex();
/*
// Monday, June 29th, 2015
{
	'hour_of_day': 14,
	'day_of_week': 2,
	'day_of_month': 29,
	'month': 6,
	'year': 2015
}
*/
```

### Unique ID

`Keen.helpers.getUniqueId()` returns a UUID. This is useful in conjunction with `Keen.utils.cookie()` for identifying and tracking unauthenticated site visitors.

```javascript
var uniqueId = Keen.helpers.getUniqueId();
// '150caf6b-ef9f-48cd-ae32-43e2f5bb0fe8'
```

### DOM node path

`Keen.helpers.getDomNodePath(el)` returns the xPath for a given DOM element.

```javascript
var btn = document.getElementById('signup-button');
var domNodePath = Keen.helpers.getDomNodePath(btn);
// 'body > div#nav > ul > li:eq(1) > a#signup-button'
```

### Screen profile

`Keen.utils.getScreenProfile()` returns a set of properties describing the current device screen, like "height", "availHeight", and "orientation".

```javascript
var screenProfile = Keen.helpers.getScreenProfile();
/*
{
	'height': 900,
	'width': 1440,
	'colorDepth': 24,
	'pixelDepth': 24,
	'availHeight': 878,
	'availWidth': 1436,
	'orientation': {
		'angle': 0,
		'type': 'landscape'
	}
}
*/
```

### Window profile

`Keen.utils.getWindowProfile()` returns a set of properties describing the current window, like "height", "scrollHeight", and "ratio" to screen dimensions.

```javascript
var windowProfile = Keen.helpers.getWindowProfile();
/*
{
	'height': 436,
	'width': 1209,
	'scrollHeight': 13834,
	'ratio': {
		'height': 0.5,
		'width': 0.84
	}
}
*/
```

### Browser profile

`Keen.utils.getBrowserProfile()` returns a set of properties describing the current browser, like "useragent", "online" status, and "language", plus [screen](#screen-profile) and [window](#window-profile) profiles.

```javascript
var browserProfile = Keen.helpers.getBrowserProfile();
/*
  {
	'cookies': true,
	'codeName': 'Mozilla',
	'language': 'en-US',
	'name': 'Netscape',
	'online': true,
	'platform': 'MacIntel',
	'useragent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36',
	'version': '5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36',

	// includes Keen.helpers.getScreenProfile();
	'screen': {
		'height': 900,
		'width': 1440,
		'colorDepth': 24,
		'pixelDepth': 24,
		'availHeight': 878,
		'availWidth': 1436,
		'orientation': {
			'angle': 0,
			'type': 'landscape'
		}
	},

	// includes Keen.helpers.getWindowProfile();
	'window': {
		'height': 436,
		'width': 1209,
		'scrollHeight': 13834,
		'ratio': {
			'height': 0.5,
			'width': 0.84
		}
	}
}
*/
```


## Example Setup

```javascript
var client = new Keen({
	projectId: 'MY_PROJECT_ID',
	writeKey: 'MY_WRITE_KEY'
});

var sessionCookie = Keen.utils.cookie('keen-example-cookie');
if (!sessionCookie.get('user_id')) {
	sessionCookie.set('user_id', Keen.helpers.getUniqueId());
}

var sessionTimer = Keen.utils.timer();
sessionTimer.start();

Keen.listenTo({
	'form#signup': function(e){
		// 500ms to record an event
		var userEmail = document.getElementById('signup-email').value;
		client.recordEvent('user signup', {
			visitor: {
				email: userEmail
			}
		});
	},
	'click .nav li > a': function(e){
		// 500ms to record an event
		client.recordEvent('leave page');
	}
});

// THE BIG DATA MODEL!

client.extendEvents(function(){
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
			browser: Keen.helpers.getBrowserProfile(),
			// info: {} (add-on)
			ip: '${keen.ip}',
			ua: '${keen.user_agent}'
		},
		time: Keen.helpers.getDatetimeIndex(),
		visitor: {
			id: sessionCookie.get('user_id'),
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

client.recordEvent('pageview');
```



## Debugging

Dev console errors and messages are turned off by default, but can be activated by setting `Keen.debug = true;`. Additionally, you can disable writing events to the API by setting `Keen.enabled = false;`.

```javascript
// Track errors and messages in the dev console
Keen.debug = true;

// Disable event writes to the API
Keen.enabled = false;

// Observe what's happening in each method
client.on('recordEvent', Keen.log);
client.on('recordEvents', Keen.log);
client.on('deferEvent', Keen.log);
client.on('deferEvents', Keen.log);
client.on('recordDeferredEvents', Keen.log);
client.on('extendEvent', Keen.log);
client.on('extendEvents', Keen.log);
```

## Contributing

This is an open source project and we love involvement from the community! Hit us up with pull requests and issues. The more contributions the better!

**TODO:**

* [ ] Validate `Keen.utils.listener()` form submit binding on IE8
* [ ] Expose `A` element click event and `FORM` element submit event timeouts (default: 500ms)

[Learn more about contributing to this project](./CONTRIBUTING.md).


## Custom builds

Run the following commands to install and build this project:

```ssh
# Clone the repo
$ git clone https://github.com/keen/keen-tracking.js.git && cd keen-tracking.js

# Install project dependencies
$ npm install

# Build project with gulp
# npm install -g gulp
$ gulp

# Build and launch to view test results
$ gulp with-tests
$ open http://localhost:9000
```
