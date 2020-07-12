import React, { Component } from 'react';

import NavBar from './NavBar';

class PageImageAdd extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: "title",
			description: "description",
			author_name: "author_name",
			date_taken: "date_taken",
		}

		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleAuthorNameChange = this.handleAuthorNameChange.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleImageFileChange = this.handleImageFileChange.bind(this);
		this.handleDateTakenChange = this.handleDateTakenChange.bind(this);

		this.uploadImageFormSubmit = this.uploadImageFormSubmit.bind(this);
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
		console.log(e.target.files[0])
		this.setState({ image: e.target.files[0] })
	}

	handleDateTakenChange(e) {
		this.setState({ date_taken: e.target.value });
	}

	uploadImageFormSubmit(e) {
		e.preventDefault();

		var formData = new FormData();

		formData.append("image_title", this.state.title);
		formData.append("image_description", this.state.description);
		formData.append("image_author_name", this.state.author_name);
		formData.append("image_date_taken", this.state.date_taken);
		formData.append("image_file", this.state.image);

		fetch("http://localhost:3000/api/images/", {
			mode: 'no-cors',
			method: "POST",
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

	render() {
		return(
           <div className="ImageAdd">
             <header>
                 <a href="/" id="title">Gallery</a>
             </header>

             <NavBar />

             <form className="complex_form"
                   id="upload_image_form"
                   action="/api/images/"
                   method="POST" encType="multipart/form-data">
               <div className="form_title">Upload an image</div>
               <input type="text"
                      id="upload_image_title"
                      className="form_element"
                      placeholder="Enter a title for the image"
                      name="image_title"
                      onChange={this.handleTitleChange}
                      required />
               <input type="text"
                      id="upload_image_author"
                      className="form_element"
                      placeholder="Enter your full name"
                      name="image_author_name"
                      onChange={this.handleAuthorNameChange}
                      required />
               <input type="text"
                      id="upload_image_description"
                      className="form_element"
                      placeholder="Enter a description"
                      name="image_description"
                      onChange={this.handleDescriptionChange}
                      required />
               <input type="file"
                      id="upload_image_file"
                      className="form_file_browse"
                      name="image_file"
                      accept="image/png, image/jpeg"
                      onChange={this.handleImageFileChange}
                      required />
               <input type="date"
                      id="upload_image_date_taken"
                      className="form_element"
                      name="image_date_taken"
                      onChange={this.handleDateTakenChange}
                      required />
               <button type="submit"
                       className="form_submit button form_button"
                       onClick={this.uploadImageFormSubmit}>
                 Upload your image
               </button>
             </form>

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
}

export default PageImageAdd;
