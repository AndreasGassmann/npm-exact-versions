# npm-exact-versions

[![Build Status](https://travis-ci.org/AndreasGassmann/npm-exact-versions.svg?branch=master)](https://travis-ci.org/AndreasGassmann/npm-exact-versions)

This package will make sure that you only use exact versions in your package.json. All wildcards will be rejected.

# Installation
``` bash
$ npm install npm-exact-versions -g
```

# Usage

``` bash
$ npm-exact-versions pathToPackageJson
```

If no package path is specified, the one in the current directory will be used.