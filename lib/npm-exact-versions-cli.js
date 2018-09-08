"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var npm_exact_versions_1 = require("./npm-exact-versions");
var packageJsonLocation = process.argv[2];
npm_exact_versions_1.npmExactVersions(packageJsonLocation);
