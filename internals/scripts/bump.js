const shell = require('shelljs');

const acceptedArguments = ["patch", "minor", "major", "preminor", "premajor"];
const versionArgument = process.argv[2];

if(!acceptedArguments.includes(versionArgument)) {
    console.error("Invalid version argument.");
    process.exit(1);
}

shell.exec('yarn version ' +versionArgument )

const packageVersion = require('../../package.json').version;
const tag = 'v' + packageVersion;
const releaseMessage = 'Release ' + tag;

shell.exec('git commit package.json -m "' + releaseMessage + '"');
shell.exec('git tag -a -m "' + releaseMessage + '" ' + tag);
shell.echo('Push with: git push origin master --tags');
