pragma solidity ^0.4.17;

contract Inbox{
    string public message;

    // If a function exists with same name as contract then it's a constructor
    function Inbox(string initialMessage) public{
        message = initialMessage;
    }

    function setMessage(string newMesage) public{
        message = newMesage;
    }
}
