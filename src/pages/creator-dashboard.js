import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import { FaEthereum } from "react-icons/fa";
import { ColorExtractor } from 'react-color-extractor'
import {
  marketplaceAddress
} from '../config'
import { Colors } from "../constants/Colors";
import NFTMarketplace from '../NFTMarketplaceAbi.json'
import Footer from "../components/Footer";
import Header from "../components/Header";

const CreatorDashboard = ({ list,type="horizontal" }) => {
  const [colors,setColors] = useState([])
  const getColors = colors => {
    setColors(c => [...c,...colors]);
    
  } 
  const [sold,setSold] = useState([])
 
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );

    // const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    // const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await contract.fetchItemsListed();
    
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
          sold: i.sold,
          image: meta.data.image,
          name: meta.data.name,
        };
        return item;
      })
    );/////
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded') 
  }



  if (loadingState === 'loaded' && !nfts.length) 
  
  // This Up Side For When Not Any Assets in Account
  return (
  
    <div id="explore">
    <Header/>
    <div class="hero_marketplace bg_white">
        <div class="container">
            <h1 class="text-center">Creator Dashboard </h1>
        </div>
    </div>
    
    
    <div class="bg_white border-b py-20">
        <div class="container">
            <div class="d-flex justify-content-center">
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
                    <li> <a href="#">
                            <i class="ri-emotion-laugh-line"></i> <span> Memes </span>
                        </a>
                
                    </li>
                    <li> <a href="#">
                            <i class="ri-layout-4-line"></i> <span> Collectibles </span>
                        </a>
                
                    </li>
                </ul>        </div>
        </div>
    </div>
    
    
    <div class="container">
        <div class="section mt-100">
        <div class="section__head">
                <h2 class="section__title mb-20"> Created Items</h2>
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-auto">
                        <div class="d-flex align-items-center">
                            <span class="color_text txt_sm d-none d-sm-block mr-10" >
                                FILTER BY:
                            </span>
                            <ul class="menu_categories">
                                <li class="d-flex switch_item">
                            
                                    <input type="checkbox" id="switch1" /><label
                                        for="switch1">Toggle</label>
                                    <span class="ml-10"> Has list price </span>
                                </li>
                                <li class="d-flex switch_item">
                            
                                    <input type="checkbox" id="switch2" checked/><label
                                        for="switch2">Toggle</label>
                                    <span class="ml-10"> Has open offer </span>
                                </li>
                                
                            </ul>           
                                     </div>
                                     <h1 className="py-10 px-20 text-3xl">No assets created</h1>
                    </div>
                    <div class="col-lg-auto">
                        <div class="d-flex space-x-10 align-items-center sm:mt-20">
                            <span class="color_text txt_sm"> SORT BY: </span>
                            <div class="dropdown">
                                <button
                                    class="btn btn-dark btn-sm dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    Recent Active
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else
                                        here</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    <br></br>
    
    
          <div class="section__head">
                <h2 class="section__title mb-20"> Sold Items</h2>
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-auto">
                        <div class="d-flex align-items-center">
                            <span class="color_text txt_sm d-none d-sm-block mr-10" >
                                FILTER BY:
                            </span>
                            <ul class="menu_categories">
                                <li class="d-flex switch_item">
                            
                                    <input type="checkbox" id="switch1" /><label
                                        for="switch1">Toggle</label>
                                    <span class="ml-10"> Has list price </span>
                                </li>
                                <li class="d-flex switch_item">
                            
                                    <input type="checkbox" id="switch2" checked/><label
                                        for="switch2">Toggle</label>
                                    <span class="ml-10"> Has open offer </span>
                                </li>
                               
                            </ul>                    </div>
                            <h1 className="py-10 px-20 text-3xl">Not Getting Any Details</h1>
                    </div>
                    <div class="col-lg-auto">
                        <div class="d-flex space-x-10 align-items-center sm:mt-20">
                            <span class="color_text txt_sm"> SORT BY: </span>
                            <div class="dropdown">
                                <button
                                    class="btn btn-dark btn-sm dropdown-toggle"
                                    type="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    Recent Active
                                </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else
                                        here</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    
    
    
    
        </div>
    </div>
    
    <Footer/>
    
    </div>
  )




  // This Downside  Side For When  Assets in Account
  return (

<div id="explore">
<Header/>
<div class="hero_marketplace bg_white">
    <div class="container">
        <h1 class="text-center">Creator Dashboard </h1>
    </div>
</div>


<div class="bg_white border-b py-20">
    <div class="container">
        <div class="d-flex justify-content-center">
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
                <li> <a href="#">
                        <i class="ri-emotion-laugh-line"></i> <span> Memes </span>
                    </a>
            
                </li>
                <li> <a href="#">
                        <i class="ri-layout-4-line"></i> <span> Collectibles </span>
                    </a>
            
                </li>
            </ul>        </div>
    </div>
</div>


<div class="container">
    <div class="section mt-100">
    <div class="section__head">
            <h2 class="section__title mb-20"> Created Items</h2>
            <div class="row justify-content-between align-items-center">
                <div class="col-lg-auto">
                    <div class="d-flex align-items-center">
                        <span class="color_text txt_sm d-none d-sm-block mr-10" >
                            FILTER BY:
                        </span>
                        <ul class="menu_categories">
                            <li class="d-flex switch_item">
                        
                                <input type="checkbox" id="switch1" /><label
                                    for="switch1">Toggle</label>
                                <span class="ml-10"> Has list price </span>
                            </li>
                            <li class="d-flex switch_item">
                        
                                <input type="checkbox" id="switch2" checked/><label
                                    for="switch2">Toggle</label>
                                <span class="ml-10"> Has open offer </span>
                            </li>
                            
                        </ul>                    </div>
                </div>
                <div class="col-lg-auto">
                    <div class="d-flex space-x-10 align-items-center sm:mt-20">
                        <span class="color_text txt_sm"> SORT BY: </span>
                        <div class="dropdown">
                            <button
                                class="btn btn-dark btn-sm dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Recent Active
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else
                                    here</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


      <div  class="row mb-30_reset" >

      {
                nfts.map((nft, i) => (
                  <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 ">
                  <div class="card__item four">
                  <div   class="card_body space-y-10">
                    <div key={i} class="card_head">
                      <a href="">
                      <img  src={nft.image} />
                       </a>
                    
                    </div>

                    <h6 class="card_title">
                    {nft.name}
                    </h6>

                    <div class="card_footer d-block space-y-10">
                          <div class="card_footer justify-content-between">
                            <div class="creators">
                              <p class="txt_sm">VmuktiTestNFT</p>
                            </div>
                            <a href="#" class="">
                              <p class="txt_sm">Price: <span
                                  class="color_green
                                  txt_sm">
                                    {" "}
                                    {nft.price} <FaEthereum /></span></p>
                            </a>
                          </div>
                          <div class="hr"></div>
                        
                        </div>


                    
                  </div>
                  </div>

                  </div>
                ))
              }
          {/* {nfts.map((nft,i) => (

            
            <NFTCard  nftSrc={nft.image} nftName={nft.name} nftdescription={nft.description} nftPrice={nft.price} buyNft={() => buyNft(nft)}  
            key={i} />
        ))} */}
          



      </div>


      <div class="section__head">
            <h2 class="section__title mb-20"> Sold Items</h2>
            <div class="row justify-content-between align-items-center">
                <div class="col-lg-auto">
                    <div class="d-flex align-items-center">
                        <span class="color_text txt_sm d-none d-sm-block mr-10" >
                            FILTER BY:
                        </span>
                        <ul class="menu_categories">
                            <li class="d-flex switch_item">
                        
                                <input type="checkbox" id="switch1" /><label
                                    for="switch1">Toggle</label>
                                <span class="ml-10"> Has list price </span>
                            </li>
                            <li class="d-flex switch_item">
                        
                                <input type="checkbox" id="switch2" checked/><label
                                    for="switch2">Toggle</label>
                                <span class="ml-10"> Has open offer </span>
                            </li>
                           
                        </ul>                    </div>
                </div>
                <div class="col-lg-auto">
                    <div class="d-flex space-x-10 align-items-center sm:mt-20">
                        <span class="color_text txt_sm"> SORT BY: </span>
                        <div class="dropdown">
                            <button
                                class="btn btn-dark btn-sm dropdown-toggle"
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                Recent Active
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else
                                    here</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div  class="row mb-30_reset" >

{
          
          
          sold.map((nft, i) => (
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 ">
            <div class="card__item four">
            <div   class="card_body space-y-10">
              <div key={i} class="card_head">
                <a href="">
                <img  src={nft.image} />
                 </a>
              
              </div>

              <h6 class="card_title">
              {nft.name}
              </h6>

              <div class="card_footer d-block space-y-10">
                    <div class="card_footer justify-content-between">
                      <div class="creators">
                        <p class="txt_sm">VmuktiTestNFT</p>
                      </div>
                      <a href="#" class="">
                        <p class="txt_sm">Price: <span
                            class="color_green
                            txt_sm">
                              {" "}
                              {nft.price} <FaEthereum /></span></p>
                      </a>
                    </div>
                    <div class="hr"></div>
                  
                  </div>


              
            </div>
            </div>

            </div>
          ))
          
        }
    {/* {nfts.map((nft,i) => (

      
      <NFTCard  nftSrc={nft.image} nftName={nft.name} nftdescription={nft.description} nftPrice={nft.price} buyNft={() => buyNft(nft)}  
      key={i} />
  ))} */}
    



</div>



    </div>
</div>

<Footer/>

</div>




    
    // <div id="explore">
    
      
      
    //   <h2 className="text-2xl py-2">Items Created</h2>
    //   <div class="container">
		// 	  <div class="section mt-100">
    //     <div  class="row mb-30_reset" >
    //       <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 ">
    //         { 
    //             nfts.map((nft, i) => (
    //               <div class="card__item four">
    //               <div key={i}  class="card_body space-y-10">
                    



    //                 <div class="card_head">
    //                   <a href="">
    //                   <img  src={nft.image} />
    //                    </a>
                    
    //                 </div>

    //                 <h6 class="card_title">
    //                       {nft.name}
    //                 </h6>

    //                 <div class="card_footer d-block space-y-10">
    //                       <div class="card_footer justify-content-between">
    //                         {/* <div class="creators">
    //                           <p class="txt_sm"> 4 in stock</p>
    //                         </div> */}
    //                         <a href="#" class="">
    //                           <p class="txt_sm">Price: <span
    //                               class="color_green
    //                               txt_sm">{nft.price}</span></p>
    //                         </a>
    //                       </div>
    //                       <div class="hr"></div>
                        
    //                     </div>


    //                 {/* <div class="card_footer d-block space-y-10">
    //                       <div class="card_footer justify-content-between">
    //                               <div class="creators">
    //                                 <p class="txt_sm"> 4 in stock</p>
    //                               </div>
    //                               <a href="#" class="">
    //                                 <p class="txt_sm">Price: <span
    //                                     class="color_green
    //                                     txt_sm">{nft.price}</span></p>
    //                               </a>
    //                       </div>
    //                 </div>                  */}
    //               </div>
    //               </div>
    //             ))
    //           }
    //       </div>
    //     </div>
    //     </div>
    //   </div>
    //     <div className="px-4">
    //     {
    //       Boolean(sold.length) && (
    //         <div>
    //           <h2 className="text-2xl py-2">Items sold</h2>

    //           <div className="" blurColor={colors[0]} id="card-list" style={{flexDirection:type=="horizontal" ? "row" : "column"}} >
    //             {
    //               sold.map((nft, i) => (
    //                 <div key={i} id="crd" className="card">
    //                   <ColorExtractor getColors={getColors}>
    //                   <img src={nft.image} className="nft-image" />
    //                   </ColorExtractor>
    //                   <div className="p-4 bg-black">
    //                     <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
    //                   </div>
    //                 </div>
    //               ))
    //             }
    //           </div>
    //         </div>
    //       )
    //     }
    //     </div>
        
    // </div>
  );
};

export default CreatorDashboard ;