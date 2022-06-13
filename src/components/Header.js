import React, { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import { FaEthereum } from "react-icons/fa";
import axios from "axios";
// const express = require("express");
import NFTMarketplace from '../NFTMarketplaceAbi.json'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import {
    marketplaceAddress
} from '../config'
// const app = express();
const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb+srv://hitendra02:hacker024@cluster0.dr4q2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    walletAddress: String
});
const Contact = mongoose.model('Contact', contactSchema);


const Header = () => {





    let navigate = useNavigate();

    const Home = () => {
        navigate("/");

    };

    const goExplore = () => {
        navigate("/explore");

    };


    const pagenotfound = () => {
        navigate("/404");

    };

    const MyAssets = () => {
        navigate("/my-assets");

    };

    const CreatorsXdashboard = () => {
        navigate("/creator-dashboard");

    };

    const FAQ = () => {
        navigate("/faq");

    };
    const Create = () => {
        navigate("/Create");

    };

    const [isDarkMode, setIsDarkMode] = useState(() => false);


    // const checkbox = (document.getElementById('checkbox'))

    // checkbox.addEventListener('change', ()=>{
    // document.body.classList.toggle('is__dark');


    // });

    const queryParams = new URLSearchParams(window.location.search)
    const [formInput, updateFormInput] = useState({ Name: '', Email: '', walletAddress: '' })
    // const bidprice = queryParams.get("bidprice")
    const { Name, Email, walletAddress } = formInput
    const url = "localhost:4000/signup";
    async function signup() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            marketplaceAddress,
            NFTMarketplace.abi,
            signer
            );
            const WalletAddress = window.ethereum.request({ method: 'eth_requestAccounts' }).then(res => {

            // Return the address of the wallet
            console.log(res)
            const Name = formInput.Name
            const Email = formInput.Email
            const walletAddress = formInput.walletAddress
        });
        let address = WalletAddress;
        // console.log(Name, Email, WalletAddress)
        // Contact.name = Name();
        // Contact.email = Email();
        // Contact.walletAddress = WalletAddress();

        let arrey = (`{
            "name":"${Name}",
            "email":"${Email}",
            "walletAddress:"${address}"

        }`)
        console.log(arrey)
        
        
        // res.setHeader('Access-Control-Allow-Origin', '*');
        axios.post(url, arrey)
               .then(res => console.log('Data send'))
               .catch(err => console.log(err.data))
            


}


