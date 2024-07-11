// Documento
const _d = document;

// Inputs
const _inputCorreo = _d.getElementById("correo");
const _inputContrasena = _d.getElementById("contrasena");
const _inputConfirmarContrasena = _d.getElementById("confirmarContrasena");

// Formulario
const _form = _d.getElementById("form");

/**
 * Función asincrónica para validar el formato y la existencia del correo.
 * @returns {boolean} True si el correo es válido y no está registrado, false de lo contrario.
 */
const validarCorreo = async () => {
  const regexEspacio = /^(?!\s*$).+/;
  const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
  const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;

  // Validar formato y presencia de correo
  if (
    _inputCorreo.value === "" ||
    !regexEspacio.test(_inputCorreo.value) ||
    (!regexAprendiz.test(_inputCorreo.value) && !regexInstructor.test(_inputCorreo.value))
  ) {
    _inputCorreo.closest("label").classList.add("border-red-600", "border-2");
    return false;
  }

  // Verificar si el correo ya está registrado
  const correoExistente = await verificarCorreoExistente(_inputCorreo.value);
  if (correoExistente) {
    _inputCorreo.closest("label").classList.add("border-red-600", "border-2");
    return false;
  }

  _inputCorreo.closest("label").classList.remove("border-red-600", "border-2");
  return true;
};

/**
 * Función para validar que las contraseñas coincidan.
 * @returns {boolean} True si las contraseñas coinciden, false de lo contrario.
 */
const validarContrasenas = () => {
  if (
    _inputContrasena.value !== _inputConfirmarContrasena.value ||
    (_inputContrasena.value === "" || _inputConfirmarContrasena.value === "")
  ) {
    _inputContrasena.closest("label").classList.add("border-red-600", "border-2");
    _inputConfirmarContrasena.closest("label").classList.add("border-red-600", "border-2");
    return false;
  }

  _inputContrasena.closest("label").classList.remove("border-red-600", "border-2");
  _inputConfirmarContrasena.closest("label").classList.remove("border-red-600", "border-2");
  return true;
};

/**
 * Función para obtener los datos del usuario.
 * @returns {Promise<Object>} Objeto con los datos del usuario.
 */
const getUsuario = () => {
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

/**
 * Función asincrónica para verificar si el correo electrónico ya está registrado.
 * @param {string} correo - Correo electrónico a verificar.
 * @returns {Promise<boolean>} True si el correo ya está registrado, false si no.
 */
const verificarCorreoExistente = async (correo) => {
  try {
    const response = await fetch(`http://localhost:3000/tb_usuarios?correoInstitucional=${encodeURIComponent(correo)}`);
    const data = await response.json();
    return data.length > 0; // Devuelve true si hay algún usuario con ese correo
  } catch (error) {
    console.error('Error al verificar correo electrónico existente:', error);
    return false; // En caso de error, devuelve false por precaución
  }
};

/**
 * Función para crear un nuevo usuario.
 * @param {Object} usuario - Objeto con los datos del usuario a crear.
 */
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
      // Guardar datos del usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));
      _form.reset();
      window.location.href = "autenticacion.html";
    })
    .catch(error => {
      console.error('Error al crear usuario:', error);
      // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
    });
};

/**
 * Función asincrónica para validar el formulario antes de enviarlo.
 * @param {Event} event - Evento del formulario.
 */
const validarForm = async (event) => {
  event.preventDefault();

  // Validar correo y contraseñas
  const correoValido = await validarCorreo();
  const contrasenaValida = validarContrasenas();

  if (!correoValido || !contrasenaValida) {
    return;
  }

  // Obtener datos del usuario y crearlo si el correo no está registrado
  getUsuario().then(usuario => {
    verificarCorreoExistente(usuario.correoInstitucional).then(existe => {
      if (!existe) {
        crearUsuario(usuario);
      } else {
        console.error('El correo electrónico ya está registrado.');
        // Mostrar mensaje de error al usuario
      }
    });
  });
};

// Agregar evento de escucha al formulario
_form.addEventListener("submit", validarForm);