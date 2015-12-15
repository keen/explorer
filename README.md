# Keen IO Explorer

![](https://s3.amazonaws.com/keen_web_static/assets/img/keen-explorer-v2.0.0.png)

The Keen IO Explorer is an open source point-and-click interface for querying and visualizing your event data. It's maintained by the team at [Keen IO](https://keen.io/).

[Check out the demo here.](http://keen.github.io/explorer/). Read on for instructions on how to use the Explorer on your website or in your web app and how to get set up to develop with the Explorer.

## Table of Contents
1. [How to use Explorer on your site or in your app](#how-to-use-explorer-on-your-site-or-in-your-app)
2. [How to develop with the Explorer](#how-to-develop-with-the-explorer)
3. [FAQ](#faq)
4. [Contributing](#contributing)
5. [Tech used in this project](#tech-used-in-this-project)

### How to use Explorer on your site or in your app

#### Include the necessary files

You have three options for including the necessary Explorer files:

##### Option 1: Use the hosted assets from our CDN
```html
  <!-- Include Bootstrap from CDN. We use bootstrap as our CSS framework for Explorer -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <!-- Include Explorer CSS from CDN -->
  <link rel="stylesheet" href="https://d26b395fwzu5fz.cloudfront.net/apps/keen-explorer-2.0.0.min.css">
  <!-- Include jQuery from Google. We use jQuery for a few of our UI components, like calendar pickers. -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <!-- Include keen.js from CDN. This is our Javascript SDK that powers querying and visualizations in Explorer. -->
  <script src="https://d26b395fwzu5fz.cloudfront.net/3.2.7/keen.min.js" type="text/javascript"></script>
  <!-- Include keen-explorer.js from CDN. -->
  <script src="https://d26b395fwzu5fz.cloudfront.net/apps/keen-explorer-2.0.0.min.js"></script>
```

##### Option 2: Include the files yourself
You'd need to include all of the same assets as those listed in the CDN example above. You can [download the Explorer source code](https://github.com/keen/explorer/archive/master.zip) to get the `keen-explorer.js` and `keen-explorer.css` files (as well as the minified versions). And you can choose to include jQuery and Bootstrap however you wish, from CDNs or using downloaded copies.

##### Option 3: Install using NPM
This is as easy as `npm install keen-explorer`


#### Get your project ID & API keys
If you haven’t done so already, [login to Keen IO to create a project](https://keen.io/add-project) for your app. You'll need a [Keen IO account](https://keen.io/signup?s=explorer) to create a project. The Project ID and API Keys are available on the Project Overview page. You will need these for the next steps.

#### Configure the Keen.js client and initialize Explorer
Somewhere on the page that you want to show Explorer you'll need to configure a Keen.js client and pass that into the initialization of a new Explorer. Here's how you do it:
```html
<div id="explorer"></div>
<script type="text/javascript">
  // Configure a new Keen.js client with your project ID, read key and master key.
  var client = new Keen({
    projectId: "YOUR_PROJECT_ID",
    readKey: "YOUR_PROJECT_READ_KEY",
    masterKey: "YOUR_PROJECT_MASTER_KEY"
  });

  var app = new Keen.Explorer.App({
    // Pass that client into a new Explorer
    client: client,
    // Optionally add in saved queries support:
    // Saved queries is entirely optional. If you set it to true, a "saved queries" feature
    // will be available and you can save the state of the query you're working
    // on so that they can be looked up at a later time.
    savedQueries: true,
    // The targetId is the id of the DOM Node you want to display Explorer inside.
    targetId: 'explorer'
  });
  app.render();
</script>
```

And that's it. You're done!

### How to develop with the Explorer

  1. `git clone` this repository or [Download the source code](https://github.com/keen/explorer/archive/master.zip)
  1. Navigate to the project directory and make a copy of or rename the demo file:
  `cp demo/example_index.html demo/index.html` or `mv demo/example_index.html demo/index.html`
  2. Configure the Keen.js client in the demo file at demo/index.html with your project ID and Keen IO API keys.
  3. Install the dependencies with `npm install`.
  4. Run the development script with `npm run dev` or `export PORT=8082; npm run dev`.
  5. You can now view the demo locally at `http://localhost:8081/` or your specified port.

#### Building the project:

The project is built with [Gulp.js](https://github.com/gulpjs/gulp).

* Run `npm run production` from the root directory of the project to build ALL files, including the minified versions for production use.

#### Testing

**Run Unit Tests**
* Run `gulp test:unit` to run the unit tests.

**Run In Browser Mocha Unit Tests**
This isn't normally requried, but if you need to, you can run the tests in the browser.

* Run a server on another port, we use [http-server](https://www.npmjs.org/package/http-server) on port `8082`
* See the mocha unit test suite run on `http://localhost:8082/test/unit/`

### FAQ

**Is this open source Keen Explorer different than the one on keen.io?**
Nope! We have recently moved all our development on the Keen Explorer to this open source version.  

**I have questions about using the project! Where/who do I ask?**
If you have any questions about using this project, Explorer feel free to contact us anytime at [team@keen.io](mailto:team@keen.io). 

### Contributing:
To contribute to this project:

* Fork the repo.
* Submit a Pull Request **with** test coverage.
* Follow our PR template, which includes the following sections:

```markdown
# What's this PR do?

# Where should the reviewer start?

# How should this be manually tested?

# Screenshots (if appropriate)
```

Would an animated GIF be more informative than a screenshot? Then we recommend [Recordit](http://recordit.co/).

### Tech used in this project

These are the major technologies used in the project.

* [ReactJS](http://facebook.github.io/react/) for UI Components & input handling.
* [Flux](http://facebook.github.io/flux/) for help managing the data model layer.
* [Bootstrap](http://getbootstrap.com/) for our CSS framework.
* [NPM](https://www.npmjs.org/) for dependency management.
* [Browserify](http://browserify.org/) to compile modules for use in the browser.
* [GulpJS](http://gulpjs.com/) for a task/build runner.
