// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract SecureMarriage {
    struct CoupleDetails {
        string nameOfHusband;
        string nameOfWife;
        string idOfHusband;
        string idOfWife;
        address from;
        uint256 timestamp;
    }
    CoupleDetails[] public CouplesDetails;
    address payable Provider;

    constructor() {
        Provider = payable(msg.sender);
    }

    function getMarried(
        string calldata _nameOfHusband,
        string calldata _nameOfWife,
        string calldata _idOfHusband,
        string calldata _idOfWife
    ) external payable {
        require(msg.value > 0, "Must pay something!");
        Provider.transfer(msg.value);
        CouplesDetails.push(
            CoupleDetails(
                _nameOfHusband,
                _nameOfWife,
                _idOfHusband,
                _idOfWife,
                msg.sender,
                block.timestamp
            )
        );
    }

    function getCoupleDetails() public view returns (CoupleDetails[] memory) {
        return CouplesDetails;
    }

    function getCoupleDetailsByAddress(address coupleAddress)
        public
        view
        returns (CoupleDetails memory)
    {
        for (uint256 i = 0; i < CouplesDetails.length; i++) {
            if (CouplesDetails[i].from == coupleAddress) {
                return CouplesDetails[i];
            }
        }
        revert("Couple not found");
    }
}
