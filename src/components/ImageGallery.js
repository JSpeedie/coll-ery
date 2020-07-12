import React, { Component } from 'react';
import update from 'react-addons-update';

import GalleryItem from './GalleryItem';
import GalleryItemImage from './GalleryItemImage';

class ImageGallery extends Component{

	constructor(props) {
		super(props);
		this.state = {
			images: [],
			sliceStart: 0,
			sliceEnd: 10
		}
		this.increaseSlice = this.increaseSlice.bind(this);
	}

	increaseSlice() {
		if (this.state.sliceEnd <= this.state.images.length) {
			this.setState(prevState => ({
				sliceEnd: prevState.sliceEnd + 10
			}));
		}
	}

	render() {
        const galleryImages = this.state.images.slice(this.state.sliceStart, this.state.sliceEnd).sort().map((img) => 
              <GalleryItemImage key={img._id}
                                collectionId={this.props.collectionId}
                                imageId={img._id}
                                previewImageId={img._id}
                                description={img.description}
                                title={img.title}/>
		)
		return(
          <div className="image_gallery">
            <div className="image_gallery_images">
            {galleryImages }
            </div>
            {(this.state.sliceEnd <= this.state.images.length)
              ?
                <div className="image_gallery_lower_controls">
                  <button className="image_gallery_controls_button" onClick={this.increaseSlice}>
                    Load more
                  </button>
                  <button className="image_gallery_controls_button" onClick={this.maxSlice}>
                    Load All
                  </button>
                  <p>
                    {this.state.sliceEnd - this.state.sliceStart}/{this.state.images.length}
                  </p>
                </div>
              : ""}
          </div>
		);
	}

	componentDidMount() {
		/* If a collectionId is specified, render all the images from the
		 * collection, otherwise render every image */
		if (this.props.collectionId) {
			fetch('http://localhost:3000/api/collections/' + this.props.collectionId)
				.then(res => res.json()).then((data) => {
					let imageIds = data.images;
					this.setState(prevState => ({
						images: new Array(imageIds.length)
					}), () => {
						for (let i = 0; i < imageIds.length; i++) {
							fetch('http://localhost:3000/api/images/' + imageIds[i])
								.then(res => res.json()).then((img) => {
									this.setState(update(this.state, {
										images: {
											[i]: {
												$set: img
											}
										}
									}))
								}).catch(console.log);
						}
					})

				}).catch(console.log);
		} else {
			fetch('http://localhost:3000/api/images')
				.then(res => res.json()).then((data) => {
					this.setState({ images: data });
				}).catch(console.log);
		}
	}
}

export default ImageGallery;
