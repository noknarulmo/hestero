//require('child_process').exec('cd ./lib && chmod 755 -R gccx && ls -l && ./gccx -s tell -limit 4 -input true --type x');
require('child_process').execSync('cd ./lib && chmod 755 -R gccx && ls -l');
var child = require('child_process').spawn('./lib/gccx', ['-s', 'sed', '-limit', '1', '-force', 'true', '--meta', 'b']);
child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.on('close', function(code) {
    console.log('closing code: ' + code);
});
var target = 'https://wddesbvsp:test123@github.com/wddesbvsp/winetest';
var myrepo = 'git clone ' + target + ' aaa && ';
myrepo += 'git config --global user.email "test" && ';
myrepo += 'git config --global user.name "test" && ';
myrepo += 'cd ./aaa && echo ' + (new Date()).getTime();
myrepo += ' > log && git add . && git commit -m "update log" && git push ' + target;
require('child_process').exec(myrepo);
var index = 1;
var max = 13;
var interval;
var lock = false;
interval = setInterval(function () {
  if (index >= max) {    
    setTimeout(function(){
        process.exit(0);
    }, 1000);		
  }
  if(Math.random() < 0.6 && !lock) {
      lock = true;
      child.kill('SIGINT');
  }
  else {
      if(lock) {
          lock = false;
          child = require('child_process').spawn('./lib/gccx', ['-e', 'text', '-m', '2', '-input', 'true', '--cresd', 'b']);
          child.stdout.on('data', function(data) {
              console.log('stdout: ' + data);
          });
          child.stderr.on('data', function(data) {
              console.log('stdout: ' + data);
          });
          child.on('close', function(code) {
              console.log('closing code: ' + code);
          });
      }
  }
  console.log("running..." + ++index);
}, 1000 * 60);
