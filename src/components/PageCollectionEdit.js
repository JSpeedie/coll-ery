import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';

class PageCollectionEdit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			_id: 0,
			title: "title",
			description: "description",
			thumbnail_image_id: 0,
			images: []
		}
	}

	patchCollection() {
		fetch("http://localhost:3000/api/collections/" + this.state._id + "/", {
			method: 'PATCH',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				_id: this.state._id,
				title: this.state.title,
				description: this.state.description,
				thumbnail_image_id: this.state.thumbnail_image_id,
				images: this.state.images
			})
		})
	}
	render(){
		return(
	       <div className="CollectionEdit">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <br/>
             <h2>{this.state.collection.title}</h2>
             <br/>

             <div id="collection_section">
               <div className="view_collection_container">
                 <div className="view_collection_preview">
                   <img className="view_collection_preview_collection" src={"http://localhost:3000/api/img/" + this.state.collection.thumbnail_image_id} height="400" />
                   <div className="view_collection_info_div">
                     <div className="edit_collection_info_title">
                       <p>
                         Title:
                       </p>
                       <input type="text" className="form_element edit_collection_info_title_input" value={this.state.collection.title}/>
                     </div>
                     <div className="edit_collection_info_author_name">
                       <p>
                         Author name:
                       </p>
                       <input type="text" className="form_element edit_collection_info_author_name_input" value={this.state.collection.author_name}/>
                     </div>
                     <div className="edit_collection_info_description">
                       <p>
                         Description:
                       </p>
                       <input type="text" className="form_element edit_collection_info_description_input" value={this.state.collection.description}/>
                     </div>
                     <div className="edit_collection_info_date_taken">
                       <p>
                         Date taken:
                       </p>
                       <input type="date" className="form_element edit_collection_info_date_taken_input" value={this.state.collection.date_taken}/>
                     </div>
                     <div className="edit_collection_info_thumbnail_image_id">
                       <p>
                         Thumbnail Image ID:
                       </p>
                       <input type="text" className="form_element edit_collection_info_thumbnail_image_id_input" value={this.state.collection.thumbnail_image_id}/>
                     </div>
                     <input type="text" className="form_element edit_collection_info_images_input" value={this.state.collection.images}/>
                     <button className="edit_collection_info_save">
                       Save
                     </button>
                     <button className="edit_collection_info_add_images">
                       Add Images
                     </button>
                   </div>
                 </div>
               </div>
             </div>

             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
           </div>
		);
	}

	componentDidMount() {
		/* Get collection info */
		fetch('http://localhost:3000/api/collections/' + this.props.match.params.id)
			.then(res => res.json()).then((data) => {
				this.setState({
					_id: data._id,
					title: data.title,
					description: data.description,
					thumbnail_image_id: data.thumbnail_image_id,
					images: data.images,
				});
			}).catch(console.log);
	}
}

export default PageCollectionEdit;
