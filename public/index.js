function showPass() {
	var x = document.getElementsByClassName('pass-txt');
	if (x.type === 'password') {
		x.type = 'text';
	} else {
		x.type = 'password';
	}
} //FIXME: Conseguir que cambien todos campos.
function createAcc() {
	let pass1 = document.getElementById('pass1').value;
	let pass2 = document.getElementById('pass2').value;
	if (pass1 === pass2) {
		fetch('/registro', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: document.getElementById('email').value,
				userName: document.getElementById('username').value,
				password: document.getElementById('pass1').value,
				bag: [],
			}),
		})
			.then((res) => res.json())
			.then(function (datos) {
				datos.contenido.insertedCount >= 1
					? (document.getElementById('feedback').innerHTML = '<p style="color: green;"> Cuenta añadadida correctamente</p>')
					: (document.getElementById('feedback').innerHTML = '<h3>Se ha producido un error</h3>');
			});
	} else {
		document.getElementById('feedback').innerHTML = `<p style="color: red;"> Las contraseñas no coinciden</p>`;
	}
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
			if (datos.contenido.length >= 1) {
				document.getElementById('feedback').innerHTML = '<h3>LOGIN CORRECTO</h3>';
				storage(datos.contenido[0].userName);
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
function storage(userName) {
	sessionStorage.setItem('userName', `${userName}`);
	document.getElementById('loggedUser').innerHTML = `<p>${userName}</p>`;
}
