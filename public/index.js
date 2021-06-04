function mostrarContrasena() {
	var tipo = document.getElementsByClassName('password');
	if (tipo.type == 'password') {
		tipo.type = 'text';
	} else {
		tipo.type = 'password';
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
					? (document.getElementById('feedback').innerHTML = feedback(
							'<p style="color: green;"> Cuenta añadadida correctamente</p>'
					  ))
					: (document.getElementById('feedback').innerHTML = feedback(
							'<h3 style="color: red;">Se ha producido un error</h3>'
					  ));
			});
	} else {
		document.getElementById('feedback').innerHTML = feedback(
			`<p style="color: red;"> Las contraseñas no coinciden</p>`
		);
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
				document.getElementById('feedback').innerHTML = '<h3 style="color: green";>LOGIN CORRECTO</h3>';
				storage(datos.contenido[0].userName);
				isLogged();
			} else {
				document.getElementById('feedback').innerHTML = '<h3 style="color: red";>Se ha producido un error</h3>';
			}
		});
}
function isLogged() {
	console.log(sessionStorage.getItem('logged'));
	if (sessionStorage.getItem('logged') == 'true') {
		document.getElementById('loggedUser').innerHTML = `<p>${sessionStorage.getItem('userName')}</p>`;
	} else {
		window.alert(
			'¿Todavía no eres cliente nuestro? Regístrate ahora y consigue un 15% de descuento en todos nuestros productos '
		);
	}
}
function storage(userName) {
	sessionStorage.setItem('logged', true);
	sessionStorage.setItem('userName', `${userName}`);
	sessionStorage.setItem('cesta', []);
	document.getElementsByClassName('loggedUser').innerHTML = `<p>${userName}</p>`;
}
function imprimir(datos) {
	localProduct = datos.contenido;
	let parrafo = '';
	let maleClothes = sessionStorage.getItem('collection' === 'male');
	let femaleClothes = sessionStorage.getItem('collection' === 'female');
	let kidClothes = sessionStorage.getItem('collection' === 'kid');
	for (let i = 0; i < datos.contenido.length; i++) {
		parrafo += `<div class="col">
		<div class="card h-100">
		  <img src="${datos.contenido[i].url_img}" class="card-img-top" alt="${datos.contenido[i].title}">
		  <div class="card-body">
			<h5 class="card-title">${datos.contenido[i].title}</h5>
			<p class="card-text">${datos.contenido[i].price} EUR</p>
			<button type="button" class="btn btn-primary" onclick="addToBag(${i})">Añadir al carrito</button>
		  </div>
		  <div class="card-footer">
			<small class="text-muted">15% de descuento</small>
		  </div>
		</div>
	  </div>`;
	}
	if (maleClothes) {
		document.getElementById('maleClothes').innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">
	${parrafo}</div>`;
	} else if (femaleClothes) {
		document.getElementById('femaleClothes').innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">
	${parrafo}</div>`;
	} else if (kidClothes) {
		document.getElementById('kidClothes').innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">
	${parrafo}</div>`;
	} else {
		document.getElementById('products').innerHTML = `<div class="row row-cols-1 row-cols-md-3 g-4">
	${parrafo}</div>`;
	}
}

/* function feedback(mensaje) {
	mensaje === 'interruptor'
		? (document.getElementById('feedback').innerHTML = '')
		: (document.getElementById('feedback').innerHTML = `<h3>${mensaje}</h3>`),
		setTimeout(feedback('interruptor'), 4000);
} */
isLogged();
