var Lab = require('lab');
var lab = exports.lab = Lab.script();
var checkArray = require('../lib/vimrccheck').checkArray;
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
    expect(checkArray(correctVimrc).length).toEqual(1);
    expect(checkArray(correctVimrc)).toContain(e);
    expect(checkArray([])).toContain(a, b, c, d, e);
    expect(checkArray(incorrectVimrc)).toContain(b, d, e);
    done();
});

