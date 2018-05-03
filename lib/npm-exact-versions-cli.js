let npmExactVersions = require('./npm-exact-versions');
let packageJsonLocation = process.argv[2];
npmExactVersions(packageJsonLocation);