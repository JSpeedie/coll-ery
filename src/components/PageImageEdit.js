import React, { Component } from 'react';

import NavBar from './NavBar';

class PageImageEdit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			image: {
				_id: 0,
				title: "title",
				author_name: "author_name",
				description: "description",
				date_taken: "date_taken"
			}
		}
	}

	render(){
		return(
	       <div className="ImageEdit">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <br/>
             <h2>{this.state.image.title}</h2>
             <br/>

             <div id="image_section">
               <div className="view_image_container">
                 <div className="edit_image_preview">
                   <img className="view_image_preview_image" src={"http://localhost:3000/api/img/" + this.state.image._id} height="400" />
                   <div className="view_image_info_div">
                     <div className="edit_image_info_title">
                       <p>
                         Title:
                       </p>
                       <input type="text" className="form_element edit_image_info_title_input" value={this.state.image.title}/>
                     </div>
                     <div className="edit_image_info_author_name">
                       <p>
                         Author name:
                       </p>
                       <input type="text" className="form_element edit_image_info_author_name_input" value={this.state.image.author_name}/>
                     </div>
                     <div className="edit_image_info_description">
                       <p>
                         Description:
                       </p>
                       <input type="text" className="form_element edit_image_info_description_input" value={this.state.image.description}/>
                     </div>
                     <div className="edit_image_info_date_taken">
                       <p>
                         Date taken:
                       </p>
                       <input type="date" className="form_element edit_image_info_date_taken_input" value={this.state.image.date_taken}/>
                     </div>
                     <button className="edit_image_info_save">
                       Save
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
		/* Get image info */
		fetch('http://localhost:3000/api/images/' + this.props.match.params.id)
			.then(res => res.json()).then((data) => {
				this.setState({ image: data });
			}).catch(console.log);
	}
}

export default PageImageEdit;
