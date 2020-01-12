Dylan Hand's website.

### Setup:

In order to get tags to work it was necessary to, confusingly, split this repo into two branches that point to different code. The `sources` branch is at the root level and contains the source code. The `master` branch is a separate git repo that lives in the `_site` folder, which allows local generation of the site (using any necessary plugins), and allows the generated files to be pushed to the `master` branch so GitHub Pages will host them.

1. Checkout source
2. `bundle install`
3. `cd _site`
4. `git init`
5. `git remote add origin <URL to this repo>` # probably `https://github.com/dylanhand/dylanhand.github.io.git`
6. `git checkout -b master`
7. Make any changes to the source files
8. Run `rake deploy` to deploy any new changes.

This setup is based on https://github.com/djacquel/JekyllVersioningWorkflows.
