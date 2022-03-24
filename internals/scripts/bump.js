const shell = require('shelljs');
var readline = require('readline');

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


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Do you want to push? (Y/n)', function(answer) {
    switch(answer.toLowerCase()) {
        case 'y':
        case 'yes':
        case '':
            shell.exec('git push origin HEAD --tags');
            break;
    }
    rl.close();
});

rl.on('close', function () {
    process.exit(0);
});
