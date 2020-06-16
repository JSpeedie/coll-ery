window.onload = function() {
    "use strict";

	api.onImageUpdate(function(images){
		let images_container = document.getElementById("images_container");

		if (images == null) {
			images_container.innerHTML = "";
			return null;
		}

		for (let i = 0; i < images.length; i++) {
			/* <div class="gallery_item_container">
			 *   <div class="gallery_item_title">[titlehere]</div>
			 *   <div class="gallery_item_preview">
			 *     <img class="gallery_item_preview_image" height="200">
			 *     <div class="gallery_item_info_div">
			 *       <p class="gallery_item_info>[infohere]</p>
			 *     </div>
			 *   </div>
			 * </div> */
			let imgcontainer = document.createElement('div');
			imgcontainer.className = "gallery_item_container";
			imgcontainer.position = "absolute";

			let imgtitle = document.createElement('div');
			imgtitle.className = "gallery_item_title";
			imgtitle.innerHTML = images[i].title;

			let imgimgsec = document.createElement('div');
			imgimgsec.className = "gallery_item_preview";

			let imgdisplay = document.createElement('img');
			imgdisplay.className = "gallery_item_preview_image";
			imgdisplay.height = 300;
			imgdisplay.src = "/api/images/" + images[i]._id + "/";

			let imginfodiv = document.createElement('div');
			imginfodiv.className = "gallery_item_info_div";

			let imginfo = document.createElement('p');
			imginfo.className = "gallery_item_info";
			// TODO: more info
			imginfo.innerHTML = images[i].description;

			imginfodiv.appendChild(imginfo);

			imgimgsec.appendChild(imgdisplay);
			imgimgsec.appendChild(imginfodiv);

			imgcontainer.appendChild(imgtitle);
			imgcontainer.appendChild(imgimgsec);

			images_container.appendChild(imgcontainer);
		}
	});


	api.onCollectionUpdate(function(collections){
		let collections_container = document.getElementById("collections_container");

		if (collections == null) {
			collections_container.innerHTML = "";
			return null;
		}

		for (let i = 0; i < collections.length; i++) {
			/* <div class="gallery_item_container">
			 *   <div class="gallery_item_title">[titlehere]</div>
			 *   <div class="gallery_item_preview">
			 *     <img class="gallery_item_preview_image" height="200">
			 *     <div class="gallery_item_info_div">
			 *       <p class="gallery_item_info>[infohere]</p>
			 *     </div>
			 *   </div>
			 * </div> */
			let collcontainer = document.createElement('div');
			collcontainer.className = "gallery_item_container";
			collcontainer.position = "absolute";

			let colltitle = document.createElement('div');
			colltitle.className = "gallery_item_title";
			colltitle.innerHTML = collections[i].title;

			let collcollsec = document.createElement('div');
			collcollsec.className = "gallery_item_preview";

			let colldisplay = document.createElement('img');
			colldisplay.className = "gallery_item_preview_image";
			colldisplay.height = 300;
			colldisplay.src = "/api/collections/" + collections[i].thumbnail_image_id + "/";

			let collinfodiv = document.createElement('div');
			collinfodiv.className = "gallery_item_info_div";

			let collinfo = document.createElement('p');
			collinfo.className = "gallery_item_info";
			// TODO: more info
			collinfo.innerHTML = collections[i].description;

			collinfodiv.appendChild(collinfo);

			collcollsec.appendChild(colldisplay);
			collcollsec.appendChild(collinfodiv);

			collcontainer.appendChild(colltitle);
			collcontainer.appendChild(collcollsec);

			collections_container.appendChild(collcontainer);
		}
	});
};
