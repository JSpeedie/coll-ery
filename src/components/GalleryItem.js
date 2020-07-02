import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class GalleryItem extends Component{

	constructor(props) {
		super(props);
		this.imageId="imageId";
		this.collectionId="collectionId";
		this.previewImageId="previewImageId";
		this.description="description";
		this.title="title";
		this.editItem = this.editItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	editItem() {
		alert("edit item? [Functionality missing]")
		// TODO: redirect to edit page
	}

	deleteItem() {
		if (window.confirm("Are you sure you want to delete the image, \"" + this.props.title + "\"?")) {
			// TODO: send delete request
		}
	}

	render() {
		return(
           <div className="gallery_item_container">
             <Link className="gallery_item_preview" to=
               {this.props.imageId
                 ? "/image/" + this.props.imageId
                 : "/collection/" + this.props.collectionId}>
               <img className="gallery_item_preview_image" src=
                 {"http://localhost:3000/api/img/" + this.props.previewImageId + "/"} height="400"/>
               <div className="gallery_item_info_div">
                 <p className="gallery_item_info">{this.props.description}</p>
               </div>
             </Link>
             <div className="gallery_item_title">{this.props.title}
               <div className="gallery_item_title_controls">
                 <Link className="gallery_item_title_control" to=
                   {this.props.imageId
                     ? "/image/edit/" + this.props.imageId
                     : "/collection/edit/" + this.props.collectionId}>
                   E
                 </Link>
                 <div className="gallery_item_title_control" onClick={this.deleteItem}>X</div>
               </div>
             </div>
           </div>
    		// galleryitemtitlecontrol_delete.onclick = function() {
			// 	if (window.confirm("Are you sure you want to delete the image \"" + images[i].title + "\"?")) {
			// 		api.deleteImage(images[i]._id, function() {});
			// 	}
			// };
			// galleryitemtitlecontrol_edit.onclick = function() {
			// 	window.location.href =
			// 		"/edit_collection.html?c=" + collections[i]._id;
			// };
		);
	}
}

export default GalleryItem;
