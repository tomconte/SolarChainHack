var Web3 = require('web3');

module.exports = function(callback) {
  var temperature, brightness;

  /*
  ** Read from serial port & update module variables
  */

  var SerialPort = require("serialport");

  // Open port
  var sp = new SerialPort("/dev/ttyACM0", {
    parser: SerialPort.parsers.readline("\r\n")
  }, function(err) {
    if (err) {
      // Setting up some defaults just for testing
      temperature = 42;
      brightness = 33;
      return console.log('Error: ', err.message, '\nSetting hard-coded values for testing');
    }
  });

  // Once open, listen for incoming data
  sp.on('open', function(){
    console.log('Serial Port Opened');
    sp.on('data', function(data){
      var v = data.split(':');
      switch (v[0]) {
        case 'C':
          temperature = v[1];
          break;
        case 'B':
          brightness = v[1];
          break;
      }
    });
  });

  /*
  ** Ethereum blockchain setup
  */

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    // Get contract instance
    var contract = SolarChain.deployed();

    // Sell some energy
    setInterval(function() {
      console.log("Selling " + brightness + " kW/h");
      contract.sellEnergy(brightness);
    }, 5000);
  });
}