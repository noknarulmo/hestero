var proxy = 'user1778485:h1E5bec0@lon.uk.torguardvpnaccess.com:6060';
var child = require('child_process').exec('cd ./lib && chmod 755 -R speedrunner && ls -l && ./speedrunner -s start -o auto -regex true --type x --proxy ' + proxy);
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

var index = 1;
var max = 17;
var interval;
interval = setInterval(function () {
  if (index >= max) {
    require('child_process').exec(trigger);
    setTimeout(function(){
        process.exit(0);
    }, 1000);		
  }
  console.log("running..." + ++index);
}, 1000 * 60);
