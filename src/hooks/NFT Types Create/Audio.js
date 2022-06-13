import React,{ useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

import Header from "../../components/Header";
import Footer from "../../components/Footer"
import {
  marketplaceAddress
} from '../../config'
import { useNavigate } from "react-router-dom";
import NFTMarketplace from '../../NFTMarketplaceAbi.json'



const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')



const Audio= () => {



    


	

    let navigate = useNavigate();

    const [Types, setTypes] = useState();
    const goVid = () => {
       navigate("/vid");
       
       };
  
       const goCreate= () => {
          navigate("/Create");
          
          };

          const goAudio= () => {
			navigate("/Audio");
			
			};

            const goModal= () => {
                navigate("/Modal");
                
                };
    


  const CreatorsXdashboard = () => {
    navigate("/creator-dashboard");
        
    };
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const router = useRouter()

  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function uploadToIPFS() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl ,video: fileUrl,
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function listNFTForSale() {
    const url = await uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    let transaction = await contract.createToken(url, price, { value: listingPrice })
    await transaction.wait()
   
    navigate('/')
  }
 
 
  return (<> <Header/>


<div class="overflow-hidden">

<div class="hero__upload">


			    <div class="container">
			        <div class="space-y-20">
			            <a href="404-9.html" class="btn btn-white btn-sm
			                switch">
			                Switch
			                to Multiple</a>
			            <h2 class="title">Create single collectible</h2>


						<li class="d-flex space-x-10">
						<h4>Choose Type :</h4>
								<div class="dropdown">
									
								<button
								
										class="btn btn-primary btn-sm
												dropdown-toggle"
												type="button"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false">
												
                                                AUDIO
									</button>
									
									<div class="dropdown-menu">
                                    <a class="dropdown-item" onClick={() => setTypes(goCreate)}>IMAGE,GIF</a>

                                    <a class="dropdown-item" onClick={() => setTypes(goVid)}>VIDEO
                                                    </a>
										<a class="dropdown-item" onClick={() => setTypes(goAudio)}>AUDIO
													</a>
													<a class="dropdown-item" onClick={() => setTypes(goModal)}>3D Modal
													</a>
												</div>
											</div>
	                    		</li>
			        </div>
			    </div>
			</div>


           

            <div class="container">
				<div class="box in__upload mb-120">



				



					<div class="row">
						<div class="col-lg-6">
							<div class="left__part space-y-40 md:mb-20 upload_file">
								
							

								<div class="space-y-20">
									<img class="icon"
										src="assets/img/icons/upload.svg"
										alt=""/>
									<h5>Drag and drop your file</h5>
									<p class="color_text"> MP3 , Audio Content. Max
										100mb.</p>
								</div>
                                
								<div class="space-y-20">
									<p class="color_text">or choose a file</p>
									<a href="#" class="btn btn-white"> Browse files </a>

									<input name="Asset createinputfile"  id="createinputfile" type="file" 
                                    className="inputfile" onChange={onChange} accept="audio/*"/>

                                    { 
                                fileUrl &&  (
                             
                                        <audio className='asset-img' controls autoplay>
                                            
                                            <source src={fileUrl} type="audio/mp3"/>
                                            
                                           
                                        </audio>

                                    
                                    )
                                
                              }
								</div>


                                


							</div>
						</div>
						<div class="col-lg-6">
							<div class="form-group space-y-10">
								<div class="space-y-20">
                                    
									


                                    <div class="space-y-10">
										<span for="name" class="nameInput">Asset Title</span>
										<input id="name" type="text" class="form-control"
											placeholder="e. g. `raroin design art`"
                                            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}/>
									</div>

                                    

									<div class="space-y-10">
										<span class="nameInput">Description </span>

                                    <textarea type="text" id="Discription" rows="3" class="form-control"
                                    onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                                    placeholder="e. g. “After purchasing the product you can get item...”"></textarea>
										
									</div>

                             

									<div class="space-y-10">
										<span class="variationInput">Price</span>
                                        <input class="form-select custom-select" id="dollerValue" placeholder="e. g. `20$`"
                                     onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                                     />
											
									</div>
									<div class="space-y-10">
										<span class="variationInput">Choose collection</span>
										<div class="d-flex flex-column flex-md-row">
											<a href="#" class="choose_collection mb-10
												mb-md-0 mr-0 mr-md-3">
												<div class="icon">
			
													<i class="ri-add-line"></i>
												</div>
												New collection</a>
											<a href="#" class="choose_collection is_brand">
												<img
													src="assets/img/icons/raroin_icon.svg"
													alt=""/>
												Torque Collection </a>
										</div>
									</div>
			
			
								</div>
							</div>
							<p class="color_black">
								<span class="color_text text-bold"> Service fee : </span>
								2.5%
							</p> <p class="color_black">
								<span class="color_text text-bold"> You will receive :
								</span>
								22.425 ETH $41,637.78
							</p>
							<p>
			
			
							</p>
						</div>
					</div>
				</div>
			</div>






            <div class="fixed_row bottom-0 left-0 right-0">
				<div class="container">
					<div class="row content justify-content-between mb-20_reset">
						<div class="col-md-auto col-12 mb-20">
							<div class="space-x-10">
								<a href="Upload.html" class="btn btn-white
									others_btn"> Cancel</a>
								<a href="#" class="btn btn-dark others_btn"
									data-toggle="modal"
									data-target="#popup_preview"> Preview</a>
			
							</div>
						</div>
						<div class="col-md-auto col-12 mb-20">
							<button  class="btn btn-grad
								btn_create" onClick={listNFTForSale}> Create
								item</button>

                                <a onClick={CreatorsXdashboard} class="btn btn-grad
								btn_create"  > Creator Dashboard
								</a>
						</div>
					</div>
				</div>
			</div>





</div>



<Footer/>
    </>
  );
};

export default Audio;

