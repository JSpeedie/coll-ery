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

	function uploadImageFormSubmit(event) {
		var url='/api/images/';
		var request = new XMLHttpRequest();
		request.open('POST', url, true);

		request.onload = function() {
			let image = JSON.parse(request.responseText);
			// TODO: some sort of success feedback
			let imgsec = document.getElementById("image_section");

			if (image == null) {
				imgsec.innerHTML = "";
				return null;
			}
			document.getElementById("image_section").innerHTML = '';

			var imginfo = document.createElement('span');
			imginfo.className = "title";
			imginfo.innerHTML = "\"" + image.title + "\", by "
				+ image.author_name + ". Taken on " + " " + image.date_taken
				+ ". \"" + image.description + "\"";

			/* Create the img display */
			var displayedimg = document.createElement('img');
			displayedimg.id = "displayed_image";
			displayedimg.src = "/api/img/" + image._id + "/";

			imgsec.appendChild(imginfo);
			imgsec.appendChild(displayedimg);
		};
		
		request.onerror = function() {
			// TODO: some sort of error feedback
		};
		
		/* Lump data in form into a FormData obj and send to intended target */
		request.send(new FormData(event.target));
		event.preventDefault();
		/* TODO: Scrub entry fields? */
	}

	// Attached modified action listener to form
	document.getElementById("upload_image_form").addEventListener("submit", uploadImageFormSubmit);

	/* Set the date picker's date to today's date */
	var datepicker = document.querySelector('#upload_image_date_taken');
	var date = new Date();

	datepicker.value = date.getFullYear().toString() + '-'
		+ (date.getMonth() + 1).toString().padStart(2, 0) + '-'
		+ date.getDate().toString().padStart(2, 0);
};
