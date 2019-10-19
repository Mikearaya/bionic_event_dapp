pragma solidity ^0.5.0;

import './erc20.sol';

contract Event is ERC20 {
    
    string public name;
    uint256 public startDate;
    uint256 public endDate;
    uint256 public available;
    string location;
    uint ticketPrice;
    address payable public  owner;

    constructor(address payable _organizer, string memory _name, uint _start, uint _end,  uint supply, uint _ticketPrice) public {
        require(now < _start);
        require(_start > _end);
        name = _name;
        startDate = _start;
        endDate = _end;
        ticketPrice = _ticketPrice;
        available = supply;
        owner = _organizer;
        _mint(_organizer, supply);
    }


    function purchaseTicket(uint quantity) public payable {
        require(quantity <= available, "Required amount of ticket is not available for sale");
        require(msg.value >= ticketPrice.mul(quantity), "not enough money sent");
        _approve(owner, msg.sender, quantity);
        transferFrom(owner, msg.sender, quantity );
        owner.transfer(msg.value);
        available = available.sub(quantity);        
    }


    function transferTicket(address reciepent, uint quantity) public {
        require(balanceOf(msg.sender) >= quantity, "you dont have required ticket quantity to transfer");
        transfer(reciepent, quantity);
    }

}