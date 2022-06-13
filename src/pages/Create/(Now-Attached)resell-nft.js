import React,{ Component } from "react";
import CardList from "../../components/CardList";
import { exploreList } from "../../constants/MockupData";
import '../../styles/Explore.css';
import { useEffect, useState } from 'react'

import { ethers } from 'ethers'
import {  useNavigate } from "react-router-dom";
import axios from 'axios'

import Web3Modal from 'web3modal'

import {
  marketplaceAddress
} from '../../config'
import NFTMarketplace from '../../NFTMarketplaceAbi.json'




const ResellNFT = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const [formInput, updateFormInput] = useState({ price: '', image: '' })
  const navigate = useNavigate()
  // const queries = queryString.parse(this.props.location.search)
  // this.setState(queries)
  // useState({ id: '',tokenURI:''})
  const id = queryParams.get("id")
  const tokenURI = queryParams.get("tokenURI")
  
  const { image, price } = formInput
 
 

  useEffect(() => {
   
    fetchNFT()
  }, [id])

  async function fetchNFT() {
    
    if (!tokenURI) return
    const meta = await axios.get(tokenURI)
    updateFormInput(state => ({ ...state, image: meta.data.image }))
  }


  async function listNFTForSale() {
    if (!price) return
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const priceFormatted = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()

    listingPrice = listingPrice.toString()
    let transaction = await contract.resellToken( priceFormatted, { value: listingPrice })
    await transaction.wait()
   
    navigate('/')
  }


  return (

    < >

      
      <div class="row mb-30_reset">
      <p>Value of term: {id}</p>
        <input
          placeholder="Asset Price in Eth"
          
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        
        {
          image && (
            <img class="card_head"  src={image} />
          )
        }
        
        <button onClick={() => listNFTForSale()}>
          List NFT
        </button>
      </div>
    </>
    
    
  );
};

export default ResellNFT;

























