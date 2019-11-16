pragma solidity ^0.5.0;

import './Event.sol';

contract EventFactory {

    Event[] public deployedEvents;
    event eventCreated(Event _address, string _name, uint _ticketPrice, string location, uint startDate, uint endDate);
    
    function createEvent(string memory _name, uint _start, uint _end,  uint supply, uint _ticketPrice, string memory _description, string memory _location) public  {
        address payable sender = msg.sender;
        Event newEvent = new Event(sender, _name, _start, _end,_description, _location, supply, _ticketPrice );
        deployedEvents.push(newEvent);
        emit eventCreated(newEvent, _name, _ticketPrice, _location, _start, _end);

    }

   function getDeployedEvents() public view returns(Event[] memory) {
        return deployedEvents;
    }
    
}
