const fs = require('fs');

// Possible versions: https://docs.npmjs.com/files/package.json#dependencies

function npmExactVersions(packageJsonPath) {
	if (!packageJsonPath) packageJsonPath = './package.json';
	let packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

	function checkExactVersions(json) {
		let isValid = true;
		isValid &= checkJson('dependencies', json);
		isValid &= checkJson('devDependencies', json);
		isValid &= checkJson('optionalDependencies', json);
		isValid &= checkJson('peerDependencies', json);
		return isValid;
	}

	function checkJson(dependencyType, json) {
		let deps = json[dependencyType];
		let isValid = true;
		if (deps) {
			Object.keys(deps).forEach(key => {
				let value = deps[key];

				// Handle ranges like 
				let range = [];
				range = value.split('-');
				if (range.length !== 2) {
					range = value.split('||');
				}

				if (range.length === 2 || value === '*' || value === ' ') {
					console.log(`Package "${key}" does not have a fixed version ${value}`);
					isValid = false;
				}

				let numericVersionPattern = new RegExp('^[\.~^<>=x0-9]+$');
				// Check if it is a version number or something else (git url etc.)
				if (numericVersionPattern.test(value)) {
					// Check if only numbers and "." are present
					let onlyNumbersPattern = new RegExp('^[\.0-9]+$');
					if (!onlyNumbersPattern.test(value)) {
						console.log(`Package "${key}" does not have a fixed version ${value}`);
						isValid = false;
					}
				}
			});
		}
		return isValid;
	}

	if (!checkExactVersions(packageJson)) {
		throw new Error('Some packages don\'t have an exact version!');
		return false;
	} else {
		return true;
	}
}

module.exports = npmExactVersions;