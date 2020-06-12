var api = (function(){
	var module = {};

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

	/* Add an image to the gallery */
	module.addImage = function(image_title, author_name, image_description, image_file, date_taken){
		// TODO: fix this call. How to send image too?
		send("POST", "/api/images/", {username: username, content: content}, file, function(err, res){
			 if (err) return notifyErrorListeners(err);
			 notifyImageListeners();
		});
	}

	return module;
})();
