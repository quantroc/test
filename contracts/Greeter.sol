pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    address public owner;
    constructor() ERC20("TestToken", "TEST") {
        _mint(msg.sender, 1000000 * (10 ** decimals()));
        owner = msg.sender;
    }
}