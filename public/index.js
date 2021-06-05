/* function mostrarContrasena() {
	var tipo = document.getElementsByClassName('password');
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
function feedback(mensaje) {
	(document.getElementById('feedback').innerHTML = mensaje),
		setTimeout(() => {
			document.getElementById('feedback').innerHTML = '';
		}, 4000);
	/* setTimeout(() => {
			document.getElementById('feedback').innerHTML = 'interruptor';
		}, 4000);
	 */
	/* 	console.log(mensaje);
		if (mensaje !== 'interruptor') {
			document.getElementById('feedback').innerHTML = mensaje;
		} else {
			document.getElementById('feedback').innerHTML = '';
		} */
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
isLogged();
