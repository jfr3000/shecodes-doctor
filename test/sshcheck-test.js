var Lab = require('lab');
var lab = exports.lab = Lab.script();
var checkSSHSettings = require('../lib/sshcheck').checkSSHSettings;
var expect = require('expect');


var correctSSH = ['700', '600', '644'];
var incorrectSSH = ['600', '700', '700'];
lab.test('checkSSHSettings should work correctly', function(done) {
    expect(checkSSHSettings(correctSSH)).toEqual([]);
    expect(checkSSHSettings(incorrectSSH)[0]).toMatch(/sudo chmod 700 .*\.ssh\//g);
    expect(checkSSHSettings(incorrectSSH)[1]).toMatch(/sudo chmod 600 .*\.ssh\/id_rsa/g);
    expect(checkSSHSettings(incorrectSSH)[2]).toMatch(/sudo chmod 644 .*\.ssh\/id_rsa.pub/g);
    expect(checkSSHSettings(incorrectSSH)[2]).toMatch(/sudo chmod 644 .*\.ssh\/id_rsa.pub/g);
    done();
});
