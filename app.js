const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var Datastore = require('nedb')
	, collections = new Datastore({ filename: 'db/collections.db', autoload: true });
	, images = new Datastore({ filename: 'db/images.db', autoload: true });

app.use(express.static('static'));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

/*  Image:
 * ========
 * - _id
 * - title
 * - author
 * - image
 * - description
 * - date_taken
 */

let ImageId = (function() {
	let id = 1;
	/* Read the number of images on the server/in storage and adjust the next
	 * id as needed */
	images.count({}, function (err, count) {
		if (err) {
			console.log("There was an error counting the number of images in the system");
		} else {
			id = count + 1;
			console.log("The next id for an image will be: " + id);
		}
	});

	return function image() {
		this._id = id++;
	}
}());

/*  Collection:
 * ========
 * - _id
 * - title
 * - description
 * - images[]
 */

let CollectionId = (function() {
	let id = 1;
	/* Read the number of collections on the server/in storage and adjust the next
	 * id as needed */
	collections.count({}, function (err, count) {
		if (err) {
			console.log("There was an error counting the number of collections in the system");
		} else {
			id = count + 1;
			console.log("The next id for an collection will be: " + id);
		}
	});

	return function collection() {
		console.log("The id for this collection will be: " + id);
		this._id = id++;
		console.log("The next id for an collection will be: " + id);
	}
}());


/* Add new image to gallery */
app.post('/api/images/', upload.single('image_file'), function (req, res, next) {
	/* Get an ID for the new image */
	let newImageId = new ImageId();
	/* Create storage object */
	let new_image_obj = {
		_id: newImageId._id,
		/* req.body.x must have x match the element names in the form
		 * in the HTML */
		title: req.body.image_title,
		date_taken: req.body.image_date_taken,
		description: req.body.image_description,
		author_name: req.body.image_author_name,
		/* This must be req.file as opposed to req.body.x or something */
		image: req.file
		};
	/* Store object in database */
	images.insert(new_image_obj, function(err, newDoc) {});
	// Respond to requester
	//res.json(newImage);

	return res.redirect('/');
});

// Retrieve given image from gallery
app.get('/api/images/:id/', function (req, res, next) {
	let search = {
		_id: parseInt(req.params.id)
	};

	images.findOne(search, function(err, doc) {
		/* If an image of the given id exists, return that image */
		if (doc != null) {
			/* doc.x must match name in object inserted into Datastore */
			res.setHeader('Content-Type', doc.image.mimetype);
			res.sendFile(doc.image.path, { root: __dirname });
		} else {
			console.error("ERROR: image does not exist");
			return res.status(404).end("Image: " + req.params.id + " did not exist");
		}
	});
});

// TODO: require authorization for this
// Retrieve all images
app.get('/api/images/', function (req, res, next) {
	images.find({}).exec(function(err, data) {
		return res.json(data);
	});
});



/* Add new collection to gallery */
app.post('/api/collections/', function (req, res, next) {
	/* Get an ID for the new collection */
	let newCollectionId = new CollectionId();

	// TODO: translate content to a json array for storage
	new_collection_images = req.body.images;
	console.log("new_collection_images:");
	console.log(new_collection_images);
	if (new_collection_images == null) {
		new_collection_images = {};
	}

	/* Create storage object */
	let new_collection_obj = {
		_id: newCollectionId._id,
		/* req.body.x must have x match the element names in the form
		 * in the HTML */
		title: req.body.collection_title,
		description: req.body.collection_description,
		images: new_collection_images
	};
	console.log("inserting new collection with id of " + newCollectionId._id);
	/* Store object in database */
	collections.insert(new_collection_obj, function(err, newDoc) {});
	// Respond to requester
	//res.json(newCollection);

	return res.redirect('/');
});


/* Retrieve given collection from gallery */
app.get('/api/collections/:id/', function (req, res, next) {
	let search = {
		_id: parseInt(req.params.id)
	};

	collections.findOne(search, function(err, doc) {
		/* If an collection of the given id exists, return that collection */
		if (doc != null) {
			res.json(doc);
		} else {
			console.error("ERROR: collection does not exist");
			return res.status(404).end("Collection: " + req.params.id + " did not exist");
		}
	});
});

// TODO: require authorization for this
// Retrieve all collections
app.get('/api/collections/', function (req, res, next) {
	collections.find({}).exec(function(err, data) {
		return res.json(data);
	});
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
