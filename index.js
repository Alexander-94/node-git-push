const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const REPO = 'github.com/Alexander-94/node-git-push';
const SSH_KEY = path.resolve('node-git-push-key');
const GIT_SSH_COMMAND = `ssh -i ${SSH_KEY}`;
const VERSION_FILE = 'version.json';

async function cloneRepoUpdateVersionAndPush() {
    console.log('node-git-push has started.');

    const git = simpleGit
        .default()
        .env('GIT_SSH_COMMAND', GIT_SSH_COMMAND)
    await git.pull(REPO);

    let jsonVersion = null;
    try {
        const content = fs.readFileSync(VERSION_FILE, "utf-8");
        jsonVersion = JSON.parse(content);
    } catch (error) {
        const msg = 'Error reading version file.';
        console.error(msg);
        throw error;
    }

    console.log(jsonVersion);

    const versionArray = jsonVersion.version.split(".");

    let firstNumber = versionArray.at(-3);
    let secondNumber = versionArray.at(-2);
    let thirdNumber = versionArray.at(-1);

    thirdNumber++;
    let version = firstNumber + "." + secondNumber + '.' + thirdNumber;
    console.log(version);
    let jsonVersionNew = {
        version
    }

    console.log(jsonVersionNew);
    fs.writeFile(VERSION_FILE, JSON.stringify(jsonVersionNew, null, 4), function (err) {
        if (err) {
            const msg = 'Error writing version file.';
            console.error(msg);
            throw err;
        }
    });

    git.add(VERSION_FILE, function (err) {
        if (err) {
            const msg = 'Error adding file.';
            console.error(msg);
            throw err;
        }
    });
    git.commit('Update ' + VERSION_FILE + ' to ' + version, function (err) {
        if (err) {
            const msg = 'Error commit file.';
            console.error(msg);
            throw err;
        }
    });
    git.push(function (err) {
        if (err) {
            const msg = 'Error push file.';
            console.error(msg);
            throw err;
        }
    });

    console.log('node-git-push has finished.');
}

cloneRepoUpdateVersionAndPush();
