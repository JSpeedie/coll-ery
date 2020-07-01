import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import NavBar from './NavBar';

class PageCollectionAdd extends Component{

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

             <form className="complex_form" id="add_collection_form" action='/api/collections/' method='POST'>
               <div className="form_title">Add a collection</div>
               <input type="text" id="add_collection_title" className="form_element" placeholder="Enter a title for the collection" name="collection_title" required/>
               <input type="text" id="add_collection_description" className="form_element" placeholder="Enter a description" name="collection_description" required/>
               <input type="text" id="add_collection_thumbnail_image_id" className="form_element" placeholder="Enter the image id of the thumbnail image" name="collection_thumbnail_image_id"/>
               <button type="submit" className="form_submit button">Create collection</button>
             </form>

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

export default PageCollectionAdd;
