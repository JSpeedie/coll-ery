const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer = require('multer');
var upload = multer({dest: 'uploads/'});

var Datastore = require('nedb')
	, images = new Datastore({ filename: 'db/images.db', autoload: true });

app.use(express.static('static'));

app.use(function (req, res, next){
    console.log("HTTP request", req.method, req.url, req.body);
    next();
});

let ImageId = (function() {
	let id = 0;

	return function image() {
		this._id = id++;
	}
}());

/*  Image:
 * ========
 * - title
 * - author
 * - image
 * - description
 * - date_taken
 */


// Add new image to gallery
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
	console.log(new_image_obj);
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
		console.log(data); // TODO: remove
		return res.json(data);
	});
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
