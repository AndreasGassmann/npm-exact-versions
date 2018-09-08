import { readFileSync } from 'fs';
import semver = require('semver');

let globalLogEnabled = false;

// Possible versions: https://docs.npmjs.com/files/package.json#dependencies

interface IPackageJson {
  dependencies?: { [k in any]: string };
  devDependencies?: { [k in any]: string };
  optionalDependencies?: { [k in any]: string };
  peerDependencies?: { [k in any]: string };
  [key: string]: { [k in any]: string } | undefined;
}

function isJsonValid(json: IPackageJson) {
  const dependencyTypes = [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
  ];
  const isValid = dependencyTypes.every(dependencyType => {
    return dependencyTypeIsValid(dependencyType, json);
  });
  return isValid;
}

function dependencyTypeIsValid(dependencyType: string, json: IPackageJson) {
  const deps = json[dependencyType];
  if (!deps) {
    return true;
  }

  return Object.keys(deps).every(key => {
    return isExactVersion(deps[key], key);
  });
}

export function isExactVersion(
  version: string,
  key?: string,
  logEnabled: boolean = false,
) {
  if (semver.clean(version, true)) {
    return true;
  } else if (semver.validRange(version, true)) {
    if (logEnabled || globalLogEnabled) {
      /* tslint:disable-next-line:no-console */
      console.error(
        `Package "${key}" does not have a fixed version "${version}"`,
      );
    }
    return false;
  } else {
    // This is most likely a git url
    // TODO: Check if git urls have a specific tag

    if (version.indexOf('#') === -1) {
      if (logEnabled || globalLogEnabled) {
        /* tslint:disable-next-line:no-console */
        console.warn(
          `Package "${key}" with version "${version}" may not be an exact version.`,
        );
      }
    }
    return true;
  }
}

export function npmExactVersions(
  packageJsonPath: string = './package.json',
  logEnabled: boolean = false,
) {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

  if (logEnabled) {
    globalLogEnabled = true;
  }

  if (!isJsonValid(packageJson)) {
    throw new Error("Some packages don't have an exact version!");
  } else {
    return true;
  }
}
