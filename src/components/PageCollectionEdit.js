import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';

class PageCollectionEdit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			collection: {
				title: "title",
				author_name: "author_name",
				thumbnail_image_id: 0,
			}
		}
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
				this.setState({ collection: data });
			}).catch(console.log);
	}
}

export default PageCollectionEdit;
