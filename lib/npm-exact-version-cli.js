let npmExactVersion = require('./npm-exact-version');
let packageJsonLocation = process.argv[2];
npmExactVersion(packageJsonLocation);