import React, { Component } from 'react';

import NavBar from './NavBar.jsx';

class PageCollectionAdd extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: "title",
			description: "description",
			thumbnail_image_id: "",
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleThumbnailIdChange = this.handleThumbnailIdChange.bind(this);

		this.createCollectionFormSubmit = this.createCollectionFormSubmit.bind(this);
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	handleThumbnailIdChange(e) {
		this.setState({ thumbnail_image_id: e.target.value });
	}

	createCollectionFormSubmit(e) {
		e.preventDefault();

		fetch("http://localhost:3000/api/collections/", {
			headers: {
				"Content-Type": "application/json"
			},
			method: "POST",
			body: JSON.stringify({
				collection_title: this.state.title,
				collection_description: this.state.description,
				collection_thumbnail_image_id: this.state.thumbnail_image_id
			})
		})
	}

	render() {
		return(
	       <div className="CollectionAdd">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <form className="complex_form"
                   id="add_collection_form"
                   action='/api/collections/'
                   method="POST" encType="multipart/form-data">
               <div className="form_title">Add a collection</div>
               <input type="text"
                      id="add_collection_title"
                      className="form_element"
                      placeholder="Enter a title for the collection"
                      name="collection_title"
                      onChange={this.handleTitleChange}
                      required />
               <input type="text"
                      id="add_collection_description"
                      className="form_element"
                      placeholder="Enter a description"
                      name="collection_description"
                      onChange={this.handleDescriptionChange}
                      required />
               <input type="text"
                      id="add_collection_thumbnail_image_id"
                      className="form_element"
                      placeholder="Enter the image id of the thumbnail image"
                      name="collection_thumbnail_image_id"
                      onChange={this.handleThumbnailIdChange} />
               <button type="submit"
                       className="form_submit button form_button"
                       onClick={this.createCollectionFormSubmit}>
                 Create collection
               </button>
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
