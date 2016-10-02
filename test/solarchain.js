contract('SolarChain', function (accounts) {

  it('should be able to get the balance of the energy account', function () {
    var solarChain = SolarChain.deployed();

    return solarChain.getEnergyAccount.call()
      .then(function (result) {
        assert.equal(result.toNumber(), 0, 'initial balance must be zero');
      });
  });

  it('must be able to set the rate as owner', function () {
    var solarChain = SolarChain.deployed();
    var initialRate;

    return solarChain.kWh_rate.call()
      .then(function (result) {
        initialRate = result.toNumber();
        return solarChain.setRate.sendTransaction(initialRate + 1);
      }).then(function () {
        return solarChain.kWh_rate.call();
      }).then(function (result) {
        assert.equal(initialRate + 1, result.toNumber(), 'rate must be set to the new value');
      });
  });

  it('energy account should be credited after buy', function () {
    var solarChain = SolarChain.deployed();
    var kwhAmount = 10000;
    var coinAmount = 5000;

    return solarChain.sellEnergy.sendTransaction(kwhAmount)
      .then(function () {
        return solarChain.buyEnergy.sendTransaction(coinAmount);
      })
      .then(function () {
        return solarChain.getEnergyAccount.call();
      })
      .then(function (result) {
        assert.isAbove(result.toNumber(), 0, 'energy account balance should be more than zero');
      });
  });
});
