window.onload = function() {
    "use strict";

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


	/* TODO: Should be removed, or moved to gallery.html */
	api.onImageUpdate(function(image){
		let imgsec = document.getElementById("image_section");

		if (image == null) {
			imgsec.innerHTML = "";
			return null;
		}
		document.getElementById("image_section").innerHTML = '';

        var imginfo = document.createElement('span');
        imginfo.className = "title";
		imginfo.innerHTML = "\"" + image[image.length - 1].title + "\", by "
		 	+ image[image.length - 1].author_name + ". Taken on " + " " + image[image.length - 1].date_taken
			+ ". \"" + image[image.length - 1].description + "\"";

		/* Create the img display */
        var displayedimg = document.createElement('img');
        displayedimg.id = "displayed_image";
		displayedimg.src = "/api/img/" + image[image.length - 1]._id + "/";


		imgsec.appendChild(imginfo);
		imgsec.appendChild(displayedimg);
	});

};

