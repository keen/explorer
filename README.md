# Keen.io Data-Tools

## Setup & Development

Getting a dev environment is a little weird for this repo, because Explorer requires the URL end with `/explorer`. It's very specific - no slashes, no .html, no nuthin. So it's not a standard jekyll setup. Github is more intelligent in how it serves it's website, so it's easy to deploy, but local dev is harder.

1. Install Jekyll (http://jekyllrb.com/)
2. Install Node http-server
``` bash
npm install http-server -g # may require sudo
```

3. Run jekyll in serverless watch mode
``` bash
jekyll build -w
```

4. Run http server

``` bash
cd _site
http-server
```

5. Open it! [http://localhost/_site:8080](http://localhost/_site:8080)


Changes made to files will be automatically built (it takes a few seconds), and http-server will pick them up without a restart. Magic!