return (


    <>




        <header class="header__1 js-header" id="header">
            <div class="container">
                <div class="wrapper js-header-wrapper">
                    <div class="header__logo">
                        <a href="index.html">
                            <img
                                class="header__logo"
                                id="logo_js"
                                src="assets/img/logos/Logo.svg"
                                alt="logo"
                            />
                        </a>
                    </div>

                    {/*   */}
                    <div class="header__menu">
                        <ul class="d-flex space-x-20">
                            <li class="has_popup">
                                <a class="color_black" onClick={Home}>
                                    <i class="ri-home-line"></i>
                                    Home </a>

                            </li>
                            <li>
                                <a class="color_black" onClick={goExplore}>
                                    <i class="ri-store-3-line"></i> Marketplace</a>
                            </li>
                            <li>
                                <a class="color_black" onClick={pagenotfound}>
                                    <i class="ri-vip-crown-line"></i>Collections</a>
                            </li>
                            <li>
                                <a class="color_black" onClick={MyAssets}>
                                    <i class="ri-profile-line"></i>Profile</a>
                            </li>
                            <li>
                                <a class="color_black" onClick={CreatorsXdashboard}>
                                    <i class="ri-user-2-line"></i> Creators</a>
                            </li>
                            <li>
                                <a class="color_black" onClick={pagenotfound}>
                                    <i class="ri-layout-line"></i>
                                    Blog
                                </a>
                            </li>

                            <li>
                                <a class="color_black" onClick={FAQ}>
                                    <i class="ri-question-line"></i>
                                    FAQ
                                </a>
                            </li>
                            {/* <!--<li class="has_popup2">
                                      <a class="color_black is_new" href="#">Pages <i class="ri-more-2-fill"></i></a>
                                      <ul class="menu__popup2 space-y-20">
                                          <div class="row sub_menu_row">
                                          
                                              <div class="col-lg-6 space-y-10">
                                                  
                                                  <li>
                                                      <a href="Activity.html">
                                                          <i class="ri-line-chart-line"></i>
                                                          Activity
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a class="is_new" href="edit_profile.html">
                                                          <i class="ri-edit-line"></i>
                                                          Edit Profile
                                                      </a>
                                                  </li>
                                          
                                                   
                                                  <li>
                                                      <a href="Item-details.html">
                                                          <i class="ri-gallery-line"></i>
                                                          Item details
                                                      </a>
                                                  </li>
                                                  
                                                  <li>
                                                      <a class="is_new" href="Live_Auctions.html">
                                                          <i class="ri-auction-line"></i>
                                                          Live Auctions
                                                      </a>
                                                  </li>
                                                  
                                                  <li>
                                                      <a href="Upcoming_projects.html">
                                                          <i class="ri-upload-line"></i>
                                                          Upcoming projects
                                                      </a>
                                                  </li>
                                                  
                                                  <li>
                                                      <a class="is_new" href="ranking.html">
                                                          <i class="ri-funds-line"></i>
                                                          Ranking
                                                      </a>
                                                  </li>
                                          
                                                  
                                                  <li>
                                                      <a class="is_new" href="newsletter.html">
                                                          <i class="ri-mail-open-line"></i>
                                                          Newsletter
                                                      </a>
                                                  </li>
                                                
                                                  <li>
                                                      <a href="forum.html">
                                                          <i class="ri-discuss-line"></i>
                                                          Forum & community
                                                      </a>
                                                  </li>
                                                
                                                  <li>
                                                      <a href="post_details.html">
                                                          <i class="ri-chat-check-line"></i>
                                                          Forum details
                                                      </a>
                                                  </li>
                                          
                                                
                                                  <li>
                                                      <a href="no_results.html">
                                                          <i class="ri-file-search-line"></i>
                                                          No Result
                                                      </a>
                                                  </li>
                                          
                                                
                                                  <li>
                                                      <a class="is_new" href="Contact.html">
                                                          <i class="ri-customer-service-2-line"></i>
                                                          Contact
                                                      </a>
                                                  </li>
                                          
                                              </div>
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                              <div class="col-lg-6 space-y-10">
                                          
                                                   
                                                  <li>
                                                      <a href="Upload-type.html">
                                                          <i class="ri-upload-line"></i>
                                                          Upload Types
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a href="Connect-wallet.html">
                                                          <i class="ri-wallet-3-line"></i>
                                                          Connect wallet
                                                      </a>
                                                  </li>
                                          
                                                   
                                                  <li>
                                                      <a href="questions.html">
                                                          <i class="ri-question-line"></i>
                                                          FAQ
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a class="is_new" href="Submit_request.html">
                                                          <i class="ri-share-forward-line"></i>
                                                          Submit request
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a class="is_new" href="Submit_request.html">
                                                          <i class="ri-message-3-line"></i>
                                                          Request chat
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a class="is_new" href="blog.html">
                                                          <i class="ri-layout-line"></i>
                                                          Blog
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a class="is_new" href="article.html">
                                                          <i class="ri-newspaper-line"></i>
                                                          Article
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a href="register.html">
                                                          <i class="ri-lock-line"></i>
                                                          Register
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a href="login.html">
                                                          <i class="ri-shield-user-line"></i>
                                                          Login
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a href="Privacy.html">
                                                          <i class="ri-file-text-line"></i>
                                                          Privacy Policy
                                                      </a>
                                                  </li>
                                                   
                                                  <li>
                                                      <a c href="404-2.html">
                                                          <i class="ri-file-damage-line"></i>
                                                          404
                                                      </a>
                                                  </li>
                                              </div>
                                          </div>						</ul>
                                  </li> --> */}
                        </ul>
                    </div>

                    <div class="header__search">
                        <input type="text" placeholder="Search" />
                        <button class="header__result">
                            <i class="ri-search-line"></i>
                        </button>
                    </div>
                    <div class="header__btns ">
                        <button

                            class="btn
									btn-primary btn-sm
									"
                            data-toggle="modal"
                            data-target="#popup_signup"
                        >

                            Signup
                        </button>
                        <a href="#" id="connectbtn" >
                            <img width="45" src="assets/img/icons/metamask.svg" alt="" />
                        </a>



                        {/* <!-- <a href="#" class="light d-flex align-items-center is_active">
								<i class="ri-sun-fill"></i> Light
							</a>
							<a href="#" class="dark d-flex align-items-center">
								<i class="ri-moon-fill"></i> Dark
							</a> --> */}
                    </div>


                    <div class="header__burger js-header-burger ">


                    </div>
                    <div class="header__mobile js-header-mobile ">
                        <div class="header__mobile__menu space-y-40">
                            <ul class="d-flex space-y-20">
                                <li> <a class="color_black" href="/explore"> Marketplace</a> </li>
                                <li> <a class="color_black" href="Collections.html"> Collections</a> </li>
                                <li> <a class="color_black" href="Profile.html"> Profile</a> </li>
                                <li> <a class="color_black" href="Creators.html"> Creators</a> </li>

                            </ul>
                            <div class="space-y-20">
                                <div class="header__search in_mobile w-full">
                                    <input type="text" placeholder="Search" />
                                    <button class="header__result">
                                        <i class="ri-search-line"></i>
                                    </button>
                                </div>
                                <a class="btn btn-grad btn-sm" href="#">Connect
                                    wallet</a>

                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </header>

        <div
            class="modal fade popup"
            id="popup_signup"
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
                        <h3>Signup Now</h3>
                        <div class="space-y-10">
                            {/* <p>Minimum Bid = {nftAuctionPrice}</p> */}
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Name "
                                onChange={(e) =>
                                    updateFormInput({ ...formInput, Name: e.target.value })
                                }
                            />
                        </div>
                        <div class="space-y-10">
                            {/* <p>Minimum Bid = {nftAuctionPrice}</p> */}
                            <input
                                type="email"
                                class="form-control"
                                placeholder="Enter Email "
                                onChange={(e) =>
                                    updateFormInput({ ...formInput, Email: e.target.value })
                                }
                            />
                        </div>
                        {/* <div class="space-y-10">
                            <input
                                type="email"
                                class="form-control"
                                placeholder="Enter WalletAddress "
                                onChange={(e) =>
                                    updateFormInput({ ...formInput, walletAddress: e.target.value })
                                }
                            />
                        </div> */}
                        {/* <div class="space-y-10">
                                <p>
                                    Minimum Bid{"  "}
                                    <span class="color_green">
                                        <FaEthereum />
                                        ETH
                                    </span>
                                </p>
                                {/* <input type="text" class="form-control"
                              value="1"/> */}
                        {/* </div> * */}
                        {/* 
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
                            </div> */}
                        <button
                            class="btn btn-primary
                          w-full "
                            aria-label="Close"
                            onClick={signup}
                        >
                            {/* <i
                                class="ri-auction-line
                color_white"
                            ></i> */}
                            Signup Now
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </>
);
}



export default Header;