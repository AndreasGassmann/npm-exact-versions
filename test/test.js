import test from 'ava';
const nxv = require('../lib/npm-exact-versions');
const semver = require('semver');

let testFiles = __dirname + '/test_files/';
let validFile = testFiles + 'valid-package.json';
let invalidFile = testFiles + 'invalid-package.json';

test('should read default package.json', async t => {
  t.true(nxv.npmExactVersions());
});

test('should read file from path', async t => {
  t.true(nxv.npmExactVersions(validFile));
});

test('should read file from path and log errors if enabled', async t => {
  t.true(nxv.npmExactVersions(validFile, true));
});

test('should throw if package has invalid versions', async t => {
  const error = t.throws(() => {
    nxv.npmExactVersions(invalidFile);
  }, Error);

  t.is(error.message, `Some packages don't have an exact version!`);
});

test(`should ignore types if they don't exist`, async t => {
  let json = {
    dependencies: {
      'npm-exact-version':
        'https://github.com/AndreasGassmann/npm-exact-versions',
    },
    devDependencies: {
      ava: '0.25.0',
    },
    optionalDependencies: {
      typescript: '3.0.3',
    },
  };

  t.true(nxv.isValidPackageJson(json));
});

test('should log errors when enabled', async t => {
  const exactVersions = ['~1.2.3'];

  exactVersions.forEach(version => {
    t.false(nxv.isExactVersion(version, 'test', true));
  });
});

test('should accept exact versions', async t => {
  const exactVersions = [
    '1.2.3',
    '=1.2.3',
    '1.2.3-0',
    '1.2.3-beta',
    '1.2.3-beta+build',
    '1.2.3+build',
    '1.2.3-alpha.0',
    ' 1.2.1 ',
    ' 1.2.2-4 ',
    ' 1.2.3-pre ',
    'v1.2.5',
    ' v1.2.8 ',
    '\t1.2.13',
    '=1.2.21',
    'v=1.2.34',
  ];

  exactVersions.forEach(version => {
    t.true(nxv.isExactVersion(version));
    t.true(nxv.isExactVersion(version, 'test', true));
  });
});

test('should reject invalid versions', async t => {
  const invalidVersions = [
    '~1.2.2',
    '~0.6.1-1',
    '1.0.0 - 2.0.0',
    '<=2.0.0',
    '<2.0.0',
    '0.1.20 || 1.2.4',
    '2.x.x',
    '1.2.x',
    '1.2.x || 2.x',
    '2.*.*',
    '1.2.*',
    '1.2.* || 2.*',
    '2',
    '2.3',
    '~2.4',
    '~>3.2.1',
    '~1',
    '~>1',
    '~> 1',
    '~1.0',
    '~ 1.0',
    '<1.2',
    '< 1.2',
    '1',
    '~v0.5.4-pre',
    '=0.7.x',
    '<0.7.x',
    '<1',
    '< 1',
    '>=*',
    '',
    ' ',
    '*',
    '>=1.0.0',
    '>1.0.0',
    '>= 1.0.0',
    '>=  1.0.0',
    '>=   1.0.0',
    '> 1.0.0',
    '>  1.0.0',
    '<=   2.0.0',
    '<= 2.0.0',
    '<=  2.0.0',
    '<    2.0.0',
    '<\t2.0.0',
    '>=0.1.97',
    '0.1.20 || >1.2.4',
    '>=0.2.3 || <0.0.1',
    '||',
    'x',
    '>=1',
    '>= 1',
    '>=0.7.x',
    '<=0.7.x',
    '>0.2.3 >0.2.4 <=0.2.5',
    '>=0.2.3 <=0.2.4',
    '^1',
    '^3.0.0',
    '^1.0.0 || ~2.0.1',
    '^0.1.0 || ~3.0.1|| 5.0.0',
    '^0.1.0 || ~3.0.1 || >4 <=5.0.0',
    '>=2.0.0',
    '>2.0.0',
    '>1.2',
    '> 1.2',
    '>1',
    '> 1',
    '>1.2.3',
    '^1.0.0alpha',
    '~1.0.0alpha',
    '^1.0.0-alpha',
    '~1.0.0-alpha',
    '^1.2.3+build',
    '1.2.3-pre+asdf - 2.4.3-pre+asdf',
    '1.2.3pre+asdf - 2.4.3-pre+asdf',
    '1.2.3-pre+asdf - 2.4.3pre+asdf',
    '1.2.3pre+asdf - 2.4.3pre+asdf',
    '1.2.3+asdf - 2.4.3+asdf',
    '~x',
    '~2',
    '~ 1.0.3',
    '~1.2.1 >=1.2.3',
    '~1.2.1 =1.2.3',
    '~1.2.1 1.2.3',
    '~1.2.1 >=1.2.3 1.2.3',
    '~1.2.1 1.2.3 >=1.2.3',
    '>=1.2.1 1.2.3',
    '1.2.3 >=1.2.1',
    '>=1.2.3 >=1.2.1',
    '>=1.2.1 >=1.2.3',
    '>=1.2',
    '^1.2.3',
    '^0.1.2',
    '^0.1',
    '^0.0.1',
    '^1.2',
    '^1.2 ^1',
    '^1.2.3-alpha',
    '^1.2.0-alpha',
    '^0.0.1-alpha',
    '^0.1.1-alpha',
    '^x',
    'x - 1.0.0',
    'x - 1.x',
    '1.0.0 - x',
    '1.x - x',
    '<=7.x',
    '<=1.2.3',
    '~v0.5.4-beta',
    '<1.2.3',
    '^0',
    '^ 1',
    '^1.0',
    '^0.0.1-beta',
    '^1.2.3-beta.4',
    '>01.02.03',
    '~1.2.3beta',
    '^ 1.2 ^ 1',
    '~> 1.0.3',
    '1 2',
    '1.2 - 3.4.5',
    '1.2.3 - 3.4',
    '1.2.3 - 3',
    '>*',
    '<*',
  ];

  invalidVersions.forEach(version => {
    t.false(nxv.isExactVersion(version));
    t.false(nxv.isExactVersion(version, 'test', true));
  });
});

test('should accept github urls', async t => {
  const exactVersionUrls = [
    'expressjs/express',
    'mochajs/mocha#4727d357ea',
    'user/repo#feature/branch',
    'https://github.com/AndreasGassmann/npm-exact-versions',
    'git+ssh://git@github.com:npm/cli.git#v1.0.27',
    'git+ssh://git@github.com:npm/cli#semver:^5.0',
    'git+https://isaacs@github.com/npm/cli.git',
    'git://github.com/npm/cli.git#v1.0.27',
  ];

  exactVersionUrls.forEach(version => {
    t.true(nxv.isExactVersion(version));
  });
});

test('should accept file paths', async t => {
  const exactVersionUrls = [
    '../foo/bar',
    '~/foo/bar',
    './foo/bar',
    '/foo/bar',
  ].map(url => `file:${url}`);

  exactVersionUrls.forEach(version => {
    t.true(nxv.isExactVersion(version));
  });
});

test('should accept tarball URLs', async t => {
  const exactVersionUrls = ['http://asdf.com/asdf.tar.gz'].map(
    url => `file:${url}`,
  );

  exactVersionUrls.forEach(version => {
    t.true(nxv.isExactVersion(version));
  });
});
