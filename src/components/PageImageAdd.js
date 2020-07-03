import React, { Component } from 'react';

import NavBar from './NavBar';

class PageImageAdd extends Component{

	constructor(props) {
		super(props);
	}

	render(){
		return(
	       <div className="ImageAdd">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <form class="complex_form" id="upload_image_form" action="/api/images/" method="POST" enctype="multipart/form-data">
               <div class="form_title">Upload an image</div>
               <input type="text" id="upload_image_title" class="form_element" placeholder="Enter a title for the image" name="image_title" required="" />
               <input type="text" id="upload_image_author" class="form_element" placeholder="Enter your full name" name="image_author_name" required="" />
               <input type="text" id="upload_image_description" class="form_element" placeholder="Enter a description" name="image_description" required="" />
               <input type="file" id="upload_image_file" class="form_file_browse" name="image_file" accept="image/png, image/jpeg" required="" />
               <input type="date" id="upload_image_date_taken" class="form_element" name="image_date_taken" required="" />
               <button type="submit" class="form_submit button">Upload your image</button>
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

export default PageImageAdd;
