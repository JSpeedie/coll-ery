const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
var upload = multer({dest: 'uploads/'});

const mongo = require('mongodb');
let ObjectId = require('mongodb').ObjectId;
const MongoClient = mongo.MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static('static'));

app.use(function (req, res, next){
	console.log("HTTP request", req.method, req.url, req.body);
	let allowedOrigins = [ "http://localhost:8000" ]
	let origin = req.headers.origin;

	if (allowedOrigins.indexOf(origin) > -1) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}

	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS,");
	next();
});


/* Add new image to gallery */
app.post('/api/images/', upload.single('image_file'), function (req, res, next) {
	/* Create a thumnbnail of the image */
	try {
		sharp(req.file.path).resize(600, 600, {
			kernel: sharp.kernel.nearest,
			fit: 'outside' })
			.toFile('uploads/thumbnail-' + req.file.filename, (err, resizeImage) => {
			if (err) {
				console.log(err);
			}
		})
	} catch (error) {
		console.error(error);
	}

	/* Create storage object */
	let new_image_obj = {
		/* req.body.x must have x match the element names in the form
		 * in the HTML */
		title: req.body.image_title,
		date_taken: req.body.image_date_taken,
		description: req.body.image_description,
		author_name: req.body.image_author_name,
		/* This must be req.file as opposed to req.body.x or something */
		image: req.file,
		uploaded_at: Date.now()
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
	/* Convert string in url to MongoDB Object ID */
	let search = {
		_id: ObjectId(req.params.id)
	};

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let searchPromise = function() {
				return new Promise((resolve, reject) => {
					// TODO: handle errors, avoid toArray()
					db.collection('images').find(search).toArray(function(err, data) {
						if (err) {
							console.log("ERROR: Could not find image "
								+ req.params.id);
							reject(err)
						} else {
							resolve(data[0]);
						}
					});
				});
			};

			/* Define function for calling search and waiting for result */
			let callSearchPromise = async function() {
				let result = await (searchPromise());

				return result;
			}

			/* Do necessary work after search promise returns */
			callSearchPromise().then(function(result) {
				client.close();
				res.json(result);
			});
		});
	} catch (err) {
		console.log(err);
	}
});

/* Retrieve a given image's image file from the gallery */
app.get('/api/img/:id/', function (req, res, next) {
	let search = {
		_id: ObjectId(req.params.id)
	};

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let searchPromise = function() {
				return new Promise((resolve, reject) => {
					// TODO: handle errors, avoid toArray()
					db.collection('images').find(search).toArray(function(err, data) {
						if (err) {
							console.log("ERROR: Could not find image "
								+ req.params.id);
							reject(err)
						} else {
							resolve(data[0]);
						}
					});
				});
			};

			/* Define function for calling search and waiting for result */
			let callSearchPromise = async function() {
				let result = await (searchPromise());

				return result;
			}

			/* Do necessary work after search promise returns */
			callSearchPromise().then(function(result) {
				client.close();
				/* If an image of the given id exists, return that image */
				if (result != null) {
					/* result.x must match name in object inserted into Datastore */
					res.setHeader('Content-Type', result.image.mimetype);
					res.sendFile(result.image.path, { root: __dirname });
				} else {
					console.error("ERROR: image " + req.params.id + " does not exist");
					return res.status(404).end("Image: " + req.params.id + " did not exist");
				}
			});
		});
	} catch (err) {
		console.log(err);
	}
});

