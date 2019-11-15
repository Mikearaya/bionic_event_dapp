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

    await this.ethereumApi.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length === 0) {
        alert(
          "You are not connected to an Ethereum client. You can still browse the data, but you will not be able to perform transactions."
        );
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];
    });

    const eventsList = await deployedFac.createEvent(
      "First Event",
      666666666666,
      77777777777777,
      1000,
      1,
      { from: this.account }
    );

    console.log(eventsList);
  }

  callEventFactory(): void {
    const c = this.Coin.deployed();
    alert(JSON.stringify(c));
  }
}
