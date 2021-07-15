const express = require('express');
const mongodb = require('mongodb');
require('dotenv').config();
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 3001
const cors = require('cors')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
// const router = express.Router();//
let products = require('./routes/routes');
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	session({
		secret: "patata", //secreto de la sesion (se puede hacer dinámico)
		resave: false, //Evita el reseteo de la sesión con cada llamada
		saveUninitialized: false, //Evita crear sesiones vacías
		// cookie: { maxAge: 60000 }
	})
);

app.use(passport.initialize());
app.use(passport.session());


let MongoClient = mongodb.MongoClient;
MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
	err ? console.log(err) : (app.locals.db = client.db("store"), console.log('Mongo conectado'));
});
//------------------- Autorización y gestión de sesiones ----------
passport.use(
	new LocalStrategy(
	  {
		usernameField: "email",
		passwordField: "password",
	  },
	  function (email, password, done) {
		app.locals.db.collection("users").findOne({ email: email }, function (err, user) {
		  if (err) {
			return done(err);
		  }
		  if (!user) {
			return done(null, false);
		  }
		  if (!bcrypt.compareSync(password, user.password)) { 
			  console.log(password + user.password)// ----- OJO AL BICRYP
			return done(null, false);
		  }
		  return done(null, user);
		});
	  }
	)
  );
app.use(
	session({
	  secret: "patata", //secreto de la sesion (se puede hacer dinámico)
	  resave: false, //Evita el reseteo de la sesión con cada llamada
	  saveUninitialized: false, //Evita crear sesiones vacías
	  // cookie: { maxAge: 600000 }
	})
  );
  app.use(passport.initialize());
  app.use(passport.session());

app.use('/products', products);
passport.serializeUser(function (user, done) {
	done(null, user.email);
  });
  // Introduce la cookie en el navegador del usuario. 
  passport.deserializeUser(function (email, done) {
	app.locals.db.collection("users").findOne({ email: email }, function (err, user) {
	  if (err) {
		return done(err);
	  }
	  if (!user) {
		return done(null, null);
	  }
	  return done(null, user), console.log(user);
	});
  });
// ----------------------- REGISTRO -------------------------------
app.post('/registro', cryptPass, function (req, res) {
	console.log(req.body)
	app.locals.db
		.collection('users')
		.find({ email: req.body.email })
		.toArray(function (err, data) {
			if (err) {
				res.send({ error: true, contenido: err, mensaje: "Problemas al conectar con la base de datos" });
			} else {
				if (data.length === 0) {
					app.locals.db.collection('users').insertOne(req.body, function (err, data) {
						if (err !== null) {
							res.send({ mensaje: 'Error al registrar el usuario', error: true });
						} else {
							res.send({ mensaje: 'Usuario registrado correctamente', contenido: data, error: false });
						}
					});
				} else (res.send({ mensaje: "El usuario ya existe", error: true }))
			}
		});
});

app.post(
	"/login",
	passport.authenticate("local", {
	  successRedirect: "/api",
	  failureRedirect: "/api/fail",
	})
  );
  app.all("/api", function (req, res) {
	app.locals.db
	.collection('users')
	.find({ email: req.body.email })
	.toArray(function (err, data) {
		console.log(data.length);
		if (err !== null) {
			res.send({ mensaje: 'Ha habido un error', contenido: data, error: true });
		} else {
			if (data.length > 0) {
				if (bcrypt.compareSync(req.body.password, data[0].password)) {
					res.send({ mensaje: 'Logueado correctamente', contenido: data, error: false, login: true });
				} else {
					res.send({ mensaje: 'Contraseña incorrecta', contenido: data, error: true, login: false });
				}
			} else {
				res.send({ mensaje: 'El usuario no existe', error: true, login: false });
			}
		}
	});
});
  
  app.all("/api/fail", function (req, res) {
	res.status(401).send({ logged: false, mensaje: "Acceso denegado api/fail" });
  });
  app.get('/prueba', function(req,res){
	  req.isAuthenticated()
	  ? res.send({mensaje: "todo correcto, info sensible"}):
	  res.send({mensaje: "necesitas logearte. Denegado"})
  })
 
// ----------------------- LOGIN  VÍCTOR-------------------------------

/* app.post('/login', function (req, res) {
	app.locals.db
		.collection('users')
		.find({ email: req.body.email })
		.toArray(function (err, data) {
			console.log(data.length);
			if (err !== null) {
				res.send({ mensaje: 'Ha habido un error', contenido: data, error: true });
			} else {
				if (data.length > 0) {
					if (bcrypt.compareSync(req.body.password, data[0].password)) {
						res.send({ mensaje: 'Logueado correctamente', contenido: data, error: false, login: true });
					} else {
						res.send({ mensaje: 'Contraseña incorrecta', contenido: data, error: true, login: false });
					}
				} else {
					res.send({ mensaje: 'El usuario no existe', error: true, login: false });
				}
			}
		});
});
 */
app.post('/contact/info', function (req, res) {
	app.locals.db.collection('contact').insertOne(req.body, function (err, data, mensaje) {
		err ? res.send({ mensaje: 'Ha habido un error al enviar la información, por favor, vuelve a intentarlo', error: true, contenido: err }) : res.send({ mensaje: 'Mensaje recibido correctamente. Muchas gracias por confiar en nosotros, intentaremos resolver tu incidencia lo antes posible', error: false, contenido: data });
	});
});

