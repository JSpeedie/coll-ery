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

             <br/>
             <h2><Link to="/images">Images</Link></h2>
             <br/>

             <br/>
             <h2><Link to="/collections">Collections</Link></h2>
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
             <br/>
           </div>
		);
	}
}

export default PageGallery;
