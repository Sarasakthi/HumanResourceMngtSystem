import React, { Component } from "react";
import "./home.component.css"
import HappyClient from "../images/HappyClient.jpg"
import { Routes, Route, Link } from "react-router-dom";



export const Home = () => {



  return (
    <div >
     <div className="home-top">
        <div>
          <h1><span className="home-head">TJ Software Solutions</span></h1>
        </div>

  </div> 
      <div className="firstHeading">
        <div className="redLine"><hr></hr></div>
        <div className="headingsAndContent">
          <h6> <span className="home-subhead">A cloud services company specializing in
            enterprise software and emerging tech<span className="subHead-dot">.</span></span></h6>
          <p> <span className="subHead-content">As a reliable IT service provider since 1994, TJSS is the partner of choice for leading enterprises, SMBs and ISVs for IT consulting and building next-gen enterprise applications on cloud. TJSS designs and engineers state-of-the-art digital products and experiences to successfully execute your digital transformation campaign.</span></p>
        </div>
      </div>
      <div className="secondHeading">
        <div className="redLine-2"><hr></hr></div>


        <div className="happyClientImage">
          <img
            src={HappyClient}
            alt="HappyClient"
            className="happyClient-img-home"
          />
        </div>
        <div className="headingsAndContent-2">
          <h6> <span className="home-subhead-2">Happy Clients<span className="subHead-dot">.</span></span></h6>
          <p> <span className="subHead-content-2">For over 25 years, we have helped numerous brands with digital transformation around the world, while simultaneously enabling them to successfully navigate through a gamut of IT challenges.</span></p>
        </div>
      </div>



     
    </div>
  );

}