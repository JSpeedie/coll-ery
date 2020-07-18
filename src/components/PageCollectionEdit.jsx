import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import ImageChooser from './ImageChooser.jsx';
import SingleImageChooser from './SingleImageChooser.jsx';

class PageCollectionEdit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			_id: 0,
			title: "title",
			description: "description",
			thumbnail_image_id: 0,
			selected_images: [],
			showThumbnailImageChooser: false,
			showImagesImageChooser: false
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleThumbnailChooserImagesChange = this.handleThumbnailChooserImagesChange.bind(this);
		this.handleChooserImagesChange = this.handleChooserImagesChange.bind(this);

		this.patchCollection = this.patchCollection.bind(this);
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleThumbnailChooserImagesChange(img) {
		this.setState({ thumbnail_image_id: img });
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	handleChooserImagesChange(imgs) {
		this.setState({ selected_images: imgs });
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
                     <textarea type="text"
                               className="form_element edit_collection_info_description_input"
                               value={this.state.description}
                               onChange={this.handleDescriptionChange}></textarea>
                   </div>
                   <div className="edit_collection_info_thumbnail_image_id">
                     <p>
                       Thumbnail Image:
                     </p>
                     <button className="edit_collection_info_edit_thumbnail_image button"
                             onClick={() => {
								this.setState(prevState => ({
									showThumbnailImageChooser: !prevState.showThumbnailImageChooser
								}));
                             }}>
                       Change Thumbnail Image
                     </button>
                   </div>
                   <div className="edit_collection_info_images">
                     <p>
                       Collection Images:
                     </p>
                     <button className="edit_collection_info_edit_images button"
                             onClick={() => {
								this.setState(prevState => ({
									showImagesImageChooser: !prevState.showImagesImageChooser
								}));
                             }}>
                       Change Images
                     </button>
                   </div>
                   <br />
                   <br />
                   <button className="edit_collection_info_save button"
                           onClick={this.patchCollection}>
                     Save
                   </button>
                 </div>
               </div>
               <br/>
               <br/>
               <br/>
               {this.state.showThumbnailImageChooser
               ?
               <SingleImageChooser selectedImage={this.state.thumbnail_image_id}
                             onSelectionChange={this.handleThumbnailChooserImagesChange}/>
               : ""}
               {this.state.showImagesImageChooser
               ?
               <ImageChooser collectionId={this.props.match.params.id}
                             onSelectionChange={this.handleChooserImagesChange}/>
               : ""}
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
