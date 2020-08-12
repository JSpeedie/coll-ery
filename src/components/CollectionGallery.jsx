import React, { Component } from 'react';
import GalleryItemCollection from './GalleryItemCollection.jsx';

class CollectionGallery extends Component {

	constructor(props) {
		super(props);
		this.state = {
			collections: [],
			sliceStart: 0,
			sliceEnd: 10
		}
	}

	render() {
		return(
          <div className="collection_gallery">
            {this.state.collections.slice(this.state.sliceStart, this.state.sliceEnd).map((c) =>
                <GalleryItemCollection key={c._id}
                             collectionId={c._id}
                             previewImageId={c.thumbnail_image_id}
                             description={c.description}
                             title={c.title}/>)
            }
          </div>
		);
	}

	componentDidMount() {
		fetch('http://localhost:3000/api/collections')
			.then(res => res.json()).then((data) => {
				this.setState({ collections: data })
			}).catch(console.log);
	}
}

export default CollectionGallery;
