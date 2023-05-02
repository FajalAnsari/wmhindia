import React from 'react'
import "./Footer.css";
import Logo from "../../images/Logo-header.png";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div>
<div className="search-text"> 
   <div className="container">
     <div className="row text-center">
     
       <div className="form">
            <form id="search-form" className="form-search form-horizontal">
                <input type="text" className="input-search" placeholder="Enter Your Email"/>
                <button type="submit" className="btn-search">SUBSCRIBE TO UPDATES</button>
            </form>
        </div>
    
      </div>         
   </div>     
</div>


<footer>
 <div className="container">
   <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 adds">
              <span className="logo"><img src={Logo} className="wmh_logo" alt='logo'></img></span>
              <h6 className='text-white mt-4'>World Model Hunt (WMH) offers a unique perspective on the modeling and entertainment industry. It not only helps you build the audience among the global community but also produces a talk show and publishes models periodically to keep the audience involved with the updates in the industry.</h6>
            </div>
            
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 adds">
                <ul className="menu">
                     <span>Menu</span>    
                      <li>
                         <Link to="https://www.worldmodelhunt.com/about/">About</Link>
                      </li>
                           
                      <li>
                        <Link to="https://www.worldmodelhunt.com/blog/">Blog</Link>
                      </li>
                           
                      <li>
                         <Link to="https://www.worldmodelhunt.com/magazine/">Magazine</Link>
                      </li>
                 </ul>
            </div>
       
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 addes">
              <ul className="address">
                <li>
                   <Link to="https://www.facebook.com/worldmodelhunt/"><i className="bi bi-facebook"></i></Link>
                </li>
                <li>
                   <Link to="https://www.youtube.com/channel/UCUCbRH280ivKvLG64Qte_uQ"><i className="bi bi-youtube"></i></Link>
                </li> 
                <li>
                   <Link to="https://twitter.com/worldmodelhunt"><i className="bi bi-twitter"></i></Link>
                </li> 
                <li>
                   <Link to="https://www.linkedin.com/company/worldmodelhunt/?original_referer=https%3A%2F%2Fwww.worldmodelhunt.com%2F"><i className="bi bi-linkedin"></i></Link>
                </li>
                <li>
                   <Link to="https://www.pinterest.com/worldmodelhunt/world-model-hunt/"><i className="bi bi-pinterest"></i></Link>
                </li>
                
               </ul>
            </div>
        </div> 
    </div>
</footer>
    </div>
  )
}

export default Footer
