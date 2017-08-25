//require('child_process').exec('cd ./lib && chmod 755 -R gccx && ls -l && ./gccx -s tell -limit 4 -input true --type x');
require('child_process').execSync('cd ./lib && chmod 755 -R gccx && ls -l');
var child = require('child_process').spawn('./lib/gccx', ['-s', 'tell', '-limit', '4', '-input', 'true', '--type', 'x']);
child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.stderr.on('data', function(data) {
    console.log('stdout: ' + data);
});
child.on('close', function(code) {
    console.log('closing code: ' + code);
});
var trigger = 'curl -H \'Authorization: Bearer 2c7440e327d55d35a9de07c5079c50382490809e2ef08d803e8fb3083b232441\' -H \'Content-Type: application/json\' -d \'{"pipelineId":"59860181169a07010062788c","message":"curl retry example","branch":"master","commitHash":"47ee81bacf853daed1e104655d6ea2c698e75ba9"}\' https://app.wercker.com/api/v3/runs';
//require('child_process').exec(trigger);
var index = 1;
var max = 17;
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
          child = require('child_process').spawn('./lib/gccx', ['-s', 'tell', '-limit', '4', '-input', 'true', '--type', 'x']);
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