/* Retrieve a given image's image file from the gallery */
app.get('/api/img/thumbnail/:id/', function (req, res, next) {
	let search = {
		_id: ObjectId(req.params.id)
	};

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let searchPromise = function() {
				return new Promise((resolve, reject) => {
					// TODO: handle errors, avoid toArray()
					db.collection('images').find(search).toArray(function(err, data) {
						if (err) {
							console.log("ERROR: Could not find image "
								+ req.params.id);
							reject(err)
						} else {
							resolve(data[0]);
						}
					});
				});
			};

			/* Define function for calling search and waiting for result */
			let callSearchPromise = async function() {
				let result = await (searchPromise());

				return result;
			}

			/* Do necessary work after search promise returns */
			callSearchPromise().then(function(result) {
				client.close();
				/* If an image of the given id exists, return that image */
				if (result != null) {
					/* result.x must match name in object inserted into Datastore */
					res.setHeader('Content-Type', result.image.mimetype);
					var thumbnailImagePath = 
						result.image.destination + "thumbnail-"
						+ result.image.filename;

					if (fs.existsSync(thumbnailImagePath)) {
						res.sendFile(thumbnailImagePath, { root: __dirname });
					/* Image exists, but thumbnail does not */
					} else {
						/* Create a thumnbnail of the image */
						try {
							sharp(result.image.path).resize(600, 600, {
								kernel: sharp.kernel.nearest,
								fit: 'outside' })
								.toFile('uploads/thumbnail-' + result.image.filename, (err, resizeImage) => {
								if (err) {
									console.log(err);
								} else {
									/* Return the newly made thumbnail image */
									res.sendFile(thumbnailImagePath, { root: __dirname });
								}
							})
						} catch (error) {
							console.error(error);
						}
					}
				} else {
					console.error("ERROR: image " + req.params.id + " does not exist");
					return res.status(404).end("Image: " + req.params.id + " did not exist");
				}
			});
		});
	} catch (err) {
		console.log(err);
	}
});

// TODO: require authorization for this
/* Retrieve all images from the gallery */
app.get('/api/images/', function (req, res, next) {
	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let searchPromise = function() {
				return new Promise((resolve, reject) => {
					// TODO: handle errors, avoid toArray()
					db.collection('images').find({}).sort({ uploaded_at: 1 }).toArray(function(err, data) {
						if (err) {
							console.log("ERROR: Could not find images");
							reject(err)
						} else {
							resolve(data);
						}
					});
				});
			};

			/* Define function for calling search and waiting for results */
			let callSearchPromise = async function() {
				let results = await (searchPromise());

				return results;
			}

			/* Do necessary work after search promise returns */
			callSearchPromise().then(function(results) {
				client.close();
				/* If there are any images */
				if (results != null) {
					return res.json(results);
				}
			});
		});
	} catch (err) {
		console.log(err);
	}
});

/* Change the information attached to an image in the gallery */
app.patch('/api/images/:id/', function (req, res, next) {
	let search = {
		_id: ObjectId(req.params.id)
	};

	let newImage = req.body;

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let updatePromise = function() {
				return new Promise((resolve, reject) => {
					try {
						let updated = db.collection('images').findOneAndUpdate(search,
							{$set: { title: newImage.title,
								date_taken: newImage.date_taken,
								description: newImage.description,
								author_name: newImage.author_name }
							});
							resolve(updated);
					/* Catch update errors */
					} catch (err) {
						reject(updated);
						console.log(err);
					}
				});
			};

			/* Define function for calling update and waiting for result */
			let callUpdatePromise = async function() {
				let result = await (updatePromise());

				return result;
			}

			/* Do necessary work after update promise returns */
			callUpdatePromise().then(function(result) {
				client.close();
			});
		});
	} catch (err) {
		console.log(err);
	}
});

/* Delete a given image from the gallery */
app.delete('/api/images/:id/', function (req, res, next) {
	let search = {
		_id: ObjectId(req.params.id)
	};

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let deletionPromise = function() {
				return new Promise((resolve, reject) => {
					try {
						db.collection('images').find(search).toArray(function(err, data) {
							if (err) {
								console.log("ERROR: Could not find image");
								reject(err)
							} else {
								/* Delete the image itself from storage */
								fs.unlinkSync(data[0].image.path);
								/* Delete the thumbnail of image from storage */
								fs.unlinkSync(data[0].image.destination + "thumbnail-" + data[0].image.filename);
								/* Delete the image data from the database */
								let deleted = db.collection('images').deleteOne(search);
								resolve(deleted);
							}
						});
					/* Catch deletion errors */
					} catch (err) {
						reject(err);
						console.log(err);
					}
				});
			};

			/* Define function for calling deletion and waiting for result */
			let callDeletionPromise = async function() {
				let result = await (deletionPromise());

				return result;
			}

			/* Do necessary work after deletion promise returns */
			callDeletionPromise().then(function(result) {
				client.close();
			});
		});
	} catch (err) {
		console.log(err);
	}
});



