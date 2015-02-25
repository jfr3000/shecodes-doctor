var Lab = require('lab');
var lab = exports.lab = Lab.script();
var convert = require('./shecodes-doctor');
var expect = require('expect');

var correctVimrc = ['set expandtab', 'set tabstop=4', 'set softtabstop=4', 'set shiftwidth=4'];

var incorrectVimrc = ['set expandtab', 'set softtabstop=4'];
//var outputTwo = ['set tabstop=4', 'set shiftwidth=4']; 
//var completeOutput =['set expandtab', 'set tabstop=4', 'set softtabstop=4', 'set shiftwidth=4'];
var a = 'set expandtab';
var b = 'set tabstop=4';
var c = 'set softtabstop=4';
var d = 'set shiftwidth=4';
var e = 'You should make the following additions or corrections in your .vimrc file, making sure there is no whitespace after the equals sign:';

lab.test('checkArray should work correctly', function(done) {
    expect(convert.checkArray(correctVimrc).length).toEqual(1);
    expect(convert.checkArray(correctVimrc)).toContain(e);
    expect(convert.checkArray([])).toContain(a, b, c, d, e);
    expect(convert.checkArray(incorrectVimrc)).toContain(b, d, e);
    done();
});

var correctSSH = ['700', '600', '644'];
var incorrectSSH = ['600', '700', '700'];
lab.test('checkSSHSettings should work correctly', function(done) {
    expect(convert.checkSSHSettings(correctSSH)).toEqual([]);
    expect(convert.checkSSHSettings(incorrectSSH)[0]).toMatch(/sudo chmod 700 .*\.ssh\//g);
    expect(convert.checkSSHSettings(incorrectSSH)[1]).toMatch(/sudo chmod 600 .*\.ssh\/id_rsa/g);
    expect(convert.checkSSHSettings(incorrectSSH)[2]).toMatch(/sudo chmod 644 .*\.ssh\/id_rsa.pub/g);
    expect(convert.checkSSHSettings(incorrectSSH)[2]).toMatch(/sudo chmod 644 .*\.ssh\/id_rsa.pub/g);
    done();
});
