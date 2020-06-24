const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer = require('multer');
var upload = multer({dest: 'uploads/'});

const mongo = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
const MongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static('static'));

app.use(function (req, res, next){
	console.log("HTTP request", req.method, req.url, req.body);
	next();
});


/* Add new image to gallery */
app.post('/api/images/', upload.single('image_file'), function (req, res, next) {
	/* Create storage object */
	let new_image_obj = {
		/* req.body.x must have x match the element names in the form
		 * in the HTML */
		title: req.body.image_title,
		date_taken: req.body.image_date_taken,
		description: req.body.image_description,
		author_name: req.body.image_author_name,
		/* This must be req.file as opposed to req.body.x or something */
		image: req.file
		};

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let insertPromise = function() {
				return new Promise((resolve, reject) => {
					try {
						let inserted = db.collection('images').insertOne(new_image_obj);
						resolve(inserted);
					/* Catch insertion errors */
					} catch (err) {
						reject(inserted);
						console.log(err);
					}
				});
			};

			/* Define function for calling insert and waiting for result */
			let callInsertPromise = async function() {
				let result = await (insertPromise());
				console.log("inserting new image with id of " + result.insertedId);

				return result;
			}

			/* Do necessary work after insert promise returns */
			callInsertPromise().then(function(result) {
				client.close();
				res.json(new_image_obj);
			});
		});
	} catch (err) {
		console.log(err);
	}
});

/* Retrieve a given image from the gallery */
app.get('/api/images/:id/', function (req, res, next) {
	let search = {
		_id: parseInt(req.params.id)
	};

	images.findOne(search, function(err, doc) {
		/* If an image of the given id exists, return that image */
		if (doc != null) {
			return res.json(doc);
		} else {
			console.error("ERROR: image does not exist");
			return res.status(404).end("Image: " + req.params.id + " did not exist");
		}
	});
});

/* Retrieve a given image's image file from the gallery */
app.get('/api/img/:id/', function (req, res, next) {
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
/* Retrieve all images from the gallery */
app.get('/api/images/', function (req, res, next) {
	images.find({}).exec(function(err, data) {
		return res.json(data);
	});
});

/* Delete a given image from the gallery */
app.delete('/api/images/:id/', function (req, res, next) {
	let search = {
		_id: parseInt(req.params.id)
	};

	images.findOne(search, function(err, doc) {
		if (doc != null) {
			images.remove(search, {}, function(err, numRem) {});
			return res.json(doc);
		} else {
			console.error("ERROR: Could not delete image of that ID; image of that ID does not exist");
			return res.status(404).end("Image: " + req.params.id + " did not exist");
		}
	});
});



/* Add new collection to gallery */
app.post('/api/collections/', function (req, res, next) {
	/* Get an ID for the new collection */
	let newCollectionId = new CollectionId();

	// TODO: translate content to a json array for storage
	new_collection_images = req.body.images;
	if (new_collection_images == null) {
		new_collection_images = [];
	}
	/* If the user did not specify a thumbnail image id */
	new_collection_thumbnail_image_id = req.body.collection_thumbnail_image_id;
	if (!new_collection_thumbnail_image_id.trim()) {
		new_collection_thumbnail_image_id = null;
	/* If they did specify a thumbnail image id, convert to an int */
	} else {
		new_collection_thumbnail_image_id =
			parseInt(new_collection_thumbnail_image_id)
	}

	/* Create storage object */
	let new_collection_obj = {
		_id: newCollectionId._id,
		/* req.body.x must have x match the element names in the form
		 * in the HTML */
		title: req.body.collection_title,
		description: req.body.collection_description,
		thumbnail_image_id: new_collection_thumbnail_image_id,
		images: new_collection_images
	};
	console.log("inserting new collection with id of " + newCollectionId._id + " which looks like:");
	console.log(new_collection_obj);
	/* Store object in database */
	collections.insert(new_collection_obj, function(err, newDoc) {});
	// Respond to requester
	//res.json(newCollection);

	return res.redirect('/add_collection.html');
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

/* Change the information attached to an collection in the gallery */
app.patch('/api/collections/:id/', function (req, res, next) {
	let search = {
		_id: parseInt(req.params.id)
	};

	let newCollection = req.body;

	collections.findOne(search, function(err, doc) {
		if (doc != null) {
			collections.update(search,
				{$set: {title: newCollection.title,
					    description: newCollection.description,
					    thumbnail_image_id: newCollection.thumbnail_image_id,
					    images: newCollection.images}},
				{}, function(err, numReplaced) {

				return res.json(doc);
			});
		} else {
			console.error("ERROR: invalid argument");
			return res.status(404).end("Collection:" + search._id + " received invalid argument");
		}
	});

});


/* Delete a given collection from the gallery */
app.delete('/api/collections/:id/', function (req, res, next) {
	let search = {
		_id: parseInt(req.params.id)
	};

	collections.findOne(search, function(err, doc) {
		if (doc != null) {
			collections.remove(search, {}, function(err, numRem) {});
			return res.json(doc);
		} else {
			console.error("ERROR: Could not delete collection of that ID; collection of that ID does not exist");
			return res.status(404).end("Image: " + req.params.id + " did not exist");
		}
	});
});



const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
