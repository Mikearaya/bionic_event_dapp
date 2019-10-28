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
    bool public allTransfer;

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

    function transferTicket(address _to, uint _tokenId) public {
        require(allowTransfer);
        require(address(0) != _to);
        transferFrom(msg.sender, _to, _tokenId);
    }

    function getOwnersTicket(address _owner) public view returns(uint[] memory) {
        return _tokensOfOwner(_owner);
    }


    function isTicketValid(address _owner, uint _tokenId)public returns(bool) {
        if(ownerOf(_tokenId) == _owner) {
            _burn(_tokenId);
            return true;
        }  else {
            return false;
        }
    }

    function allowTransfer() public {
        allowTransfer = !allowTransfer;
    }

}