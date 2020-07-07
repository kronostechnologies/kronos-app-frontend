const shell = require('shelljs');
const Confirm = require('prompt-confirm');
const typeArgument = `${process.argv[process.argv.length - 1]}`.trim().toLowerCase();

let type;
if (['major', 'minor', 'patch', 'preminor', 'prepatch'].includes(typeArgument)) {
    type = typeArgument;
} else {
    shell.echo(`Unknown version type ${typeArgument}.`);
    process.exit(1);
}

shell.exec('rm -f .yarn/versions/*');

shell.exec(`yarn version ${type}`);
const { version } = require('../../package.json');

shell.echo(`Version bumped to ${version}.`);

const tag = 'v' + version;
const releaseMessage = 'Release ' + tag;
shell.exec(`git commit package.json -m "${releaseMessage}"`);
shell.exec(`git tag -a -m "${releaseMessage}" ${tag}`);

const prompt = new Confirm('Do you want to push?');
prompt.run().then(result => {
    if(result) {
        shell.exec('git push origin HEAD --tags');
    }
})
