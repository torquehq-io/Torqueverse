import Modal from "../SignIn/Modal";
import React from 'react';
import bitski from '../../assets/bitski.png';
import facebook from '../../assets/Facebook-logo.png';
import metamask from '../../assets/MetaMask.png';
import twitter from '../../assets/twitter.png';
import google from '../../assets/google.png';

import { useEthers, useEtherBalance } from "@usedapp/core";



function Signin() {
  const {activateBrowserWallet, account} = useEthers();
  const etherBalance = useEtherBalance(account);

  const handleWallet = () => {
    activateBrowserWallet();
  }
    const [show, setShow] = React.useState(false);
    return (
    <>
<button class="btn" onClick={() => setShow(true)}>
     Sign In
      </button>
<Modal show={show} onClose={() => setShow(false)}>
      <a>
        <h1 >Log in or Create an account</h1>
        <h3>Please link crypto-wallet in order to sign in. No funds are necessary or will be withdrawn.</h3>
        <div class="grid-container-1">
          <div class="item1"><a>EMAIL📧</a></div>
          <div class="item2">SOCIAL (Venly) </div>
          <div class="item3">Web3</div> 
        </div>

        <div class="grid-container">
          <div class="item1">
           <button class="btn"><img src={bitski} height="100px" align="center"/><ul>Bitsky</ul></button>
          </div>

          <div class="item2">
            <div class="item3">
            <button class="btn"><img src={facebook} height="30px" align="center" />Continue With Facebook</button>
            </div> 
            <div class="item3">
            <button class="btn"><img src={twitter} height="30px" align="center" />Continue With Twitter</button>
            </div> 
            <div class="item3">
            <button class="btn"><img src={google} height="30px" align="center" />Continue With Google</button>
              </div> 
          </div>

          <div class="item3">
            <button class="btn" id="connect-wallet" onClick={handleWallet} >{!account ? '' : account} 
              
              <img src={metamask} height="100px" align="center"/><ul>MetaMask</ul></button>
          </div>

        </div>
        </a>
        
      </Modal>
 </>
    );
}

export default Signin