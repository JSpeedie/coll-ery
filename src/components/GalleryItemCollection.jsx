import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GalleryItemCollection extends Component{

	constructor(props) {
		super(props);
		this.state = {
			_id: "_id",
			images: []
		}
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
		/* Get the 2 most recent, non-thumbnail images in the collection */
		let collectionImages = this.state.images
			.filter(i => i != this.props.previewImageId)
			.slice(-3, -1)
			.map((image) =>
              <div className="testy">
                <img className="gallery_item_preview_extra_image"
                     src={"http://localhost:3000/api/img/thumbnail/" + image + "/"} />
              </div>
		);

		return(
           <div className="gallery_item_collection_container">
             <div className="gallery_item_collection_top">
               <Link className="gallery_item_preview"
                     to={"/collection/" + this.props.collectionId}>
                 <img className="gallery_item_preview_image"
                      src={"http://localhost:3000/api/img/thumbnail/" + this.props.previewImageId + "/"}
                      height="400"/>
                 <div className="gallery_item_preview_extra_images">
                   {collectionImages}
                 </div>

               </Link>
             </div>
             <div className="gallery_item_title">
               {this.props.title}
             </div>
           </div>
		);
	}
                 // <div className="gallery_item_info_div">
                 //   <p className="gallery_item_info">
                 //     {this.props.description}
                 //   </p>
                 // </div>

	componentDidMount() {
		/* Get the title of the collection */
		fetch('http://localhost:3000/api/collections/' + this.props.collectionId)
			.then(res => res.json()).then((data) => {
				this.setState({
					_id: data._id,
					images: data.images
				});
			}).catch(console.log);
	}
}

export default GalleryItemCollection;
