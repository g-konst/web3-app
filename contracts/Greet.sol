// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Greet {
  string public greet = "Hello";

  event GreetChanged(string oldGreet, string newGreet);
  event GreetingsRequested(string _greetings);

  function greetings(string memory name) public returns (string memory _greetings) {
    _greetings = string.concat(greet, " ", name);
    emit GreetingsRequested(_greetings);
    return _greetings;
  }

  function setGreet(string calldata newGreet) public {
    emit GreetChanged(greet, newGreet);

    greet = newGreet;
  }
}
