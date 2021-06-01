function showPass() {
	var x = document.getElementsByClassName('pass-txt');
	if (x.type === 'password') {
		x.type = 'text';
	} else {
		x.type = 'password';
	}
} //FIXME: Conseguir que cambien todos campos.
const 
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
	fetch('/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			userName: document.getElementById('loginName').value,
			password: document.getElementById('loginPassword').value,
		}),
	})
		.then((res) => res.json())
		.then(function (datos) {
			// Array.
			if (datos.contenido >= 1) {
				(document.getElementById('feedback').innerHTML = '<h3>LOGIN CORRECTO</h3>'),
					function storage() {
						sessionStorage.setItem('userName', `${req.body.userName}`);
						document.getElementById('loggedUser').innerHTML = sessionStorage.getItem('userName');
					};
			} else {
				document.getElementById('feedback').innerHTML = '<h3>Se ha producido un error</h3>';
			}
		});
}
function sendInfo() {
	fetch('/contact.html/info', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			email: document.getElementById('info-email').value,
			infomsg: document.getElementById('info-msg').value,
		}),
	})
		.then((res) => res.json())
		.then(function (datos) {
			datos.contenido.insertedCount >= 1
				? (document.getElementById('feedback').innerHTML =
						'<h3 style="color: green">Tu mensaje se ha añadido correctamente, contactaremos contigo lo antes posible.</h3>')
				: (document.getElementById('feedback').innerHTML = '<h3>Se ha producido un error</h3>');
		});
}
