
// // import Accordion from "../components/base/Accordion";
// // import AccordionHeader from "../components/base/AccordionHeader";
// // import Button from "../components/base/Button";
// // import Card from "../components/base/Card";
// // import Checkbox from "../components/base/Checkbox";
// // import Image from "../components/base/Image";
// // import Select from "../components/base/Select";
// // import TextInput from "../components/base/TextInput";
// // import { Colors } from "../constants/Colors";
// // import {AiOutlineSearch} from 'react-icons/ai';

// import react from "react";
// import Hero from "../components/Hero";
// import "../styles/About.css";
// import Footer from "../components/footer/footer";
// import Section from "../components/section";
// import Audio from "../assets/AboutAssets/Audio.png"
// import Video from "../assets/AboutAssets/Video.png"
// import Marketplace from "../assets/AboutAssets/Marketplace.png"
// import threeD from "../assets/AboutAssets/3D.png"
// import OpenNFTMarket from "../assets/AboutAssets/OpenNFTMarket.png"
// import Game from "../assets/AboutAssets/Game.png"



// const About = () => {
  
//   return (
    
//     <div id="about">
      
//       <Hero  />

//       {/* <!-- About banner area --> */}
//     <div class="rn-about-banner-area rn-section-gapTop">
//         <div class="container mb--30">
//             <div class="row">
//                 <div class="col-12">
//                     <h2 class=" mt-0 mb-16 reveal-from-bottom is-revealed" >Vmukti Platform <br/><span class="text-color-primary">for Game and General NFTs</span></h2>
//                 </div>
//             </div>
//         </div>
//         <div class="container-fluid about-fluidimg ">
//             <div class="row">
//                 <div class="img-wrapper">
//                     <div class="bg_image--22 bg_image">

//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div class="container">
//             <div class="row g-5">
//                 <div class="col-lg-6">
//                     <div class="h--100">
//                         <div class="rn-about-card mt_dec--50 widge-wrapper rbt-sticky-top-adjust">
//                             <div class="inner">
//                                 <h2 class="title" >
//                                     Why We Do This
//                                 </h2>
//                                 <p class="about-disc" >
//                                     NFTs are virtual tokens that represent ownership of something inherently distinct and
//                                     scarce, whether it be a physical or digital item, such as artwork, a soundtrack, a
//                                     collectible, an in-game item or real estate. Unlike regular cryptocurrencies like
//                                     bitcoin or fiat money like the U.S.
//                                 </p>
//                                 <a href="blog.html" class="btn btn-primary-alta btn-large sal-animate mt--20" >See Our Blog</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-lg-6">
//                     <div class="rn-about-card transparent-bg">
//                         <div class="inner">
//                             <h3 class="title" >
//                             Build up<br/>the whole picture.
//                             </h3>
//                             <p class="about-disc mb--0" >
//                             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     {/* <!-- About banner area End --> */}
//     <div class="rn-about-Quote-area rn-section-gapTop">
//         <div class="container">
//             <div class="row g-5 d-flex align-items-center">
//                 <div class="col-lg-6">
//                     <div class="rn-about-title-wrapper">
//                         <h3 class="title" >Create, Sell well & Collect your Wonderful NFTs at Torque Very Fast</h3>
//                     </div>
//                 </div>
//                 <div class="col-lg-6">
//                     <div class="rn-about-wrapper" >
//                         <p> Integration of NFT marketplace with Virtual gaming environment 
//                                 incorporated with AI-based 3D model generation hosted upon a blockchain.<br/>
//                                 NFTs are virtual tokens that represent ownership of something inherently distinct and
//                                 scarce, whether it be a physical or digital item, such as artwork, a soundtrack, a
//                                 collectible, an in-game item or real estate. Unlike regular cryptocurrencies like
//                                 bitcoin or fiat money like the U.S.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>

