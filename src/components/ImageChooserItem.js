import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ImageChooserItem extends Component{

	constructor(props) {
		super(props);
	}

	render() {
		return(
           <div className="image_chooser_item_container"
                  onClick={ () => this.props.onClick() }>
             <div className="image_chooser_item_preview">
               <img className="image_chooser_item_preview_image"
                    src={"http://localhost:3000/api/img/thumbnail/" + this.props.imageId + "/"}
                    height="150"/>
               {this.props.isInCollection
               ?
               <div className="image_chooser_item_info_div">
                 <p className="image_chooser_item_info">
                   In the collection!
                 </p>
               </div>
               : "" }
               {this.props.isSelected
               ?
               <div className="image_chooser_item_info_div">
                 <p className="image_chooser_item_info">
                   Selected!
                 </p>
               </div>
               : "" }
             </div>
             <div className="image_chooser_item_title">
               {this.props.title}
             </div>
           </div>
		);
	}
}

export default ImageChooserItem;
