pragma solidity ^0.5.0;
import "./ERC721Full.sol";

contract Event is ERC721Full {

    string public name;
    uint256 public startDate;
    uint256 private ticketId;
    uint256 public endDate;
    uint256 public available;
    uint8 private MAX_PURCHASE = 5;
    string location;
    bool canceled;
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
        require(available  >= quantity, "not enough ticket quantity available!!!");
        require(msg.value >= ticketPrice.mul(quantity), "not enough money sent");
        require(quantity <= MAX_PURCHASE, "can not purchase more than 5 ticket at once");
        for(uint8 i = 0; i < quantity; i++) {
            ticketId++;
            available--;
            _mint(msg.sender,ticketId);
        }
    }

    function transferTicket(address _to, uint _tokenId) public {
    require(address(0) != _to, "invalid address provided");
    transferFrom(msg.sender, _to, _tokenId);
    }


    function isTicketValid(address _owner, uint _tokenId) onlyOwner public returns(bool) {
        if(ownerOf(_tokenId) == _owner) {
            _burn(_tokenId);
            return true;
        }  else {
            return false;
        }
    }

  function cancelEvent() onlyOwner public {
      require(now > startDate, "can not cancel event after it has started");
      canceled = true;
  }

    function getOwnersTicket(address _owner) public view returns(uint[] memory) {
        return _tokensOfOwner(_owner);
    }

    function collectPayment() onlyOwner public {
        require(now > endDate && !canceled, "can not collect payment before the event is over");
        owner.transfer(address(this).balance);
    }

    function getRefund() public {
        require(address(0) != msg.sender, "invalid address provided");
        require(canceled, "refund is only available for cacanceled events");
        uint[] memory tokens = _tokensOfOwner(msg.sender);

        require(tokens.length > 0, "no tokens found under the given user");
        for(uint8 i = 0; i < tokens.length; i++) {
            _burn(tokens[i]);
        }
        msg.sender.transfer(ticketPrice.mul(tokens.length));

    }

      modifier onlyOwner {
        require(msg.sender == owner, "only event owner is allowed to perform this action");
        _;
    }

}
