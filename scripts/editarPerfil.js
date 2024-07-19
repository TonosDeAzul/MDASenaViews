// Documento
const _d = document;

let usuario;

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log(usuario);
});

// Inputs
const _inputNombre = _d.getElementById("nombre");
const _inputApellidos = _d.getElementById("apellidos");
const _inputDocumento = _d.getElementById("documento");
const _inputCentro = _d.getElementById("centro");

// Formulario
const _form = _d.getElementById("form");

// Evitar letras y más de 10 números
_inputDocumento.addEventListener("keypress", (event) => {
  // Permitir Enter
  if (event.charCode === 13) {
    return;
  }
  // Permitir solo números y restringir la longitud
  if (
    event.charCode < 48 ||
    event.charCode > 57 ||
    _inputDocumento.value.length >= 10
  ) {
    event.preventDefault();
  }
});

const evitarNumeros = (input) => {
  input.addEventListener("keypress", (event) => {
    // Permitir Enter (charCode 13)
    if (event.charCode === 13) {
      return;
    }
    // Permitir solo letras y espacio, restringir la longitud
    if (
      input.value.length >= 50 ||
      (event.charCode >= 48 && event.charCode <= 57)
    ) {
      event.preventDefault();
    }
  });
};

evitarNumeros(_inputNombre);
evitarNumeros(_inputApellidos);
evitarNumeros(_inputCentro);

// Validar inputs
const validarInputs = (input) => {
  const regexEspacio = /^(?!\s*$).+/;
  if (input.value === "" || !regexEspacio.test(input.value)) {
    input.closest("label").classList.add("border-red-600", "border-2");
    return false;
  } else {
    input.closest("label").classList.remove("border-red-600", "border-2");
    return true;
  }
};

// Obtener perfil
const getPerfil = () => {
  return fetch(`http://localhost:3000/tb_perfil`)
    .then((response) => response.json())
    .then((data) => {
      let perfilUsuario;
      data.forEach((user) => {
        if (user.idUsuarioFk === usuario.id) {
          perfilUsuario = user;
        }
      });
      return perfilUsuario;
    });
};

// Colocar datos en el form
getPerfil().then((perfil) => {
  _inputNombre.value = perfil.nombre;
  _inputApellidos.value = perfil.apellidos;
  _inputDocumento.value = perfil.documento;
  _inputCentro.value = perfil.centroFormacion;
});

// Actualizar perfil
const actualizarPerfil = (idPerfil, data) => {
  fetch(`http://localhost:3000/tb_perfil/${idPerfil}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

_form.addEventListener("submit", (event) => {
  event.preventDefault();

  validarInputs(_inputNombre);
  validarInputs(_inputApellidos);
  validarInputs(_inputDocumento);
  validarInputs(_inputCentro);
  event.preventDefault();
  if (
    validarInputs(_inputNombre) === false ||
    validarInputs(_inputApellidos) === false ||
    validarInputs(_inputDocumento) === false ||
    validarInputs(_inputCentro) === false
  ) {
    return;
  }

  getPerfil()
    .then((perfil) => {
      if (perfil) {
        perfil.nombre = _inputNombre.value;
        perfil.apellidos = _inputApellidos.value;
        perfil.documento = _inputDocumento.value;
        perfil.centroFormacion = _inputCentro.value;
        actualizarPerfil(perfil.id, perfil);
      } else {
        console.log("Perfil no encontrado");
      }
    })
    .catch((error) => console.error("Error:", error));
});
