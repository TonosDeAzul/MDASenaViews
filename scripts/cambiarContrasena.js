import { validarInput, valido, invalido, mensajeError, longitudMinima, longitudMaxima } from "./validarInputs.js";
// Documento
const _d = document;
let usuario; // Variable para almacenar el usuario actual
// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
	usuario = JSON.parse(localStorage.getItem("usuario"));
	console.log(usuario);
});
// Inputs
const _inputContrasena = _d.getElementById("contrasena");
const _inputConfirmarContrasena = _d.getElementById("confirmarContrasena");
// Formulario
const _form = _d.getElementById("form");
// Función para traer usuario
const getUsuario = () => {
	return fetch(`http://localhost:3000/tb_usuarios/`)
		.then(response => response.json())
		.then(data => {
			return data;
		});
};
// Función para cambiar contraseña
const cambiarContrasena = (idUsuario, contrasena) => {
	fetch(`http://localhost:3000/tb_usuarios/${idUsuario}`, {
    method: "PUT",
    body: JSON.stringify(contrasena),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then(
			window.location.href = "login.html"
		);
}

longitudMaxima(_inputContrasena, 100);
longitudMaxima(_inputConfirmarContrasena, 100);
// Función para validar formulario
const validarForm = (event) => {
	event.preventDefault();
	const inputContrasena = validarInput(_inputContrasena);
	const inputConfirmarContrasena = validarInput(_inputConfirmarContrasena);
	const longitudContrasena = longitudMinima(_inputContrasena, 8);
	const longitudConfirmarContrasena = longitudMinima(_inputConfirmarContrasena, 8);
	if (
		!inputContrasena || !inputConfirmarContrasena ||
		!longitudContrasena || !longitudConfirmarContrasena
	) {
		return;
	};
	if (
		_inputContrasena.value !== _inputConfirmarContrasena.value
	) {
		mensajeError("Las contraseñas no coinciden");
		invalido(_inputContrasena);
		invalido(_inputConfirmarContrasena);
		return;
	};
	// Se llama a la función y se guarda su respuesta en el objeto data
	getUsuario().then(usuarios => {
		if(usuarios){
			const usuarioId = usuarios.find(usuarios => usuarios.id === usuario.id);
			usuarioId.correoInstitucional = usuario.correoInstitucional;
			usuarioId.contrasena = _inputConfirmarContrasena.value;
			usuarioId.idRolFK = usuario.idRolFK;
			cambiarContrasena(usuarioId.id, usuarioId);
			// console.log(usuarioId);
		}


	});
};
// Agregar evento de escucha al formulario
_form.addEventListener("submit", validarForm);