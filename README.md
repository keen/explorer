# Keen IO Explorer

## Install

```ssh
npm install keen-explorer --save
```
## Example

```javascript
import KeenExplorer from 'keen-explorer';

const myExplorer = new KeenExplorer('#keen-explorer-html-element')
  .client({
    projectId: 'PROJECT_ID',
    readKey: 'READ_KEY',
    masterKey: 'MASTER_KEY'
  })
  .persistence(true)
  .fetch();
```

[Check out the demo here.](http://keen.github.io/explorer/) The Keen IO Explorer is an open source point-and-click interface for querying and visualizing your event data. It's maintained by the team at [Keen IO](https://keen.io/).

Read on for instructions on how to use the Explorer on your website or in your web app and how to get set up to develop with the Explorer.

## Table of Contents
1. [How to use Explorer on your site or in your app](#how-to-use-explorer-on-your-site-or-in-your-app)
2. [How to develop with the Explorer](#how-to-develop-with-the-explorer)
3. [FAQ](#faq)
4. [Contributing](#contributing)
5. [Tech used in this project](#tech-used-in-this-project)

### How to use Explorer on your site or in your app

##### Option 1: Use the hosted assets from our CDN

```html
<!-- Dependencies -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<!-- Explorer Assets -->
<link rel="stylesheet" href="https://d26b395fwzu5fz.cloudfront.net/apps/keen-explorer-3.2.0.min.css">
<script src="https://d26b395fwzu5fz.cloudfront.net/apps/keen-explorer-3.2.0.min.js"></script>
```

##### Option 2: Include the files yourself

You'd need to include all of the same assets as those listed in the CDN example above. You can [download the Explorer source code](https://github.com/keen/explorer/archive/master.zip) to get the `keen-explorer.js` and `keen-explorer.css` files (as well as the minified versions). And you can choose to include jQuery and Bootstrap however you wish, from CDNs or using downloaded copies.

##### Option 3: Install using NPM

This is as easy as `npm install keen-explorer`

#### Get your project ID & API keys

If you haven’t done so already, [login to Keen IO to create a project](https://keen.io/add-project) for your app. You'll need a [Keen IO account](https://keen.io/signup?s=explorer) to create a project. The Project ID and API Keys are available on the Project Overview page. You will need these for the next steps.

#### Initialize the app

Somewhere on the page that you want to show Explorer you'll need to configure a Keen.js client and pass that into the initialization of a new Explorer. Here's how you do it:

```html
<div id="keen-explorer"></div>
<script>
  const myExplorer = new KeenExplorer('#keen-explorer')
    .client({
      projectId: 'PROJECT_ID',
      readKey: 'READ_KEY',
      masterKey: 'MASTER_KEY'
    })
    .persistence(true)
    .fetch();
</script>
```

And that's it. You're done!

## Custom builds of the Explorer

  1. Clone our repo `git clone https://github.com/keen/explorer.git`
  2. Configure the Keen.js client in the demo file at test/demo/demo-config.js with your project ID and Keen IO API keys.
  3. Install the dependencies with `npm install`.
  4. Run the development script with `npm run start`.
  5. You can now view the demo locally at `http://localhost:8080/` or your specified port.

### Building the project:

The project is built with [Webpack](https://github.com/webpack/webpack).

* Run `npm run build` from the root directory of the project to build ALL files, including the minified versions for production use.

#### Testing

**Run Unit Tests**
* Run `npm run test` to run all the tests. Currently there are only unit tests.

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

## What does this PR do? How does it affect users?

## How should this be tested?

Step through the code line by line. Things to keep in mind as you review:
 - Are there any edge cases not covered by this code?
 - Does this code follow conventions (naming, formatting, modularization, etc) where applicable?

Fetch the branch and/or deploy to staging to test the following:

- [ ] Does the code compile without warnings (check shell, console)?
- [ ] Do all tests pass?
- [ ] Does the UI, pixel by pixel, look exactly as expected (check various screen sizes, including mobile)?
- [ ] If the feature makes requests from the browser, inspect them in the Web Inspector. Do they look as expected (parameters, headers, etc)?
- [ ] If the feature sends data to Keen, is the data visible in the project if you run an extraction (include link to collection/query)?
- [ ] If the feature saves data to a database, can you confirm the data is indeed created in the database?

## Related tickets?

```

Screenshots encouraged! Would an animated GIF be more informative than a screenshot? Then we recommend [Recordit](http://recordit.co/).

### Tech used in this project

These are the major technologies used in the project.

* [ReactJS](http://facebook.github.io/react/) for UI Components & input handling.
* [Flux](http://facebook.github.io/flux/) for help managing the data model layer.
* [Bootstrap](http://getbootstrap.com/) for our CSS framework.
* [NPM](https://www.npmjs.org/) for dependency management.
