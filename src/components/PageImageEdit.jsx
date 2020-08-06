import React, { Component } from 'react';

import NavBar from './NavBar.jsx';

class PageImageEdit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			_id: 0,
			title: "title",
			author_name: "author_name",
			description: "description",
			date_taken: "date_taken",
			image: null,
		}
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleAuthorNameChange = this.handleAuthorNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleImageFileChange = this.handleImageFileChange.bind(this);
		this.handleDateTakenChange = this.handleDateTakenChange.bind(this);
		this.patchImage = this.patchImage.bind(this);
	}

	handleTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	handleAuthorNameChange(e) {
		this.setState({ author_name: e.target.value });
	}

	handleDescriptionChange(e) {
		this.setState({ description: e.target.value });
	}

	handleImageFileChange(e) {
		this.setState({ image: e.target.files[0] })
	}

	handleDateTakenChange(e) {
		this.setState({ date_taken: e.target.value });
	}

	patchImage(e) {
		e.preventDefault();

		var formData = new FormData();

		formData.append("image_title", this.state.title);
		formData.append("image_author_name", this.state.author_name);
		formData.append("image_description", this.state.description);
		formData.append("image_date_taken", this.state.date_taken);
		formData.append("image_file", this.state.image);

		fetch("http://localhost:3000/api/images/" + this.state._id + "/", {
			method: 'PATCH',
			body: formData
		})
		// }).then(response => response.json()).then(response => {
			// TODO: make use of response here
			//
			// let image = JSON.parse(request.responseText);
			// // TODO: some sort of success feedback
			// let imgsec = document.getElementById("image_section");

			// if (image == null) {
			// 	imgsec.innerHTML = "";
			// 	return null;
			// }
			// document.getElementById("image_section").innerHTML = '';
			//
			// var imginfo = document.createElement('span');
			// imginfo.className = "title";
			// imginfo.innerHTML = "\"" + image.title + "\", by "
			// 	+ image.author_name + ". Taken on " + " " + image.date_taken
			// 	+ ". \"" + image.description + "\"";
			/* Create the img display */
			// var displayedimg = document.createElement('img');
			// displayedimg.id = "displayed_image";
			// displayedimg.src = "/api/img/" + image._id + "/";

			// imgsec.appendChild(imginfo);
			// imgsec.appendChild(displayedimg);
		// })
	}

	render(){
		return(
	       <div className="ImageEdit">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <br/>
             <h2>{this.state.title}</h2>
             <br/>

             <div className="edit_image_section">
               <div className="edit_image_container">
                 <div className="edit_image_preview">
                   <img className="edit_image_preview_image"
                        src={"http://localhost:3000/api/img/" + this.state._id}
                        height="400" />
                 </div>
                 <div className="edit_image_edit_fields_div">
                   <div className="edit_image_info_title">
                     <p className="edit_image_edit_field_desc">
                       Title:
                     </p>
                     <input type="text"
                            className="form_element edit_image_info_title_input"
                            value={this.state.title}
                            onChange={this.handleTitleChange}/>
                   </div>
                   <div className="edit_image_info_author_name">
                     <p className="edit_image_edit_field_desc">
                       Author name:
                     </p>
                     <input type="text"
                            className="form_element edit_image_info_author_name_input"
                            value={this.state.author_name}
                            onChange={this.handleAuthorNameChange}/>
                   </div>
                   <div className="edit_image_info_description">
                     <p className="edit_image_edit_field_desc">
                       Description:
                     </p>
                     <textarea type="text"
                               className="form_element edit_image_info_description_input"
                               value={this.state.description}
                               onChange={this.handleDescriptionChange}></textarea>
                   </div>
                   <div className="edit_image_info_image">
                     <p className="edit_image_edit_field_image">
                       Image:
                     </p>
                     <input type="file"
                            id="upload_image_file"
                            className="form_file_browse"
                            name="image_file"
                            accept="image/png, image/jpeg"
                            onChange={this.handleImageFileChange}
                            required />
                   </div>
                   <div className="edit_image_info_date_taken">
                     <p className="edit_image_edit_field_desc">
                       Date taken:
                     </p>
                     <input type="date"
                            className="form_element edit_image_info_date_taken_input"
                            value={this.state.date_taken}
                            onChange={this.handleDateTakenChange}/>
                   </div>
                   <br/>
                   <button className="edit_image_info_save button" onClick={this.patchImage}>
                     Save
                   </button>
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
				this.setState({
					_id: data._id,
					title: data.title,
					author_name: data.author_name,
					description: data.description,
					date_taken: data.date_taken,
				});
			}).catch(console.log);
	}
}

export default PageImageEdit;
