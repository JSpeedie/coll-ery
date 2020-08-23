import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ImageGallery from './ImageGallery.jsx';
import CollectionGallery from './CollectionGallery.jsx';
import NavBar from './NavBar.jsx';

class PageGallery extends Component{

	constructor(props) {
		super(props);
	}

	render(){
		return(
	       <div className="Gallery">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <Link className="homepage_section_title hide_link" to="/images">
               <div className="homepage_link_section">
                 <img className="homepage_link_bg_image"
                      src="http://localhost:3000/api/img/5f10bfc2d609da4fd8e26ac2/"/>
                 <div className="homepage_link_info">
                   <br/>
                     <p className="homepage_section_title">Images</p>
                   <br/>
                 </div>
               </div>
             </Link>

             <br/>
             <br/>

             <Link className="homepage_section_title hide_link" to="/collections">
               <div className="homepage_link_section">
                 <img className="homepage_link_bg_image"
                      src="http://localhost:3000/api/img/5f249c4e9c4d9331b91cd96e/"/>
                 <div className="homepage_link_info">
                   <br/>
                     <p className="homepage_section_title">Collections</p>
                   <br/>
                 </div>
               </div>
             </Link>

             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
           </div>
		);
	}
}

export default PageGallery;
