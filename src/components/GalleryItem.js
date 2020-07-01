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
                 <div className="gallery_item_title_control">X</div>
               </div>
             </div>
           </div>
    		// galleryitemtitlecontrol_delete.onclick = function() {
			// 	if (window.confirm("Are you sure you want to delete the image \"" + images[i].title + "\"?")) {
			// 		api.deleteImage(images[i]._id, function() {});
			// 	}
			// };
		  //
			// let galleryitemtitlecontrol_edit = document.createElement('div');
			// galleryitemtitlecontrol_edit.className = "gallery_item_title_control";
			// galleryitemtitlecontrol_edit.innerHTML = "E";
		  //
			// galleryitemtitlecontrol_edit.onclick = function() {
			// 	window.location.href =
			// 		"/edit_collection.html?c=" + collections[i]._id;
			// };
		);
	}
}

export default GalleryItem;
