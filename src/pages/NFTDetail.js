import React, { useState, useEffect, createRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router";

import "../styles/NFTDetail.css";

import { FaEthereum } from "react-icons/fa";
import Footer from "../components/Footer";

import Web3Modal from 'web3modal'

import { ethers, Signer } from 'ethers'

import axios from 'axios'

import "../styles/NFTCard.css";
import jQuery from "jquery";
// import $ from jQuery
import {
    marketplaceAddress
} from '../config'
import NFTMarketplace from '../NFTMarketplaceAbi.json'
const NFTDetail = () => {


    const [colors, setColors] = useState([]);

    const [isLike, setIsLike] = useState(false);

    const moreNftListRef = createRef();

    const like = () => setIsLike(!isLike);

    const getColors = (colors) => {
        setColors((c) => [...c, ...colors]);
    };

    const navigate = useNavigate();




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const [counter, setCounter] = React.useState(86401);

    const [walletAddress, setWalletAddress] = useState("");
    const queryParams = new URLSearchParams(window.location.search)
    const [formInput, updateFormInput] = useState({ price: '', image: '', Name: '', Owner: '', Price: '', NFTDescription: '', auctionprice: '', AuctionPrice: '', bidprice: '' })

    // const queries = queryString.parse(this.props.location.search)
    // this.setState(queries)
    // useState({ id: '',tokenURI:''})
    const id = queryParams.get("id")
    const tokenURI = queryParams.get("tokenURI")
    const Name = queryParams.get("Name")
    const NFTDescription = queryParams.get("NFTDescription")
    const Owner = queryParams.get("Owner")
    const Price = queryParams.get("Price")
    const AuctionPrice = queryParams.get("AuctionPrice")

    const { image, price, auctionprice, bidprice } = formInput

    // wallet address 
    let metaMaskaddress;

    useEffect(() => {

        fetchNFT()
    }, [id])

    async function fetchNFT() {


        if (!tokenURI) return

        const meta = await axios.get(tokenURI)
        updateFormInput(state => ({ ...state, image: meta.data.image }))
    }
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')


    async function loadNFTs(nft) {
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true,
        })
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
        const data = await marketplaceContract.fetchMyNFTs()
        const auctionData = await marketplaceContract.getTokenAuctionDetails()
        // console.log(auctionData);
        let details = await marketplaceContract.getTokenAuctionDetails(nft.tokenId)
        // let maxBid = details.maxBid()

        const items = await Promise.all(data.map(async i => {
            const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenURI)

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let auctionprice = ethers.utils.formatUnits(i.auctionprice.toString(), 'ether')

            let item = {

                price,
                auctionprice,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.seller,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
                tokenURI
            }
            return item
        }))
        setNfts(items)
        setLoadingState('loaded')


    }



    async function requestAccount() {

        // console.log('Requesting account...');

        // ❌ Check if Meta Mask Extension exists 
        if (window.ethereum) {
            //   console.log('detected')

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
                metaMaskaddress = accounts[0];
                // console.log(accounts[0]);
            } catch (error) {
                // console.log('Error connecting...');
            }

        } else {
            alert('Meta Mask not detected');
        }

    }



    ////////////////////////////////////////////   End Auction    /////////////////////////////////////

    async function endAuction(nft) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
        // console.log(walletAddress)
        const transaction = await contract.executeSale(id);
        await transaction.wait();
        loadNFTs();
    }


    ////////////////////////////////////////////   Withdraw Bid    /////////////////////////////////////
    async function withdwaw() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
        const transaction = await contract.maxBidWithdraw(id);
        await transaction.wait();
        console.log("success")
        navigate("/")
    }


    async function cancel() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
        const transaction = await contract.cancelAuction(id);
        await transaction.wait();
        console.log("success")
        navigate("/")
    }


    async function buyNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );

        let active = await contract.getListingDetails(id)
        console.log(active.isActive)
        const price1 = active.price;
        const transaction = await contract.createMarketSale(id, {
            value: price1,
        });
        await transaction.wait();
        loadNFTs();
    }

    // let seconds = 10;






    async function bidNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );

        let isActive = await contract.getTokenAuctionDetails(id)
        let remain = isActive.isActive
        let maxBid = isActive.maxBid / 1000000000000000000


        const price = ethers.utils.parseUnits(formInput.bidprice, "ether");
        const transaction = await contract.bid(id, {
            value: price,
        });

        await transaction.wait();
        console.log("success")
        loadNFTs();
    }

    async function buttons(){
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
        
        // let active1 = await contract.getListingDetails(id)
        let bids = await contract.getTokenAuctionDetails(id)
        let endTime = bids.endTime.toString();
        // let WithdrawTime = bids.withdrawBidTime.toString()
        let currentTime = Math.floor(new Date().getTime() / 1000).toString()
        let EndTime24 = new Date(endTime*1000)
        let StartTime24 = new Date(currentTime*1000)
        EndTime24 = (Date.parse(EndTime24) / 1000);
        StartTime24 = (Date.parse(StartTime24) / 1000);
        var timeLeft = EndTime24 - StartTime24;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }
        if(bids.isActive == true){
            document.getElementById("setTime").innerHTML = `the Auction end in ${hours} : ${minutes}: ${seconds}`
        }
        if ( endTime <= currentTime && bids.isActive == true) {
            document.getElementById("text0").innerHTML = `<h2>Auction is Ended</h2>`
        }
       
    }
    setInterval(buttons, 1000)


    async function bidDetails(nft) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
        await requestAccount();
        let bids = await contract.getTokenAuctionDetails(id)
        let maxBi = bids.maxBid / 1000000000000000000;
        let maxBidUser = bids.maxBidUser;
        let endTime = bids.endTime.toString();
        let WithdrawTime = bids.withdrawBidTime.toString()
        let currentTime = Math.floor(new Date().getTime() / 1000).toString()
        document.getElementById("BIDS").innerHTML = maxBi
        document.getElementById("BID").innerHTML = maxBidUser
        // let auctionPrice = bids.AuctionPrice / 1000000000000000000;

        let active = await contract.getListingDetails(id)
        let seller = active.seller
        let owner = active.owner

        owner = owner.toUpperCase()
        maxBidUser = maxBidUser.toUpperCase()
        seller = seller.toUpperCase()
        metaMaskaddress = metaMaskaddress.toUpperCase()


        if (metaMaskaddress != seller) {
            document.getElementById("text0").innerHTML = `<a href="#" data-toggle="modal"
            data-target="#popup_bid" class="btn btn-grad btn-lg" 
            >
            Place Bid
            </a>`
        }

        if (maxBidUser == metaMaskaddress && WithdrawTime <= currentTime) {
            document.getElementById("text3").innerHTML = `<a href="#" class="btn btn-grad btn-lg"
            >
            Withdraw Bid
            </a>`
        }

        if ( active.isActive == true) {
            document.getElementById("text4").innerHTML = `<a href="#"  class="btn btn-grad btn-lg"
            >
            Buy Now
            </a>`
        }
        // console.log(metaMaskaddress + "hello");
        if (seller == metaMaskaddress ) {
            document.getElementById("text2").innerHTML = `<a href="#" class="btn btn-grad btn-lg"
            >
            Execute Auction
            </a>`
            document.getElementById("text1").innerHTML = `<br><a href="#" class="btn btn-grad btn-lg"
            >
            Cancel Auction
            </a>`
        }
        
        
        // setInterval(function () { bidDetails(); }, 1500);
        // now = (Date.parse(now));
        // start12 = (Date.parse(start12));
        // var timeLeft = start024 - now;

        // var days = Math.floor(timeLeft / 86400);
        // var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        // var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        // var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        // // let start2 = start;

        // if (hours < "10") { hours = "0" + hours; }
        // if (minutes < "10") { minutes = "0" + minutes; }
        // if (seconds < "10") { seconds = "0" + seconds; }

        // $(".days").html(days + "<span></span>");
        // $(".hours").html(hours + "<span></span>");
        // $(".minutes").html(minutes + "<span></span>");
        // $(".seconds").html(seconds + "<span></span>");
        // document.getElementById("hours").innerHTML = hours;
        // document.getElementById("minutes").innerHTML = minutes;
        // document.getElementById("seconds").innerHTML = seconds;

        // console.log(start024)

    }




    /////////////////////////////////////////  ////////////////////////////////////////////////////////

    return (
        <div onLoad={bidDetails}>
            <Header />
            <div class="container" >
                <a href="/explore" class="btn btn-white btn-sm my-40">
                    Back to home
                </a>
                <div class="item_details">
                    <div class="row sm:space-y-20">
                        <div class="col-lg-6">

                            <img class="item_img" src={image}
                                alt="" />





                        </div>
                        <div class="col-lg-6">
                            <div class="space-y-20">
                                <h3>{Name}</h3>
                                <div class="d-flex justify-content-between">
                                    <div class="space-x-10 d-flex align-items-center">
                                        <p>1 of 1</p>
                                        <a href="#" class="likes space-x-3">
                                            <i class="ri-heart-3-fill"></i>
                                            <span class="txt_sm">2.1k</span>
                                        </a>
                                    </div>
                                    <div class="space-x-10 d-flex align-items-center">
                                        <div class="share">
                                            <div class="icon">
                                                <a href="#"> <i class="ri-share-line"></i>
                                                </a>
                                            </div>
                                            <div class="dropdown__popup">
                                                <ul class="space-y-10">
                                                    <li> <a href="#"> <i
                                                        class="ri-facebook-line"></i>
                                                    </a>
                                                    </li>
                                                    <li> <a href="#"> <i
                                                        class="ri-messenger-line"></i>
                                                    </a>
                                                    </li>
                                                    <li> <a href="#"> <i
                                                        class="ri-whatsapp-line"></i>
                                                    </a>
                                                    </li>
                                                    <li> <a href="#"> <i
                                                        class="ri-youtube-line"></i>
                                                    </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="more">
                                            <div class="icon">
                                                <a href="#"> <i class="ri-more-fill"></i>
                                                </a>
                                            </div>
                                            <div class="dropdown__popup">
                                                <ul class="space-y-10">
                                                    <li>
                                                        <a href="#" class="space-x-10
                                                            d-flex"
                                                            data-toggle="modal"
                                                            data-target="#popup_report">
                                                            <i class="ri-flag-line"></i>
                                                            <span> Report
                                                            </span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-white btn-sm
                                        dropdown-toggle" type="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        View proof of authenticity
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="https://ipfs.io/" target="_blank">
                                            <span>
                                                <img width="20"
                                                    alt="" />
                                                View on IPFS
                                            </span>
                                            <i class="ri-external-link-line color_brand"></i>


                                        </a>
                                        <a class="dropdown-item" href="https://etherscan.io/" target="_blank">
                                            <span>
                                                <img src="assets/img/icons/ether.png" width="20" alt="" />
                                                View on Etherscan
                                            </span>
                                            <i class="ri-external-link-line color_brand"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="box">
                                    <div class="space-y-20">
                                        <div class="d-flex justify-content-between
                                            mb-30_reset">
                                            <ul class="nav nav-tabs d-flex space-x-10 mb-30"
                                                role="tablist">
                                                <li class="nav-item">
                                                    <a
                                                        class="btn btn-white btn-sm active"
                                                        data-toggle="tab"
                                                        href="#tabs-1"
                                                        role="tab">
                                                        Details</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a
                                                        class="btn btn-white btn-sm"
                                                        data-toggle="tab"
                                                        href="#tabs-2"
                                                        role="tab">
                                                        Bids</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a
                                                        class="btn btn-white btn-sm"
                                                        data-toggle="tab"
                                                        href="#tabs-3"
                                                        role="tab">
                                                        History</a>
                                                </li>
                                            </ul>
                                            {/* <!-- Tab panes --> */}
                                            <div class="dropdown d-none d-sm-block">
                                                <button
                                                    class="btn btn-white btn-sm
                                                    dropdown-toggle"
                                                    type="button"

                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false">
                                                    Recent Active
                                                </button>
                                                <div
                                                    class="dropdown-menu">
                                                    <a class="dropdown-item" href="#">Action</a>
                                                    <a class="dropdown-item" href="#">Another
                                                        action</a>
                                                    <a class="dropdown-item" href="#">Something
                                                        else here</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="hr"></div>
                                        <div class="tab-content">
                                            <div class="tab-pane active" id="tabs-1"
                                                role="tabpanel">
                                                <p>{NFTDescription}</p>
                                            </div>
                                            <div class="tab-pane" id="tabs-2"
                                                role="tabpanel">
                                                <p>Max Bid: <span id="BIDS"></span></p>
                                                <p>Max Bidder: <span id="BID"></span></p>
                                            </div>
                                            <div class="tab-pane space-y-20" id="tabs-3"
                                                role="tabpanel">
                                                <div class="creator_item creator_card
                                                    space-x-10">
                                                    <div class="avatars space-x-10">
                                                        <div class="media">
                                                            <div class="badge">
                                                                <img
                                                                    src="assets/img/icons/Badge.svg"
                                                                    alt="" />
                                                            </div>
                                                            <a href="Profile.html">
                                                                <img
                                                                    src="assets/img/avatars/avatar_1.png"
                                                                    alt="Avatar"
                                                                    class="avatar
                                                                    avatar-md"/>
                                                            </a>
                                                        </div>
                                                        <div>
                                                            <p class="color_black">Bid
                                                                accepted <span
                                                                    class="color_brand">1
                                                                    ETH</span> by <a
                                                                        class="color_black txt
                                                                    _bold"
                                                                        href="Profile.html">ayoub</a></p>
                                                            <span class="date color_text">28/06/2021,
                                                                12:08</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="creator_item creator_card
                                                    space-x-10">
                                                    <div class="avatars space-x-10">
                                                        <div class="media">
                                                            <div class="badge">
                                                                <img
                                                                    src="assets/img/icons/Badge.svg"
                                                                    alt="" />
                                                            </div>
                                                            <a href="Profile.html">
                                                                <img
                                                                    src="assets/img/avatars/avatar_2.png"
                                                                    alt="Avatar"
                                                                    class="avatar
                                                                    avatar-md"/>
                                                            </a>
                                                        </div>
                                                        <div>
                                                            <p class="color_black">Bid
                                                                accepted <span
                                                                    class="color_brand">3
                                                                    ETH</span> by <a
                                                                        class="color_black txt
                                                                    _bold"
                                                                        href="Profile.html">monir</a></p>
                                                            <span class="date color_text">22/05/2021,
                                                                12:08</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="numbers">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="space-y-5">
                                                <p class="color_text">Price:</p>
                                                <h4>{" "}{AuctionPrice}
                                                    <FaEthereum /><span class="txt_sm color_text">
                                                        ETH/ $4769.88</span></h4>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="space-y-5">
                                                <p class="color_text">Minimum bid</p>
                                                <h4>{" "}{AuctionPrice}<span class="txt_sm color_text">
                                                    ETH/ $4769.88</span></h4>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="space-y-5">
                                                <p class="color_text">countdown</p>
                                                <span id="setTime"></span>
                                                {/* <div class="d-flex countdown_item
                                                    align-items-center">
                                                    <div class="item">
                                                        <div class="number hours"><span></span></div>
                                                    </div>
                                                    <div class="dots">:</div>
                                                    <div class="item">
                                                        <div class="number minutes"><span></span></div>
                                                    </div>
                                                    <div class="dots">:</div>
                                                    <div class="item">
                                                        <div class="number seconds"><span></span></div>
                                                    </div>
                                                </div> */}


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="hr2"></div>
                                <div class="creators">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="avatars space-x-5">
                                                <div class="media">
                                                    <a href="Profile.html">
                                                        <img
                                                            src="assets/img/avatars/avatar_3.png"
                                                            alt="Avatar" class="avatar
                                                            avatar-sm"/>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a href="Profile.html">
                                                        <p class="avatars_name color_black">@ayoub_fennouni
                                                            / fouzi...</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="avatars space-x-5">
                                                <div class="media">
                                                    <div class="badge">
                                                        <img class="badge"
                                                            src="assets/img/icons/Badge.svg"
                                                            alt="" />
                                                    </div>
                                                    <a href="Profile.html">
                                                        <img
                                                            src="assets/img/avatars/avatar_2.png"
                                                            alt="Avatar" class="avatar
                                                            avatar-sm"/>
                                                    </a>
                                                </div>
                                                <div>
                                                    <a href="Profile.html">
                                                        <p class="avatars_name color_black">@makinzi_jamy...</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div >

                                    <a onClick={() => buyNft(nfts)} id="text0"></a>
                                    <a id="text4"></a>
                                    <a onClick={() => cancel()} id="text1"></a>
                                    <a onClick={() => endAuction(nfts)} id="text2"></a>
                                    <a onClick={() => withdwaw()} id="text3"></a>
                                    {/* <a href="#" class="btn btn-grad btn-lg" data-toggle="modal"
                                         onClick={() => withdwaw()}>
                                             <span id="EndAuction">Withdraw Bid</span>
                                         </a> */}
                                    {/* <a href="#" class="btn btn-grad btn-lg" data-toggle="modal"
                                         onClick={() => cancel()}>
                                             <span id="EndAuction">Cancel Auction</span>
                                         </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />


            <div
                class="modal fade popup"
                id="popup_bid"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="modal-body space-y-20 p-40">
                            <h3>Place Your Bid</h3>
                            <p>
                                You are Placing A Bid{" "}
                                <span class="color_black"></span> from
                                <span class="color_red"></span>
                            </p>
                            <div id="inputp" class="space-y-10">
                                {/* <p>Minimum Bid = {nftAuctionPrice}</p> */}
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="00.00 ETH "
                                    onChange={(e) =>
                                        updateFormInput({ ...formInput, bidprice: e.target.value })
                                    }
                                />
                            </div>
                            <div class="space-y-10">
                                <p>
                                    Minimum Bid{"  "}
                                    <span class="color_green">
                                        <FaEthereum />
                                        ETH
                                    </span>
                                </p>
                                {/* <input type="text" class="form-control"
                              value="1"/> */}
                            </div>

                            <div class="hr"></div>
                            <div class="d-flex justify-content-between">
                                <p> You must bid at least greater than:</p>
                                <span id="BIDS">{AuctionPrice}</span>
                            </div>

                            <button
                                onClick={() => bidNft(nfts)}
                                class="btn btn-primary
                          w-full "
                                aria-label="Close"

                            > <i
                                class="ri-auction-line
                color_white"
                            ></i>
                                Place A Bid
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTDetail;