var fs = require("fs");
var path = require("path");

var vimrcFile = path.join(process.env.HOME, '.vimrc');
var filecontent;


function getFileContent(vimrcFile) {
    try {
        var test = fs.readFileSync(vimrcFile, 'UTF8');
    }
    catch (e) {
        var error = "It seems you don't yet have a .vimrc file. Please create one and put the following lines in it, then rerun this program to make sure everything is correct: set expandtab, set tabstop=4, set softtabstop=4, set shiftwidth=4";
        return error;
    }
    var vimrclines = fs.readFileSync(vimrcFile, 'UTF8').split('\n');
    return vimrclines;
}

function checkArray(vimrclines) {
    var testCases = [
        {
            regexp: /set\s+expandtab/g,
            error: "set expandtab",
        },
        {
            regexp: /set\s+tabstop\s*=4/g,
            error: "set tabstop=4"
        },
        {
            regexp: /set\s+softtabstop\s*=4/g,
            error: "set softtabstop=4"
        },
        {
            regexp: /set\s+shiftwidth\s*=4/g,
            error: "set shiftwidth=4"
        }
    ];
    var errormessage = ["You should make the following additions or corrections in your .vimrc file, making sure there is no whitespace after the equals sign:"];
    testCases.forEach(function(testCase){
        var seen = false;
        for (var i=0; i<vimrclines.length; i++) {        
            if (testCase.regexp.test((vimrclines[i]).trim())) {
                seen = true;
            }
        }
        if (!seen) {
            errormessage.push(testCase.error);   
        }
    });
    return errormessage;
}

function printMessage(errormessage) {
    if (errormessage.length === 1) {
        console.log("Congratulations! Your .vimrc file is in ship shape!");
    } else { 
        console.log(errormessage.join('\n'));
    }
}

//for checking SSH permissions
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

//All together now.
function shecodesdoctor() {
    printMessage(checkArray(getFileContent(vimrcFile)));
    printSSHMessage(checkSSHSettings(getSSHSettings()));
}

shecodesdoctor();

module.exports = {
    getFileContent: getFileContent,
    vimrcFile: vimrcFile,
    checkArray: checkArray,
    printMessage: printMessage,
    shecodesdoctor: shecodesdoctor,
    checkSSHSettings: checkSSHSettings
};

