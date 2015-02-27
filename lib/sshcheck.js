var fs = require("fs");
var path = require("path");

var sshDir = path.join(process.env.HOME, '.ssh/');
var sshPrivate = path.join(sshDir, 'id_rsa');
var sshPublic = path.join(sshDir, 'id_rsa.pub');
var sshPaths = [sshDir, sshPrivate, sshPublic];

function getSSHSettings(){
    function toOctal(mode) {
      var octal = mode & 4095 /* 07777 */;
      return (octal.toString(8)).slice(-4);
    }
    var SSH = [];
    for (var i=0; i<sshPaths.length; ++i) {
        SSH.push(toOctal((fs.statSync(sshPaths[i])).mode)); 
    } 
    return SSH;
}
        
function checkSSHSettings(SSH){
    var correctSSH = ['700', '600', '644'];
    var errormessage = [];
    for (var i = 0; i<SSH.length; ++i) {
        if (SSH[i] != correctSSH[i]) {
            errormessage.push('sudo chmod '+correctSSH[i]+' '+sshPaths[i]);
        }
    }
    return errormessage;
}

function printSSHMessage(errormessage) {
    if (errormessage.length === 0) {
        console.log("Everything is fine! Happy SSH'ing!");
    } else {
        errormessage.unshift("Please fix your SSH setting with the following commands: ");
        console.log(errormessage.join('\n'));
    }
}
module.exports = {
    checkSSHSettings: checkSSHSettings,
    printSSHMessage: printSSHMessage,
    getSSHSettings: getSSHSettings
};
