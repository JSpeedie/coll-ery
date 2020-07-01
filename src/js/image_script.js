window.onload = function() {
    "use strict";

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const imageId = urlParams.get('i');
	const collectionId = urlParams.get('c');
	console.log("collection id = " + collectionId);
	let beingViewedAsCollection = false;
	let prev_image_id = -1;
	let next_image_id = -1;

	let generatePageContent = function() {
		/* <div class="view_image_container">
		 *   <div class="view_image_preview">
		 *     <img class="view_image_preview_image" height="200">
		 *     <div class="view_image_info_div">
		 *       <div class="view_image_title">[titlehere]
		 *         <div class="view_image_title_controls">X</div>
		 *       </div>
		 *       <p class="view_image_info>[infohere]</p>
		 *     </div>
		 *   </div>
		 * </div> */

		let body = document.getElementsByTagName("body")[0];

		let image_section = document.createElement("div");
		image_section.id = "image_section";

		let image_container = document.createElement("div");
		image_container.id = "image_container";
		image_container.innerHTML = "";

		let image = api.getImage(imageId, function(err, image) {
			console.log("found image:");
			console.log(image);
		
			if (image == null) {
				return null;
			}
		
			let viewimagecontainer = document.createElement('div');
			viewimagecontainer.className = "view_image_container";
			viewimagecontainer.position = "absolute";
		
			let viewimagetitle = document.createElement('div');
			viewimagetitle.className = "view_image_title";
			viewimagetitle.innerHTML = image.title;
		
			let viewimagetitlecontrols = document.createElement('div');
			viewimagetitlecontrols.className = "view_image_title_controls";
			viewimagetitlecontrols.innerHTML = "X";
		
			viewimagetitle.appendChild(viewimagetitlecontrols);
		
			let viewimagepreview = document.createElement('div');
			viewimagepreview.className = "view_image_preview";
		
			let viewimagedisplay = document.createElement('img');
			viewimagedisplay.className = "view_image_preview_image";
			viewimagedisplay.src = "/api/img/" + image._id + "/";
		
			let viewimageinfodiv = document.createElement('div');
			viewimageinfodiv.className = "view_image_info_div";
			viewimageinfodiv.maxWidth = viewimagedisplay.width;
		
			let viewimageinfo = document.createElement('p');
			viewimageinfo.className = "view_image_info";
			// TODO: break into multiple elements and style individually
			viewimageinfo.innerHTML =
				"Author: " + image.author_name + "<br>"
				+ "Date taken: " + image.date_taken + "<br><br>"
				+ image.description + "<br>";
		
			viewimageinfodiv.appendChild(viewimagetitle);
			viewimageinfodiv.appendChild(viewimageinfo);
		
			viewimagepreview.appendChild(viewimagedisplay);
			viewimagepreview.appendChild(viewimageinfodiv);
		
			viewimagecontainer.appendChild(viewimagepreview);
		
			image_container.appendChild(viewimagecontainer);

			let view_prev_image = document.createElement('div');
			view_prev_image.className = "view_prev_image";

			/* If there is a previous image to the current one */
			if (beingViewedAsCollection && prev_image_id != -1) {
				view_prev_image.innerHTML = "view_prev_image";
				view_prev_image.onclick = function() {
					window.location.href = "/image.html?" + "c=" + collectionId
						+ "&i=" + prev_image_id;
				};
			}

			image_section.appendChild(view_prev_image);

			image_section.appendChild(image_container);

			let view_next_image = document.createElement('div');
			view_next_image.className = "view_next_image";

			/* If there is a following image to the current one */
			if (beingViewedAsCollection && next_image_id != -1) {
				view_next_image.innerHTML = "view_next_image";
				view_next_image.onclick = function() {
					window.location.href = "/image.html?" + "c=" + collectionId
						+ "&i=" + next_image_id;
				};
			}

			image_section.appendChild(view_next_image);

			body.appendChild(image_section);
		});
	}

	/* If this image is being viewed as part of a collection */
	if (collectionId != null) {
		beingViewedAsCollection = true;

		/* Figure out the image ids for the previous and next images
		 * in the collection */
		api.getCollection(collectionId, function(err, collection) {

			for (let i = 0; i < collection.images.length; i++) {
				if (collection.images[i] == imageId) {
					if (i > 0) prev_image_id = collection.images[i - 1];
					if (i < collection.images.length - 1) {
						next_image_id = collection.images[i + 1];
					}
				}
			}
			generatePageContent();
		});
	} else {
		generatePageContent();
	}

};
