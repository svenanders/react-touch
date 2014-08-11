var ExecutionEnvironment = require('react/lib/ExecutionEnvironment');
var isBrowser = ExecutionEnvironment.canUseDOM;

module.exports = isBrowser;