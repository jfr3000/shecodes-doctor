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

lab.test('checkArray returns an empty array when there are no problems', function(done) {
    expect(checkArray(correctVimrc).length).toEqual(0);
    done();
});
lab.test('checkArray returns the correct error messages', function(done) {
    expect(checkArray([])).toContain(a, b, c, d);
    expect(checkArray(incorrectVimrc)).toContain(b, d);
    done();
});

