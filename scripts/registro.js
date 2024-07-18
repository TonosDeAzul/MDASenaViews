import { validarInput, valido, invalido, mensajeError, validarExtensionCorreo } from "./validarInputs.js";
// Documento
const _d = document;
// Inputs
const _inputCorreo = _d.getElementById("correo");
const _inputContrasena = _d.getElementById("contrasena");
const _inputConfirmarContrasena = _d.getElementById("confirmarContrasena");
// Formulario
const _form = _d.getElementById("form");
// Función para obtener los roles almancenados
const getRol = () => {
  return fetch(`http://localhost:3000/tb_rol`)
    .then(response => response.json())
    .then(data => {
      const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
      const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;
      let idRolFk;
      // Buscar el rol correspondiente al tipo de correo
      data.forEach(rol => {
        if (regexAprendiz.test(_inputCorreo.value) && rol.nombreRol === "Aprendiz") {
          idRolFk = rol.id;
        } else if (regexInstructor.test(_inputCorreo.value) && rol.nombreRol === "Instructor") {
          idRolFk = rol.id;
        }
      });
      return {
        correoInstitucional: _inputCorreo.value,
        contrasena: _inputConfirmarContrasena.value,
        idRolFK: idRolFk
      };
    });
};
// Función para crear usuario
const crearUsuario = (usuario) => {
  fetch(`http://localhost:3000/tb_usuarios`, {
    method: "POST",
    body: JSON.stringify(usuario),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      _form.reset();
      window.location.href = "autenticacion.html";
    })
    .catch(error => {
      console.error('Error al crear usuario:', error);
    });
};
// Función para traer usuario
const getUsuario = () => {
  return fetch(`http://localhost:3000/tb_usuarios`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};
// Función para validar formulario
const validarForm = (event) => {
  event.preventDefault();
  // Valida que los campos no estén vacíos
  const inputCorreo = validarInput(_inputCorreo);
  const inputContrasena = validarInput(_inputContrasena);
  const inputConfirmarContrasena = validarInput(_inputConfirmarContrasena);
  const validarCorreo = validarExtensionCorreo(_inputCorreo);
  if(!inputCorreo || !inputContrasena || !inputConfirmarContrasena || !validarCorreo){
    return;
  }
  // Se llama a la función y se guarda su respuesta en el objeto data
  getUsuario().then(data => {
    // Se busca dentro del objeto usuario si ya existe un correo registrado
    const correoExistente = data.find(usuario => usuario.correoInstitucional === _inputCorreo.value);
    // Si se encuentra un usuario con el que coincidan los datos
    // Se rediccionará a otra vista
    if (correoExistente) { 
      mensajeError("Correo ya registrado");
      invalido(_inputCorreo);
    } else if (_inputContrasena.value !== _inputConfirmarContrasena.value) {
      mensajeError("Las contraseñas no coinciden");
      invalido(_inputContrasena);
      invalido(_inputConfirmarContrasena);
    } else {
      getRol().then(data => {
        crearUsuario(data);
      });
    }
  });
};
// Agregar evento de escucha al formulario
_form.addEventListener("submit", validarForm);