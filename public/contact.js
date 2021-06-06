isLogged();
/* function mostrarContrasena() {
	var tipo = document.getElementsById('password');
	if (tipo.type == 'password') {
		tipo.type = 'text';
	} else {
		tipo.type = 'password';
	}
}  */ //FIXME: Conseguir que cambien todos campos.
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
					? feedback('<p style="color: green;"> Cuenta añadadida correctamente</p>')
					: feedback('<h3>Se ha producido un error</h3>');
			});
	} else {
		feedback(`<p style="color: red;"> Las contraseñas no coinciden</p>`);
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
				feedback(`<h3 style="color: green";>LOGIN CORRECTO</h3>`);
				storage(datos.contenido[0].userName);
				isLogged();
			} else {
				feedback(`<h3 style="color: red";>Se ha producido un error</h3>`);
			}
		});
}
function storage(userName) {
	sessionStorage.setItem('logged', true);
	sessionStorage.setItem('userName', `${userName}`);
	sessionStorage.setItem('cesta', []);
	document.getElementsByClassName('loggedUser').innerHTML = `<p>${userName}</p>`;
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
				? feedback(
						'<h3 style="color: green">Tu mensaje se ha añadido correctamente, contactaremos contigo lo antes posible.</h3>'
				  )
				: feedback('<h3>Se ha producido un error</h3>');
		});
}
function isLogged() {
	if (sessionStorage.getItem('logged') == 'true') {
		document.getElementById('loggedUser').innerHTML = `<p>${sessionStorage.getItem('userName')}</p>`;
	} else {
		window.alert(
			'¿Todavía no eres cliente nuestro? Regístrate ahora y consigue un 15% de descuento en todos nuestros productos '
		);
	}
}
function deleteAcc() {
	fetch('/borrar', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			userName: document.getElementById('delAccName').value,
			password: document.getElementById('delAccPassword').value,
		}),
	})
		.then((res) => res.json())
		.then(function (datos) {
			if (datos.contenido.length > 1) {
				feedback('<h3 style="color: red;">Se ha producido un error</h3>');
			} else {
				feedback('<h3 style="color: green;">La cuenta ha sido borrada correctamente</h3>');
			}
		});
}
function editAcc() {
	fetch('/editar', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			userName: document.getElementById('edAccName').value,
			password: document.getElementById('edAccPassword').value,
			newUserName: document.getElementById('newUserName').value,
		}),
	})
		.then((res) => res.json())
		.then(function (datos) {
			if (datos.contenido.length > 1) {
				feedback('<h3 style="color: red;">Se ha producido un error al editar la cuenta</h3>');
			} else {
				feedback('<h3 style="color: green;">La cuenta ha sido editada correctamente </h3>');
			}
		});
}
function feedback(mensaje) {
	(document.getElementById('feedback').innerHTML = mensaje),
		setTimeout(() => {
			document.getElementById('feedback').innerHTML = '';
		}, 4000);
}
