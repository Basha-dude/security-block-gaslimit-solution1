const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("DoS", function () {
  let deployer, attacker, user
   beforeEach(async () => {

    [deployer,attacker, user ] = await ethers.getSigners();

    const Auction = await ethers.getContractFactory("Auction",deployer);
    this.auction = await Auction.deploy();

    this.auction.bid({ value:100});


   })
    describe('Pull Over Push solution', () => { 
      it("A user should be able to be refunded for a small number of bids",async() => {
       await this.auction.connect(user).bid({value :ethers.utils.parseEther("1")});
       await this.auction.connect(user).bid({value :ethers.utils.parseEther("2")})
       const userBalanceBefore = await ethers.provider.getBalance(user.address);
       console.log("before",userBalanceBefore);

       await this.auction.connect(user).withdraw();

       const userBalanceAfter = await ethers.provider.getBalance(user.address);
       console.log("After",userBalanceAfter);
       expect(userBalanceAfter).to.be.gt(userBalanceBefore);
    })
    })


    describe('If bid is higher than the highest bid' , () => { 
      it("A user should be able to be refunded for a small number of bids",async() => {

        for (let i = 0; i < 3000; i++) {
          await this.auction.connect(user).bid({value :ethers.utils.parseEther("0.0001") + i});
          
        }
       
        const userBalanceBefore = await ethers.provider.getBalance(user.address);
        console.log("before",userBalanceBefore);
 
        await this.auction.connect(user).withdraw();
        const userBalanceAfter = await ethers.provider.getBalance(user.address);
        console.log("After",userBalanceAfter);
        expect(userBalanceAfter).to.be.gt(userBalanceBefore);
     })
    
 
    })
  


  
})
  