//     {/* <!-- rn stastic area --> */}
//     <div class="rn-statistick-area rn-section-gapTop">
//         <div class="container">
//             <div class="row mb--30">
//                 <div class="col-12 text-center">
//                     <h3>Torque Statistics</h3>
//                 </div>
//             </div>
//             <div class="row g-5">
//                 <div class="offset-lg-2 col-lg-4 col-md-6">
//                     <div class="single-counter-up text-center">
//                         <div class="number counter-odomitter-active"><img src={Audio} width="64" height="64" alt="Features tile icon 01" /></div>
//                         <div class="botton-title">Audio NFTs
//                         <p class="m-0 text-sm">Audio files can be converted to NFT.</p></div>
//                     </div>
//                 </div>
               
//                 <div class="col-lg-4 col-md-6">
//                     <div class="single-counter-up text-center">
//                         <div class="number counter-odomitter-active"><img src={Video} width="64" height="64" alt="Features tile icon 02" /></div>
//                         <div class="botton-title">Video NFTs
//                         <p class="m-0 text-sm">Video recordings also supported.</p></div>
//                     </div>
//                 </div>
//                 <div class="offset-lg-2 col-lg-4 col-md-6">
//                     <div class="single-counter-up text-center">
//                         <div class="number counter-odomitter-active"><img src={threeD} width="64" height="64" alt="Features tile icon 03"/></div>
//                         <div class="botton-title">3D models
//                         <p class="m-0 text-sm">AI based 3D model generation.</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-lg-4 col-md-6">
//                     <div class="single-counter-up text-center">
//                         <div class="number counter-odomitter-active "><img src={Marketplace} width="64" height="64" alt="Features tile icon 04" /></div>
//                         <div class="botton-title">Game Centric NFT Marketplace
//                         <p class="m-0 text-sm">We provide game specific marketplace for gaming assets.</p></div>
//                     </div>
//                 </div>
//                 <div class="col-lg-4 col-md-6">
//                     <div class="single-counter-up text-center">
//                         <div class="number counter-odomitter-active "> <img src={OpenNFTMarket} width="64" height="64" alt="Features tile icon 05" /></div>
//                         <div class="botton-title">Open NFT Marketplace
//                         <p class="m-0 text-sm">We provide open NFT Marketplacefor genralized NFTs</p></div>
//                     </div>
//                 </div>
//                 <div class="col-lg-4 col-md-6">
//                     <div class="single-counter-up text-center">
//                         <div class="number counter-odomitter-active "><img src={Game} width="64" height="64" alt="Features tile icon 06" /></div>
//                         <div class="botton-title">Virtual Gaming Environment
//                         <p class="m-0 text-sm">It has entire virtual gaming Environment embedded in itself.</p></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     {/* <!-- rn stastic area --> */}

// {/* 
//     <!-- call to action area --> */}
//     <div class="rn-callto-action rn-section-gapTop">
//         <div class="container-fluid about-fluidimg-cta">
//             <div class="row">
//                 <div class="col-lg-12">
//                     <div class="bg_image--6 bg_image bg-image-border" data-black-overlay="7">
//                         <div class="row">
//                             <div class="col-lg-12">
//                                 <div class="call-to-action-wrapper">
//                                     <h3 >Discover
//                                         rare digital art <br/>
//                                         and collect NFTs</h3>
//                                     <p >The NFTs is a one-trick pony that climbed the recent years. The growth of NFTs is
//                                         tremendous, and according to Pymnts.com, the total sales volume </p>
//                                     <div class="callto-action-btn-wrapper" >
//                                         <a href="Create" class="btn btn-primary btn-large">Create</a>
//                                         <a href="https://www.vmukti.com/" class="btn btn-primary-alta btn-large">Contact Us</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//     {/* <!-- call to action area End --> */}



