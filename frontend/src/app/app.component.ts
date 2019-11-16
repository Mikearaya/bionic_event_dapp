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
  account: any;
  accounts: any;

  constructor(private ethereumApi: Web3Service) {}

  ngOnInit() {
    this.account = this.ethereumApi.account;
  }

  callEventFactory(): void {}
}
