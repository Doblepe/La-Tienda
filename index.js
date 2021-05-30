const express = require('express');
const mongodb = require('mongodb');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://vicdoblepe:vicdoblepe@cards-game.skn15.mongodb.net/Cards-game?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
	const collection = client.db('Cards-game').collection('users');
	// perform actions on the collection object
});

app.listen(process.env.PORT || 3000);
