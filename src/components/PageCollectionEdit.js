import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';

class PageCollectionEdit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			_id: 0,
			title: "title",
			description: "description",
			thumbnail_image_id: 0,
			images: []
		}
	}

	patchCollection() {
		fetch("http://localhost:3000/api/collections/" + this.state._id + "/", {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				_id: this.state._id,
				title: this.state.title,
				description: this.state.description,
				thumbnail_image_id: this.state.thumbnail_image_id,
				images: this.state.images
			})
		})
	}
	render(){
		return(
	       <div className="CollectionEdit">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <br/>
             <h2>{this.state.title}</h2>
             <br/>

             <div id="collection_section">
               <div className="edit_collection_container">
                 <div className="edit_collection_preview">
                   <img className="edit_collection_preview_collection"
                        src={"http://localhost:3000/api/img/" + this.state.thumbnail_image_id}
                        height="400" />
                 </div>
                 <div className="edit_collection_edit_fields_div">
                   <div className="edit_collection_info_title">
                     <p>
                       Title:
                     </p>
                     <input type="text"
                            className="form_element edit_collection_info_title_input"
                            value={this.state.title}
                            onChange={this.handleTitleChange}/>
                   </div>
                   <div className="edit_collection_info_description">
                     <p>
                       Description:
                     </p>
                     <input type="text"
                            className="form_element edit_collection_info_description_input"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}/>
                   </div>
                   <div className="edit_collection_info_thumbnail_image_id">
                     <p>
                       Thumbnail Image ID:
                     </p>
                     <input type="text"
                            className="form_element edit_collection_info_thumbnail_image_id_input"
                            value={this.state.thumbnail_image_id}
                            onChange={this.handleThumbnailIdChange}/>
                   </div>
                   <input type="text"
                          className="form_element edit_collection_info_images_input"
                          value={this.state.images}
                            onChange={this.handleImagesChange}/>
                   <br/>
                   <button className="edit_collection_info_save button">
                     Save
                   </button>
                   <button className="edit_collection_info_add_images button">
                     Add Images
                   </button>
                 </div>
               </div>
               <ImageChooser collectionId={this.props.match.params.id} />
             </div>

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

	componentDidMount() {
		/* Get collection info */
		fetch('http://localhost:3000/api/collections/' + this.props.match.params.id)
			.then(res => res.json()).then((data) => {
				this.setState({
					_id: data._id,
					title: data.title,
					description: data.description,
					thumbnail_image_id: data.thumbnail_image_id,
					images: data.images,
				});
			}).catch(console.log);
	}
}

export default PageCollectionEdit;
