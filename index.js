const express = require('express');
const mongodb = require('mongodb');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

let MongoClient = mongodb.MongoClient;
MongoClient.connect('mongodb+srv://vicdoblepe:vicdoblepe2@cards-game.skn15.mongodb.net/test', function (err, client) {
	//utilizamos las variables de entorno para almacenar nuestra información sensible.
	err ? console.log(err) : (db = client.db('store'));
});

app.listen(process.env.PORT || 3000);
