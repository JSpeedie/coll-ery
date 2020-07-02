import React, { Component } from 'react';
import GalleryItem from './GalleryItem';

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
		return(
          <div className="image_gallery">
            <div className="image_gallery_images">
              {this.state.images.slice(this.state.sliceStart, this.state.sliceEnd).map((img) => 
                  <GalleryItem key={img._id}
                               imageId={img._id}
                               previewImageId={img._id}
                               description={img.description}
                               title={img.title}/>)
              }
            </div>
            {(this.state.sliceEnd <= this.state.images.length)
              ? 
                <div className="image_gallery_lower_controls">
                  <button className="image_gallery_controls_button" onClick={this.increaseSlice}>
                    Load more
                  </button>
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

					for (let i = 0; i < imageIds.length; i++) {
						fetch('http://localhost:3000/api/images/' + imageIds[i])
							.then(res => res.json()).then((data) => {
								this.setState(prevState => ({
									images: [...prevState.images, data]
								}))
							}).catch(console.log);
					}
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
