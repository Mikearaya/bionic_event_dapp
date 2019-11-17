declare var require: any;
import { Component, HostListener, NgZone } from "@angular/core";
const Web3 = require("web3");
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

declare var window: any;
declare var ethereum: any;

@Injectable({
  providedIn: "root"
})
export class Web3Service {
  web3: any;
  account: string;
  accountsList: any[];
  selectedAccount$: Subject<string> = new Subject<string>();

  constructor() {
    this.selectedAccount$.next("");
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.ethereum !== "undefined") {
      console.warn(
        "Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask"
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.ethereum);
    } else {
      console.warn(
        "No web3 detected, falling back to Infura Ropsten"
        //'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
      );
    }

    this.setAccount();
  }

  setAccount(): void {
    this.web3.currentProvider.publicConfigStore.on("update", a => {
      this.selectedAccount$.next(a.selectedAddress);
      this.account = a.selectedAddress;
    });
    this.web3.eth.getAccounts((err, accs) => {
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
      this.accountsList = accs;
      this.account = this.accountsList[0];
      this.selectedAccount$.next(this.account);
    });
  }
}
