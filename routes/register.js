app.locals.db;
app.post('/registro', function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	let contraseinaCifrada = bcrypt.hashSync(password, 10);

	db.collection('users').insertOne({ username: username, password: contraseinaCifrada }, function (err, result) {
		if (err !== null) {
			res.send({ mensaje: 'Error al registrar el usuario' });
		} else {
			res.send({ mensaje: 'Usuario registrado correctamente' });
		}
	});
});
