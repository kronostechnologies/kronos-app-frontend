# Kronos Frontend Framework

This package contains javascript components and common css files for legacy Kronos Frontend applications.

This is an internal framework. It's not realy designed to be shared.


## Deploy a new version
```
# Make sure test pass
yarn test

# Built dist must be committed
yarn build
git add dist

# Bump version and tag
yarn bump minor
git push origin master --tags

# Publish to npm
yarn npm login
yarn npm publish
```

## Directories

- `js/src`: Main javascript sources.
- `js/dist`: Library built with webpack.
- `js/jquery`: Some jquery legacy components.
