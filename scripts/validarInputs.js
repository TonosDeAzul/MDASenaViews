// Document
const _d = document;
const _body = _d.getElementById("body");
const _form = _d.getElementById("form");
const _label = _d.querySelectorAll(".grid label");
// Cambiar color inputs
export function invalido(input) {
  input.closest("label").classList.add("border-red-600", "border-2");
};
export function valido(input) {
  input.closest("label").classList.remove("border-red-600", "border-2");
}
// Función para evitar campos vacíos
export const validarInput = (input) => {
  const regexEspacio = /^(?!\s*$).+/;
  if (input.value === "" || !regexEspacio.test(input.value)) {
    invalido(input);
    mensajeError("Datos inválidos, verifique los campos");
    return false;
  } else {
    valido(input);
    return true;
  }
};
// Función para mostrar mensaje
let mensajeMostrado = false; // Variable global para controlar la impresión
export const mensajeError = (mensaje) => {
  let _span;
  if (_span) {
    _span.remove();
    _span = null;
  } else if (!mensajeMostrado) {
    _span = _d.createElement("span");
    _span.textContent = mensaje;
    _span.classList.add("w-96", "absolute", "left-0", "right-0", "m-auto", "text-white", "text-center", "p-5", "rounded-lg", "bg-red-600", "z-10");
    _body.appendChild(_span);
    mensajeMostrado = true;
    // Eliminar el mensaje después de 2 segundos
    setTimeout(() => {
      if (_span) {
        _span.remove();
        _span = null;
        mensajeMostrado = false; // Restablecer la variable para futuras llamadas
      }
    }, 3000);
  }
};
// Función para validar extensión de correos
export const validarExtensionCorreo = (input) => {
  const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
  const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;
  if (!regexInstructor.test(input.value) && !regexAprendiz.test(input.value)) {
    invalido(input);
    mensajeError("Extensión del correo no permitida");
    return false;
  } else {
    valido(input);
    return true;
  };
};
// Función para evitar que se escriban letras
export const evitarLetras = (input) => {
  // Variable para almacenar la referencia al elemento de error
  // let _span;
  input.addEventListener("keypress", (event) => {
    const regexLetras = /^[0-9$]/;
    // Si ya existe el mensaje de error, lo elimina
    // if (_span) {
    //   _span.remove();
    //   _span = null;
    // }
    if (!regexLetras.test(event.key)) {
      event.preventDefault();
      // Crear y mostrar el mensaje de error
      // _span = _d.createElement("span");
      // _span.textContent = "Solo se permiten números";
      // _span.classList.add("text-red-600", "text-end", "mt-1");
      // _form.insertBefore(_span, _label.nextSibling);
    };
  });
  // input.addEventListener("blur", () => {
  //   // Eliminar el mensaje de error cuando se pierde el foco
  //   if (_span) {
  //     _span.remove();
  //     _span = null;
  //   }
  // });
};
// Función para evitar que se escriban números
export const evitarNumeros = (input) => {
  // Variable para almacenar la referencia al elemento de error
  // let _span;
  input.addEventListener("keypress", (event) => {
    const regexLetras = /^[a-zA-ZàáâãéêíóôõúüñÑ $]/;
    // Si ya existe el mensaje de error, lo elimina
    // if (_span) {
    //   _span.remove();
    //   _span = null;
    // }
    if (!regexLetras.test(event.key)) {
      event.preventDefault();
      // Crear y mostrar el mensaje de error
      // _span = _d.createElement("span");
      // _span.textContent = "Solo se permiten letras";
      // _span.classList.add("text-red-600");
      // _form.insertBefore(_span, _label.nextSibling);
    };
  });
  // input.addEventListener("blur", () => {
  //   // Eliminar el mensaje de error cuando se pierde el foco
  //   if (_span) {
  //     _span.remove();
  //     _span = null;
  //   }
  // });
};
// Función para verificar la longitud
export const verificarLongitud = (input, minimo, maximo) => {
  input.addEventListener("keypress", (event) => {
    if(input.value.length >= maximo){
      event.preventDefault();
    }
  });
  if (input.value.length < minimo) {
    valido(input);
    invalido(input);
    return false;
  } else {
    valido(input);
    invalido(input);
    return true;
  }
}