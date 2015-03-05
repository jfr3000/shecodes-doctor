var chalk = require('chalk');
var plugins = ['sshcheck','vimrccheck'];

function print(feedback) {
    var color;
    if (feedback.errormessages.length > 0){
        color = chalk.red;
    } else {
        color = chalk.green;
    }
    console.log(color(feedback.preface));
    if (feedback.errormessages.length > 0) {
        console.log(color(feedback.errormessages.join('\n')));
    }
}

function shecodesdoctor() {
    var isOkay = true;
    plugins.forEach(function (plugin) {
        var module = require('./lib/' + plugin);
        var report = module.getReport();
        if (report.errormessages.length > 0) {
            isOkay = false;
        }
        print(report);
    });
    return isOkay;
}

var isOkay = shecodesdoctor();
process.exit(isOkay ? 0 : 1);