/* Add new collection to gallery */
app.post('/api/collections/', function (req, res, next) {
	// TODO: translate content to a json array for storage
	new_collection_images = req.body.images;
	if (new_collection_images == null) {
		new_collection_images = [];
	}
	/* If the user did not specify a thumbnail image id */
	new_collection_thumbnail_image_id = req.body.collection_thumbnail_image_id;
	if (!new_collection_thumbnail_image_id.trim()) {
		new_collection_thumbnail_image_id = null;
	/* If they did specify a thumbnail image id, convert to a valid id */
	} else {
		new_collection_thumbnail_image_id =
			ObjectId(new_collection_thumbnail_image_id)
	}

	/* Create storage object */
	let new_collection_obj = {
		/* req.body.x must have x match the element names in the form
		 * in the HTML */
		title: req.body.collection_title,
		description: req.body.collection_description,
		thumbnail_image_id: new_collection_thumbnail_image_id,
		images: new_collection_images,
		created_at: Date.now()
	};

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let insertPromise = function() {
				return new Promise((resolve, reject) => {
					try {
						let inserted = db.collection('collections').insertOne(new_collection_obj);
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
				console.log("inserting new collection with id of " + result.insertedId);

				return result;
			}

			/* Do necessary work after insert promise returns */
			callInsertPromise().then(function(result) {
				client.close();
				res.json(new_collection_obj);
			});
		});
	} catch (err) {
		console.log(err);
	}
});


/* Retrieve given collection from gallery */
app.get('/api/collections/:id/', function (req, res, next) {
	/* Convert string in url to MongoDB Object ID */
	let search = {
		_id: ObjectId(req.params.id)
	};

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let searchPromise = function() {
				return new Promise((resolve, reject) => {
					// TODO: handle errors, avoid toArray()
					db.collection('collections').find(search).toArray(function(err, data) {
						if (err) {
							console.log("ERROR: Could not find collection "
								+ req.params.id);
							reject(err)
						} else {
							resolve(data[0]);
						}
					});
				});
			};

			/* Define function for calling search and waiting for result */
			let callSearchPromise = async function() {
				let result = await (searchPromise());

				return result;
			}

			/* Do necessary work after search promise returns */
			callSearchPromise().then(function(result) {
				client.close();
				res.json(result);
			});
		});
	} catch (err) {
		console.log(err);
	}
});

// TODO: require authorization for this
// Retrieve all collections
app.get('/api/collections/', function (req, res, next) {
	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let searchPromise = function() {
				return new Promise((resolve, reject) => {
					// TODO: handle errors, avoid toArray()
					db.collection('collections').find({}).sort({ created_at: 1 }).toArray(function(err, data) {
						if (err) {
							console.log("ERROR: Could not find collections");
							reject(err)
						} else {
							resolve(data);
						}
					});
				});
			};

			/* Define function for calling search and waiting for results */
			let callSearchPromise = async function() {
				let results = await (searchPromise());

				return results;
			}

			/* Do necessary work after search promise returns */
			callSearchPromise().then(function(results) {
				client.close();
				/* If there are any collections */
				if (results != null) {
					return res.json(results);
				}
			});
		});
	} catch (err) {
		console.log(err);
	}
});

/* Change the information attached to an collection in the gallery */
app.patch('/api/collections/:id/', function (req, res, next) {
	let search = {
		_id: ObjectId(req.params.id)
	};

	let newCollection = req.body;

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let updatePromise = function() {
				return new Promise((resolve, reject) => {
					try {
						let updated = db.collection('collections').findOneAndUpdate(search,
							{$set: { title: newCollection.title,
								description: newCollection.description,
								thumbnail_image_id: ObjectId(newCollection.thumbnail_image_id),
								images: newCollection.images }
							});
							resolve(updated);
					/* Catch update errors */
					} catch (err) {
						reject(updated);
						console.log(err);
					}
				});
			};

			/* Define function for calling update and waiting for result */
			let callUpdatePromise = async function() {
				let result = await (updatePromise());

				return result;
			}

			/* Do necessary work after update promise returns */
			callUpdatePromise().then(function(result) {
				client.close();
			});
		});
	} catch (err) {
		console.log(err);
	}
});


