var fs = require("fs");
var path = require("path");

var sshDir = path.join(process.env.HOME, '.ssh/');
var sshPrivate = path.join(sshDir, 'id_rsa');
var sshPublic = path.join(sshDir, 'id_rsa.pub');
var sshPaths = [sshDir, sshPrivate, sshPublic];

function getSSHSettings(){
    function toOctal(mode) {
      var octal = mode & 4095 /* 07777 */;
      return parseInt((octal.toString(8)));
    }
    var SSH = [];
    try {
        for (var i=0; i<sshPaths.length; ++i) {
            SSH.push(toOctal((fs.statSync(sshPaths[i])).mode)); 
        } 
    }
    catch (e) {
        var cross = String.fromCharCode(10060);
        var message = cross + " It seems you don't yet have SSH keys. Please create them (instructions here, for example: https://help.github.com/articles/generating-ssh-keys/) and set the permissions using these commands";
       throw new Error(message); 
    }
    return SSH;
}
        
function checkSSHSettings(SSH){
    var correctSSH = [700, 600, 644];
    var errormessage = [];
    if (SSH.length === 0) {
        for (var j=0; j<correctSSH.length; ++j) {
                errormessage.push('sudo chmod '+correctSSH[j]+' '+sshPaths[j]);
            }
    } else {
        for (var i = 0; i<SSH.length; ++i) {
            if (SSH[i] != correctSSH[i]) {
                errormessage.push('    sudo chmod '+correctSSH[i]+' '+sshPaths[i]);
            }
        }
    }
    return errormessage;
}
function getPreface(messages) {
    if (messages.length === 0) {
        var checkmark = String.fromCharCode(10004);
        return checkmark +" Your SSH settings are correct.";
    } else {
        return "Please fix your SSH setting with the following commands: ";
    }
}

function getReport() {
    var preface = '';
    var settings = [];
    try {
        settings = getSSHSettings();
    } catch(e) {
        preface = e.message;
    }
    var messages = checkSSHSettings(settings);
    if (preface === '') {
       preface = getPreface(messages);
    }
    return {preface: preface,
        errormessages: messages};
}

module.exports = {
    checkSSHSettings: checkSSHSettings,
    getReport: getReport
};
