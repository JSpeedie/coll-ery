window.onload = function() {
    "use strict";

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

		/* Create the img display */
        var displayedimg = document.createElement('img');
        displayedimg.id = "displayed_image";
		displayedimg.src = "/api/images/" + image[image.length - 1]._id + "/";


		imgsec.appendChild(imginfo);
		imgsec.appendChild(displayedimg);
	});

};

