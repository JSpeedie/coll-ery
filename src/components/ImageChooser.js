import React, { Component } from 'react';
import ImageChooserItem from './ImageChooserItem';

class ImageChooser extends Component{

	constructor(props) {
		super(props);
		this.state = {
			collection_images: [],
			all_images: [],
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id) {
		let array = []
		/* If the item is already in the collection, remove it */
		if (this.state.collection_images.includes(id)) {
			array = [...this.state.collection_images]
			let indexOfRemoved = array.indexOf(id)
			if (indexOfRemoved > -1 ) {
				array.splice(indexOfRemoved, 1)
				this.setState({ collection_images: array })
			}
		/* Otherwise add it */
		} else {
			array = [...this.state.collection_images, id]
			this.setState(prevState => ({
				collection_images: array
			}))
		}

		/* Pass new list of images up */
		this.props.onSelectionChange(array);
	}

	render() {
		return(
          <div className="image_chooser">
            <div className="image_chooser_images">
              {this.state.all_images.map((img) => 
                  <ImageChooserItem 
                               key={img._id}
                               isInCollection={this.state.collection_images.includes(img._id)}
                               imageId={img._id}
                               title={img.title}
                               onClick={ () => this.handleClick(img._id) }/>
              )}
            </div>
          </div>
		);
	}

	componentDidMount() {
		fetch('http://localhost:3000/api/images')
			.then(res => res.json()).then((data) => {
				this.setState({ all_images: data });
			}).catch(console.log);
		fetch('http://localhost:3000/api/collections/' + this.props.collectionId)
			.then(res => res.json()).then((data) => {
				this.setState({
					collection_images: data.images,
				});
			}).catch(console.log);
	}
}

export default ImageChooser;
