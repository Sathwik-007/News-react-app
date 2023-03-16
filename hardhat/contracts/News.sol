// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/utils/Counters.sol";

contract News {
    uint256 constant POST_STAKE =  0.01 ether;
    uint256 constant VOTE_STAKE =  0.001 ether;
    uint256 constant WITHDRAW_PERIOD = 30 days;
    uint256 constant GOVERNANCE_REWARD_PERCENTAGE = 10;

    using Counters for Counters.Counter;
    Counters.Counter private articleIds;

    struct Article {
        uint articleId;
        string title;
        string content;
        uint timestamp; 
        address author;
        uint likes;
        uint dislikes;
    }

    mapping (uint => Article) public articles;
    mapping (address => uint) public stakedAmounts;
    mapping (uint => mapping(address => bool)) public voters;
    mapping (uint => uint) lastProcessedTime;
    address public owner;
    address public proposedOwner;


    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    modifier requirePostStake() {
        require(msg.value >= POST_STAKE, "Staked amount not enough to post article!");
        _;
    }
    
    modifier requireVoteStake() {
        require(msg.value >= VOTE_STAKE, "Staked amount not enough to vote article!");
        _;
    }

    event NewArticle(
        uint indexed articleId, 
        string title, 
        uint timestamp, 
        address indexed author
    );

    event GovernanceRewardDistributed(
        address indexed contributor, 
        uint rewardAmount
    );

    event NewVote(
        uint indexed articleId,
        address indexed voter, 
        bool vote, 
        uint timestamp
    );

    event OwnershipTransferred(
        address indexed previousOwner, 
        address indexed newOwner
    );

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address _proposedOwner) public onlyOwner {
        proposedOwner = _proposedOwner;
    }

    function claimOwnership() public {
        require(msg.sender == proposedOwner, "Only the proposed owner can claim ownership.");
        emit OwnershipTransferred(owner, proposedOwner);
        owner = proposedOwner;
        proposedOwner = address(0);
    }

    function postArticle(
        string memory title, 
        string memory content
    ) public payable requirePostStake {
        articleIds.increment();
        
        uint256 articleId = articleIds.current();
        Article memory newArticle = Article({
            articleId: articleId,
            title: title,
            content: content,
            timestamp: block.timestamp,
            author: msg.sender,
            likes: 0,
            dislikes: 0
        });

        articles[articleId] = newArticle;
        stakedAmounts[msg.sender] += msg.value;
        lastProcessedTime[articleId] = block.timestamp;

        emit NewArticle(articleId, title, block.timestamp, msg.sender);
    }

    function getArticle(uint articleId) external view returns (Article memory) {
        return articles[articleId];
    }

    function vote(
        uint articleId, 
        bool isLike
    ) public payable requireVoteStake {
        Article storage article = articles[articleId];
        require(article.articleId != 0, "Article does not exist");
        require(!voters[articleId][msg.sender], "Already voted for this article");

        voters[articleId][msg.sender] = true;

        if (isLike) {
            article.likes += 1;
        } else {
            article.dislikes += 1;
        }

        stakedAmounts[msg.sender] += msg.value;
        emit NewVote(articleId, msg.sender, isLike, block.timestamp);
    }

    function processArticle(uint articleId) public onlyOwner {
        Article storage article = articles[articleId];
        require(article.articleId != 0, "Article does not exist");

        if (article.likes > article.dislikes) {
            // Accept the article into feed
            // Make all the staked amount of dislikers to 0 to ensure the votes are invalid for rewards
            address[] memory votersList = getVotersList(articleId);
            for (uint i = 0; i < votersList.length; i++) {
                address voter = votersList[i];
                if (voters[articleId][voter]) continue;
                stakedAmounts[voter] = 0;
            }
        } else if (article.likes < article.dislikes) {
            // Delete the post from feed
            delete articles[articleId];
            // Make all the staked amount of likers to 0 to ensure the votes are invalid for rewards
            address[] memory votersList = getVotersList(articleId);
            for (uint i = 0; i < votersList.length; i++) {
                address voter = votersList[i];
                if (!voters[articleId][voter]) continue;
                stakedAmounts[voter] = 0;
            }
        }
    }

    function withdraw() public onlyOwner{
        require(block.timestamp >= articles[1].timestamp + WITHDRAW_PERIOD, "Withdraw period has not ended yet");

        uint totalStakedAmount = address(this).balance - stakedAmounts[owner];
        uint governanceRewardAmount = totalStakedAmount * GOVERNANCE_REWARD_PERCENTAGE / 100;

        payable(owner).transfer(governanceRewardAmount);
        address[] memory contributors = getContributors();
        for (uint i=0; i<contributors.length; ++i) {
            address contributor = contributors[i];
            uint contributorRewardAmount = totalStakedAmount * (stakedAmounts[contributor] / address(this).balance);
            payable(contributor).transfer(contributorRewardAmount);

            emit GovernanceRewardDistributed(contributor, contributorRewardAmount);
        }
    }

    function getContributors() internal view returns (address[] memory) {
        address[] memory contributors;
        uint numContributors = 0;
        for (uint i=0; i<contributors.length; ++i) {
            address contributor = contributors[i];
            if (stakedAmounts[contributor] > 0) {
                numContributors += 1;
                contributors[numContributors] = contributor;
            }
        }
        return contributors;
    }

    function getVotersList(uint articleId) internal view returns (address[] memory) {
        address[] memory votersList;
        uint numVoters = 0;
        for (uint i = 0; i < votersList.length; i++) {
            address voter = votersList[i];
            if (voters[articleId][voter]) {
                numVoters += 1;
                votersList[numVoters] = voter;
            }
        }
        return votersList;
    }

    function totalArticles() public view returns(uint256) {
        return articleIds.current();
    }

    receive() external payable {}
}