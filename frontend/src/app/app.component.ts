declare var require: any;
import { Component, HostListener, NgZone, OnInit } from "@angular/core";
import { Web3Service } from "./ethereum/web3.service";
const Web3 = require("web3");
const contract = require("truffle-contract");
const eventFactoryArtifacts = require("../../../build/contracts/EventFactory.json");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  Coin = contract(eventFactoryArtifacts);
  coinInstance: any;

  account: any;
  accounts: any;

  constructor(private ethereumApi: Web3Service) {}

  async ngOnInit() {
    this.Coin.setProvider(this.ethereumApi.web3.currentProvider);
    const deployedFac = await this.Coin.deployed();

    this.account = this.ethereumApi.account;

    const eventsList = await deployedFac.getDeployedEvents();
  }

  callEventFactory(): void {
    const c = this.Coin.deployed();
    alert(JSON.stringify(c));
  }
}
