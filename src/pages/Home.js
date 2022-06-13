import react from "react";

import Hero from "../components/Hero";
import Header from "../components/Header";
import {
  marketplaceAddress
} from '../config'
import NFTMarketplace from '../NFTMarketplaceAbi.json'
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import Footer from "../components/Footer";

 


const Home = ({ username, nftName,nftdescription, nftPrice, nftSrc, likeCount, gradient,onClick ,buyNft}) => {
  let navigate = useNavigate();

 const goExplore = () => {
    navigate("/explore");
    
    };

	const Create = () => {
		navigate("/Create");
			
		};

  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {    
    const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.infura.io/v3/a0a5c96ef4e14c948d7fe965051867b5");
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      provider
    );
    const data = await contract.fetchMarketItems();

    
const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await contract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
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
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }


  return (

  <>
  
  <Header/>
    
		
                <div class="hero__1">
					<div class="container">
						<div class="row align-items-center">
							<div class="col-lg-6">
								<div class="hero__left space-y-20">
									<h1 class="hero__title">
										Discover Digital Art
										& <br/> Collect NFTs
									</h1>
									<p class="hero__text txt">Torque is a shared liquidity
										NFT
										market smart contract<br/>
										which
										is used by multiple websites to provide the users the<br/>
										best
										possible experience.</p>
									<div class="space-x-20 d-flex flex-column flex-md-row
										sm:space-y-20">
										<a class="btn btn-primary" onClick={goExplore}>View
											market</a>
										<a class="btn btn-white" onClick={Create}>
											Upload your item</a>
									</div>
								</div>
							</div>
							<div class="col-lg-6">
								<img class="img-fluid w-full" id="img_js"
									src="assets/img/bg/in_hero1.png"
									alt=""/>
							</div>
						</div>
			
					</div>
				</div>




    <div class="mt-100">
				<div class="container">
					{/* <div class="section__head">
						<div class="d-md-flex
							sm:space-y-20
							space-x-20
							justify-content-between
							align-items-center">
							<h2 class="section__title text-center">Explore</h2>
							<ul class="menu_categories space-x-20">
							    <li>
							        <a href="#" class="color_brand">
							
							            <span> All </span>
							        </a>
							    </li>
							    <li> <a href="#">
							            <i class="ri-gamepad-line"></i> <span> Games </span>
							        </a>
							
							    </li>
							    <li> <a href="#">
							            <i class="ri-brush-line"></i> <span> Art </span>
							        </a>
							
							    </li>
							    <li> <a href="#">
							            <i class="ri-stock-line"></i> <span> Trading Cards </span>
							        </a>
							
							    </li>
							    <li> <a href="#">
							            <i class="ri-music-line"></i> <span> Music </span>
							        </a>
							
							    </li>
							    <li> <a href="#">
							            <i class="ri-global-line"></i> <span> Domain Names </span>
							        </a>
							
							    </li>
							    <li> <a href="/">
							            <i class="ri-emotion-laugh-line"></i> <span> Memes </span>
							        </a>
							
							    </li>
							    <li> <a href="/">
							            <i class="ri-layout-4-line"></i> <span> Collectibles </span>
							        </a>
							
							    </li>
							</ul>				<div class="dropdown text-center">
								<button class="btn btn-white btn-sm dropdown-toggle"
									type="button"
			
									data-toggle="dropdown" aria-haspopup="true"
									aria-expanded="false">
									Recent Active
								</button>
								<div class="dropdown-menu">
									<a class="dropdown-item" href="/">Action</a>
									<a class="dropdown-item" href="/">Another action</a>
									<a class="dropdown-item" href="/">Something else here</a>
								</div>
							</div>
						</div>
					</div> */}


                    <div class="section mt-100">
			    <div class="container">
			        <div class="section__head">
			            <div class="d-flex justify-content-between align-items-center">
			                <h2 class="section__title"> Collections</h2>
			                <a href="Collections.html" class="btn btn-dark btn-sm">
			                    View
			                    All</a>
			            </div>
			        </div>
			
			         <div class="row justify-content-center mb-30_reset">
			        	<div class="col-lg-4 col-md-6 col-sm-8">
			        		<div class="collections space-y-10 mb-30">
			        			<a href="404-4.html">
			        				<div class="collections_item">
			        					<div class="images-box space-y-10">
			        						<div class="top_imgs">
			        							<img
			        								src="assets/img/items/item_9.png"
			        								alt=""/>
			        							<img
			        								src="assets/img/items/item_10.png"
			        								alt=""/>
			        							<img
			        								src="assets/img/items/item_11.png"
			        								alt=""/>
			        						</div>
			        						<img src="assets/img/items/item_12.png"
			        							alt=""/>
			        					</div>
			        				</div>
			        			</a>
			        			<div class="collections_footer justify-content-between">
			        				<h5 class="collection_title"><a href="Collections.html">Creative Art collection</a></h5>
			        				<a href="#" class="likes space-x-3">
			        					<i class="ri-heart-3-fill"></i>
			        					<span class="txt_md">2.1k</span>
			        				</a>
			        			</div>
			        			<div class="creators space-x-10">
			        				<span class="color_text txt_md"> 5 items · Created by</span>
			        				<div class="avatars space-x-5">
			        					<a href="Profile.html">
			        						<img
			        							src="assets/img/avatars/avatar_2.png"
			        							alt="Avatar" class="avatar avatar-sm"/>
			        					</a>
			        				</div>
			        				<a href="Profile.html">
			        					<p class="avatars_name txt_sm"> @william_jamy... </p>
			        				</a>
			        			</div>
			        		</div>
			        	</div>
			        	<div class="col-lg-4 col-md-6 col-sm-8">
			        		<div class="collections space-y-10 mb-30">
			        			<a href="404-4.html">
			        				<div class="collections_item">
			        					<div class="images-box space-y-10">
			        						<div class="top_imgs">
			        							<img
			        								src="assets/img/items/item_13.png"
			        								alt=""/>
			        							<img
			        								src="assets/img/items/item_14.png"
			        								alt=""/>
			        							<img
			        								src="assets/img/items/item_15.png"
			        								alt=""/>
			        						</div>
			        						<img src="assets/img/items/item_16.png"
			        							alt=""/>
			        					</div>
			        				</div>
			        			</a>
			        			<div class="collections_footer justify-content-between">
			        				<h5 class="collection_title"><a href="Collections.html">Colorful Abstract Painting</a></h5>
			        				<a href="#" class="likes space-x-3">
			        					<i class="ri-heart-3-fill"></i>
			        					<span class="txt_md">3.5k</span>
			        				</a>
			        			</div>
			        			<div class="creators space-x-10">
			        				<span class="color_text txt_md"> 7 items · Created by</span>
			        				<div class="avatars space-x-5">
			        					<a href="Profile.html">
			        						<img
			        							src="assets/img/avatars/avatar_3.png"
			        							alt="Avatar" class="avatar avatar-sm"/>
			        					</a>
			        				</div>
			        				<a href="Profile.html">
			        					<p class="avatars_name txt_sm"> @alexis_fenn... </p>
			        				</a>
			        			</div>
			        		</div>
			        	</div>
			        	<div class="col-lg-4 col-md-6 col-sm-8">
			        		<div class="collections space-y-10 mb-30">
			        			<a href="404-4.html">
			        				<div class="collections_item">
			        					<div class="images-box space-y-10">
			        						<div class="top_imgs">
			        							<img
			        								src="assets/img/items/item_17.png"
			        								alt=""/>
			        							<img
			        								src="assets/img/items/item_18.png"
			        								alt=""/>
			        							<img
			        								src="assets/img/items/item_19.png"
			        								alt=""/>
			        						</div>
			        						<img src="assets/img/items/item_20.png"
			        							alt=""/>
			        					</div>
			        				</div>
			        			</a>
			        			<div class="collections_footer justify-content-between">
			        				<h5 class="collection_title"><a href="Collections.html">Modern Art collection</a></h5>
			        				<a href="#" class="likes space-x-3">
			        					<i class="ri-heart-3-fill"></i>
			        					<span class="txt_md">7.2k</span>
			        				</a>
			        			</div>
			        			<div class="creators space-x-10">
			        				<span class="color_text txt_md"> 2 items · Created by</span>
			        				<div class="avatars space-x-5">
			        					<a href="Profile.html">
			        						<img
			        							src="assets/img/avatars/avatar_1.png"
			        							alt="Avatar" class="avatar avatar-sm"/>
			        					</a>
			        				</div>
			        				<a href="Profile.html">
			        					<p class="avatars_name txt_sm"> @Joshua_Bren... </p>
			        				</a>
			        			</div>
			        		</div>
			        	</div>
			        </div>
			    </div>
			</div>
            </div>
    </div>

            <div class="call2action">
				<div class="container">
					<div class="row justify-content-between align-items-center
						sm:space-y-20">
						<div class="col-md-6">
							<div class="space-y-20">
								<h1 class="text-white">Start your own
									collection today</h1>
								<p class="color_text section__text">Torque is a shared
									liquidity NFT
									market smart contract
									which
									is used by multiple websites to provide the users the
									best
									possible experience.</p>
								<a href="Connect-wallet.html" class="btn
									btn-primary">Start
									Collecting</a>
							</div>
						</div>
						<div class="col-md-auto">
							<img class="img-fluid img__logo"
								src="assets/img/logos/Logo_illustrstion.png"
								alt="..."/>
						</div>
					</div>
				</div>
			</div>
            <div class="container">
				<div class="logos__wrap">
					<div class="row align-items-center justify-content-between">
						<div class="col-lg-auto col-md-12">
							<h3 class="section__title md:mb-20 text-left d-flex
								justify-content-center">Loved
								by
								the community</h3>
						</div>
						<div class="col-lg-auto col-md-12">
							<div class="d-flex flex-column flex-md-row
								justify-content-center
								space-x-20 sm:space-x-0 sm:space-y-20 align-items-center">
								<img src="assets/img/logos/1.svg" alt=""/>
								<img src="assets/img/logos/2.svg" alt=""/>
								<img src="assets/img/logos/3.svg" alt=""/>
							</div>
						</div>
					</div>
				</div>
			</div>  

    
                
<Footer/>
  </>
  );
};

export default Home;