//     {/* <!-- Start BLog Area  --> */}
//     <div class="rn-blog-area rn-section-gapTop">
//         <div class="container">
//             <div class="row mb--50 align-items-center">
//                 <div class="col-lg-6 col-md-6 col-sm-6 col-12">
//                     <h3 class="title mb--0">Our Recent Blog</h3>
//                 </div>
//                 <div class="col-lg-6 col-md-6 col-sm-6 col-12 mt_mobile--15">
//                     <div class="view-more-btn text-start text-sm-end">
//                         <a class="btn-transparent" href="#">VIEW ALL<i data-feather="arrow-right"></i></a>
//                     </div>
//                 </div>
//             </div>
//             <div class="row g-5">
//                 {/* <!-- start single blog --> */}
//                 <div class="col-xl-3 col-lg-4 col-md-6 col-12" >
//                     <div class="rn-blog" data-toggle="modal" data-target="#exampleModalCenters">
//                         <div class="inner">
//                             <div class="thumbnail">
//                                 <a href="blog-details.html">
//                                     <img src="assets/images/blog/blog-02.jpg" alt="Personal Portfolio Images"/>
//                                 </a>
//                             </div>
//                             <div class="content">
//                                 <div class="category-info">
//                                     <div class="category-list">
//                                         <a href="blog-details.html">Development</a>
//                                     </div>
//                                     <div class="meta">
//                                         <span><i class="feather-clock"></i> 2 hour read</span>
//                                     </div>
//                                 </div>
//                                 <h4 class="title"><a href="blog-details.html">The services provide for design <i
//                                             class="feather-arrow-up-right"></i></a></h4>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <!-- end single blog -->
//                 <!-- start single blog --> */}
//                 <div class="col-xl-3 col-lg-4 col-md-6 col-12" >
//                     <div class="rn-blog" data-toggle="modal" data-target="#exampleModalCenters">
//                         <div class="inner">
//                             <div class="thumbnail">
//                                 <a href="blog-details.html">
//                                     <img src="assets/images/blog/blog-03.jpg" alt="Personal Portfolio Images"/>
//                                 </a>
//                             </div>
//                             <div class="content">
//                                 <div class="category-info">
//                                     <div class="category-list">
//                                         <a href="blog-details.html">Design</a>
//                                     </div>
//                                     <div class="meta">
//                                         <span><i class="feather-clock"></i> 5 min read</span>
//                                     </div>
//                                 </div>
//                                 <h4 class="title"><a href="blog-details.html">More important feature for designer<i
//                                             class="feather-arrow-up-right"></i></a></h4>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <!-- end single blog -->
//                 <!-- start single blog --> */}
//                 <div class="col-xl-3 col-lg-4 col-md-6 col-12" >
//                     <div class="rn-blog" data-toggle="modal" data-target="#exampleModalCenters">
//                         <div class="inner">
//                             <div class="thumbnail">
//                                 <a href="blog-details.html">
//                                     <img src="assets/images/blog/blog-04.jpg" alt="Personal Portfolio Images"/>
//                                 </a>
//                             </div>
//                             <div class="content">
//                                 <div class="category-info">
//                                     <div class="category-list">
//                                         <a href="blog-details.html">Marketing</a>
//                                     </div>
//                                     <div class="meta">
//                                         <span><i class="feather-clock"></i> 10 min read</span>
//                                     </div>
//                                 </div>
//                                 <h4 class="title"><a href="blog-details.html">Inavalide purpose classes & motivation.<i
//                                             class="feather-arrow-up-right"></i></a></h4>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <!-- end single blog -->
//                 <!-- start single blog --> */}
//                 <div class="col-xl-3 col-lg-4 col-md-6 col-12" >
//                     <div class="rn-blog" data-toggle="modal" data-target="#exampleModalCenters">
//                         <div class="inner">
//                             <div class="thumbnail">
//                                 <a href="blog-details.html">
//                                     <img src="assets/images/blog/blog-05.jpg" alt="Personal Portfolio Images"/>
//                                 </a>
//                             </div>
//                             <div class="content">
//                                 <div class="category-info">
//                                     <div class="category-list">
//                                         <a href="blog-details.html">NFT's</a>
//                                     </div>
//                                     <div class="meta">
//                                         <span><i class="feather-clock"></i> 1 min read</span>
//                                     </div>
//                                 </div>
//                                 <h4 class="title"><a href="blog-details.html">Canada is a great fact for NFT's<i
//                                             class="feather-arrow-up-right"></i></a></h4>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <!-- end single blog --> */}
//             </div>
//         </div>
//     </div>
//     {/* <!-- End BLog Area  --> */}

//       {/* <Section/> */}
      
//     </div>
    
//   );
// };

// export default About;
