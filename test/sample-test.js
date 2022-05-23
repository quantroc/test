const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestToken contract", function () {
  //let totalSupply = '10000000000000000000000'; // 10000 * 1e18
  let totalSupply = '1000000';
  let Token;
  let testToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("TestToken");

    testToken = await Token.deploy();
    await testToken.deployed;

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    
  });

  // You can nest describe calls to create subsections.
  describe("Deployment", function () {

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await testToken.balanceOf(owner.address);
      expect(await testToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Check name of token = Test Token", async function() { //kiem tra name token
      const nameToken = "TestToken"
      expect(await testToken.name()).to.equal(nameToken);
    });

    it("Check symbol of token = TEST", async function() {// kiem tra symbol
      const symbolToken = "TEST"
      expect(await testToken.symbol()).to.equal(symbolToken);
    });

    it("Check owner", async function() {
      expect(await testToken.owner()).to.equal(owner.address);
    });
  });

  describe("Transcation",function () {
    it("Should transfer tokens from admin to contract", async function () { // check transfer
      //const ownerBalance = await testToken.balanceOf(owner.address);

      await testToken.transfer(addr1.address, ethers.utils.parseEther("100000"));
      expect(await testToken.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100000"));
    });

    it("Should transfer tokens from add1 to add2", async function() { // check transfer from
      await testToken.connect(addr1).approve(owner.address, ethers.utils.parseEther("100"));
      await testToken.transfer(addr1.address, ethers.utils.parseEther("100"));
      await testToken.transferFrom(addr1.address, addr2.address, ethers.utils.parseEther("100"));
      expect(await testToken.balanceOf(addr2.address)).to.equal(ethers.utils.parseEther("100"));
    });
    
    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await testToken.balanceOf(owner.address);

      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        testToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await testToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});