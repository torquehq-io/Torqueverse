import react ,{useState} from "react";
import CardList from "../components/CardList";
import { exploreList } from "../constants/MockupData";
import '../styles/Explore.css';
import Header from "../components/Header"
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Explore = () => {
	const [CardList1, setCardList] = useState(<CardList/>);
	const navigate = useNavigate();

	const goAuction = () => {
	   navigate("/auction");
	   
	   };
  return (

    
    <div id="explore">
<Header/>
      <div class="hero_marketplace bg_white">
			    <div class="container">
			        <h1 class="text-center">NFT Marketplace</h1>
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
			            <h2 class="section__title mb-20"> Artworks</h2>
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
			                            <li class="d-flex switch_item">
			                        
			                                <input type="checkbox" id="switch3" /><label
			                                    for="switch3">Toggle</label>
			                                <span class="ml-10"> Owned by creator </span>
			                            </li>

			                            

										<li class="d-flex switch_item">
			                        
											<input type="checkbox" id="switch4" />
											<label onClick={() => setCardList(goAuction)}
												for="switch4"  >Toggle</label>
											<span class="ml-10"> Auction </span>
											
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


					<CardList list={exploreList} />

          </div>
      </div>
      
      <Footer/>
   
    </div>
  );
};

export default Explore;
