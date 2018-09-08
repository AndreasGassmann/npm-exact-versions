import { npmExactVersions } from './npm-exact-versions';
const packageJsonLocation = process.argv[2];
npmExactVersions(packageJsonLocation);
