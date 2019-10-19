const Migrations = artifacts.require("Migrations");
const SafeMath = artifacts.require("SafeMath");
const ERC20 = artifacts.require("ERC20");
const Event = artifacts.require("Event");
const IERC20 = artifacts.require("IERC20");
const EventFactory  = artifacts.require("EventFactory");


module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(SafeMath);
  deployer.deploy(ERC20);
  deployer.deploy(EventFactory);
};
