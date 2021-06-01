const express = require('express');
const mongodb = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt'); // paquete bcrypt para el cifrado
require('dotenv').config(); //utilización del paquete dotenv para el uso de las variables de entorno.
const app = express();
let MongoClient = mongodb.MongoClient;
let db;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(mostrarIp); // este App.Use obliga a usar la función intermedia en cada llamada. (modo developer?)
const cifrarExterno = require('./public/cifrar');

MongoClient.connect(process.env.MONGO_URL, function (err, client) {
	//utilizamos las variables de entorno para almacenar nuestra información sensible.
	err ? console.log(err) : (db = client.db('store'));
});
app.post('/registro', cifrarExterno, function (req, res) {
	//funión intermedia cifrarExtremo del módulo importado
	let username = req.body.username;
	let password = req.body.password;
	// TODO: Comrpobar si da ERROR por cualquier motivo
	db.collection('users')
		.find({ username: req.body.username })
		.toArray(function (err, data) {
			if (err) {
				res.send({ error: true, contenido: err });
			} else {
				if (data.length >= 0) {
					db.collection('users').insertOne(
						{ username: username, password: contraseinaCifrada, email: email, bag: [] },
						function (err, mensaje) {
							if (err !== null) {
								res.send({ mensaje: 'Error al registrar el usuario' });
							} else {
								res.send({ mensaje: 'Usuario registrado correctamente' });
							}
						}
					);
				}
			}
		});

	app.post('/login', function (req, res) {
		let username = req.body.username;
		let password = req.body.password;
		db.collection('users')
			.find({ username: username })
			.toArray(function (err, data) {
				if (err !== null) {
					res.send({ mensaje: 'Ha habido un error' });
				} else {
					if (data.length > 0) {
						if (bcrypt.compareSync(password, data[0].password)) {
							res.send({ mensaje: 'Logueado correctamente', login: true });
						} else {
							res.send({ mensaje: 'Contraseña incorrecta', login: false });
						}
					} else {
						res.send({ mensaje: 'El usuario no existe' });
					}
				}
			});
	});
});
