// Documento
const _d = document;

// Limpiar localStorage al cargar la página
_d.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
});

// Inputs
const _inputCorreo = _d.getElementById("correo");
const _inputContrasena = _d.getElementById("contrasena");

// Formulario
const _form = _d.getElementById("form");

// Expresiones regulares para validación
const regexEspacio = /^(?!\s*$).+/;
const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;

/**
 * Función para validar el formato del correo electrónico.
 * @returns {boolean} True si el correo es válido, false si no.
 */
const validarCorreo = () => {
  if (
    _inputCorreo.value === "" ||
    !regexEspacio.test(_inputCorreo.value) ||
    (!regexAprendiz.test(_inputCorreo.value) &&
      !regexInstructor.test(_inputCorreo.value))
  ) {
    _inputCorreo.closest("label").classList.add("border-red-600", "border-2");
    return false;
  } else {
    _inputCorreo.closest("label").classList.remove("border-red-600", "border-2");
    return true;
  }
};

/**
 * Función para validar que la contraseña no esté vacía.
 * @returns {boolean} True si la contraseña es válida, false si no.
 */
const validarContrasena = () => {
  if (_inputContrasena.value === "") {
    _inputContrasena.closest("label").classList.add("border-red-600", "border-2");
    return false;
  } else {
    _inputContrasena.closest("label").classList.remove("border-red-600", "border-2");
    return true;
  }
};

/**
 * Función asincrónica para obtener y verificar la existencia del usuario.
 * @returns {boolean} True si el usuario es válido, false si no.
 */
const getUsuario = async () => {
  try {
    const response = await fetch(`http://localhost:3000/tb_usuarios`);
    const data = await response.json();
    // Verificar si hay un usuario con el correo y contraseña proporcionados
    const usuarioEncontrado = data.find(user =>
      user.correoInstitucional === _inputCorreo.value && user.contrasena === _inputContrasena.value
    );
    return usuarioEncontrado !== undefined;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    return false;
  }
};

/**
 * Función para validar el formulario antes de enviarlo.
 * @param {Event} event - Evento del formulario.
 */
const validarForm = async (event) => {
  event.preventDefault();
  // Validar correo y contrasenaValida
  const correoValido = validarCorreo();
  const contrasenaValida = validarContrasena();
  // Esperar a que se completen las validaciones
  if (!correoValido || !contrasenaValida) {
    return;
  }
  try {
    // Obtener y validar el usuario
    const usuarioValido = await getUsuario();
    if (usuarioValido) {
      // Guardar el usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuarioValido));
      // Redirigir según el tipo de usuario
      if (regexAprendiz.test(_inputCorreo.value)) {
        window.location.href = "viewsAprendiz/inicio.html";
      } else if (regexInstructor.test(_inputCorreo.value)) {
        window.location.href = "viewsInstructor/inicio.html";
      } else {
        window.location.href = "viewsMonitor/inicio.html";
      }
    } else {
      // Marcar los labels en rojo si el usuario no es válido
      _inputCorreo.closest("label").classList.add("border-red-600", "border-2");
      _inputContrasena.closest("label").classList.add("border-red-600", "border-2");
    }
  } catch (error) {
    console.error('Error al validar formulario:', error);
  }
};

// Agregar evento de escucha al formulario
_form.addEventListener("submit", validarForm);
