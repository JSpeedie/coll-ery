import React, { Component } from 'react';

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
             <h2>Images</h2>
             <br/>

             <ImageGallery />

             <br/>
             <h2>Collections</h2>
             <br/>

             <CollectionGallery />

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
