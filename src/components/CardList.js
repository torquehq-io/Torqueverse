import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import NFTDetail from "../pages/NFTDetail"
import "../styles/NFTCard.css";
import { useNavigate } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";
import { LikeButton } from '@lyket/react';
import {
  marketplaceAddress
} from '../config'
import NFTMarketplace from '../NFTMarketplaceAbi.json'
import { id } from "ethers/lib/utils";



// let rpcEndpoint = "https://polygon-mumbai.infura.io/v3/a0a5c96ef4e14c948d7fe965051867b5";

// if (process.env.NEXT_PUBLIC_WORKSPACE_URL) {
//   rpcEndpoint = process.env.NEXT_PUBLIC_WORKSPACE_URL
// }


const CardList = ({ list, type = "horizontal" }) => {


  const [modalVisible, setModalVisible] = useState(false);
  const queryParams = new URLSearchParams(window.location.search)
  const [formInput, updateFormInput] = useState({ bidprice: '' })
  const { bidprice } = formInput


  // const queries = queryString.parse(this.props.location.search)
  // this.setState(queries)
  // useState({ id: '',tokenURI:''})
  const id = queryParams.get("id")



  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const navigate = useNavigate()
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs(nft) {
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/a0a5c96ef4e14c948d7fe965051867b5");
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      provider
    );
    const data = await contract.fetchMarketItems();
    // let details = await contract.getTokenAuctionDetails(nft.tokenId)
    // let maxBid = details.maxBid()
    // let maxbid = details.maxBid/1000000000000000000;
    // document.getElementById("highbid").innerHTML = maxbid
    // let active = await contract.getListingDetails(nft.tokenId)
    // console.log(active.isActive)

    // if(active.isActive == true){
    //   let pricef = "Price"
    // }
    // else{
    //   let rpricef = "Reserved Price"
    // }


    const items = await Promise.all(
      data.map(async (i) => {


        const tokenURI = await contract.tokenURI(i.tokenId);
        const signer = provider.getSigner();
        const meta = await axios.get(tokenURI);

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let auctionprice = ethers.utils.formatUnits(i.auctionprice.toString(), "ether");


        let item = {
          price,

          auctionprice,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.seller,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          tokenURI,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
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

    /* user will be prompted to pay the asking proces to complete the transaction */
    // let details = await contract.getTokenAuctionDetails(nft.tokenId)
    // let maxBid = details.maxBid()
    // let maxbid = details.maxBid/1000000000000000000;
    // document.getElementById("highbid").innerHTML = maxbid
    // let active = await contract.getListingDetails(nft.tokenId)
    // console.log(active.isActive)

    // if(active.isActive == true){
    //   document.getElementById("price").innerHTML = "Price"
    // }
    // else{
    //   document.getElementById("price").innerHTML = "Reserved Price"
    // }
    // await transaction.wait();
    loadNFTs();


  }

  // async function auctionDetails(nft) {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(
  //     marketplaceAddress,
  //     NFTMarketplace.abi,
  //     signer
  //   );

  //   let details = await contract.getTokenAuctionDetails(nft.tokenId)
  //   // let maxBid = details.maxBid()
  //   let maxbid = details.maxBid/1000000000000000000;
  //   document.getElementById("highbid").innerHTML = maxbid
  //   let active = await contract.getListingDetails(nft.tokenId)
  //   console.log(active.isActive)

  //   if(active.isActive == true){
  //     document.getElementById("price").innerHTML = "Price"
  //   }
  //   else{
  //     document.getElementById("price").innerHTML = "Reserved Price"
  //   }
  // }
  
  // async function bidNft(nft) {
  //   /* needs the user to sign the transaction, so will use Web3Provider and sign it */
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();
  //   const contract = new ethers.Contract(
  //     marketplaceAddress,
  //     NFTMarketplace.abi,
  //     signer
  //   );

    
  // }







  if (loadingState === 'loaded' && !nfts.length) return (<> <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1></>)


  return (


    <div class="row mb-30_reset" >
      {nfts.map((nft, i) => (
        <NFTCard tokenURI={nft.tokenURI} nftid={nft.tokenId} nftOwner={nft.owner} nfttokenURI={nft.tokenURI} nftSrc={nft.image} nftName={nft.name} nftdescription={nft.description} nftPrice={nft.price} nftAuctionPrice={nft.auctionprice} buyNft={() => buyNft(nft)}
          key={i}
        />
      ))}


      

    </div>




  );
};




export default CardList;
