import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import ImageChooser from './ImageChooser';

class PageCollectionEdit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			_id: 0,
			title: "title",
			description: "description",
			thumbnail_image_id: 0,
			selected_images: [],
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleThumbnailIdChange = this.handleThumbnailIdChange.bind(this);
		this.handleChooserImagesChange = this.handleChooserImagesChange.bind(this);

		this.patchCollection = this.patchCollection.bind(this);
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleThumbnailIdChange(e) {
		this.setState({ thumbnail_image_id: e.target.value });
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	handleChooserImagesChange(imgs) {
		this.setState({ selected_images: imgs }, function() {
			console.log(this.state.selected_images);
		});
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
				images: [...this.state.selected_images]
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
               <Link className="hide_link"
                     to={"/collection/" + this.state._id}>
                 <h2>{this.state.title}</h2>
               </Link>
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
                   <br/>
                   <button className="edit_collection_info_add_images button">
                     Add Images
                   </button>
                 </div>
               </div>
               <ImageChooser collectionId={this.props.match.params.id}
                             onSelectionChange={this.handleChooserImagesChange}/>
              <button className="edit_collection_info_save button"
                      onClick={this.patchCollection}>
                Save
              </button>
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
					selected_images: data.images,
				});
			}).catch(console.log);
	}
}

export default PageCollectionEdit;
