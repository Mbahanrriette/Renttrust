// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IReputationLedger {
    function recordTenantReputation(address tenant, int256 score) external;
}

contract RentTrust {
    address public landlord;
    address public tenant;

    // Rental agreement details
    string public propertyAddress;
    uint public rentAmount;
    uint public securityDeposit;
    uint public startDate;
    uint public endDate;
    string public rules;
    uint public dueDate;
    bool public isActive;

    IReputationLedger public reputationLedger;

    event RentPaid(address indexed tenant, uint amount);
    event AgreementTerminated(string reason);

    constructor(
        address _tenant,
        string memory _propertyAddress,
        uint _rentAmount,
        uint _securityDeposit,
        uint _startDate,
        uint _endDate,
        string memory _rules,
        uint _dueDate,
        address _reputationLedger
    ) {
        landlord = msg.sender;
        tenant = _tenant;
        propertyAddress = _propertyAddress;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        startDate = _startDate;
        endDate = _endDate;
        rules = _rules;
        dueDate = _dueDate;
        isActive = true;
        reputationLedger = IReputationLedger(_reputationLedger);
    }

    function payRent() external payable {
        require(isActive, "Agreement not active");
        require(msg.sender == tenant, "Only tenant can pay rent");
        require(msg.value == rentAmount, "Incorrect rent amount");

        emit RentPaid(msg.sender, msg.value);

        // Record reputation: +10 points for paying rent
        reputationLedger.recordTenantReputation(tenant, 10);
    }

    function terminateAgreement(string memory reason) external {
        require(msg.sender == landlord, "Only landlord can terminate");
        require(isActive, "Already terminated");

        isActive = false;

        emit AgreementTerminated(reason);

        // Record reputation: -20 points for early termination
        reputationLedger.recordTenantReputation(tenant, -20);
    }
}

