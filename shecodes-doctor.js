var plugins = ['sshcheck','vimrccheck']

function print(feedback) {
    console.log(feedback.preface);
    if (feedback.errormessages.length > 0) {
        console.log(feedback.errormessages.join('\n'));
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

