const express = require('express');
const router = express.Router();

router.post('/contact/info', function (req, res) {
	app.locals.db.collection('contact').insertOne(req.body, function (err, data, mensaje) {
		err ? res.send({ mensaje: 'Ha habido un error al enviar la información, por favor, vuelve a intentarlo', error: true, contenido: err }) : res.send({  mensaje:'Mensaje recibido correctamente. Muchas gracias por confiar en nosotros, intentaremos resolver tu incidencia lo antes posible', error: false, contenido: data });
	});
});


module.exports = router;
