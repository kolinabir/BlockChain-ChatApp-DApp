// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ChatApp {
    struct user {
        string name;
        friend[] friendList;
    }
    struct friend {
        address F_address;
        string name;
    }
    struct message {
        address sender;
        uint256 timespamp;
        string msg;
    }
    struct AllUserStruct {
        string name;
        address accountAddress;
    }
    AllUserStruct[] getAllUsers;

    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages;

    function checkUser(address _user) public view returns (bool) {
        return bytes(userList[_user].name).length > 0;
    }

    function createAccount(string calldata _name) external {
        require(checkUser(msg.sender) == false, "User already exits");
        require(bytes(_name).length > 0, "UserName cannot be empty");
        userList[msg.sender].name = _name;
        getAllUsers.push(AllUserStruct(_name, msg.sender));
    }

    function getUserName(
        address _address
    ) external view returns (string memory) {
        require(checkUser(_address), "User not registered");
        return userList[_address].name;
    }

    function addFriend(address _friendAddress, string calldata _name) external {
        require(checkUser(msg.sender), "Create an account first");
        require(checkUser(_friendAddress), "User not registered");
        require(
            msg.sender != _friendAddress,
            "You cannot add yourself as a friend"
        );
        require(
            checkAlreadyFriend(msg.sender, _friendAddress) == false,
            "Already friends"
        );
        _addFriend(msg.sender, _friendAddress, _name);
        _addFriend(_friendAddress, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriend(
        address _friend1,
        address _friend2
    ) internal view returns (bool) {
        if (
            userList[_friend1].friendList.length >
            userList[_friend2].friendList.length
        ) {
            address temp = _friend1;
            _friend1 = _friend2;
            _friend1 = temp;
        }
        for (uint256 i = 0; i < userList[_friend1].friendList.length; i++) {
            if (userList[_friend1].friendList[i].F_address == _friend2) {
                return true;
            }
        }
        return false;
    }

    function _addFriend(
        address me,
        address friend_address,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_address, name);
        userList[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    function _getChatCode(
        address friend1,
        address friend2
    ) internal pure returns (bytes32) {
        if (friend1 < friend2) {
            return keccak256(abi.encodePacked(friend1, friend2));
        } else {
            return keccak256(abi.encodePacked(friend2, friend1));
        }
    }

    function sendMessage(
        address friend_address,
        string calldata _msg
    ) external {
        require(checkUser(msg.sender), "Create an account first");
        require(checkUser(friend_address), "User is not registered");
        require(checkAlreadyFriend(msg.sender, friend_address), "Not friends");
        bytes32 chatCode = _getChatCode(msg.sender, friend_address);
        message memory newMessage = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMessage);
    }

    function readMessage(
        address friend_address
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_address);
        return allMessages[chatCode];
    }

    function getAllAppUsers() public view returns (AllUserStruct[] memory) {
        return getAllUsers;
    }
}