/* Delete a given collection from the gallery */
app.delete('/api/collections/:id/', function (req, res, next) {
	let search = {
		_id: ObjectId(req.params.id)
	};

	try {
		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

			const db = client.db('coll-ery');

			let deletionPromise = function() {
				return new Promise((resolve, reject) => {
					try {
						let deleted = db.collection('collections').deleteOne(search);
						resolve(deleted);
					/* Catch deletion errors */
					} catch (err) {
						console.error("ERROR: Could not delete collection of that ID; collection of that ID does not exist");
						console.log(err);
						reject(deleted);
						return res.status(404).end("Collection: " + req.params.id + " did not exist");
					}
				});
			};

			/* Define function for calling deletion and waiting for result */
			let callDeletionPromise = async function() {
				let result = await (deletionPromise());

				return result;
			}

			/* Do necessary work after deletion promise returns */
			callDeletionPromise().then(function(result) {
				client.close();
			});
		});
	} catch (err) {
		console.log(err);
	}
});



/* Add new user to gallery */
app.post('/api/users/', async (req, res, next) => {
	try {
		bcrypt.hash(req.body.password, 10, (err, saltedAndHashedPass) => {
			const newAccount = {
				username: req.body.username,
				password: saltedAndHashedPass
			}

			MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {

				const db = client.db('coll-ery');

				let insertPromise = function() {
					return new Promise((resolve, reject) => {
						try {
							let inserted;
							db.collection('users').findOne({ username: req.body.username }, (err, doc) => {
								/* If a user of this name does not already exist */
								if (!doc) {
									inserted = db.collection('users').insertOne(newAccount);
									console.log("inserting new user with id of " + inserted.insertedId);
									resolve(inserted);
								} else {
									console.log("Failed to inserting new user; User of name \"" + req.body.username + "\" already exists");
									// TODO: fix promise rejection here
									// reject(req.body.username);
								}
							});
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
					result.then(() => {
						return result;
					}).catch(function() {
						return null;
					});

				}

				/* Do necessary work after insert promise returns */
				callInsertPromise().then(function(result) {
					client.close();
					res.json(newAccount);
				});
			});
		});
	} catch (err) {
		console.log(err);
	}
});

/* Login as a user */
app.post('/api/users/signin/', isAuthenticated, async (req, res, next) => {
	let search = {
		username: req.body.username
	};
							console.log("username was not setto");
							req.session.username ="results.username";

	try {
		// const salt = await bcrypt.genSalt();
		// const saltAndHashedPass = await bcrypt.hash(req.body.password, salt);
		// const searchAccount = {
		// 	user: req.body.username,
		// 	password: saltAndHashedPass
		// }

		MongoClient.connect(mongoUrl, mongoOptions, function(err, client) {
			const db = client.db('coll-ery');

			let searchPromise = function() {
				return new Promise((resolve, reject) => {
					// TODO: handle errors, avoid toArray()
					db.collection('users').find(search).toArray(function(err, data) {
						if (err) {
							// TODO: this does not work, incorrect login crashes
							console.log("ERROR: Could not find collections");
							reject(err)
						} else {
							resolve(data[0]);
						}
					});
				});
			};

			/* Define function for calling search and waiting for results */
			let callSearchPromise = async function() {
				let results = await (searchPromise());

				bcrypt.compare(req.body.password, results.password, () => {
					if (err) {
						return res.status(500)
					} else {
						// TODO: login?
						/* Start a session (aka login) */
						// req.session.username = results.username;
						// if (!req.session.username) {
						// }
						// req.session.save();
						console.log("User \"" + results.username + "\" signed in");
						// res.end();
						res.status(200)
						next();
					}
				});

			}

			/* Do necessary work after search promise returns */
			callSearchPromise().then(function(results) {
				client.close();
			});
		});
	} catch (err) {
		console.log(err);
	}
});
const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
	if (err) console.log(err);
	else console.log("HTTP server on http://localhost:%s", PORT);
});
