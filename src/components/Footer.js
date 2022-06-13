import react from "react";
import { Link } from "react-router-dom";
import { useEthers, useEtherBalance } from "@usedapp/core";

const Footer = () => {

   

    return (

         <>
  <footer class="footer__1">
				<div class="container">
					<div class="row">
						<div class="col-lg-6 space-y-20">
							<div class="footer__logo">
								<a href="index.html">
									<img src="assets/img/logos/Logo.svg" alt="logo" id="logo_js_f" width="70%"/>
								</a>
							</div>
							<p class="footer__text">
								Torque is a shared liquidity NFT market smart contract
							</p>
							<div>
								<ul class="footer__social space-x-10 mb-40">
									<li> <a href="https://twitter.com/DEV_TORQUE"> <i class="ri-twitter-line"></i> </a>
									</li>
									<li> <a href="https://www.reddit.com/user/DEV-TORQUE"> <i class="ri-reddit-line"></i> </a>
									</li>
									<li> <a href="https://www.instagram.com/dev_torque/"> <i class="ri-instagram-line"></i> </a>
									</li>
                                    <li> <a href="https://discord.gg/C3YPas8r"> <i class="ri-discord-line"></i> </a>
									</li>
									<li> <a href="#"> <i class="ri-linkedin-line"></i> </a>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-lg-2 col-6">
							<h6 class="footer__title">Torque</h6>
							<ul class="footer__list">
								<li> <a href="/explore"> Marketplace </a>
								</li>
								<li> <a href="/"> Collection
									</a> </li>
								<li> <a href="/game"> Game </a> </li>
								<li> <a href="/faq"> FAQ
									</a>
								</li>
							</ul>
						</div>
						<div class="col-lg-2 col-6">
							<h6 class="footer__title">Assets</h6>
							<ul class="footer__list">
								<li> <a href="Profile.html"> Profile </a>
								</li>
								<li> <a href="Creators.html"> Creators </a>
								</li>
								<li> <a href="/404"> Colletctions </a>
								</li>
								<li> <a href="Activity.html"> Activity
									</a> </li>
							</ul>
						</div>
						<div class="col-lg-2 col-6">
							<h6 class="footer__title">Company</h6>
							<ul class="footer__list">
								<li> <a href="Upload-type.html"> Upload Types </a>
								</li>
								<li> <a href="Upload.html"> Upload </a> </li>
								<li> <a href="Connect-wallet.html"> Connect wallet
									</a> </li>
								<li> <a href="Item-details.html"> Item details </a>
								</li>
							</ul>
						</div>
					</div>
					<p class="copyright text-center">
						Copyright © 2022. Created by Team Torque.
					</p>
				</div>
			</footer>
</>
    );
}

export default Footer;