window.onload = function() {
    "use strict";

	api.onImageUpdate(function(images){
		let images_container = document.getElementById("images_container");
		images_container.innerHTML = "";

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
			// let galleryitemlink = document.createElement('a');
			// galleryitemlink.href = "/image.html?i=" + images[i]._id;

			let galleryitemcontainer = document.createElement('a');
			galleryitemcontainer.className = "gallery_item_container";
			galleryitemcontainer.position = "absolute";
			galleryitemcontainer.href = "/image.html?i=" + images[i]._id;

			let galleryitemtitle = document.createElement('div');
			galleryitemtitle.className = "gallery_item_title";
			galleryitemtitle.innerHTML = images[i].title;

			let galleryitempreview = document.createElement('div');
			galleryitempreview.className = "gallery_item_preview";

			let galleryitemdisplay = document.createElement('img');
			galleryitemdisplay.className = "gallery_item_preview_image";
			galleryitemdisplay.height = 400;
			galleryitemdisplay.src = "/api/img/" + images[i]._id + "/";

			let galleryiteminfodiv = document.createElement('div');
			galleryiteminfodiv.className = "gallery_item_info_div";
			galleryiteminfodiv.maxWidth = galleryitemdisplay.width;

			let galleryiteminfo = document.createElement('p');
			galleryiteminfo.className = "gallery_item_info";
			// TODO: more info
			galleryiteminfo.innerHTML = images[i].description;

			galleryiteminfodiv.appendChild(galleryiteminfo);

			galleryitempreview.appendChild(galleryitemdisplay);
			galleryitempreview.appendChild(galleryiteminfodiv);

			galleryitemcontainer.appendChild(galleryitempreview);
			galleryitemcontainer.appendChild(galleryitemtitle);

			// galleryitemlink.appendChild(galleryitemcontainer);

			// images_container.appendChild(galleryitemlink);
			images_container.appendChild(galleryitemcontainer);
		}
	});


	api.onCollectionUpdate(function(collections){
		let collections_container = document.getElementById("collections_container");
		collections_container.innerHTML = "";

		if (collections == null) {
			return null;
		}

		for (let i = 0; i < collections.length; i++) {
			/* <div class="gallery_item_container">
			 *   <div class="gallery_item_title">[titlehere]
			 *     <div class="gallery_item_title_controls">X</div>
			 *   </div>
			 *   <div class="gallery_item_preview">
			 *     <img class="gallery_item_preview_image" height="200">
			 *     <div class="gallery_item_info_div">
			 *       <p class="gallery_item_info>[infohere]</p>
			 *     </div>
			 *   </div>
			 * </div> */
			let galleryitemcontainer = document.createElement('div');
			galleryitemcontainer.className = "gallery_item_container";
			galleryitemcontainer.position = "absolute";

			let galleryitemtitle = document.createElement('div');
			galleryitemtitle.className = "gallery_item_title";
			galleryitemtitle.innerHTML = collections[i].title;

			let galleryitemtitlecontrols = document.createElement('div');
			galleryitemtitlecontrols.className = "gallery_item_title_controls";

			let galleryitemtitlecontrol_delete = document.createElement('div');
			galleryitemtitlecontrol_delete.className = "gallery_item_title_control";
			galleryitemtitlecontrol_delete.innerHTML = "X";
			galleryitemtitlecontrol_delete.onclick = function() {
				if (window.confirm("Are you sure you want to delete the collection \"" + collections[i].title + "\"?")) {
					api.deleteCollection(collections[i]._id, function() {});
				}
			};
			let galleryitemtitlecontrol_edit = document.createElement('div');
			galleryitemtitlecontrol_edit.className = "gallery_item_title_control";
			galleryitemtitlecontrol_edit.innerHTML = "E";
			galleryitemtitlecontrol_edit.onclick = function() {
				window.location.href =
					"/edit_collection.html?c=" + collections[i]._id;
			};

			galleryitemtitlecontrols.appendChild(galleryitemtitlecontrol_edit);
			galleryitemtitlecontrols.appendChild(galleryitemtitlecontrol_delete);

			galleryitemtitle.appendChild(galleryitemtitlecontrols);

			let galleryitempreview = document.createElement('a');
			galleryitempreview.className = "gallery_item_preview";
			galleryitempreview.href =
				"/view_collection.html?c=" + collections[i]._id;

			let galleryitemdisplay = document.createElement('img');
			galleryitemdisplay.className = "gallery_item_preview_image";
			galleryitemdisplay.height = 400;
			galleryitemdisplay.src = "/api/img/" + collections[i].thumbnail_image_id + "/";

			let galleryiteminfodiv = document.createElement('div');
			galleryiteminfodiv.className = "gallery_item_info_div";
			galleryiteminfodiv.maxWidth = galleryitemdisplay.width;

			let galleryiteminfo = document.createElement('p');
			galleryiteminfo.className = "gallery_item_info";
			// TODO: more info
			galleryiteminfo.innerHTML = collections[i].description;

			galleryiteminfodiv.appendChild(galleryiteminfo);

			galleryitempreview.appendChild(galleryitemdisplay);
			galleryitempreview.appendChild(galleryiteminfodiv);

			galleryitemcontainer.appendChild(galleryitempreview);
			galleryitemcontainer.appendChild(galleryitemtitle);

			collections_container.appendChild(galleryitemcontainer);
		}
	});
};
