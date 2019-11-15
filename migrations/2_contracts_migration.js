const Migrations = artifacts.require("Migrations");
const EventFactory = artifacts.require("EventFactory");

module.exports = function(deployer) {
  deployer.deploy(Migrations, { overwrite: false });
  deployer.deploy(EventFactory, { overwrite: false });
};
