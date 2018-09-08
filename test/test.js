import test from 'ava';
const nxv = require('../lib/npm-exact-versions');

let testFiles = __dirname + '/test_files/';
let validFile = testFiles + 'valid-package.json'
let invalidFile = testFiles + 'invalid-package.0.json'

test('should accept valid file', async t => {
	t.true(nxv.npmExactVersions(validFile));
});

test('should reject files with wildcard 0', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile);
	});
});

test('should reject files with wildcard 1', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '1'));
	});
});

test('should reject files with wildcard 2', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '2'));
	});
});

test('should reject files with wildcard 3', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '3'));
	});
});

test('should reject files with wildcard 4', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '4'));
	});
});

test('should reject files with wildcard 5', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '5'));
	});
});

test('should reject files with wildcard 6', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '6'));
	});
});

test('should reject files with wildcard 7', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '7'));
	});
});

test('should reject files with wildcard 8', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '8'));
	});
});

test('should reject files with wildcard 9', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '9'));
	});
});

test('should reject files with wildcard 10', async t => {
	t.throws(() => {
		nxv.npmExactVersions(invalidFile.replace('0', '10'));
	});
});
