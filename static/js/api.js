var api = (function(){
	var module = {};

    let imageListeners = [];
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
		console.log("about to send POST");
		send("POST", "/api/images/", image_info, image_file, function(err, res){
			// TODO: fix
			//if (err) return notifyErrorListeners(err);
			//callback(res);
			notifyImageListeners();
		});
	}


    let getImages = function(callback){
        send("GET", "/api/images/", null, callback);
    }


	/* register an image listener
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
			console.log("calling listener for image");
			if (err) return notifyErrorListeners(err);
			imageListeners.forEach(function(listener){
				listener(images);
			});
		});
	}

	// register an image listener
	// to be notified when an image is added or deleted from the gallery
	module.onImageUpdate = function(listener){
		// imageListeners.push(listener);
		// getImages(function(err, images){
		// 	if (err) return notifyErrorListeners(err);
		// 	listener(images);
		// });
		listener(null);
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