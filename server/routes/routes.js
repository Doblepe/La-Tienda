const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
	let db = req.app.locals.db;
	db.collection('products')
		.find()
		.toArray(function (err, data) {
			err ? res.send({ err: true, contenido: data }) : res.send({ err: false, contenido: data });
		});
});
router.get('/maleCollection', function (req, res) {
	let db = req.app.locals.db;
	db.collection('products')
		.find({ collection: 'male' })
		.toArray(function (err, data) {
			err ? res.send({ err: true, contenido: data }) : res.send({ err: false, contenido: data });
		});
});
router.get('/femaleCollection', function (req, res) {
	let db = req.app.locals.db;
	db.collection('products')
		.find({ collection: 'female' })
		.toArray(function (err, data) {
			err ? res.send({ err: true, contenido: data }) : res.send({ err: false, contenido: data });
		});
});
router.get('/kidCollection', function (req, res) {
	let db = req.app.locals.db;
	db.collection('products')
		.find({ collection: 'kid' })
		.toArray(function (err, data) {
			err ? res.send({ err: true, contenido: data }) : res.send({ err: false, contenido: data });
		});
});

module.exports = router;
