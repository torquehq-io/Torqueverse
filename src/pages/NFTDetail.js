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

// import Web3 from "web3";
import "../styles/NFTCard.css";

// import {
//   nftaddress, nftmarketaddress
// } from '../config'

// import NFT from '../NFTAbi.json'
// import Market from '../NFTMarketAbi.json'
import {
    marketplaceAddress
} from '../config'
import NFTMarketplace from '../NFTMarketplaceAbi.json'
import aaa from "./aaa.json"
// var Web3 = require('web3');
// var web3 = new Web3("https://rpc-mumbai.matic.today");
const NFTDetail = () => {


    const [colors, setColors] = useState([]);

    const [isLike, setIsLike] = useState(false);

    const moreNftListRef = createRef();

    const like = () => setIsLike(!isLike);

    const getColors = (colors) => {
        setColors((c) => [...c, ...colors]);
    };

    const navigate = useNavigate();








    //   useEffect(()=>{
    //     if(moreNftListRef.current != null){
    //       //moreNftListRef.current
    //       moreNftListRef.current.addEventListener("wheel",()=>{

    //       })
    //     }
    //   },[moreNftListRef])

    //!! aciklama karakter sayisi sinirlanmali.
    //!! scroll sorununa cozum bulunmali.

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const queryParams = new URLSearchParams(window.location.search)
    const [formInput, updateFormInput] = useState({ price: '', image: '', Name: '', Owner: '', Price: '', NFTDescription: '', auctionprice: '', AuctionPrice: '', bidprice:'' })

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


    async function loadNFTs() {
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
        console.log(auctionData);

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
    ////////////////////////////////////////////   End Auction    /////////////////////////////////////

    async function endAuction(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        // console.log(`/detail?id=${nftid}&tokenURI=${tokenURI}&Name=${nftName}&Owner=${nftOwner}&Price=${nftPrice}&AuctionPrice=${nftAuctionPrice}&NFTDescription=${nftdescription}`)
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
        // let contract1 = new web3.eth.Contract(aaa,marketplaceAddress);
        
        // const listingPrice = await contract.getListingPrice()
        // listingPrice = listingPrice.toString()
        /* user will be prompted to pay the asking proces to complete the transaction */
        // const price = ethers.utils.parseUnits(formInput.bidprice, "ether");
        // const auctionprice = ethers.utils.parseUnits(nft.auctionprice.toString(), "ether");
        const transaction = await contract.executeSale(id);
        // const transaction1 = await contract.WithdrawBids(id).send({from: marketplaceAddress});
        // console.log(id)
        await transaction.wait();
        loadNFTs();
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

        let isActive = await contract.fetchMarketItems()
        console.log(isActive)
    
        /* user will be prompted to pay the asking proces to complete the transaction */
        const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
        // const auctionprice = ethers.utils.parseUnits(nft.auctionprice.toString(), "ether");
        const transaction = await contract.createMarketSale(nft.tokenId, {
          value: price,
        });
        await transaction.wait();
        loadNFTs();
      }

    

    async function bidNft(nft) {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );

        /* user will be prompted to pay the asking proces to complete the transaction */
        const price = ethers.utils.parseUnits(formInput.bidprice, "ether");
        // const auctionprice = ethers.utils.parseUnits(nft.auctionprice.toString(), "ether");
        const transaction = await contract.bid(id, {
            value: price,
        });
        await transaction.wait();
        console.log("success")
        navigate("/")
        // setInterval(endAuction(nft), 60000);
    }

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



    async function bidDetails(){
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
        );
                           
        let bids = await contract.getTokenAuctionDetails(id)
        let maxBi = bids.maxBid/1000000000000000000
        let maxBidUser = bids.maxBidUser

        
        // console.log(maxBid)
        document.getElementById("BIDS").innerHTML = maxBi
        document.getElementById("BID").innerHTML = maxBidUser
        console.log(bids.seller)
        // if(bids.seller == signer){
            // document.getElementById("EndAuction").innerHTML = "End Auction"
            // if(bids.maxBi >0 ){
            //     function Timer(){
                    // setInterval(() => {
                    // //     // let a = 24
                    //     for(let a = 24; a>=0; a--){
                    //         document.getElementById("counterh").innerHTML = a;
                    //     }
                    // }, 1000);
            //     }
            // }
        // }
        // // let bidAmount = bids.maxBi
        // bidAmount.forEach(myfunc)
        // function myfunc(value, index){
        //     let bidsAll = value/1000000000000000000
        //     const BidsAll = [];
        //     BidsAll.push(bidsAll)
        //     console.log(BidsAll)
        }

        // function Timer() {
        //    setInterval(() => {
        //        let a = 24
        //        for(a = 24; a>=0; a--){
        //            document.getElementById("counterh").innerHTML = a;
        //        }
        //    }, 3600);
        // }
        
        // jQuery(function ($) 
        // {
        //     var twentyFourHours = 24 * 60 * 60;
        //     var display = $('#remainingTime');
        //     Timer(twentyFourHours, display);
        // });

    /////////////////////////////////////////  ////////////////////////////////////////////////////////

    return (
        <div onLoad={() => bidDetails()}>
            <Header />
            <div class="container">
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
                                                <h4>{" "}{Price}
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
                                                <div class="d-flex countdown_item
                                                    align-items-center">
                                                    <div class="item">
                                                        <div class=""><span id="counterh"></span></div>
                                                    </div>
                                                    <div class="dots">:</div>
                                                    <div class="item">
                                                        <div class=""><span id="counterm"></span></div>
                                                    </div>
                                                    <div class="dots">:</div>
                                                    <div class="item">
                                                        <div class=""><span id="counters"></span></div>
                                                    </div>
                                                </div>


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
                                    <a class="btn btn-sm btn-grad btn-lg" href="#"
                                        data-toggle="modal" data-target="#popup_bid">Place
                                        Bid</a>
                                    <a href="#" class="btn btn-grad btn-lg" data-toggle="modal"
                                         onClick={() => endAuction(nfts)}>
                                             <span id="EndAuction">end Auction</span>
                                         </a>
                                    <a href="#" class="btn btn-grad btn-lg" data-toggle="modal"
                                         onClick={() => withdwaw()}>
                                             <span id="EndAuction">Withdraw Bid</span>
                                         </a>
                                    <a href="#" class="btn btn-grad btn-lg" data-toggle="modal"
                                         onClick={() => cancel()}>
                                             <span id="EndAuction">Cancel Auction</span>
                                         </a>
                                    <a href="#" class="btn btn-grad btn-lg" data-toggle="modal"
                                         onClick={() => buyNft()}>
                                             <span id="EndAuction">Buy Nft</span>
                                         </a>
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
                            <div class="space-y-10">
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
                                <p> You must bid at least:</p>
                                <p class="text-right color_black txt _bold"> 67,000 ETH </p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p> service free:</p>
                                <p class="text-right color_black txt _bold"> 0.025 ETH </p>
                            </div>
                            <div class="d-flex justify-content-between">
                                <p> Total bid amount:</p>
                                <p class="text-right color_black txt _bold"> 56,031 ETH </p>
                            </div>
                            <button
                                class="btn btn-primary
                          w-full "
                                aria-label="Close"
                                onClick={() => bidNft(nfts)}
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