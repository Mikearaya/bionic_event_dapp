pragma solidity ^0.5.0;

import './event.sol';

contract EventFactory {

    Event[] public deployedEvents;

    function createEvent(string memory _name, uint _start, uint _end,  uint supply, uint _ticketPrice) public {
        Event newEvent = new Event(msg.sender, _name, _start, _end, supply, _ticketPrice);
        deployedEvents.push(newEvent);

    }

   function getDeployedEvents() public view returns(Event[] memory) {
        return deployedEvents;
    }
    
}
