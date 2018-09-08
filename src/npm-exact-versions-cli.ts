import { npmExactVersions } from './npm-exact-versions';
let logsEnabled;
let packageJsonLocation;

for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--path') {
    if (process.argv.length >= i + 1) {
      packageJsonLocation = process.argv[i + 1];
    }
  }

  if (process.argv[i] === '--log') {
    logsEnabled = true;
  }
}

npmExactVersions(packageJsonLocation, logsEnabled);
