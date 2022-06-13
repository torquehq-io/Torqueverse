import React from "react";
import ReactDOM from "react-dom";
import Header from "../components/Header"
import Footer from "../components/Footer";

const Notfound = () => {

  return (

  <>
  <Header/>
  	
  <div class="not__found">
			    <div class="container">
			        <div class="row justify-content-center align-items-center pt-100">
			            <div class="col-lg-3 d-none d-lg-block">
			                <img class="img-fluid"
			                    src="../assets/img/bg/left-Skull.png" alt=""/>
			
			            </div>
			            <div class="col-lg-6">
			
			
			                <div class="space-y-30 content">
			                    <div class="space-y-20 d-flex flex-column
			                        justify-content-center align-items-center">
										<h2 class="text-center">Coming Soon...😉!</h2>
			                        <img src="../assets/img/bg/404.png" alt=""/>
			                        <h2 class="text-center">whooops 🥺! Page not Found</h2>
			                        <p class="text-center">Maybe bigfoot has broken this
			                            page.
			                            Come back to the Homepage
			                        </p>
			                        <div><a href="/" class="btn btn-grad">Go Back</a></div>
			                    </div>
			                </div>
			
			            </div>
			            <div class="col-lg-3 d-none d-lg-block">
			                <img class="img-fluid"
			                    src="../assets/img/bg/right-Skull.png" alt=""/>
			
			            </div>
			
			
			
			        </div>
			    </div>
			</div>
			<Footer/>
  </>
  );
};

export default Notfound;
