import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GalleryItem extends Component{

	constructor(props) {
		super(props);
		this.imageId="imageId";
		this.collectionId="collectionId";
		this.previewImageId="previewImageId";
		this.description="description";
		this.title="title";
		this.deleteItem = this.deleteItem.bind(this);
	}

	deleteItem() {
		if (window.confirm("Are you sure you want to delete the collection, \"" + this.props.title + "\"?")) {
			const requestOptions = {
				method: 'DELETE'
			};

			fetch("http://localhost:3000/api/collections/" + this.props.collectionId, requestOptions)
				.then((response) => {
					return response.json();
				}).catch(console.log);
		}
	}

	render() {
		return(
           <div className="gallery_item_container">
             <Link className="gallery_item_preview"
                   to={"/collection/" + this.props.collectionId}>
               <img className="gallery_item_preview_image"
                    src={"http://localhost:3000/api/img/thumbnail/" + this.props.previewImageId + "/"}
                    height="400"/>
               <div className="gallery_item_info_div">
                 <p className="gallery_item_info">
                   {this.props.description}
                 </p>
               </div>
             </Link>
             <div className="gallery_item_title">
               {this.props.title}
             </div>
           </div>
		);
	}
}

export default GalleryItem;
