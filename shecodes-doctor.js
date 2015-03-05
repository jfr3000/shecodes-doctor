var chalk = require('chalk');
var plugins = ['sshcheck','vimrccheck'];
var feedback = [];

function assembleFeedback() {
    var i =0;
    plugins.forEach(function (plugin) {
        var module = require('./lib/' + plugin);
        report = module.getReport();
        feedback[i] = {preface: report.preface, type: 'good'};
        if (report.errormessages.length > 0) {
            feedback[i].messages = report.errormessages.join('\n');
            feedback[i].type = 'bad';
        }
        ++i;
    });
    return feedback;
}

function print(feedback) {
    var allGood = true;
    var allWrong = false;
    var counter = 0;
    var positiveFeedback = [];
    var negativeFeedback = [];
    for (i=0; i<feedback.length; ++i) {
        if (feedback[i].type === 'bad') {
            allGood = false;
            counter += 1;
        }
    }
    if (counter === feedback.length) {allWrong = true;}
    if (allGood) {
        console.log(chalk.green("Yay! All is well:"));
        for (i=0; i<feedback.length; ++i) {
            console.log(chalk.green(feedback[i].preface));
        }
    } else if (allWrong){
        console.log("Let's put it like this: There's lots of potential for improvement!");
        for (i=0; i<feedback.length; ++i) {
            console.log(chalk.red(feedback[i].preface+'\n'+arrayOfObjects[i].messages));
        }    
    } else {
        console.log("So we have some good and some bad news for you: ");
        for (i=0; i<feedback.length; ++i) {
            if (feedback[i].type === 'good') {
                positiveFeedback.push(feedback[i]);
            } else {
                negativeFeedback.push(feedback[i]);
            }   
        } 
    }
    positiveFeedback.forEach(function(item) {
        console.log(chalk.green(item.preface));

    });
    negativeFeedback.forEach(function(item){
        console.log(chalk.red(item.preface+'\n'+item.messages));
    });
}

function shecodesdoctor() {
    var isOkay = true;
    print(assembleFeedback());
    if (report.errormessages.length > 0) {
            isOkay = false;
        }
    return isOkay;
}

var isOkay = shecodesdoctor();
process.exit(isOkay ? 0 : 1);

