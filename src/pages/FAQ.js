import React from 'react'

import { useNavigate  } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer";

const FAQ = (  ) => {
	

  
  return (
    <>
	<Header/>
	<div class="hero_questions bg_white">
			    <div class="container">
			        <div class="space-y-20">
			            <h1 class="text-center">Frequently asked questions</h1>
			            <p class="text-center">You can set preferred display name, create your profile URL and manage other personal settings.</p>
			        </div>
			    </div>
			</div>
			




            
			<div class="questions__page mt-100">
			    <div class="row justify-content-center">
			        <div class="col-lg-8">
			            <div class="row">
			                <div class="col-lg-3 col-md-3 col-sm-4">
			                    <div class="box side">
			                        <div class="sidenav">
			                            <ul>
			                                <li class="d-flex align-items-center
			                                    space-x-10">
			                                    <i class="ri-home-2-line"></i>
			                                    <a class="text__reset" href="#General">General</a>
			                                </li>
			                                <li class="d-flex align-items-center
			                                    space-x-10">
			                                    <i class="ri-chat-1-line"></i>
			                                    <a class="text__reset" href="#Support">Support</a>
			                                </li>
			                                <li class="d-flex align-items-center
			                                    space-x-10">
			                                    <i class="ri-cloudy-line"></i>
			                                    <a class="text__reset" href="#Transaction">Transaction</a>
			                                </li>
			                                <li class="d-flex align-items-center
			                                    space-x-10">
			                                    <i class="ri-quill-pen-line"></i>
			                                    <a class="text__reset" href="#Fees">Fees</a>
			                                </li>
			                            </ul>
			                        </div>
			                    </div>
			                </div>
			                <div class="col-lg-9 col-md-9 col-sm-8">
			                    <div class="questions__box space-y-30">
			                        {/* <!-- Accordion card --> */}
			                        <div class="accordion" id="accordionEx parent"
			                            role="tablist" aria-multiselectable="true">
			                            <a href="#" id="General"></a>
			                            {/* <!-- Card header --> */}
			                            <div class="accordion-header" role="tab"
			                                id="headingOne1">
			                                <a data-toggle="collapse"
			                                    data-parent="#accordionEx"
			                                    href="#collapseOne1" aria-expanded="false"
			                                    aria-controls="collapseOne1"
			                                    class="accordion-button collapsed">
			                                    What is an NFT?
			                                </a>
			                                {/* <!-- Card body --> */}
			                                <div id="collapseOne1" class="collapse"
			                                    role="tabpanel"
			                                    aria-labelledby="headingOne1"
			                                    data-parent="#accordionEx">
			                                    <div class="accordion-desc">
			                                        NFTs or non-fungible tokens, are
			                                        cryptographic assets on blockchain with
			                                        unique identification codes and metadata
			                                        that distinguish them from each other.
			                                        NFTs are unique and not mutually
			                                        interchangeable, which means no two NFTs
			                                        are the same. NFTs can be a unique
			                                        digital artwork, sneaker in a
			                                        limited-run fashion line, in-game item,
			                                        digital collectible etc.
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        {/* <!-- Accordion card --> */}
			                        <div class="accordion" id="accordionEx" role="tablist"
			                            aria-multiselectable="true">
			                            <a href="#" id="Support"></a>
			                            {/* <!-- Card header --> */}
			                            <div class="accordion-header" role="tab"
			                                id="headingOne2">
			                                <a data-toggle="collapse"
			                                    data-parent="#accordionEx"
			                                    href="#collapseOne2" aria-expanded="false"
			                                    aria-controls="collapseOne2"
			                                    class="accordion-button collapsed">
			                                    Customer support is available ?
			                                </a>
			                                {/* <!-- Card body --> */}
			                                <div id="collapseOne2" class="collapse"
			                                    role="tabpanel"
			                                    aria-labelledby="headingOne2"
			                                    data-parent="#accordionEx">
			                                    <div class="accordion-desc">
			                                        <div class="article-body"><p>You can
			                                                fill out a request for support
			                                                via email Please provide:</p>
			                                            <ul>
			                                                <li>Your email address</li>
			                                                <li>Your wallet address (if
			                                                    applicable)</li>
			                                                <li>Choose relevant categories</li>
			                                                <li>Provide detailed information
			                                                    regarding your inquiry.</li>
			                                            </ul></div>
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        {/* <!-- Accordion card --> */}
			                        <div class="accordion" id="accordionEx parent"
			                            role="tablist" aria-multiselectable="true">
			                            <a href="#" id="Transaction"></a>
			                            {/* <!-- Card header --> */}
			                            <div class="accordion-header" role="tab"
			                                id="headingOne3">
			                                <a data-toggle="collapse"
			                                    data-parent="#accordionEx"
			                                    href="#collapseOne3" aria-expanded="false"
			                                    aria-controls="collapseOne3"
			                                    class="accordion-button collapsed">
			                                    How do I find my transaction hash?
			                                </a>
			                                {/* <!-- Card body --> */}
			                                <div id="collapseOne3" class="collapse"
			                                    role="tabpane3"
			                                    aria-labelledby="headingOne3"
			                                    data-parent="#accordionEx">
			                                    <div class="accordion-desc">
			                                        Raroin staff often requires a
			                                        "transaction hash" from Etherscan or
			                                        Polygonscan to troubleshoot support
			                                        issues.
			                                        <br/>
			                                        Transaction hashes are unique IDs
			                                        recording each transaction on the
			                                        blockchain, this includes NFT purchases,
			                                        sales or even cancelling orders. All gas
			                                        fees paid will generate a transaction
			                                        hash.
			                                    </div>
			                                </div>
			                            </div>
			                        </div>
			                        {/* <!-- Accordion card --> */}
			                        <div class="accordion" id="accordionEx" role="tablist"
			                            aria-multiselectable="true">
			                            <a id="Fees" href="#"></a>
			                            {/* <!-- Card header --> */}
			                            <div class="accordion-header" role="tab"
			                                id="headingOne4">
			                                <a data-toggle="collapse"
			                                    data-parent="#accordionEx"
			                                    href="#collapseOne4" aria-expanded="false"
			                                    aria-controls="collapseOne4"
			                                    class="accordion-button collapsed">
			                                    What are gas fees on Torque?
			                                </a>
			                                {/* <!-- Card body --> */}
			                                <div id="collapseOne4" class="collapse"
			                                    role="tabpane4"
			                                    aria-labelledby="headingOne4"
			                                    data-parent="#accordionEx">
			                                    <div class="accordion-desc">
			                                        Gas fees are like transaction fees on
			                                        the Ethereum blockchain. When you make
			                                        transactions, such as transfering crypto
			                                        to another wallet or purchasing an NFT
			                                        on Torque, you'll need enough ETH in
			                                        your wallet for the initial transaction
			                                        and the associated gas fees.
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


								
			<Footer/>
    
   </> 
  );
};





export default FAQ;



