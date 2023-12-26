const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NttId", function () {
  let nttId;
  let owner;
  let user1;
  let user2;

  beforeEach(async function() {
    const NttId = await ethers.getContractFactory("NttId");
    [owner, user1, user2] = await ethers.getSigners();
    nttId = await NttId.deploy("Passport", "PASS", owner.address);
    await nttId.waitForDeployment();
  });

  it("should issue NttId to a user", async function() {
    const tokenUri = "https://example.com/token";
    await nttId.issueNttId(user1.address, tokenUri);
    const tokenId = await nttId.userUid(user1.address);

    expect(tokenId).to.equal(0);
    expect(await nttId.ownerOf(tokenId)).to.equal(user1.address);
    expect(await nttId.tokenUri(tokenId)).to.equal(tokenUri);
    expect(await nttId.isValid(tokenId)).to.be.true;
    expect(await nttId.hasValid(user1.address)).to.be.true;
  });

  it("should blacklist a user", async function() {
    const tokenUri = "https://example.com/token";
    await nttId.issueNttId(user1.address, tokenUri);
    await nttId.issueNttId(user2.address, tokenUri);

    await nttId.blacklistUser(user1.address);

    const isBlacklisted1 = await nttId.isBlacklisted(user1.address);
    const isBlacklisted2 = await nttId.isBlacklisted(user2.address);
    expect(isBlacklisted1).to.be.true;
    expect(isBlacklisted2).to.be.false;

    const tokens = await nttId.tokensOfOwner(user1.address);
    const isRevoked = await nttId.isValid(tokens[0]);
    expect(isRevoked).to.be.false;
  });

  it("should return all ids owned by a user", async function() {
    const tokenUris = [
      "https://example.com/token1",
      "https://example.com/token2",
    ];
    await nttId.issueNttId(user1.address, tokenUris[0]);
    await nttId.issueNttId(user1.address, tokenUris[1]);
    const tokens = await nttId.tokensOfOwner(user1.address);

    expect(tokens.length).to.equal(2);
    expect(await nttId.tokenUri(tokens[0])).to.equal(tokenUris[0]);
    expect(await nttId.tokenUri(tokens[1])).to.equal(tokenUris[1]);
  });

  it("should return the total number of ids issued", async function() {
    const tokenUris = [
      "https://example.com/token1",
      "https://example.com/token2",
    ];
    await nttId.issueNttId(user1.address, tokenUris[0]);
    await nttId.issueNttId(user2.address, tokenUris[1]);

    expect(await nttId.emittedCount()).to.equal(2);
  });

  it("should return total number of ids holder", async function() {
    const tokenUris = [
      "https://example.com/token1",
      "https://example.com/token2",
    ];
    await nttId.issueNttId(user1.address, tokenUris[0]);
    await nttId.issueNttId(user2.address, tokenUris[1]);

    expect(await nttId.holdersCount()).to.equal(2);
  });
});
