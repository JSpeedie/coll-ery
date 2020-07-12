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
			showUpload: false,
			uploadedImage: null,
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
			method: "POST",
			body: formData
		}).then((response) => {
			if (response.status !== 200) {
				return;
			} else {
				response.json().then((resp) => {
					this.setState({
						uploadedImage: resp,
						showUpload: true
					});
				})
			}
		})
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

             {this.state.showUpload
             ?
             <div id="uploaded_img_section">
               <img className="displayed_image"
                    src={"http://localhost:3000/api/img/" + this.state.uploadedImage._id + "/"}/>
               <div className="view_image_preview_info">
                 {"\"" + this.state.uploadedImage.title + "\", by "
                   + this.state.uploadedImage.author_name + ". Taken on "
                   + this.state.uploadedImage.date_taken + ". Description \""
                   + this.state.uploadedImage.description + "\"."}
               </div>
             </div>
             : "" }

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
