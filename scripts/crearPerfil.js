// Documento
const _d = document;
let usuario;
// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
});
// Inputs
const _inputNombre = _d.getElementById("nombre");
const _inputApellidos = _d.getElementById("apellidos");
const _inputDocumento = _d.getElementById("documento");
const _inputCentro = _d.getElementById("centro");
// Formulario
const _form = _d.getElementById("form");
// Obtener perfil
const getPerfil = () => {
  return fetch(`http://localhost:3000/tb_usuarios`)
    .then(response => response.json())
    .then(data => {
      let idUsuarioFk;
      data.forEach(user => {
        if (user.correoInstitucional === usuario.correoInstitucional) {
          idUsuarioFk = user.id;
        };
      });
      return {
        nombre: _inputNombre.value,
        apellidos: _inputApellidos.value,
        documento: _inputDocumento.value,
        centroFormacion: _inputCentro.value,
        idUsuarioFk: idUsuarioFk
      }
    });
};
// Crear perfil
const crearPerfil = (perfil) => {
  fetch(`http://localhost:3000/tb_perfil`, {
    method: "POST",
    body: JSON.stringify(perfil),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // Guardar datos del usuario en localStorage
      // localStorage.setItem("usuario", JSON.stringify(usuario));
      _form.reset();
      window.location.href = "login.html";
    });
}
// Verificar formulario
const validarForm = (event) => {
  validarInputs(_inputNombre);
  validarInputs(_inputApellidos);
  validarInputs(_inputDocumento);
  validarInputs(_inputCentro);
  event.preventDefault();
  if (validarInputs(_inputNombre) === false ||
    validarInputs(_inputApellidos) === false ||
    validarInputs(_inputDocumento) === false ||
    validarInputs(_inputCentro) === false
  ) { return; }
  getPerfil().then(perfil => {
    crearPerfil(perfil);
  });
};
_form.addEventListener("submit", validarForm);