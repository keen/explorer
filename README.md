# Data Explorer

The data explorer is an open source point-and-click interface for querying and visualizing your event data.

![](https://s3.amazonaws.com/keen-event-images/Screen+Shot+2015-07-22+at+3.25.48+PM.png)

## Quick Setup

### TL;DR

  1. `cp demo/example_index.html demo/index.html`
  2. Add your Keen IO keys to demo/index.html
  3. `npm install`
  4. `npm -g install gulp` (if needed)
  5. `gulp` or `export PORT=8082; gulp`
  6. You can now view the demo locally at `http://localhost:8081/explorer` or your specified port.

### 1. Get your project ID & API keys
If you haven’t done so already, [login to Keen IO to create a project](https://keen.io/add-project) for your app. You'll need a [Keen IO account](https://keen.io/signup?s=explorer) to create a project. The Project ID and API Keys are available on the Project Overview page. You will need these for the next steps.

### 2. Drop in the JavaScript, CSS and images

You can see a complete code example of all these resources being included [in our demo page here.](/demo/example_index.html)

#### CSS

Include a copy of Bootstrap 3, which you can do from the CDN:

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
```

Include a copy of the Keen.DataTools styling from this project, found under: `dist/keen-data-tools.css`.

#### HTML

Have a div with an id that you'll use as the target to render out the app. A simple:

```html
<div id="content"></div>
```

will work just fine. All of the interface components will live under this div.

#### JavaScript

Include a copy of jQuery, which you can do from the Google CDN:
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
```

Include a copy of Keen.js, the easiest way is to use our CDN version:
```html
<script src="https://d26b395fwzu5fz.cloudfront.net/3.1.0-beta/keen.min.js" type="text/javascript"></script>
```

Include a copy of Keen.DataTools from this project, found under: `dist/keen-data-tools.js`.

### 3. Configure a Keen.js client and initialize the Keen.DataTools app

Initialize a new Keen.js client and then pass that into the initialization of a new Keen.DataTools.App.

```html
<script type="text/javascript">
    $(document).ready(function(){
      client = new Keen({
        projectId: "your_project_id",
        readKey: "your_read_key",
        masterKey: "your_master_key"
        protocol: "https",
        host: "api.keen.io/3.0",
        requestType: "jsonp"
      });

      var app = new Keen.DataTools.App({
        client: client,
        targetId: 'content'
      });

      app.render(); // Render the app's UI into the targetId provided in the config.
    });
</script>
```

If you want the DataTools app to run on a path other than the root, you can pass in the `root` configuration option, eg: `root: '/your/custom/root/path'`.

You can read more about Keen.js here: [The Keen.js client library](https://github.com/keenlabs/keen-js/).

### 3. Optionally include persistence

Persistence is entirely optional. If you include it, a "saved queries" feature will be shown and you can persist the state of the query you're working with to be looked up at a later time. If you do not want to use persistence, just do not include it in the Keen.DataTools.App initialization, like above.

To include persistence, create a new persistence object (this must be a compliant REST server, which we will document), and then pass that persistence object to the `Keen.DataTools.App` initialization. So, instead of what you see above, you would have:

```html
<script type="text/javascript">
  $(document).ready(function(){
    client = new Keen({
      projectId: "your_project_id",
      readKey: "your_read_key",
      masterKey: "your_master_key",
      protocol: "https",
      host: "api.keen.io/3.0",
      requestType: "xhr"
    });

    // Initialization a new Firebase persistence object.
    var persistence = new Keen.DataTools.Persistence.REST({
      baseUrl: '/bookmarks'
    });

    var app = new Keen.DataTools.App({
      client: client,
      persistence: persistence, // Persistence now being passed in.
      targetId: 'content'
    });

    app.render();
  });
</script>
```
You can read more about how to build your own persistence plugin here: [Keen.DataTools Persistence Docs](https://github.com/keenlabs/data-tools/docs/persistence.md/).

## Forking the Project to Customizing and Contribute

If you want to customize this project or contribute, here is how to get started:

* clone the repo
* run `npm install` to install project dependencies
* update the `index.html` with your Project ID and API Keys

```html
<script type="text/javascript">
    $(document).ready(function(){
      client = new Keen({
        projectId: "your_project_id",
        readKey: "your_read_key",
        masterKey: "your_master_key"
        protocol: "https",
        host: "api.keen.io/3.0",
        requestType: "jsonp"
      });

      var app = new Keen.DataTools.App({
        client: client,
        targetId: 'content'
      });

      app.render();
    });
</script>
```

### Building the project:

The project is built with   `Gulp.js`.

* Run `gulp` from the root directory of the project
* The demo app will be running on `http://localhost:8081/explorer`.

### Testing

##### Run Unit Tests
* Run `gulp test:unit` to run the unit tests.

##### Run Functional Tests
* Run `gulp test:functional` to run the functional tests.

##### Run In Browser Mocha Unit Tests

This isn't normally requried, but if you need to, you can run the tests in the browser.

* Run `gulp`
* Run a server on another port, we use [http-server](https://www.npmjs.org/package/http-server) on port `8082`
* See the mocha unit test suite run on `http://localhost:8082/test/unit/`

### Why is this different than the one on keen.io's website?

In order to move quickly and provide a good experience for its customers, Keen runs a private fork of Explorer for internal bug fixes, new features, and design changes. Some of those changes may rely on specific items in Keen's infrastructure, and need to go through a migration phase to work properly in the open source version.

Those migrations will happen frequently (it is likely that the two versions will usually be in sync), but there may be periods of lag after new larger features come out that this open source repo will behind what Keen shows on its website.

If you have any questions about using the open source Data Explorer feel free to contact us anytime at [team@keen.io](mailto:team@keen.io). 


### Contributing:
To contribute to this project:

* Fork the repo.
* Submit a Pull Request **with** test coverage.
* Follow our PR template, which includes the following sections:

``` markdown
# What's this PR do?

# Where should the reviewer start?

# How should this be manually tested?

# Screenshots (if appropriate)
```

Would an animated GIF be more informative than a screenshot? Then we recommend [Recordit](http://recordit.co/).

## Tech

These are the major technologies used in the project.

* [ReactJS](http://facebook.github.io/react/) for UI Components & input handling
* [NPM](https://www.npmjs.org/) for dependency management.
* [Browserify](http://browserify.org/) to compile modules for use in the browser
* [GulpJS](http://gulpjs.com/) for a task/build runner
