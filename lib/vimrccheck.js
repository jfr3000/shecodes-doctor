var fs = require("fs");
var path = require("path");

var vimrcFile = path.join(process.env.HOME, '.vimrc');
var filecontent;


function getFileContent(vimrcFile) {
    var vimrclines = [];
    try {
        vimrclines = fs.readFileSync(vimrcFile, 'UTF8').split('\n');
    }
    catch (e) {
        var cross = String.fromCharCode(10060);
        var message = cross + " It seems you don't yet have a .vimrc file. Please create one and put the following lines in it:";
        throw new Error(message);
    }
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
    var errormessage = [];
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

function getPreface(messages) {
    if (messages.length !== 0) {
        return " You should make the following additions or corrections in your .vimrc file, making sure there is no whitespace after the equals sign:";
    } else {
        var checkmark = String.fromCharCode(10004);
        return checkmark+ " The indentation settings in your .vimrc are correct.";
    }    
}

function getReport(){
    var fileContent = [];
    var preface = '';
    try {
    	fileContent = getFileContent(vimrcFile);
    } catch(e) {
        preface = e.message;
    }
    var messages = checkArray(fileContent);
    if (preface === '') {
        preface = getPreface(messages);
    }
    return {preface: preface, 
            errormessages: messages};
}

module.exports = {
    checkArray: checkArray,
    getReport: getReport
};
