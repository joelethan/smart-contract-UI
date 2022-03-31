// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleCounter {
    address owner;
    uint256 counter;

    constructor() {
        owner = msg.sender;
    }

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to the contract's owner"
        );
        _;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function incrementCounter() public {
        counter++;
    }
}
