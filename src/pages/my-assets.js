import React from 'react'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate  } from "react-router-dom";
import {LikeButton} from '@lyket/react';
import Web3Modal from "web3modal"
import '../styles/Create.css'
import Footer from "../components/Footer";
import Header from "../components/Header";
// import DMyAssets from "../components/3Dmyasset"
import {
  marketplaceAddress
} from '../config';

import { FaEthereum } from "react-icons/fa";
import NFTMarketplace from '../NFTMarketplaceAbi.json'

import '../styles/Creator-Dashboard.css'
import { create as ipfsHttpClient } from 'ipfs-http-client'

import "../styles/CardList.css";
// This function detects most providers injected at window.ethereum


const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
const MyAssets = (  ) => {
  
  
  const [walletAddress, setWalletAddress] = useState("");
 
	const navigate = useNavigate()
  
  


  const [nfts, setNfts] = useState([])
  
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  
  useEffect(() => {
    loadNFTs()
  }, [])

  async function requestAccount() {
    // console.log('Requesting account...');

    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      // console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }
  
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    const data = await marketplaceContract.fetchMyNFTs()
    
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
        likes:meta.data.likes,
        owner: i.owner,
        image: meta.data.image,
        link:meta.data.link,
        name: meta.data.name,
		description: meta.data.description,
        tokenURI
      }
      return item
   
    }))
    setNfts(items)
    
    setLoadingState('loaded') 
    // return(account)
   
   
  }
  

 

 
 // #######################################

  const queryParams = new URLSearchParams(window.location.search)
  const [formInput, updateFormInput] = useState({ price: '', image: '',link:'',Name:'',Owner:'',Price:'',auctionprice:'',AuctionPrice:'', })

  // const queries = queryString.parse(this.props.location.search)
  // this.setState(queries)
  // useState({ id: '',tokenURI:''})
  const id = queryParams.get("id")
  const tokenURI = queryParams.get("tokenURI")
  const Name = queryParams.get("Name")
  const Owner = queryParams.get("Owner")
  const Price = queryParams.get("Price")
  
  const AuctionPrice = queryParams.get("AuctionPrice")
  // document.getElementById("demo") = innerHTML
  const { image,link, price ,auctionprice} = formInput
 
  // if (username != null) {
	// 	console.log("null")
	//   document.getElementById("demo").innerText = "username ";
	// }

  function listNFT(nft) {
    console.log('nft:', nft);
  
	navigate(`?id=${nft.tokenId}&tokenURI=${nft.tokenURI}&Name=${nft.name}&Price=${nft.price}&AuctionPrice=${nft.auctionprice}&Owner=${nft.owner}`);
	
	
  }

 

  useEffect(() => {
    
    
    fetchNFT()
    
  }, [id])

  async function fetchNFT() {
    
    if (!tokenURI) return
    
    const meta = await axios.get(tokenURI)
    updateFormInput(state => ({ ...state, image: meta.data.image }));
    
    
    // document.getElementById("demo").innerHTML = "username"
    
  }

  async function listNFTForSale() {
    if (!price)
	
	 return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    
    const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()
	console.log(listingPrice)
    let transaction = await contract.resellToken( id,priceFormatted, { value: listingPrice })
    await transaction.wait()
    navigate('/')
  }

  
  async function listNFTForAuction() {
    if (!auctionprice)
	return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
   
	const auctionpriceFormatted = ethers.utils.parseUnits(formInput.auctionprice, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
	console.log(listingPrice)
    let transaction = await contract.createAuctionToken( id,auctionpriceFormatted, { value: listingPrice })
    await transaction.wait()
    navigate('/')
  }

  
  
  function Details(nft) {
    console.log('nft:', nft);

	navigate(`/detail?id=${nft.tokenId}&tokenURI=${nft.tokenURI}&Name=${nft.name}&Price=${nft.price}&AuctionPrice=${nft.auctionprice}&NFTDescription=${nft.description}`);
    
  }

 
// #######################################
// document.getElementById("myImage").alt = "landscape.jpg";



  if (loadingState === 'loaded' && !nfts.length) 
  return (<>

<Header/>


<div class="mb-100">

			<div   class="hero__profile">
				<div class="cover">
					<img src="assets/img/bg/prrofile.png" alt=""/>
				</div>
				<div class="infos">
					<div class="container">
						<div class="row flex-wrap align-items-center justify-content-between sm:space-y-50">
							<div class="col-md-auto mr-20">
								<div class="avatars d-flex space-x-20
									align-items-center">
									<div class="avatar_wrap">
										<img class="avatar avatar-lg"
											src="assets/img/avatars/avatar_4.png"
											alt="avatar"/>
									</div>
									<h5></h5>
								</div>
							</div>
							<div class="col-md-auto">
								<div class="d-sm-flex flex-wrap align-items-center
									space-x-20 mb-20_reset d-sm-block">
									<div class="mb-20">
										<div class="copy">
											<span  class="color_text " >{walletAddress}
											</span>
											<a>
												<i class="ri-file-copy-line color_text"></i>
											</a>
										</div>
									</div>
									<div class="d-flex flex-wrap align-items-center
										space-x-20">
                     
										<div class="mb-20">
											<a  class="btn btn-dark btn-sm">
												Follow
											</a>
		
										</div>
										<div class="mb-20">
											<div class="share">
												<div class="icon">
													<a > <i
															class="ri-share-line"></i>
													</a>
												</div>
												<div class="dropdown__popup">
													<ul class="space-y-10">
														<li> <a > <i
																	class="ri-facebook-line"></i>
															</a>
														</li>
														<li> <a > <i
																	class="ri-messenger-line"></i>
															</a>
														</li>
														<li> <a > <i
																	class="ri-whatsapp-line"></i>
															</a>
														</li>
														<li> <a > <i
																	class="ri-youtube-line"></i>
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div class="mb-20">
											<div class="more">
												<div class="icon">
													<a > <i
															class="ri-more-fill"></i>
													</a>
												</div>
												<div class="dropdown__popup">
													<ul class="space-y-10">
														<li>
															<a class="space-x-10 d-flex">
																<i class="ri-flag-line"></i>
																<span> Report </span>
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
         
		</div>


  <div class="container">
			<div class="row justify-content-center">
	<div class="col-lg-3 col-md-7 order-md-0 order-1">
					<div class="profile__sidebar">
						<div class="space-y-40">
							<div class="space-y-10">
								<h5>About me</h5>
								<div class="box space-y-20">
									<p>
										I make art with the simple goal of giving you
										something
										pleasing to look at for a few seconds.
									</p>
									<div class="row">
										<div class="col-6">
											<span class="txt_sm color_text">Collections</span>
											<h4>105</h4>
										</div>
										<div class="col-6">
											<span class="txt_sm color_text">Creations</span>
											<h4>406</h4>
										</div>
									</div>
								</div>
							</div>
							<div class="space-y-10">
								<h5>Follow me</h5>
								<div class="box">
									<ul class="social_profile space-y-10 overflow-hidden">
										<li>
											<a >
												<i class="ri-facebook-line"></i>
												<span class="color_text">facebook/</span>
												@creabik
											</a>
										</li>
										<li>
											<a >
												<i class="ri-messenger-line"></i>
												<span class="color_text"> messenger/</span>
												@creabik
											</a>
										</li>
										<li>
											<a >
												<i class="ri-whatsapp-line"></i>
												<span class="color_text"> whatsapp/</span>
												@creabik
											</a>
										</li>
										<li>
											<a >
												<i class="ri-youtube-line"></i>
												<span class="color_text">youtube/</span>
												@creabik
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<p class="text-center txt_sm mt-20 color_text">Since 2021</p>
					</div>
				</div>
	  



{/* ############################################################################################ */}

<div class="col-lg-9 col-md-12 order-md-1 order-0">
					<div class="profile__content">
						<div class="d-flex justify-content-between">
							<div class="space-x-10">
								<div class="d-flex justify-content-between">
									<ul class="nav nav-tabs d-flex space-x-10 mb-30"
										role="tablist">
										<li class="nav-item">
											<a
												class="btn btn-white btn-sm active"
												data-toggle="tab"
												href="#tabs-1"
												role="tab">
												Creations</a>
										</li>
										<li class="nav-item">
											<a
												class="btn btn-white btn-sm"
												data-toggle="tab"
												href="#tabs-2"
												role="tab">
												Collections</a>
										</li>
									</ul>
									{/* <!-- Tab panes --> */}
									<div class="dropdown d-none d-sm-block">
										<button
											class="btn btn-white btn-sm dropdown-toggle"
											type="button"
		
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false">
											Recent Active
										</button>
										<div
											class="dropdown-menu">
											<a class="dropdown-item" >Action</a>
											<a class="dropdown-item" >Another
												action</a>
											<a class="dropdown-item" >Something
												else here</a>
										</div>
									</div>
								</div>
								<h2 >No assets owned</h2>
							</div>
							
						</div>
					</div>
				</div>

 
				
{/* ############################################################################################ */}


			

	</div>
  </div>

											
										
  <Footer/>

  </>)

  return (
    <>
      <Header />

      <div class="mb-100">
        <div class="hero__profile">
          <div class="cover">
            <img src="assets/img/bg/prrofile.png" alt="" />
          </div>
          <div class="infos">
            <div class="container">
              <div class="row flex-wrap align-items-center justify-content-between sm:space-y-50">
                <div class="col-md-auto mr-20">
                  <div
                    class="avatars d-flex space-x-20
										align-items-center"
                  >
                    <div class="avatar_wrap">
                      <img
                        class="avatar avatar-lg"
                        src="assets/img/avatars/avatar_4.png"
                        alt="avatar"
                      />
                    </div>
                    <h5 ></h5>
                  </div>
                </div>
                <div class="col-md-auto">
                  <div
                    class="d-sm-flex flex-wrap align-items-center
										space-x-20 mb-20_reset d-sm-block"
                  >
                    <div class="mb-20">
                      <div class="copy">
                        <span class="color_text ">{walletAddress}</span>
                        <a>
                          <i class="ri-file-copy-line color_text"></i>
                        </a>
                      </div>
                    </div>
                    <div
                      class="d-flex flex-wrap align-items-center
											space-x-20"
                    >
                      
                      <div class="mb-20">
                        <button class="btn btn-dark btn-sm">
                          Follow
                        </button>
                      </div>
                      <div class="mb-20">
                        <div class="share">
                          <div class="icon">
                            <a>
                              {" "}
                              <i class="ri-share-line"></i>
                            </a>
                          </div>
                          <div class="dropdown__popup">
                            <ul class="space-y-10">
                              <li>
                                {" "}
                                <a>
                                  {" "}
                                  <i class="ri-facebook-line"></i>
                                </a>
                              </li>
                              <li>
                                {" "}
                                <a>
                                  {" "}
                                  <i class="ri-messenger-line"></i>
                                </a>
                              </li>
                              <li>
                                {" "}
                                <a>
                                  {" "}
                                  <i class="ri-whatsapp-line"></i>
                                </a>
                              </li>
                              <li>
                                {" "}
                                <a>
                                  {" "}
                                  <i class="ri-youtube-line"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="mb-20">
                        <div class="more">
                          <div class="icon">
                            <a>
                              {" "}
                              <i class="ri-more-fill"></i>
                            </a>
                          </div>
                          <div class="dropdown__popup">
                            <ul class="space-y-10">
                              <li>
                                <a class="space-x-10 d-flex">
                                  <i class="ri-flag-line"></i>
                                  <span> Report </span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
      
        <div class="row justify-content-center">
          <div class="col-lg-3 col-md-7 order-md-0 order-1">
          
            <div class="profile__sidebar">

              <div class="space-y-40">
                <div class="space-y-10">
                
                <div  class="mb-20">
             
											<button    data-toggle="modal" data-target="#setprofile" class="btn btn-dark btn-sm">
											Set Up Your Profile
											</button>
                
										</div>
                
                  <h5>About me</h5>
                  <div class="box space-y-20">
                    <p>
                      I make art with the simple goal of giving you something
                      pleasing to look at for a few seconds.
                    </p>
                    <div class="row">
                      <div class="col-6">
                        <span class="txt_sm color_text">Collections</span>
                        <h4>105</h4>
                      </div>
                      <div class="col-6">
                        <span class="txt_sm color_text">Creations</span>
                        <h4>406</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-10">
                  <h5>Follow me</h5>
                  <div class="box">
                    <ul class="social_profile space-y-10 overflow-hidden">
                      <li>
                        <a>
                          <i class="ri-facebook-line"></i>
                          <span class="color_text">facebook/</span>
                          @creabik
                        </a>
                      </li>
                      <li>
                        <a>
                          <i class="ri-messenger-line"></i>
                          <span class="color_text"> messenger/</span>
                          @creabik
                        </a>
                      </li>
                      <li>
                        <a>
                          <i class="ri-whatsapp-line"></i>
                          <span class="color_text"> whatsapp/</span>
                          @creabik
                        </a>
                      </li>
                      <li>
                        <a>
                          <i class="ri-youtube-line"></i>
                          <span class="color_text">youtube/</span>
                          @creabik
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p class="text-center txt_sm mt-20 color_text">Since 2021</p>
            </div>






          
          </div>

          {/* ############################################################################################ */}

          <div class="col-lg-9 col-md-12 order-md-1 order-0">
            <div class="profile__content">
              <div class="d-flex justify-content-between">
                <div class="space-x-10">
                  <div class="d-flex justify-content-between">
                    <ul
                      class="nav nav-tabs d-flex space-x-10 mb-30"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="btn btn-white btn-sm active"
                          data-toggle="tab"
                          href="#tabs-1"
                          role="tab"
                        >
                          Creations
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="btn btn-white btn-sm"
                          data-toggle="tab"
                          href="#tabs-2"
                          role="tab"
                        >
                          Collections
                        </a>
                      </li>
                    </ul>
                    {/* <!-- Tab panes --> */}
                    <div class="dropdown d-none d-sm-block">
                      <button
                        class="btn btn-white btn-sm dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Recent Active
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item">Action</a>
                        <a class="dropdown-item">Another action</a>
                        <a class="dropdown-item">Something else here</a>
                      </div>
                    </div>
                  </div>

                  <div class="tab-content">
                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                      <div class="row mb-30_reset">
                        {nfts.map((nft, i) => (

                          <div class="col-xl-3 col-xl-4 col-lg-6 col-md-6">

                            <div class="card__item three">
                              <div class="card_body space-y-10">
                                <div key={i} class="card_head">
                                  
                                {/* <iframe  onClick={() => Details(nft)}
                                    src={nft.link}
                                    alt=""
                                  /> */}
                                  <img
                                    
                                    onClick={() => Details(nft)}
                                    src={nft.image}
                                    alt=""
                                  />
                                

                                  {/* <DMyAssets/> */}
                                    
                                  
                                
                                <span class="txt_sm">
               
                                  <LikeButton  
                                    namespace="faq"
                                    hideCounterIfLessThan={1} >
                                      
                                  {({
                                            handlePress,
                                            
                                            totalLikes,
                                            userLiked,
                                            isLoading,
                                            isCounterVisible
                                          })  => (
                                          <a class="likes space-x-3 ml-10">
                                            <i onClick={handlePress} disabled={isLoading} class="ri-heart-3-fill" ></i>
                                            {totalLikes}
                                        
                                          </a>
                                    )}
                                    
                                  </LikeButton>
                              </span>

                                  <div class="action">
                                    {/* onClick={() => listNFT(nft)}   */}
                                    <button
                                      onClick={() => listNFT(nft)}
                                      data-toggle="modal"
                                      data-target="#popup_buy "
                                      class="btn
										btn-primary btn-sm
										btn_auction"
                                    >
                                      <i class=""></i>
                                      List
                                    </button>

                                    <button
									onClick={() => listNFT(nft)}
                                      class="btn
									btn-primary btn-sm
									btn_auction"
                                      data-toggle="modal"
                                      data-target="#popup_bid"
                                    >
                                      <i
                                        class="ri-auction-line
																			color_white"
                                      ></i>
                                      Auction
                                    </button>
                                  </div>
                                </div>

                                <h6 class="card_title">
                                  <a
                                    class="color_black"
                                    
                                  >
                                    {nft.name}
                                  </a>
                                </h6>

                                <div
                                  class="card_footer d-block
																space-y-10"
                                >
                                  <div
                                    class="d-flex
																	justify-content-between
																	align-items-center"
                                  >
                                    <div
                                      class="creators
																		space-x-10"
                                    >
                                      <div
                                        class="avatars
																			-space-x-20"
                                      >
                                        <a href="Profile.html">
                                          <img
                                            src="assets/img/avatars/avatar_1.png"
                                            alt="Avatar"
                                            class="avatar
																					avatar-sm"
                                          />
                                        </a>
                                        <a href="Profile.html">
                                          <img
                                            src="assets/img/avatars/avatar_2.png"
                                            alt="Avatar"
                                            class="avatar
																					avatar-sm"
                                          />
                                        </a>
                                      </div>
                                      <a href="Profile.html">
                                        <p
                                          class="avatars_name
																				txt_sm"
                                        >
                                          {nft.username}
                                        </p>
                                      </a>
                                    </div>
                                    <a class="space-x-3">
                                      <p
                                        class="color_green
																			txt_sm"
                                      >
                                        {" "}
                                        
                                        {nft.price} <FaEthereum />
                                      </p>
                                    </a>
                                  </div>
                                  <div class="hr"></div>
                                  <div
                                    class="d-flex
																	align-items-center
																	space-x-10"
                                  >
                                    <i class="ri-vip-crown-line"></i>
                                    <p
                                      class="color_text
																		txt_sm"
                                      style={{ width: "auto" }}
                                    >
                                      Highest bid
                                    </p>
                                    <span
                                      class="color_black
																		txt_sm"
                                    >
                                      0.022 ETH
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Here For Collection */}
                    <div class="tab-pane" id="tabs-2" role="tabpanel">
                      <div class="row justify-content-center mb-30_reset">
                        <div class="col-lg-6 col-md-6 col-sm-8">
                          <div class="collections space-y-10 mb-30">
                            <div class="collections_item">
                              <div class="images-box space-y-10">
                                <div class="d-flex space-x-10">
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_1.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_2.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_3.png"
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/img/items/item_4.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="collections_footer justify-content-between">
                              <h5 class="collection_title">
                                <a href="Profile.html">
                                  Creative Art collection
                                </a>
                              </h5>
                              <a class="likes space-x-3">
                                <i class="ri-heart-3-fill"></i>
                                <span class="txt_md">2.1k</span>
                              </a>
                            </div>
                            <div class="creators space-x-10">
                              <span class="color_text txt_md">
                                {" "}
                                5 items · Created by
                              </span>
                              <div class="avatars space-x-5">
                                <a href="Profile.html">
                                  <img
                                    src="assets/img/avatars/avatar_1.png"
                                    alt="Avatar"
                                    class="avatar avatar-sm"
                                  />
                                </a>
                              </div>
                              <a href="Profile.html">
                                <p class="avatars_name txt_sm">
                                  {" "}
                                  @william_jamy...{" "}
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8">
                          <div class="collections space-y-10 mb-30">
                            <div class="collections_item">
                              <div class="images-box space-y-10">
                                <div class="d-flex space-x-10">
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_5.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_6.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_7.png"
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/img/items/item_8.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="collections_footer justify-content-between">
                              <h5 class="collection_title">
                                <a href="Profile.html">
                                  Colorful Abstract collection
                                </a>
                              </h5>
                              <a class="likes space-x-3">
                                <i class="ri-heart-3-fill"></i>
                                <span class="txt_md">3.5k</span>
                              </a>
                            </div>
                            <div class="creators space-x-10">
                              <span class="color_text txt_md">
                                {" "}
                                7 items · Created by
                              </span>
                              <div class="avatars space-x-5">
                                <a href="Profile.html">
                                  <img
                                    src="assets/img/avatars/avatar_2.png"
                                    alt="Avatar"
                                    class="avatar avatar-sm"
                                  />
                                </a>
                              </div>
                              <a href="Profile.html">
                                <p class="avatars_name txt_sm">
                                  {" "}
                                  @alexis_fenn...{" "}
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8">
                          <div class="collections space-y-10 mb-30">
                            <div class="collections_item">
                              <div class="images-box space-y-10">
                                <div class="d-flex space-x-10">
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_2.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_6.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_3.png"
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/img/items/item_7.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="collections_footer justify-content-between">
                              <h5 class="collection_title">
                                <a href="Profile.html">
                                  Photography Art collection
                                </a>
                              </h5>
                              <a class="likes space-x-3">
                                <i class="ri-heart-3-fill"></i>
                                <span class="txt_md">7.2k</span>
                              </a>
                            </div>
                            <div class="creators space-x-10">
                              <span class="color_text txt_md">
                                {" "}
                                2 items · Created by
                              </span>
                              <div class="avatars space-x-5">
                                <a href="Profile.html">
                                  <img
                                    src="assets/img/avatars/avatar_3.png"
                                    alt="Avatar"
                                    class="avatar avatar-sm"
                                  />
                                </a>
                              </div>
                              <a href="Profile.html">
                                <p class="avatars_name txt_sm">
                                  {" "}
                                  @Joshua_Bren...{" "}
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8">
                          <div class="collections space-y-10 mb-30">
                            <div class="collections_item">
                              <div class="images-box space-y-10">
                                <div class="d-flex space-x-10">
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_1.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_2.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_3.png"
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/img/items/item_4.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="collections_footer justify-content-between">
                              <h5 class="collection_title">
                                <a href="Profile.html">
                                  Fantasy Art collection
                                </a>
                              </h5>
                              <a class="likes space-x-3">
                                <i class="ri-heart-3-fill"></i>
                                <span class="txt_md">2.1k</span>
                              </a>
                            </div>
                            <div class="creators space-x-10">
                              <span class="color_text txt_md">
                                {" "}
                                5 items · Created by
                              </span>
                              <div class="avatars space-x-5">
                                <a href="Profile.html">
                                  <img
                                    src="assets/img/avatars/avatar_4.png"
                                    alt="Avatar"
                                    class="avatar avatar-sm"
                                  />
                                </a>
                              </div>
                              <a href="Profile.html">
                                <p class="avatars_name txt_sm">
                                  {" "}
                                  @william_jamy...{" "}
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8">
                          <div class="collections space-y-10 mb-30">
                            <div class="collections_item">
                              <div class="images-box space-y-10">
                                <div class="d-flex space-x-10">
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_5.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_6.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_7.png"
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/img/items/item_8.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="collections_footer justify-content-between">
                              <h5 class="collection_title">
                                <a href="Profile.html">Pop Art collection</a>
                              </h5>
                              <a class="likes space-x-3">
                                <i class="ri-heart-3-fill"></i>
                                <span class="txt_md">3.5k</span>
                              </a>
                            </div>
                            <div class="creators space-x-10">
                              <span class="color_text txt_md">
                                {" "}
                                7 items · Created by
                              </span>
                              <div class="avatars space-x-5">
                                <a href="Profile.html">
                                  <img
                                    src="assets/img/avatars/avatar_5.png"
                                    alt="Avatar"
                                    class="avatar avatar-sm"
                                  />
                                </a>
                              </div>
                              <a href="Profile.html">
                                <p class="avatars_name txt_sm">
                                  {" "}
                                  @alexis_fenn...{" "}
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-8">
                          <div class="collections space-y-10 mb-30">
                            <div class="collections_item">
                              <div class="images-box space-y-10">
                                <div class="d-flex space-x-10">
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_2.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_6.png"
                                    alt=""
                                  />
                                  <img
                                    style={{ width: "33.33%" }}
                                    src="assets/img/items/item_3.png"
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/img/items/item_7.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="collections_footer justify-content-between">
                              <h5 class="collection_title">
                                <a href="Profile.html">
                                  Contemporary Art collection
                                </a>
                              </h5>
                              <a class="likes space-x-3">
                                <i class="ri-heart-3-fill"></i>
                                <span class="txt_md">7.2k</span>
                              </a>
                            </div>
                            <div class="creators space-x-10">
                              <span class="color_text txt_md">
                                {" "}
                                2 items · Created by
                              </span>
                              <div class="avatars space-x-5">
                                <a href="Profile.html">
                                  <img
                                    src="assets/img/avatars/avatar_6.png"
                                    alt="Avatar"
                                    class="avatar avatar-sm"
                                  />
                                </a>
                              </div>
                              <a href="Profile.html">
                                <p class="avatars_name txt_sm">
                                  {" "}
                                  @Joshua_Bren...{" "}
                                </p>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ############################################################################################ */}
          <div
            class="modal fade popup"
            id="popup_buy"
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
                  <h3>List Token</h3>
                  <p>
                    You are Listing A Token {" "} 
                    <span class="color_green">{Name}</span> from
                    <span class="color_red">{Owner}</span>
                  </p>
                  <div class="space-y-10">
                    <p>Listing Price</p>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="00.00 ETH"
                      onChange={(e) =>
                        updateFormInput({ ...formInput, price: e.target.value })
                      }
                    />
                  </div>
                  <div class="space-y-10">
                    <p>
                      Actual Price{" "}
                      <span class="color_green">
                        {Price} <FaEthereum />
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
			                    w-full"
                    aria-label="Close"
                    onClick={() => listNFTForSale()}
                  >
                    List Token
                  </button>
                </div>
              </div>
            </div>
          </div>




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
                  <h3>Start Auction</h3>
                  <p>
                    You are Listing A Token{" "}
                    <span class="color_black">{Name}</span> from
                    <span class="color_red">{Owner}</span>
                  </p>
                  <div class="space-y-10">
                    <p>Minimum Bid</p>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="00.00 ETH"
                      onChange={(e) =>
                        updateFormInput({ ...formInput, auctionprice: e.target.value })
                      }
                    />
                  </div>
                  <div class="space-y-10">
                    <p>
                      Minimum Bid{"  "}
                      <span class="color_green">
                        {AuctionPrice} <FaEthereum />
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
			                    w-full"
                    aria-label="Close"
                    onClick={() => listNFTForAuction()}
                  >
                    Start Auction
                  </button>
                </div>
              </div>
            </div>
          </div>

         


          <div
            class="modal fade popup"
            id="setprofile"
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
                  <h3>Set Your Profile </h3>
                  <p>
                    You are Listing A Token{" "}
                    <span class="color_black"></span> from
                    <span class="color_red"></span>
                  </p>
                  <div class="space-y-10">
                    <p>Set UserName</p>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="00.00 ETH"
                      onChange={(e) =>
                        updateFormInput({ ...formInput, username: e.target.value })
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
			                    w-full"
                    aria-label="Close"
                    // onClick={() => setprofile()}
                  >
                   Set Up
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
     
      </div>

      <Footer />
    </>
  );
};





export default MyAssets;



