// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Greet.sol";


contract GreetTest {
  function testSetGreet() public {
    Greet cont = new Greet();

    Assert.equal(cont.greet(), "Hello", "greet are not Hello after creation");

    cont.setGreet("Hi");
    Assert.equal(cont.greet(), "Hi", "greet are not Hi after setGreet to Hi");
  }

  function testGreetings() public {
    Greet cont = new Greet();

    Assert.equal(
      cont.greetings("Konstantin"), "Hello Konstantin",
      "greetings are not 'Hello Konstantin'");
  }
}