const express = require('express');
const mongodb = require('mongodb');
const app = express();
const router = express.Router();
let products = require('./routes/routes');
const ObjectID = require('mongodb').ObjectID;
const cifrarExterno = require('./cifrar');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
require('dotenv').config();
const bcrypt = require('bcrypt');
let MongoClient = mongodb.MongoClient;
MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
	err ? console.log(err) : (app.locals.db = client.db('store'));
});
app.use('/products', products);
app.post('/registro', cifrarExterno, function (req, res) {
	//funión intermedia cifrarExtremo del módulo importado
	app.locals.db
		.collection('users')
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
	app.locals.db
		.collection('users')
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
	app.locals.db.collection('contact').insertOne(req.body, function (err, data) {
		err ? res.send({ error: true, contenido: err }) : res.send({ error: false, contenido: data });
	});
});

/* app.put('anyadir_carrito', function (req, res) {
	db.collection('users').updateOne(
		{ userName: document.getElementById('loggedUser').value }, // SERÍA MARAVILLOSO.
		{ $set: { bag: bag.push(localProduct[i]) } },
		function (error, datos) {
			error ? res.send({ error: true, contenido: error }) : res.send({ error: false, contenido: datos });
		}
	);
}); */
app.delete('/borrar', function (req, res) {
	let username = req.body.userName;

	app.locals.db
		.collection('users')
		.find({ userName: username })
		.toArray(function (err, data) {
			if (err !== null) {
				res.send({ mensaje: 'Ha habido un error' });
			} else {
				console.log(data);
				if (data.length > 0) {
					if (bcrypt.compareSync(req.body.password, data[0].password)) {
						let db = app.locals.db;
						db.collection('users').deleteOne({ userName: username }, function (err, data) {
							if (err !== null) {
								res.send({ mensaje: 'Error al borrar al usuario' });
							} else {
								res.send({ mensaje: 'Usuario borrado correctamente', contenido: data });
							}
						});
					} else {
						res.send({ mensaje: 'Contraseña incorrecta' });
					}
				} else {
					res.send({ mensaje: 'El usuario no existe' });
				}
			}
		});
});

app.listen(process.env.PORT || 3000);
