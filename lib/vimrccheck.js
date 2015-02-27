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
module.exports = {
    getFileContent: getFileContent,
    vimrcFile: vimrcFile,
    checkArray: checkArray,
    printMessage: printMessage
};
