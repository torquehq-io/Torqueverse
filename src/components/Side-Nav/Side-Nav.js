// import React from "react";
// import "./Side-Nav.css";
// import home from "../../assets/home.png"
// import market from "../../assets/market.png"
// import about from "../../assets/about.png"
// import map from "../../assets/map.png"
// import create from "../../assets/create.png"
// import game from "../../assets/game.png"
// import { NavLink,Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";




// function SideNav() {
//   let navigate = useNavigate();
  
// ////////////////////////////////////////////////////////////////////////////////////////////////
// const location = useLocation();
// const { pathname } = location;

// //Javascript split method to get the name of the path in array
//   const splitLocation = pathname.split("/");
  
// ////////////////////////////////////////////////////////////////////////////////////////////////
//   const goExplore = () => {
//     navigate("/explore");
    
//   };

//   const goHome = () => {
//     navigate("/");
   
//   };
//   const goCreate = () => {
//     navigate("/Create");
    
//   };
//   const goAbout = () => {
//     navigate("/about");
    
//   };

//   const goGame = () => {
//     navigate("/game");
    
//   };
//   // const goMap = () => {
//   //   navigate("/map");
    
//   // };
//     return (
//     <>
// <div class="metanav">
//   <div class="sidenav">

//     <div class="sidebar">
    
    
//       <div  class={splitLocation[1] === "" ? "active" : "box"}  >
//         <button  class="bttn"  onClick={goHome}>
//           <img className='sidenav-img' src={home} alt="" />
//         </button>
//         <p2>Home</p2>
//       </div>
      
      
//       <div class={splitLocation[1] === "game" ? "active" : "box"}  >
//         <button   class="bttn" onClick={goGame}>
//         <img className='sidenav-img' src={game} alt="" />
//         </button>
//         <p2>Game</p2>
        
//       </div>
      

      
//       <div class={splitLocation[1] === "explore" ? "active" : "box"} >
//         <button class="bttn" onClick={goExplore} >
//         <img  className='sidenav-img' src={market} alt="" />
//         </button>
//         <p2>Market</p2>
     
//       </div>
      

      
//       <div class={splitLocation[1] === "Create" ? "active" : "box"}  >
//         <button class="bttn" onClick={goCreate}>
//         <img className='sidenav-img' src={create} alt="" />
//         </button>
//         <p2>Create</p2>
//       </div>
      

      
//       <div class={splitLocation[1] === "map" ? "active" : "box"}>
//         <button class="bttn">
//         <img className='sidenav-img' src={map} alt="" />
//         </button>
//         <p2>Map</p2>
//       </div>
      


      
//       <div class="box" className={splitLocation[1] === "about" ? "active" : "box"}>
//         <button class="bttn" onClick={goAbout}>
//         <img className='sidenav-img' src={about} alt="" /> 
//         </button>
//         <p2>About</p2>
//       </div>
      
     
//   </div>
// </div>
// </div>

//   </>
//   );
// }

// export default SideNav;
