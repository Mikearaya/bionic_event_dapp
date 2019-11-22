declare var require: any;
import { Component, HostListener, NgZone, OnInit } from "@angular/core";
import { Web3Service } from "./ethereum/web3.service";
import { Subject } from "rxjs";
const Web3 = require("web3");
const contract = require("truffle-contract");
const eventFactoryArtifacts = require("../../../build/contracts/EventFactory.json");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  account: Subject<string>;
  currentAccount: string;

  constructor(private ethereumApi: Web3Service, private zone: NgZone) {
    this.account = this.ethereumApi.selectedAccount$;
  }

  ngOnInit() {
    this.ethereumApi.selectedAccount$.subscribe(ac => {
      this.currentAccount = ac;
      this.zone.run(() => {
        this.currentAccount = ac;
      });
      console.log("changed");
    });
  }

  callEventFactory(): void {}
}
