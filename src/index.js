import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Explore from "./pages/Explore";
import CreateItem from "./pages/Create/Create";
import CreatorDashboard from "./pages/creator-dashboard";
import Notfound from "./pages/404";
import MyAssets from "./pages/my-assets";
import About from "./pages/(Not-Attached)About";
import Contact from "./pages/Contact";
import {Provider} from '@lyket/react';
//dapp
import { DAppProvider } from "@usedapp/core";
import NFTDetail from "./pages/NFTDetail";
import Game from "./pages/Game";
import ResellNFT from "./pages/Create/(Now-Attached)resell-nft"
import FAQ from "./pages/FAQ"
import Auction from "./hooks/Auction";
import Vid from "./hooks/NFT Types Create/Vid.js";
import Audio from "./hooks/NFT Types Create/Audio.js";
import Modal from "./hooks/NFT Types Create/3D Modal";


ReactDOM.render(
  <Provider apiKey="pt_353858864f64b31f3168d75f5cb732">
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<DAppProvider config={{}}><Home /></DAppProvider>} />
        {/*////////////////////////////////////// Hooks ////////////////////////////////*/}
        <Route path="/auction" element={<Auction />} />
        <Route path="/Vid" element={<Vid />} />
        <Route path="/Audio" element={<Audio />} />
        <Route path="/Modal" element={<Modal />} />
        {/*////////////////////////////////////// Hooks ////////////////////////////////*/}
        <Route path="/Create" element={<CreateItem/>} />
        <Route path="/creator-dashboard" element={<CreatorDashboard/>} />
        
        <Route path="/my-assets" element={<MyAssets/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/game" element={<Game />} />
        <Route path="/404" element={<Notfound/>} />
        <Route path="/explore" element={<DAppProvider config={{}}><Explore /></DAppProvider>} />
        <Route path="/detail" element={<DAppProvider config={{}}><NFTDetail /></DAppProvider>} />
        {/* <Route path="/resell-nft"  element={<DAppProvider config={{}}><ResellNFT/></DAppProvider>} /> */}
        
      </Routes>
    </BrowserRouter></Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
