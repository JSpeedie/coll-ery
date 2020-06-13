var api = (function(){
	var module = {};

    let imageListeners = [];

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

	function notifyImageListeners(){
		// getImages(function(err, images){
		// 	if (err) return notifyErrorListeners(err);
		// 	imageListeners.forEach(function(listener){
		// 		listener(images);
		// 	});
		// });
			imageListeners.forEach(function(listener){
				listener(images);
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
	}

	return module;
})();
