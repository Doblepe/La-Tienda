const express = require('express');
const mongodb = require('mongodb');
const MongoStore = require("connect-mongo");
const cookieParser = require('cookie-parser')
const secreto = "patata";
const crypto = require("crypto");
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(process.env.SECRET_KEY);


require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001
const cors = require('cors')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000", //dirección de la app de React desde la que nos llegarán las peticiones.
		credentials: true,
	})
);

app.use(
	session({
		secret: secreto, //Secreto de la sesion (se puede hacer dinámico),
		resave: false, //Evita el reseteo de la sesión con cada llamada
		saveUninitialized: false, //Evita crear sesiones vacías
		store: MongoStore.create({
			//Nos guarda las sesiones en la colección "sesiones" en la base de datos "prueba"
			mongoUrl: process.env.MONGO_URL,
			dbName: "prueba",
			collectionName: "sesiones",
			ttl: 1000 * 60 * 60 * 24, //Time To Live de las sesiones
			autoRemove: "native", //Utiliza el registro TTL de Mongo para ir borrando las sesiones caducadas.
		}),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, //Caducidad de la cookie en el navegador del cliente.
		},
	})
);
app.use(cookieParser(secreto)); //Mismo que el secreto de la sesión
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	//Middleware para publicar en consola la sesión y el usuario. Activar en desarrollo.
	console.log(req.session ? req.session : "No hay sesión");
	console.log(req.user ? req.user : "No hay usuario");
	next();
})

app.use(passport.initialize());
app.use(passport.session());



let MongoClient = mongodb.MongoClient;
MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
	err ? console.log(err) : (app.locals.db = client.db("store"), console.log('Mongo conectado'));
});




// ------------------- STRIPE -----------------------

