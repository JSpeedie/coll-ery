import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GalleryItemImage extends Component{

	constructor(props) {
		super(props);
		this.imageId="imageId";
		this.previewImageId="previewImageId";
		this.description="description";
		this.title="title";
		this.deleteItem = this.deleteItem.bind(this);
	}

	deleteItem() {
		if (window.confirm("Are you sure you want to delete the image, \"" + this.props.title + "\"?")) {
			const requestOptions = {
				method: 'DELETE'
			};

			fetch("http://localhost:3000/api/images/" + this.props.imageId, requestOptions)
				.then((response) => {
					return response.json();
				}).catch(console.log);
		}
	}

	render() {
		return(
           <div className="gallery_item_container">
             <div className="gallery_item_top">
               <div className="gallery_item_preview"
                    onClick={ () => this.props.onClick() }>
                 <img className="gallery_item_preview_image"
                      src={"http://localhost:3000/api/img/thumbnail/" + this.props.previewImageId + "/"} />
                 <div className="gallery_item_info_div">
                   <p className="gallery_item_info_title">{this.props.title}</p>
                   <p className="gallery_item_info_description">{this.props.description}</p>
                 </div>
               </div>
             </div>
           </div>
		);
	}
}

export default GalleryItemImage;
