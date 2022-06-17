// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    uint256 listingPrice = 0.025 ether;
    uint256 mintingPrice = 0.001 ether;
    uint256 auctionprice;
    // uint256 endtime;
    address payable owner;
    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        address payable minter;
        uint256 price;
        uint256 auctionprice;
        bool sold;
        bool isActive;
    }

    struct tokenDetails {
        uint256 starttime;
        uint256 endTime;
        uint256 withdrawBidTime;
        uint256 maxBid;
        address maxBidUser;
        bool isActive;
        uint256[] bidAmounts;
        address[] users;
    }

    mapping(uint256 => tokenDetails) public tokenToAuction;
    mapping(uint256 => mapping(address => uint256)) public bids;

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() ERC721("TORQUE", "TORQ") {
        owner = payable(msg.sender);
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Returns the minting price of the contract */
    function getMintingPrice() public view returns (uint256) {
        return mintingPrice;
    }

    // set Listing Price
    function setListingPrice(uint256 _listingPrice) public {
        require(owner == msg.sender);
        listingPrice = _listingPrice;
    }

    // set minting Price
    function setMintingPrice(uint256 _mintingPrice) public {
        require(owner == msg.sender);
        mintingPrice = _mintingPrice;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);

        //fetchMyNFTs();
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) public payable {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == mintingPrice,
            "Price must be equal to listing price"
        );
        //   minter = payable(msg.sender);

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            payable(address(msg.sender)),
            price,
            auctionprice,
            false,
            false
        );
        _itemsSold.increment();
        _transfer(msg.sender, address(msg.sender), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(msg.sender),
            price,
            // auctionprice,
            false
        );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        idToMarketItem[tokenId].isActive = true;
        _itemsSold.decrement();
        _transfer(msg.sender, address(this), tokenId);
    }

    // for Auction Token
    function createAuctionToken(uint256 tokenId, uint256 auctionPrice)
        public
        payable
    {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].isActive = false;
        idToMarketItem[tokenId].sold = false;
        //   idToMarketItem[tokenId].auctionprice = auctionPrice;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        idToMarketItem[tokenId].auctionprice = auctionPrice;
        _itemsSold.decrement();
        tokenDetails memory _auction = tokenDetails({
            starttime: 0,
            endTime: 0,
            withdrawBidTime: 0,
            maxBid: 0,
            maxBidUser: address(0),
            isActive: false,
            bidAmounts: new uint256[](0),
            users: new address[](0)
        });
        _transfer(msg.sender, address(this), tokenId);
        tokenToAuction[tokenId] = _auction;
    }

    // end auction
    function executeSale(uint256 _tokenId) external payable {
        uint256 tokenId = uint256(_tokenId);
        tokenDetails storage auction = tokenToAuction[_tokenId];
        require(idToMarketItem[_tokenId].seller == msg.sender, "Not seller");
        require(auction.isActive, "auction not active");
        auction.isActive = false;
        if (auction.bidAmounts.length == 0) {
            idToMarketItem[tokenId].owner = payable(
                idToMarketItem[_tokenId].seller
            );
            ERC721(address(this)).safeTransferFrom(
                address(this),
                idToMarketItem[_tokenId].seller,
                _tokenId
            );
        } else {
            (bool success, ) = idToMarketItem[_tokenId].seller.call{
                value: auction.maxBid
            }("");
            require(success);
            idToMarketItem[tokenId].owner = payable(auction.maxBidUser);
            ERC721(address(this)).safeTransferFrom(
                address(this),
                auction.maxBidUser,
                _tokenId
            );
        }
        delete auction.maxBid;
        delete auction.maxBidUser;
        _itemsSold.increment();
        Royality(tokenId);
    }

    // function for Maxbid Withdwaw
    function maxBidWithdraw(uint256 _tokenId) public {
        tokenDetails storage auction = tokenToAuction[_tokenId];
        require(
            auction.endTime >= block.timestamp + 86400 seconds,
            "you can't Withdraw your bid before 24 hrs from auction ended"
        );
        require(
            auction.maxBidUser == msg.sender,
            "Only item owner can perform this operation"
        );
        for (uint256 i = 0; i < auction.users.length; i++) {
            if (auction.users[i] == auction.maxBidUser) {
                (bool success, ) = auction.users[i].call{
                    value: bids[_tokenId][auction.users[i]]
                }("");
                require(success);
            }
        }
        delete auction.maxBid;
        delete auction.maxBidUser;
    }

    // cancel auction
    function cancelAuction(uint256 tokenId) public {
        tokenDetails storage auction = tokenToAuction[tokenId];
        require(idToMarketItem[tokenId].seller == msg.sender, "Not seller");
        require(auction.isActive, "auction not active");
        auction.isActive = false;
        // bool success;
        for (uint256 i = 0; i < auction.users.length; i++) {
            if (auction.users[i] == auction.maxBidUser) {
                (bool success, ) = auction.users[i].call{
                    value: bids[tokenId][auction.users[i]]
                }("");
                require(success);
            }
        }
        idToMarketItem[tokenId].owner = payable(idToMarketItem[tokenId].seller);
        _itemsSold.increment();
        ERC721(address(this)).safeTransferFrom(
            address(this),
            idToMarketItem[tokenId].seller,
            tokenId
        );
        delete auction.users;
        // delete auction.bidAmounts;
        delete auction.maxBid;
        delete auction.maxBidUser;
        // delete auction.seller;
    }

    // /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function bid(uint256 _tokenId) external payable {
        tokenDetails storage auction = tokenToAuction[_tokenId];
        if (auction.isActive == false) {
            auction.endTime = block.timestamp + 86400 seconds;
            auction.starttime = block.timestamp;
            auction.withdrawBidTime = block.timestamp + 172800 seconds;
        }
        require(
            msg.value >= idToMarketItem[_tokenId].auctionprice,
            "bid price is less than current price"
        );
        require(auction.endTime >= block.timestamp, "deadline already passed");
        // require(endtime > block.timestamp, "Deadline already passed");
        auction.isActive = true;

        for (uint256 i = 0; i < auction.users.length; i++) {
            if (
                auction.users[i] == auction.maxBidUser &&
                auction.bidAmounts[i] == auction.maxBid
            ) {
                (bool success, ) = auction.users[i].call{
                    value: bids[_tokenId][auction.users[i]]
                }("");
                require(success);
            }
        }
        delete auction.maxBid;
        delete auction.maxBidUser;

        if (bids[_tokenId][msg.sender] > 0) {
            (bool success, ) = msg.sender.call{
                value: bids[_tokenId][msg.sender]
            }("");
            require(success);
        }
        bids[_tokenId][msg.sender] = msg.value;
        if (auction.bidAmounts.length == 0) {
            auction.maxBid = msg.value;
            auction.maxBidUser = msg.sender;
        } else {
            uint256 lastIndex = auction.bidAmounts.length - 1;
            require(
                auction.bidAmounts[lastIndex] < msg.value,
                "Current max bid is higher than your bid"
            );
            auction.maxBid = msg.value;
            auction.maxBidUser = msg.sender;
        }
        auction.users.push(msg.sender);
        auction.bidAmounts.push(msg.value);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;

        address seller = idToMarketItem[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        require(
            idToMarketItem[tokenId].isActive == true,
            "marketsell is inActive do placeBid"
        );
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        idToMarketItem[tokenId].isActive = false;
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(seller).transfer(msg.value);
        Royality(tokenId);
    }

    function Royality(uint256 tokenId) public payable {
        if (idToMarketItem[tokenId].seller != idToMarketItem[tokenId].minter) {
            payable(idToMarketItem[tokenId].minter).transfer(mintingPrice);
        } else {
            payable(idToMarketItem[tokenId].seller).transfer(mintingPrice);
        }
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getTokenAuctionDetails(uint256 _tokenId)
        public
        view
        returns (tokenDetails memory)
    {
        tokenDetails memory auction = tokenToAuction[_tokenId];
        return auction;
    }

    function getListingDetails(uint256 _tokenId)
        public
        view
        returns (MarketItem memory)
    {
        MarketItem memory items = idToMarketItem[_tokenId];
        return items;
    }

    // approve from another contract
    function approveForAuction(uint256 tokenId, address _another) public {
        require(
            owner == msg.sender,
            "Only Owner Can Perform this Operation"
        );
        _approve(address(_another), tokenId);
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external returns (bytes4) {
        return
            bytes4(
                keccak256("onERC721Received(address,address,uint256,bytes)")
            );
    }

    receive() external payable {}
}