app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})
/* 
const YOUR_DOMAIN = 'http://localhost:3000/checkout';
app.post('/create-checkout-session', async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			[{
				title: "Hombre prueba",
				url_img: "https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800",
				price: 14.8,
				collection: "male",
				id: 1
			}, {
				title: "VIMILINA HALTERNECK - Vestido de cóctel",
				url_img: "https://img01.ztat.net/article/spp-media-p1/1ff715a8248c38099d896e7049a8bc7a/c08f982eb20049e796683c93fd291366.jpg?imwidth=1800",
				price: 27.28,
				collection: "female",
				id: 2
			}, {
				title: "Falda acampanada",
				url_img: "https://img01.ztat.net/article/spp-media-p1/2874919838dd34638938d96a99524236/6134a85ce583453a8fea531be09ae28a.jpg?imwidth=1800",
				price: 22.8,
				collection: "female",
				id: 3
			},
			{
				title: "ALPHA ORIGINAL KHAKI SKINNY - Pantalones chinos",
				url_img: "https://img01.ztat.net/article/spp-media-p1/759c784d74784e62a023d2fc08b83490/adb3e989606049d79bbdaabaad6be191.jpg?imwidth=1800",
				price: 75.69,
				collection: "male",

				id: 4
			},
			{
				title: "Equipación selección",
				url_img: "https://img01.ztat.net/article/spp-media-p1/c546764829bb301f9855902079161d4d/876010c9fd5a4aebb0a3063e8b3122cd.jpg?imwidth=1800",
				price: 123.5,
				collection: "kid",
				id: 5
			},
			{
				title: "ELEONOR - Blazer",
				url_img: "https://img01.ztat.net/article/spp-media-p1/f734e5cabf513694aa372675b5a04c56/63dd77dbdc4440edb86cb81b132ae5f1.jpg?imwidth=1800",
				price: 49.99,
				collection: "female",
				id: 6
			},
			{
				title: "BABY SET UNISEX - Regalos para bebés",
				url_img: "https://img01.ztat.net/article/spp-media-p1/cbc71495e9ea3dc8811f57ad54755aa8/7fde3ee0df1d489b89f809574093e73f.jpg?imwidth=1800&filter=packshot",
				price: 36.43,
				collection: "kid",
				id: 7
			},
			{
				title: "Zapatillas infantiles YC373SNW ",
				url_img: "https://img01.ztat.net/article/spp-media-p1/c3435ec08b71374fb7abb41abee2c4c7/4f6e4e133b624e0c930d8ddb8db04433.jpg?imwidth=1800&filter=packshot",
				price: 33.43,
				collection: "kid",
				id: 8
			},
			{
				title: "JDYNEW - Shorts",
				url_img: "https://img01.ztat.net/article/spp-media-p1/1e4edb0a192c39ccb6223dbd975afd06/6884590cb26a4941b478f57414282b79.jpg?imwidth=1800",
				price: 22.43,
				collection: "female",
				id: 9
			},
			{
				title: "FLAMINGUY - Traje ",
				url_img: "https://img01.ztat.net/article/spp-media-p1/b099a94887f03a70aae49d2226b53f14/a3fe2b5509d449f8bf92be97fe5a15a1.jpg?imwidth=1800",
				price: 56.33,
				collection: "male",
				id: 10
			},
			{
				title: "Pijama",
				url_img: "https://img01.ztat.net/article/spp-media-p1/bbdf49a56c2e494cbecaca3fba1ed582/f06a492457f949a9805edca541028e6e.jpg?imwidth=1800",
				price: 33.43,
				collection: "male",
				id: 11
			},
			{
				title: "NKFVINAYA - Mono",
				url_img: "https://img01.ztat.net/article/spp-media-p1/d59adb438a0944738d0e90c084213ad6/1fd83b58b82c42a691a6a3dda1229f0f.jpg?imwidth=1800&filter=packshot",
				price: 22.44,
				collection: "Kid",
				id: 12
			}
			],
		],
		mode: 'payment',
		success_url: `${YOUR_DOMAIN}?success=true`,
		cancel_url: `${YOUR_DOMAIN}?canceled=true`,
	});
	res.redirect(303, session.url)
}); */
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
				if (!validoPass(password, user.password.hash, user.password.salt)) {
					return done(null, false);
				}
				return done(null, user);
			});
		}
	)
);
passport.serializeUser(function (user, done) {
	console.log("-> Serialize");
	done(null, user);
});
passport.deserializeUser(function (user, done) {
	console.log("-> Deserialize");
	app.locals.db.collection("users").findOne(
		{ email: user.email },
		function (err, usuario) {
			if (err) {
				return done(err);
			}
			if (!usuario) {
				return done(null, null);
			}
			return done(null, usuario);
		}
	);
});
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
app.post("/registro", function (req, res) {
	app.locals.db.collection("users")
		.find({ email: req.body.email })
		.toArray(function (err, user) {
			if (user.length === 0) {
				const saltYHash = creaPass(req.body.password);
				app.locals.db.collection("users").insertOne(
					{
						nombre: req.body.nombre,
						apellidos: req.body.apellidos,
						email: req.body.email,
						password: {
							hash: saltYHash.hash,
							salt: saltYHash.salt,
						},
					},
					function (err, respuesta) {
						if (err !== null) {
							console.log(err);
							res.send({ mensaje: "Ha habido un error: " + err });
						} else {
							res.send({ mensaje: "Usuario registrado" });
						}
					}
				);
			} else {
				res.send({ err: true, mensaje: "Usuario ya registrado" });
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
app.all("/api/fail", function (err, res,) {
	res.send({ logged: false, mensaje: "Conexión rechazada: el email o la contraseña son incorrectos", err: true });
});


app.all("/api", function (req, res) {
	// Utilizar .all como verbo => Las redirecciones desde un cliente Rest las ejecuta en POST, desde navegador en GET
	res.send({ logged: true, mensaje: "Login correcto", user: req.user });
});

app.post("/logout", function (req, res) {
	res.send({ logged: null, err: false, mensaje: "Logout Correcto", nombre: null });
	req.logOut();
});

// ----------------------- CONTACT  VÍCTOR-------------------------------

app.post('/contact/info', function (req, res) {
	app.locals.db.collection('contact').insertOne(req.body, function (err, data, mensaje) {
		err ? res.send({ mensaje: 'Ha habido un error al enviar la información, por favor, vuelve a intentarlo', error: true, contenido: err }) : res.send({ mensaje: 'Mensaje recibido correctamente. Muchas gracias por confiar en nosotros, intentaremos resolver tu incidencia lo antes posible', error: false, contenido: data });
	});
});
// ---------------------- GETTING USER --------------------------------
/* app.post('/user', function (req, res) {
	app.locals.db
		.collection('users')
		.findOne({ email: req.body.email })
		.toArray(function (err, data) {
			if (err !== null) {
				res.send({ mensaje: 'Ha habido un error al conectar', contenido: data, error: true });
			} else {
				{res.send({ mensaje: 'Usuario encontrado', contenido: data, error: false});
				console.log(data);
					} 
			}
		});
}); */

app.listen(port, function (err) {
	err
		? console.log("🔴 Servidor fallido")
		: console.log("🟢 Servidor a la escucha en el puerto:" + port);
});
// ------------------- FUNCIONES CRYPTO PASSWORD -------------------------

/**
 *
 * @param {*} password -> Recibe el password a encriptar
 * @returns -> Objeto con las claves salt y hash resultantes.
 */

function creaPass(password) {
	var salt = crypto.randomBytes(32).toString("hex");
	var genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");

	return {
		salt: salt,
		hash: genHash,
	};
}

/**
 *
 * @param {*} password -> Recibe el password a comprobar
 * @param {*} hash -> Recibe el hash almacenado a comprobar
 * @param {*} salt -> Recibe el salt almacenado a comprobar
 * @returns -> Booleano ( true si es el correcto, false en caso contrario)
 */

function validoPass(password, hash, salt) {
	var hashVerify = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");
	return hash === hashVerify;
}

/*  app.all("/api", function (req, res) {
	app.locals.db
		.collection('users')
		.find({ email: req.body.email })
		.toArray(function (err, data) {
			if (err !== null) {
				res.send({ mensaje: 'Ha habido un error al conectar la base de datos', contenido: data, err: true });
			} else {
				if (data.length > 0) {
					console.log(data.length)
					if (validoPass) {
						res.send({ mensaje: 'Logueado correctamente', contenido: data, err: false, login: true });
					} else {
						res.send({ mensaje: 'Contraseña incorrecta', contenido: data, err: true, login: false });
					}
				} else {
					res.send({ mensaje: 'El usuario no existe', err: false, login: false });
				}
			}
		});
}); */
