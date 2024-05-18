const version = '0.0.1';
const simpleGit = require('simple-git');
const path = require('path');

//const USER = 'a';
//const PASS = 'somewhere';
const REPO = 'github.com/Alexander-94/node-git-push';
const SSH_KEY = path.resolve('node-git-push-key')
const GIT_SSH_COMMAND = `ssh -i ${SSH_KEY}`;


async function cloneRepo() {
    console.log('node-git-push has started.');
    //console.log(GIT_SSH_COMMAND)
    const git = simpleGit.default().env('GIT_SSH_COMMAND', GIT_SSH_COMMAND)
    
    await git.pull(REPO);

    console.log('node-git-push has finished.');
}

cloneRepo();
