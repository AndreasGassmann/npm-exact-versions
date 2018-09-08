import { readFileSync } from 'fs';

// Possible versions: https://docs.npmjs.com/files/package.json#dependencies

interface IPackageJson {
	dependencies?: { [k in any]: string };
	devDependencies?: { [k in any]: string };
	optionalDependencies?: { [k in any]: string };
	peerDependencies?: { [k in any]: string };
	[key: string]: { [k in any]: string } | undefined;
}

function notFixedVersion(key: string, value: string) {
	/* tslint:disable-next-line:no-console */
	console.log(`Package "${key}" does not have a fixed version ${value}`);
	return false;
}

function isJsonValid(json: IPackageJson) {
	const dependencyTypes = ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies'];
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
		const version = deps[key];
		if (!isExactVersion(version)) {
			return notFixedVersion(key, version);
		}
		return true;
	});
}

export function isExactVersion(version: string) {
	// Detect ranges
	let range = [];
	range = version.split('-');
	if (range.length !== 2) {
		range = version.split('||');
	}

	if (range.length === 2 || version === '*' || version === ' ') {
		return false;
	}

	const numericVersionPattern = new RegExp('^[.~^<>=x0-9]+$');
	// Check if it is a version number or something else (git url etc.)
	if (numericVersionPattern.test(version)) {
		// Check if only numbers and "." are present
		const onlyNumbersPattern = new RegExp('^[.0-9]+$');
		if (!onlyNumbersPattern.test(version)) {
			return false;
		}
	}
	return true;
}

export function npmExactVersions(packageJsonPath: string = './package.json') {
	const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

	if (!isJsonValid(packageJson)) {
		throw new Error("Some packages don't have an exact version!");
	} else {
		return true;
	}
};
