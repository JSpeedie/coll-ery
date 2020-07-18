import React, { Component } from 'react';
import ImageChooserItem from './ImageChooserItem.jsx';

class SingleImageChooser extends Component{

	constructor(props) {
		super(props);
		this.state = {
			selected_image: this.props.selectedImage,
			all_images: [],
		}

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(id) {
		this.setState({ selected_image: id })

		/* Pass new list of images up */
		this.props.onSelectionChange(id);
	}

	render() {
		return(
          <div className="single_image_chooser">
            <div className="image_chooser_images">
              {this.state.all_images.map((img) => 
                  <ImageChooserItem 
                               key={img._id}
                               isSelected={img._id === this.state.selected_image}
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
	}
}

export default SingleImageChooser;
