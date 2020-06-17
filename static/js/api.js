var api = (function(){
	var module = {};

	let imageListeners = [];
	let collectionListeners = [];
	let errorListeners = [];

	/* Helper function for sending data */
	function send(method, url, data, callback) {

		var xhr = new XMLHttpRequest();

		xhr.onload = function() {
			if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
			else callback(null, JSON.parse(xhr.responseText));
		};

		xhr.open(method, url, true);

		if (!data) {
			xhr.send();
		} else {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(data));
		}
	}

	/* Helper function for sending images */
	function sendImage(method, url, data, callback) {

		var xhr = new XMLHttpRequest();

		xhr.onload = function() {
			if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
			else callback(null, JSON.parse(xhr.responseText));
		};

		xhr.open(method, url, true);

		if (!data) {
			xhr.send();
		} else {
			xhr.send(data);
		}
	}



	/* Add an image to the gallery */
	module.addImage = function(image_title, author_name, image_description, image_file, date_taken, callback) {
		let image_info = {
			title: image_title,
			date_taken: date_taken,
			description: image_description,
			author: author_name
		}
		send("POST", "/api/images/", image_info, image_file, function(err, res){
			// TODO: fix
			//if (err) return notifyErrorListeners(err);
			//callback(res);
			notifyImageListeners();
		});
	}

	/* Delete an image from the gallery */
	module.deleteImage = function(imageId, callback) {
		send("DELETE", "/api/images/" + imageId + "/", null, function(err, res){
			// TODO: fix
			//if (err) return notifyErrorListeners(err);
			//callback(res);
			notifyImageListeners();
		});
	}

	let getImages = function(callback){
		send("GET", "/api/images/", null, callback);
	}

	module.getImage = function(id, callback){
		console.log("sending call for \"/api/images/" + id + "/\"");
		send("GET", "/api/images/" + id + "/", null, callback);
	}

	/* Register an image listener
	 * to be notified when an image is added or deleted from the gallery */
	module.onImageUpdate = function(listener){
		imageListeners.push(listener);
		getImages(function(err, images){
			if (err) return notifyErrorListeners(err);
			listener(images);
		});
	}

	function notifyImageListeners(){
		getImages(function(err, images) {
			if (err) return notifyErrorListeners(err);
			imageListeners.forEach(function(listener){
				listener(images);
			});
		});
	}



	let getCollections = function(callback){
		send("GET", "/api/collections/", null, callback);
	}

	/* Register an collection listener
	 * to be notified when an collection is added or deleted from the gallery */
	module.onCollectionUpdate = function(listener){
		collectionListeners.push(listener);
		getCollections(function(err, collections){
			if (err) return notifyErrorListeners(err);
			listener(collections);
		});
	}

	function notifyCollectionListeners(){
		getCollections(function(err, collections) {
			if (err) return notifyErrorListeners(err);
			collectionListeners.forEach(function(listener){
				listener(collections);
			});
		});
	}



	/* Register an error listener to be notified when there is an error */
	module.onError = function(listener){
		errorListeners.push(listener);
	};

	function notifyErrorListeners(err){
		errorListeners.forEach(function(listener){
			listener(err);
		});
	}

	return module;
})();
