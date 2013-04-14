Stoke
=====

Stoke is a skeleton for Ember.js apps served by node/express from Heroku and backed by Parse, Firebase, or other platform services. 

**Key Features**

* Cache busting on deploy -- css and js assets are recompiled and renamed with a hash generated from their contents in the deployment process.
* Adapters for Parse or Firebase are generated from environment variables -- no need to commit api keys to your repo.

**Getting Started**

1.  grunt
2.  supervisor -w public/manifest.yml web.js
3.  grunt watch

**Deploying to Heroku**

During deployment to Heroku, the production grunt task will be executed.  This will:

1.  Generate a single application-\<hash\>.min.js file
2.  Generate a single application-\<hash\>.css file
3.  Generate an adapter.js file in config from the template specified in the template task in Gruntfile.js
4.  Generate a manifest.yml file in public that express.js will use to look up the current asset file name given the base name in a template.

**Tips**

Here's a handy way to keep up to date with improvements to the skeleton: [Syncing a Fork](https://help.github.com/articles/syncing-a-fork)
