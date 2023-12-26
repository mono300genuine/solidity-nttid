//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./base/ERC4671.sol";

contract NttId is ERC4671, Ownable {
    constructor(
        string memory _idType,
        string memory _idName,
        address initialOwner
    ) ERC4671(_idName, _idType) Ownable(initialOwner) {}

    mapping(address => uint256) public userUid;
    mapping(address => bool) public isBlacklisted;

    event IdIssued(address indexed _owner, uint256 indexed _tokenId);
    event Blacklisted(address indexed userId);

    function issueNttId(
        address _user,
        string memory _tokenUri
    ) public onlyOwner {
        userUid[_user] = emittedCount();
        _mint(_user);
        setTokenUri(userUid[_user], _tokenUri);

        emit IdIssued(_user, userUid[_user]);
    }

    function blacklistUser(address _user) public onlyOwner {
        isBlacklisted[_user] = true;
        if (hasValid(_user)) {
            uint256[] memory tokens = tokensOfOwner(_user);
            for (uint256 i = 0; i < tokens.length; i++) {
                uint256 tokenId = tokens[i];

                if (isValid(tokenId)) {
                    _revoke(tokenId);
                }
            }
        }

        emit Blacklisted(_user);
    }
}
