// Importar funciones de peticiones
import traerUsuarios from "../peticiones/listar/traerUsuarios.js";
import traerRoles from "../peticiones/listar/traerRoles.js";
import crearUsuario from "../peticiones/crear/crearUsuario.js";

// Importar funciones de validaciones
import camposVacios from "../validaciones/campos.js";
import longitudMaxima from "../validaciones/longitudMaxima.js";
import longitudMinima from "../validaciones/longitudMinima.js";
import extensionCorreo from "../validaciones/extensionCorreo.js";
import mensajeError from "../validaciones/complementos/mensajeError.js";
import invalido from "../validaciones/complementos/invalido.js";
import valido from "../validaciones/complementos/valido.js";
import modalAfirmar from "../herramientas/modalAfirmacion.js";

// Referencia al documento
const _d = document;
// Referencias a los inputs
const _inputCorreo = _d.getElementById("correo");
const _inputContrasena = _d.getElementById("contrasena");
const _inputConfirmarContrasena = _d.getElementById("confirmarContrasena");
// Referencia al formulario
const _form = _d.getElementById("form");

// Validar longitud máxima de los campos
longitudMaxima(_inputCorreo, 50);
longitudMaxima(_inputContrasena, 100);
longitudMaxima(_inputConfirmarContrasena, 100);

// Función para validar formulario
const validarForm = (event) => {
  event.preventDefault(); // Prevenir el envío por defecto del formulario

  // Validar que los campos no estén vacíos
  const inputCorreo = camposVacios(_inputCorreo);
  const inputContrasena = camposVacios(_inputContrasena);
  const inputConfirmarContrasena = camposVacios(_inputConfirmarContrasena);

  // Validar longitud mínima de los campos
  const longitudCorreo = longitudMinima(_inputCorreo, 10);
  const longitudContrasena = longitudMinima(_inputContrasena, 8);
  const longitudConfirmarContrasena = longitudMinima(
    _inputConfirmarContrasena,
    8
  );

  // Si alguna validación falla, salir de la función
  if (
    !inputCorreo ||
    !inputContrasena ||
    !inputConfirmarContrasena ||
    !longitudCorreo ||
    !longitudContrasena ||
    !longitudConfirmarContrasena
  ) {
    return;
  }

  // Validar la extensión del correo
  const validarCorreo = extensionCorreo(_inputCorreo);
  if (!validarCorreo) {
    return;
  }

  // Traer usuarios y verificar si el correo ya está registrado
  traerUsuarios().then((data) => {
    const correoExistente = data.find(
      (usuario) => usuario.correoInstitucional === _inputCorreo.value
    );

    if (correoExistente) {
      // Si el correo ya está registrado, mostrar mensaje de error
      mensajeError("Correo ya registrado");
      invalido(_inputCorreo);
    } else if (_inputContrasena.value !== _inputConfirmarContrasena.value) {
      // Si las contraseñas no coinciden, mostrar mensaje de error
      mensajeError("Las contraseñas no coinciden");
      invalido(_inputContrasena);
      invalido(_inputConfirmarContrasena);
    } else {
      // Traer roles y asignar el rol correspondiente al tipo de correo
      traerRoles().then((data) => {
        const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
        const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;
        let idRolFk;

        // Buscar el rol correspondiente al tipo de correo
        data.forEach((rol) => {
          if (
            regexAprendiz.test(_inputCorreo.value) &&
            rol.nombreRol === "Aprendiz"
          ) {
            idRolFk = rol.id;
          } else if (
            regexInstructor.test(_inputCorreo.value) &&
            rol.nombreRol === "Instructor"
          ) {
            idRolFk = rol.id;
          }
        });

        // Crear objeto usuario con los datos ingresados
        const usuario = {
          correoInstitucional: _inputCorreo.value,
          contrasena: _inputConfirmarContrasena.value,
          idInstructorAsign: null,
          idRolFK: idRolFk,
        };

        // Guardar usuario en localStorage y resetear formulario
        localStorage.setItem("usuario", JSON.stringify(usuario));
        _form.reset();
        // Crear usuario en la base de datos
        setTimeout(() => {
          crearUsuario(usuario);
          // Redireccionar a la página de autenticación
          window.location.href = "autenticacion.html";
        }, 1000)
        modalAfirmar("Se a registrado un nuevo usuario", "Registro exitoso");
      });
    }
  });
};

// Agregar evento de escucha al formulario para validar el formulario en el submit
_form.addEventListener("submit", validarForm);
