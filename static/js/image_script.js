window.onload = function() {
    "use strict";

	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const imageId = urlParams.get('i');

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

	let image_container = document.getElementById("image_container");
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
		// viewimagetitlecontrols.onclick = function() {
		// 	if (window.confirm("Are you sure you want to delete the image \"" + image.title + "\"?")) {
		// 		api.deleteImage(image._id, function() {});
		// 	}
		// };
	
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
		// TODO: more info
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
	});
};
