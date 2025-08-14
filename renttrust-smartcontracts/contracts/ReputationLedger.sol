// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ReputationLedger {
    struct Review {
        address reviewer;
        address reviewee;
        uint8 rating; // 1 to 5
        string comment;
        uint timestamp;
    }

    struct RentRecord {
        uint amount;
        uint date; // unix timestamp
    }

    mapping(address => Review[]) public reviewsGiven;
    mapping(address => Review[]) public reviewsReceived;

    mapping(address => RentRecord[]) public rentHistory;

    event ReviewSubmitted(address indexed reviewer, address indexed reviewee, uint8 rating);
    event RentRecorded(address indexed tenant, uint amount, uint date);

    // Review can be submitted by tenant or landlord
    function submitReview(address reviewee, uint8 rating, string calldata comment) external {
        require(rating >= 1 && rating <= 5, "Invalid rating");

        Review memory newReview = Review({
            reviewer: msg.sender,
            reviewee: reviewee,
            rating: rating,
            comment: comment,
            timestamp: block.timestamp
        });

        reviewsGiven[msg.sender].push(newReview);
        reviewsReceived[reviewee].push(newReview);

        emit ReviewSubmitted(msg.sender, reviewee, rating);
    }

    // Simple average rating (sum / count)
    function getAverageRating(address user) external view returns (uint avg) {
        Review[] memory all = reviewsReceived[user];
        if (all.length == 0) return 0;

        uint total = 0;
        for (uint i = 0; i < all.length; i++) {
            total += all[i].rating;
        }

        return total / all.length;
    }

    // Record rent payment (called by landlord)
    function recordRentPayment(address tenant, uint amount) external {
        //  You can add a modifier later like "onlyLandlord"
        RentRecord memory record = RentRecord({
            amount: amount,
            date: block.timestamp
        });

        rentHistory[tenant].push(record);
        emit RentRecorded(tenant, amount, block.timestamp);
    }

    function getRentHistory(address tenant) external view returns (RentRecord[] memory) {
        return rentHistory[tenant];
    }
}
