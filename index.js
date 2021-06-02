const express = require('express');
const mongodb = require('mongodb');
const app = express();
const ObjectID = require('mongodb').ObjectID;
const cifrarExterno = require('./cifrar');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();
const bcrypt = require('bcrypt');
let MongoClient = mongodb.MongoClient;
MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
	err ? console.log(err) : (db = client.db('store'));
});

app.post('/registro', cifrarExterno, function (req, res) {
	//funión intermedia cifrarExtremo del módulo importado
	db.collection('users')
		.find({ username: req.body.username })
		.toArray(function (err, data) {
			if (err) {
				res.send({ error: true, contenido: err });
			} else {
				if (data.length >= 0) {
					db.collection('users').insertOne(req.body, function (err, data) {
						if (err !== null) {
							res.send({ mensaje: 'Error al registrar el usuario' });
						} else {
							res.send({ mensaje: 'Usuario registrado correctamente', contenido: data });
						}
					});
				}
			}
		});
});
app.post('/login', function (req, res) {
	let username = req.body.userName;
	let password = req.body.password;
	db.collection('users')
		.find({ userName: username })
		.toArray(function (err, data) {
			if (err !== null) {
				res.send({ mensaje: 'Ha habido un error' });
			} else {
				if (data.length >= 0) {
					if (bcrypt.compareSync(password, data[0].password)) {
						res.send({ mensaje: 'Logueado correctamente', contenido: data, login: true });
					} else {
						res.send({ mensaje: 'Contraseña incorrecta', contenido: data, login: false });
					}
				} else {
					res.send({ mensaje: 'El usuario no existe' });
				}
			}
		});
});
app.post('/contact.html/info', function (req, res) {
	db.collection('contact').insertOne(req.body, function (err, data) {
		err ? res.send({ error: true, contenido: err }) : res.send({ error: false, contenido: data });
	});
});

app.get('/products', function (req, res) {
	db.collection('products')
		.find()
		.toArray(function (err, data) {
			err ? res.send({ err: true, contenido: data }) : res.send({ err: false, contenido: data });
		});
});
app.get('/products/maleCollection', function (req, res) {
	db.collection('products')
		.find({ collection: 'male' })
		.toArray(function (err, data) {
			err ? res.send({ err: true, contenido: data }) : res.send({ err: false, contenido: data });
		});
});
app.get('/products/femaleCollection', function (req, res) {
	db.collection('products')
		.find({ collection: 'female' })
		.toArray(function (err, data) {
			err ? res.send({ err: true, contenido: data }) : res.send({ err: false, contenido: data });
		});
});

app.get('/products/kidCollection', function (req, res) {
	db.collection('products')
		.find({ collection: 'kid' })
		.toArray(function (err, data) {
			err ? res.send({ err: true, contenido: data }) : res.send({ err: false, contenido: data });
		});
});

app.listen(process.env.PORT || 3000);
