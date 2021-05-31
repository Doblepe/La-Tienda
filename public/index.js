function showPass() {
	var x = document.getElementById('password');
	if (x.type === 'password') {
		x.type = 'text';
	} else {
		x.type = 'password';
	}
} //FIXME: Conseguir que cambien todos campos.
function createAcc() {
	fetch('/registro', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: document.getElementById('email').value,
			userName: document.getElementById('username').value,
			password: document.getElementById('password').value,
		}),
	})
		.then((res) => res.json())
		.then(function (datos) {
			datos.contenido.insertedCount >= 1
				? (document.getElementById('feedback').innerHTML = '<h3>Cuenta añadida correctamente</h3>')
				: (document.getElementById('feedback').innerHTML = '<h3>Se ha producido un error</h3>');
		});
}
function loginAcc() {
	fetch('/registro', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			userName: document.getElementById('loginName').value,
			password: document.getElementById('loginPassword').value,
		}),
	})
		.then((res) => res.json())
		.then(function (datos) {
			datos.contenido.insertedCount >= 1
				? ((document.getElementById('feedback').innerHTML = '<h3>LOGIN CORRECTO</h3>'),
				  (document.getElementById('loggedUser').innerHTML = sessionStorage.getItem(userName)))
				: //TODO: Crear una función que almacene el sesionStorage
				  //TODO: Devolver el item document.getElementById("result").innerHTML = sessionStorage.getItem("lastname")
				  (document.getElementById('feedback').innerHTML = '<h3>Se ha producido un error</h3>');
		});
}
