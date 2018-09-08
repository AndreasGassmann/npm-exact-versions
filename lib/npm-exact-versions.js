"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function notFixedVersion(key, value) {
    /* tslint:disable-next-line:no-console */
    console.log("Package \"" + key + "\" does not have a fixed version " + value);
    return false;
}
function isJsonValid(json) {
    var dependencyTypes = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
    var isValid = dependencyTypes.every(function (dependencyType) {
        return dependencyTypeIsValid(dependencyType, json);
    });
    return isValid;
}
function dependencyTypeIsValid(dependencyType, json) {
    var deps = json[dependencyType];
    if (!deps) {
        return true;
    }
    return Object.keys(deps).every(function (key) {
        var version = deps[key];
        if (!isExactVersion(version)) {
            return notFixedVersion(key, version);
        }
        return true;
    });
}
function isExactVersion(version) {
    // Detect ranges
    var range = [];
    range = version.split('-');
    if (range.length !== 2) {
        range = version.split('||');
    }
    if (range.length === 2 || version === '*' || version === ' ') {
        return false;
    }
    var numericVersionPattern = new RegExp('^[.~^<>=x0-9]+$');
    // Check if it is a version number or something else (git url etc.)
    if (numericVersionPattern.test(version)) {
        // Check if only numbers and "." are present
        var onlyNumbersPattern = new RegExp('^[.0-9]+$');
        if (!onlyNumbersPattern.test(version)) {
            return false;
        }
    }
    return true;
}
exports.isExactVersion = isExactVersion;
function npmExactVersions(packageJsonPath) {
    if (packageJsonPath === void 0) { packageJsonPath = './package.json'; }
    var packageJson = JSON.parse(fs_1.readFileSync(packageJsonPath, 'utf8'));
    if (!isJsonValid(packageJson)) {
        throw new Error("Some packages don't have an exact version!");
    }
    else {
        return true;
    }
}
exports.npmExactVersions = npmExactVersions;
;
