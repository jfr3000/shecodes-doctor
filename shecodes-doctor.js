var sshcheck = require('./lib/sshcheck');
var vimrccheck = require('./lib/vimrccheck');


//All together now.
function shecodesdoctor() {
    print(vimrccheck.getReport());
    print(sshcheck.getReport());
}

function print(feedback) {
    console.log(feedback.preface);
    console.log(feedback.errormessages.join('\n'));
}

shecodesdoctor();


