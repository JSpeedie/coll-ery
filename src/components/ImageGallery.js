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
	}

	render() {
		return(
          <div className="image_gallery">
            {this.state.images.slice(this.state.sliceStart, this.state.sliceEnd).map((img) => 
                <GalleryItem key={img._id}
                             imageId={img._id}
                             previewImageId={img._id}
                             description={img.description}
                             title={img.title}/>)
            }
          </div>
		);
	}

	componentDidMount() {
		fetch('http://localhost:3000/api/images')
			.then(res => res.json()).then((data) => {
				this.setState({ images: data })
			}).catch(console.log);
	}
}

export default ImageGallery;
