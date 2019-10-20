pragma solidity ^0.5.0;
import "./ERC721Full.sol";

contract Event is ERC721Full {
    
    string public name;
    uint256 public startDate;
    uint256 public endDate;
    uint256 public available;
    string location;
    uint ticketPrice;
    address payable public  owner;

    constructor(address payable _organizer, string memory _name, uint _start, uint _end,  uint supply, uint _ticketPrice) ERC721Full(_name, "TKT") public {
        name = _name;
        startDate = _start;
        endDate = _end;
        ticketPrice = _ticketPrice;
        available = supply;
        owner = _organizer;
    }


    function purchaseTicket(uint quantity) public payable {
        require(msg.value >= ticketPrice.mul(quantity), "not enough money sent");
        _mint(msg.sender,now);
        owner.transfer(msg.value);      
    }




}