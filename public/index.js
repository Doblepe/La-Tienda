function showPass() {
	var x = document.getElementById('password');
	if (x.type === 'password') {
		x.type = 'text';
	} else {
		x.type = 'password';
	}
}
function createAcc() {
	let newacc = {
		email: document.getElementById('email').value,
		userName: document.getElementById('username').value,
		pass: document.getElementById('password').value,
	};
}
