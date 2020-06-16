window.onload = function() {
    "use strict";

	/*api.onImageUpdate(function(image){
		let imgsec = document.getElementById("image_section");
    	let nav = document.getElementById('navigators');

		if (image == null) {
			imgsec.innerHTML = "";
			nav.style.display = "none";
			return null;
		}
		nav.style.display = "block";
		currentImageId = image.imageId;
		document.getElementById("image_section").innerHTML = '';

        // create a new image info element
		// Code for getting the current date found at
		// https://hype.codes/how-get-current-date-javascript
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;

        var imginfo = document.createElement('span');
        imginfo.className = "title";
		imginfo.innerHTML = "\"" + image.title + "\", by "
			+ image.author + ". Uploaded " + " " + today;

		var imginfobreak = document.createElement('br');

		// Create the message_content element
        var displayedimg = document.createElement('img');
        displayedimg.id = "displayed_image";
		displayedimg.src = "/api/images/${image.id}/";


		imgsec.appendChild(imginfo);
		imgsec.appendChild(imginfobreak);
		imgsec.appendChild(displayedimg);
	});*/

    // var uploadImageForm = document.getElementById('upload_image_form');
	// if (uploadImageForm) {
		// uploadImageForm.addEventListener("submit", function(e) {
			// // Prevent page from refreshing upon submission
			// e.preventDefault();
			// // Read elements
			// let imageTitle = document.getElementById('upload_image_title').value;
			// let imageAuthor = document.getElementById('upload_image_author').value;
			// let imageDescription = document.getElementById('upload_image_description').value;
			// let imageDateTaken = document.getElementById('upload_image_date_taken').value;
			// let imageFile = document.getElementById('upload_image_file').files[0];
			// // Clear the input form
			// uploadImageForm.reset();
			// // Call the API
			// console.log("calling api.addImage()");
			// let image = api.addImage(imageTitle, imageAuthor, imageDescription, imageFile, imageDateTaken, (image) => {});
		// });
	// }
	//

	/* Set the date picker's date to today's date */
	var datepicker = document.querySelector('#upload_image_date_taken');
	var date = new Date();

	datepicker.value = date.getFullYear().toString() + '-'
		+ (date.getMonth() + 1).toString().padStart(2, 0) + '-'
		+ date.getDate().toString().padStart(2, 0);


	api.onImageUpdate(function(image){
		let imgsec = document.getElementById("image_section");
    	let nav = document.getElementById('navigators');

		if (image == null) {
			imgsec.innerHTML = "";
			nav.style.display = "none";
			return null;
		}
		console.log("logging image");
		console.log(image);
		console.log("done logging image");
		nav.style.display = "block";
		//currentImageId = image._id;
		document.getElementById("image_section").innerHTML = '';

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;

        var imginfo = document.createElement('span');
        imginfo.className = "title";
		imginfo.innerHTML = "\"" + image[image.length - 1].title + "\", by "
		 	+ image[image.length - 1].author_name + ". Taken on " + " " + image[image.length - 1].date_taken
			+ ". \"" + image[image.length - 1].description + "\"";

		//var imginfobreak = document.createElement('br');

		/* Create the img display */
        var displayedimg = document.createElement('img');
        displayedimg.id = "displayed_image";
		// TODO: change to not be static
		displayedimg.src = "/api/images/" + image[image.length - 1]._id + "/";


		imgsec.appendChild(imginfo);
		//imgsec.appendChild(imginfobreak);
		imgsec.appendChild(displayedimg);
	});

};