function cryptPass(req, res, next) {
	let usuario = req.body;
	usuario.password = bcrypt.hashSync(usuario.password, 10);
	req.body = usuario;
	next();
}
app.listen(port, function (err) {
	err
		? console.log("🔴 Servidor fallido")
		: console.log("🟢 Servidor a la escucha en el puerto:" + port);
});

 // CÓDIGO SOBRANTE

/* app.delete('/borrar', function (req, res) {
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
								res.send({ mensaje: 'Error al borrar al usuario', contenido: data });
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

app.put('/editar', function (req, res) {
	let username = req.body.userName;
	let newUserName = req.body.newUserName;
	app.locals.db
		.collection('users')
		.find({ userName: username })
		.toArray(function (err, data) {
			if (err !== null) {
				res.send({ mensaje: 'Ha habido un error', contenido: data });
			} else {
				console.log(data);
				if (data.length > 0) {
					if (bcrypt.compareSync(req.body.password, data[0].password)) {
						app.locals.db
							.collection('users')
							.updateOne(
								{ userName: username },
								{ $set: { userName: newUserName } },
								function (err, data) {
									if (err !== null) {
										res.send({ mensaje: 'Error al modificar al usuario', contenido: data });
									} else {
										res.send({ mensaje: 'Usuario modificado correctamente', contenido: data });
									}
								}
							);
					} else {
						res.send({ mensaje: 'Contraseña incorrecta', contenido: data });
					}
				} else {
					res.send({ mensaje: 'El usuario no existe', contenido: data });
				}
			}
		});
}); */

// ------------------------------------ Código de Rafa -----------------------
/*
const express = require("express");
const app = express();
let puerto = process.env.PORT || 3000;

const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;
let db;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
	secret: "patata", //secreto de la sesion (se puede hacer dinámico)
	resave: false, //Evita el reseteo de la sesión con cada llamada
	saveUninitialized: false, //Evita crear sesiones vacías
	// cookie: { maxAge: 60000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());

MongoClient.connect(
  "mongodb://127.0.0.1:27017",
  { useUnifiedTopology: true },
  function (error, client) {
	error
	  ? console.log("🔴 MongoDB no conectado")
	  : ((db = client.db("prueba")), console.log("🟢 MongoDB conectado"));
  }
);

//------------------- Autorización y gestión de sesiones ----------

passport.use(
  new LocalStrategy(
	{
	  usernameField: "email",
	  passwordField: "password",
	},
	function (email, password, done) {
	  db.collection("users").findOne({ email: email }, function (err, user) {
		if (err) {
		  return done(err);
		}
		if (!user) {
		  return done(null, false);
		}
		if (user.password !== password) {
		  return done(null, false);
		}
		return done(null, user);
	  });
	}
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  db.collection("users").findOne({ email: email }, function (err, user) {
	if (err) {
	  return done(err);
	}
	if (!user) {
	  return done(null, null);
	}
	return done(null, user); //console.log(user)
  });
});

//-------------------- LOGIN ------------------------------

app.post(
  "/login",
  passport.authenticate("local", {
	successRedirect: "/api",
	failureRedirect: "/api/fail",
  })
);

app.all("/api", function (req, res) {
  // Utilizar .all como verbo => Las redirecciones desde un cliente Rest las ejecuta en POST, desde navegador en GET
  res.send({ logged: true, mensaje: "Login correcto" });
});

app.all("/api/fail", function (req, res) {
  res.status(401).send({ logged: false, mensaje: "Denegado" });
});
 */
//app
//  .route("/api")
//  .get(res.send({ logged: true, mensaje: "Login correcto" }))
//  .post(res.send({ logged: true, mensaje: "Login correcto" }))

//-------------------- LOGOUT -----------------------------

/* app.post("/logout", function (req, res) {
  req.logOut();
  res.send({ mensaje: "Logout Correcto" });
});

//-------------------- RUTAS ------------------------------

app.post("/signup", function (req, res) {
  // Aqui es recomendable añadir la encriptacion del password con BCrypt
  db.collection("users")
	.find({ email: req.body.email })
	.toArray(function (err, user) {
	  if (user.length === 0) {
		db.collection("users").insertOne(
		  {
			email: req.body.email,
			password: req.body.password,
		  },
		  function (err, respuesta) {
			if (err !== null) {
			  console.log(err);
			  res.send({ mensaje: "Ha habido un error: " + err });
			} else {
			  res.send({ mensaje: "registrado" });
			}
		  }
		);
	  } else {
		res.send({ mensaje: "Usuario ya registrado" });
	  }
	});
});

app.get("/prueba", function (req, res) {
  req.isAuthenticated()
	? res.send({ mensaje: "Todo correcto: información sensible" })
	: res.send({ mensaje: "Necesitas logearte. Denegado" });
});

app.listen(puerto, function (err) {
  err
	? console.log("🔴 Servidor fallido")
	: console.log("🟢 Servidor a la escucha en el puerto:" + puerto);
}); */
