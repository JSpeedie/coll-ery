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

/*
 *  Image:
 * ========
 * - title
 * - author
 * - image
 * - description
 * - date_taken
 */

/* ========================================= */
/* Image addition, retrieval, and deletion */
/* ========================================= */

// Add new image to gallery
// TODO: needs checking for if it uploads the image itself properly
app.post('/api/images/', upload.single('picture'), function (req, res, next) {
	images.insert({title: req.body.image_title, author: req.body.author_name, image: req.image_file, description: req.image_description, date_taken: req.date_taken}, function(err, newDoc) {});
	return res.redirect('/');
});

const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
