// Documento
const _d = document;

// Inputs
const _inputCorreo = _d.getElementById("correo");
const _inputContrasena = _d.getElementById("contrasena");
const _inputConfirmarContrasena = _d.getElementById("confirmarContrasena");

// Validar correo
export const validarCorreo = () => {
  const regexEspacio = /^(?!\s*$).+/;
  const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
  const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;
  if (
    _inputCorreo.value === "" ||
    !regexEspacio.test(_inputCorreo.value) ||
    (!regexAprendiz.test(_inputCorreo.value) &&
      !regexInstructor.test(_inputCorreo.value))
  ) {
    _inputCorreo.closest("label").classList.add("border-red-600", "border-2");
    return false;
  } else {
    _inputCorreo
      .closest("label")
      .classList.remove("border-red-600", "border-2");
    return true;
  }
};

// Validar contraseñas
export const validarContrasenas = () => {
  if (
    _inputContrasena.value !== _inputConfirmarContrasena.value ||
    (_inputContrasena.value === "" ||
    _inputConfirmarContrasena === "")
  ) {
    _inputContrasena
      .closest("label")
      .classList.add("border-red-600", "border-2");
    _inputConfirmarContrasena
      .closest("label")
      .classList.add("border-red-600", "border-2");
    return false;
  } else {
    _inputContrasena
      .closest("label")
      .classList.remove("border-red-600", "border-2");
    _inputConfirmarContrasena
      .closest("label")
      .classList.remove("border-red-600", "border-2");
    return true;
  }
};

export const usuario = {
  correoInstitucional: _inputCorreo.value,
  contrasena: _inputConfirmarContrasena.value
  // idRolFK: fetch(`http://localhost:3000/tb_rol`)
  // .then(response => response.json())
  // .then(data => {
  //   const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
  //   const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;
  //   if(regexAprendiz.test(_inputCorreo.value)){
  //     data.id;
  //   }
  //   if(regexInstructor.test(_inputCorreo.value)){
  //     data.id;
  //   }
  // })
};

export const crearUsuario = (usuario) => {
  fetch(`http://localhost:3000/tb_usuarios`, {
    method: "POST",
    body: JSON.stringify(usuario),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
