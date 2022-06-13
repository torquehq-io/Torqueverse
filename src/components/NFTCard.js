import React, { useState } from "react";
import "../styles/NFTCard.css";
import { FaEthereum } from "react-icons/fa";
import { LikeButton } from '@lyket/react';
import Card from "./base/Card";

import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { ethers } from 'ethers'
import NFTMarketplace from '../NFTMarketplaceAbi.json'
import Web3Modal from 'web3modal'

import {
  marketplaceAddress
} from '../config'
import '../styles/Creator-Dashboard.css'

import "../styles/CardList.css";
import { id } from "ethers/lib/utils";


const NFTCard = ({ username, nftid, tokenURI, nftOwner, nftName, nftdescription, nftPrice, nftAuctionPrice, nftSrc,
  gradient, onClick, buyNft }) => {

  let navigate = useNavigate();


  const queryParams = new URLSearchParams(window.location.search)
  const [formInput, updateFormInput] = useState({ bidprice: '' })
  // const bidprice = queryParams.get("bidprice")
  const { bidprice } = formInput
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [nfts, setNfts] = useState([])

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

    const items = await Promise.all(data.map(async i => {
      const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenURI)

      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let maxBid = ethers.utils.formatUnits(i.maxBid.toString(), 'ether')
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  function Details(nft) {
    console.log('nft:', nft);

    navigate(`/detail?id=${nftid}&tokenURI=${tokenURI}&Name=${nftName}&Owner=${nftOwner}&Price=${nftPrice}&AuctionPrice=${nftAuctionPrice}&NFTDescription=${nftdescription}`);

  }

  function listNFT(nft) {
    console.log('nft:', nft);
    navigate(`?id=${nftid}&tokenURI=${tokenURI}&Name=${nftName}&Owner=${nftOwner}&Price=${nftPrice}&AuctionPrice=${nftAuctionPrice}&NFTDescription=${nftdescription}`);


  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////

 


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (

    <>
      <Card

        onClick={onClick}
        // onLoad={auctionDetails}


        child={

          <>


            <div class="card_head">
              <a onLoad={buyNft} onClick={()=> Details(nfts)}>

                <img src={nftSrc} alt="" />

              </a>


              {/* <a><video  controls>
                    <source src={nftSrc} type="video/mp4"  />
             </a> */}
              {/* <span class="txt_sm">
                <LikeButton
                  namespace="faq"
                  hideCounterIfLessThan={1}
                >
                  {({
                    handlePress,
                    totalLikes,
                    userLiked,
                    isLoading,
                    isCounterVisible
                  }) => (
                    <a class="likes space-x-3 ml-10">
                      <i onClick={handlePress} disabled={isLoading} class="ri-heart-3-fill" ></i>
                      {totalLikes}

                    </a>
                  )}
                </LikeButton>
              </span> */}






            </div>
            <h6 class="card_title">
              {nftName}


            </h6>

            <div class="card_footer d-block space-y-10">
              <div class="card_footer justify-content-between">
                {/* <div class="creators">
                            <p class="txt_sm"> Owner:<span class="color_red
                                txt_sm">{nftOwner}</span></p>
                          </div> */}
                <div href="#" class="creators">
                  <p class="txt_sm"><span id="price">
                    
                    </span><span
                    class="color_green
                                txt_sm">
                    {" "}
                    {nftPrice}  <FaEthereum /></span></p>
                </div>
                {/* <div href="#" class="creators">
                  <p class="txt_sm">AuctionPrice:<span
                    class="color_green
                                txt_sm">
                    {" "}
                    {nftAuctionPrice}  <FaEthereum /></span></p>
                </div> */}
              </div>
              <div class="hr"></div>
              <div class="d-flex align-items-center space-x-10
                          justify-content-between">
                {/* <div class="d-flex align-items-center
                            space-x-10">
                            <i class="ri-history-line"></i>
                            <a class="view_history" href="#" data-toggle="modal"
                              data-target="#popup_history">
                              <p class="color_text txt_sm"
                                >View
                                History</p>
                            </a>
                          </div> */}
                {/* <a class="btn btn-sm btn-primary" data-target="#popup_bid"
                  onClick={listNFT}
                > Buy/Bid
                </a> */}
                {/* <a class="btn btn-sm btn-grad" href="#"
                  data-toggle="modal" 
                  onClick={buyNft}
                  >Buy
                  </a> */}
              </div>
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
                >Highest Bid:
                  <span id="highbid"></span>
                </p>
                <span
                  class="color_black
																		txt_sm"
                >
                  ETH
                </span>
              </div>
            </div>













          </>
        }>

      </Card>

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
              // onClick={() => bidNft(nfts)}
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

    </>
  );
};

export default NFTCard;