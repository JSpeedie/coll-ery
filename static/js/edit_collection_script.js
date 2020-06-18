window.onload = function() {
    "use strict";

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const collectionId = urlParams.get('c');

	let collection_section = document.getElementById("collection_section");
	collection_section.innerHTML = "";

	let collection = api.getCollection(collectionId, function(err, collection) {
		console.log("found collection:");
		console.log(collection);
	
		if (collection == null) {
			return null;
		}

		/* <div class="view_collection_container">
		 *   <div class="view_collection_preview">
		 *     <img class="view_collection_preview_image" height="200">
		 *     <div class="view_collection_info_div">
		 *       <input type="text" class="edit_collection_info_title">
		 *       <input type="text" class="edit_collection_info_author_name">
		 *       <input type="text" class="edit_collection_info_description">
		 *       <input type="date" class="edit_collection_info_date_taken">
		 *       <p class="view_collection_info>[infohere]</p>
		 *     </div>
		 *   </div>
		 * </div> */
	
		let viewcollectioncontainer = document.createElement('div');
		viewcollectioncontainer.className = "view_collection_container";
		viewcollectioncontainer.position = "absolute";
	
		let viewcollectiontitle = document.createElement('div');
		viewcollectiontitle.className = "view_collection_title";
		viewcollectiontitle.innerHTML = collection.title;
	
		let viewcollectiontitlecontrols = document.createElement('div');
		viewcollectiontitlecontrols.className =
			"view_collection_title_controls";
		viewcollectiontitlecontrols.innerHTML = "X";
	
		viewcollectiontitle.appendChild(viewcollectiontitlecontrols);
	
		let viewcollectionpreview = document.createElement('div');
		viewcollectionpreview.className = "view_collection_preview";
	
		let viewcollectiondisplay = document.createElement('img');
		viewcollectiondisplay.className = "view_collection_preview_collection";
		viewcollectiondisplay.src =
			"/api/img/" + collection.thumbnail_image_id + "/";
		viewcollectiondisplay.height = 400;
	
		let viewcollectioninfodiv = document.createElement('div');
		viewcollectioninfodiv.className = "view_collection_info_div";
		viewcollectioninfodiv.maxWidth = viewcollectiondisplay.width;
	
		let edit_collection_info_title = document.createElement('div');
		edit_collection_info_title.className = "edit_collection_info_title";
		let edit_collection_info_title_hint = document.createElement('p');
		edit_collection_info_title_hint.innerHTML = 'Title:'
		let edit_collection_info_title_input = document.createElement('input');
		edit_collection_info_title_input.type = "text";
		edit_collection_info_title_input.className =
			"form_element edit_collection_info_title_input";
		edit_collection_info_title_input.value = collection.title;
		edit_collection_info_title.appendChild(edit_collection_info_title_hint);
		edit_collection_info_title.appendChild(
			edit_collection_info_title_input);

		let edit_collection_info_author_name = document.createElement('div');
		edit_collection_info_author_name.className =
			"edit_collection_info_author_name";
		let edit_collection_info_author_name_hint = document.createElement('p');
		edit_collection_info_author_name_hint.innerHTML = 'Author name:'
		let edit_collection_info_author_name_input =
			document.createElement('input');
		edit_collection_info_author_name_input.type = "text";
		edit_collection_info_author_name_input.className =
			"form_element edit_collection_info_author_name_input";
		edit_collection_info_author_name_input.value = collection.author_name;
		edit_collection_info_author_name.appendChild(
			edit_collection_info_author_name_hint);
		edit_collection_info_author_name.appendChild(
			edit_collection_info_author_name_input);

		let edit_collection_info_description = document.createElement('div');
		edit_collection_info_description.className =
			"edit_collection_info_description";
		let edit_collection_info_description_hint = document.createElement('p');
		edit_collection_info_description_hint.innerHTML = 'Description:'
		let edit_collection_info_description_input =
			document.createElement('input');
		edit_collection_info_description_input.type = "text";
		edit_collection_info_description_input.className =
			"form_element edit_collection_info_description_input";
		edit_collection_info_description_input.value = collection.description;
		edit_collection_info_description.appendChild(
			edit_collection_info_description_hint);
		edit_collection_info_description.appendChild(
			edit_collection_info_description_input);

		let edit_collection_info_date_taken = document.createElement('div');
		edit_collection_info_date_taken.className =
			"edit_collection_info_date_taken";
		let edit_collection_info_date_taken_hint = document.createElement('p');
		edit_collection_info_date_taken_hint.innerHTML = 'Date taken:'
		let edit_collection_info_date_taken_input =
			document.createElement('input');
		edit_collection_info_date_taken_input.type = "date";
		edit_collection_info_date_taken_input.className =
			"form_element edit_collection_info_date_taken_input";
		edit_collection_info_date_taken_input.value = collection.date_taken;
		edit_collection_info_date_taken.appendChild(
			edit_collection_info_date_taken_hint);
		edit_collection_info_date_taken.appendChild(
			edit_collection_info_date_taken_input);

		let edit_collection_info_thumbnail_image_id =
			document.createElement('div');
		edit_collection_info_thumbnail_image_id.className =
			"edit_collection_info_thumbnail_image_id";
		let edit_collection_info_thumbnail_image_id_hint =
			document.createElement('p');
		edit_collection_info_thumbnail_image_id_hint.innerHTML =
			'Thumbnail Image ID:'
		let edit_collection_info_thumbnail_image_id_input =
			document.createElement('input');
		edit_collection_info_thumbnail_image_id_input.type = "number";
		edit_collection_info_thumbnail_image_id_input.className =
			"form_element edit_collection_info_thumbnail_image_id_input";
		edit_collection_info_thumbnail_image_id_input.value =
			collection.thumbnail_image_id;
		edit_collection_info_thumbnail_image_id.appendChild(
			edit_collection_info_thumbnail_image_id_hint);
		edit_collection_info_thumbnail_image_id.appendChild(
			edit_collection_info_thumbnail_image_id_input);

		let edit_collection_info_images_input =
			document.createElement('input');
		edit_collection_info_images_input.type = "text";
		edit_collection_info_images_input.className =
			"form_element edit_collection_info_images_input";
		edit_collection_info_images_input.value = JSON.stringify(collection.images);
		edit_collection_info_images_input.style.display = "none";

		let edit_collection_info_save = document.createElement('button');
		edit_collection_info_save.className = "edit_collection_info_save";
		edit_collection_info_save.innerHTML = "save"
		edit_collection_info_save.onclick = function() {
			api.getCollection(collection._id, function(err, collection) {
				let newcollectioninfo = collection;
				newcollectioninfo.title =
					edit_collection_info_title_input.value;
				newcollectioninfo.description =
					edit_collection_info_description_input.value;
				newcollectioninfo.date_taken =
					edit_collection_info_date_taken_input.value;
				newcollectioninfo.thumbnail_image_id =
					edit_collection_info_thumbnail_image_id_input.value;
				newcollectioninfo.images =
					JSON.parse(edit_collection_info_images_input.value);

				api.patchCollection(
					collection._id, newcollectioninfo, function(){

					/* Change the thumbnail on the page after updating */
					viewcollectiondisplay.src =
						"/api/img/" + newcollectioninfo.thumbnail_image_id + "/";

				});
			});
		};

		let edit_collection_info_add_images = document.createElement('button');
		edit_collection_info_add_images.className = "edit_collection_info_add_images";
		edit_collection_info_add_images.innerHTML = "add_images"
		edit_collection_info_add_images.onclick = function() {
			api.onImageUpdate(function(images){
				let image_chooser = document.getElementById("image_chooser");
				image_chooser.innerHTML = "";

				if (images == null) {
					return null;
				}

				for (let i = 0; i < images.length; i++) {
					/* <a href="/image.html?i=[imageid]">
					/*   <div class="gallery_item_container">
					 *     <div class="gallery_item_title">[titlehere]</div>
					 *     <div class="gallery_item_preview">
					 *       <img class="gallery_item_preview_image" height="200">
					 *       <div class="gallery_item_info_div">
					 *         <p class="gallery_item_info>[infohere]</p>
					 *       </div>
					 *     </div>
					 *   </div>
					 * </a>
					 * */
					let galleryitemcontainer = document.createElement('a');
					galleryitemcontainer.className = "gallery_item_container";
					galleryitemcontainer.position = "absolute";
					// galleryitemcontainer.href = "/image.html?i=" + images[i]._id;
					// galleryitemcontainer.onclick = function() {
					// 	/* Parse the current list of images in the collection */
					// 	let imgs =
					// 		JSON.parse(edit_collection_info_images_input.value);
					// 	/* Add this image */
					// 	imgs.push(images[i]._id);
					// 	/* Update the list of images in the input field */
					// 	edit_collection_info_images_input.value =
					// 		JSON.stringify(imgs);
					// };

					let galleryitemtitle = document.createElement('div');
					galleryitemtitle.className = "gallery_item_title";
					galleryitemtitle.innerHTML = images[i].title;

					let galleryitempreview = document.createElement('div');
					galleryitempreview.className = "gallery_item_preview";

					let galleryitemdisplay = document.createElement('img');
					galleryitemdisplay.className = "gallery_item_preview_image";
					galleryitemdisplay.src = "/api/img/" + images[i]._id + "/";
					galleryitemdisplay.onclick = function() {
						/* Parse the current list of images in the collection */
						let imgs =
							JSON.parse(edit_collection_info_images_input.value);
						/* Add this image */
						imgs.push(images[i]._id);
						/* Update the list of images in the input field */
						edit_collection_info_images_input.value =
							JSON.stringify(imgs);
						/* Display marker that this image is
						 * in the collection */
						galleryiteminfodiv.style.display = "flex";
					};


					let galleryiteminfodiv = document.createElement('div');
					galleryiteminfodiv.className = "gallery_item_info_div";
					galleryiteminfodiv.maxWidth = galleryitemdisplay.width;
					/* Parse the current list of images in the collection */
					let imgs =
						JSON.parse(edit_collection_info_images_input.value);
					/* If this image is not in the collection, hide the
					 * "in the collection" marker */
					if (!imgs.includes(images[i]._id)) {
						galleryiteminfodiv.style.display = "none";
					}
					galleryiteminfodiv.onclick = function() {
						console.log("trying to remove image from collection");
						/* Parse the current list of images in the collection */
						let imgs =
							JSON.parse(edit_collection_info_images_input.value);
						/* Remove this image and update the list of images
						 * in the input field */
						edit_collection_info_images_input.value =
							JSON.stringify(imgs.filter(function(element) {
								return element != images[i]._id
							}));
						/* Remove "image in collection" marker from this
						 * image */
						galleryiteminfodiv.style.display = "none";
					}

					let galleryiteminfo = document.createElement('p');
					galleryiteminfo.className = "gallery_item_info";
					// TODO: more info
					galleryiteminfo.innerHTML = "In the collection!";

					galleryiteminfodiv.appendChild(galleryiteminfo);

					galleryitempreview.appendChild(galleryitemdisplay);
					galleryitempreview.appendChild(galleryiteminfodiv);

					galleryitemcontainer.appendChild(galleryitempreview);
					galleryitemcontainer.appendChild(galleryitemtitle);

					// galleryitemlink.appendChild(galleryitemcontainer);

					// images_container.appendChild(galleryitemlink);
					image_chooser.appendChild(galleryitemcontainer);
				}
			});
		};
	
		viewcollectioninfodiv.appendChild(edit_collection_info_title);
		viewcollectioninfodiv.appendChild(edit_collection_info_author_name);
		viewcollectioninfodiv.appendChild(edit_collection_info_description);
		viewcollectioninfodiv.appendChild(edit_collection_info_date_taken);
		viewcollectioninfodiv.appendChild(edit_collection_info_thumbnail_image_id);
		viewcollectioninfodiv.appendChild(edit_collection_info_images_input);
		viewcollectioninfodiv.appendChild(edit_collection_info_save);
		viewcollectioninfodiv.appendChild(edit_collection_info_add_images);
	
		viewcollectionpreview.appendChild(viewcollectiondisplay);
		viewcollectionpreview.appendChild(viewcollectioninfodiv);
	
		viewcollectioncontainer.appendChild(viewcollectionpreview);
	
		collection_section.appendChild(viewcollectioncontainer);
	});
};
