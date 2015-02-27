var sshcheck = require('./lib/sshcheck');
var vimrccheck = require('./lib/vimrccheck');


//All together now.
function shecodesdoctor() {
    vimrccheck.printMessage(vimrccheck.checkArray(vimrccheck.getFileContent(vimrccheck.vimrcFile)));
    sshcheck.printSSHMessage(sshcheck.checkSSHSettings(sshcheck.getSSHSettings()));
}

shecodesdoctor();


