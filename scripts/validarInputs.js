// Document
const _d = document;
const _body = _d.getElementById("body");
const _form = _d.getElementById("form");
const _label = _d.querySelectorAll(".grid label");
// Cambiar color inputs
export function invalido(input) {
  input.closest("label").classList.add("border-red-600", "border-2");
}
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
    _span.classList.add(
      "w-96",
      "absolute",
      "left-0",
      "right-0",
      "m-auto",
      "text-white",
      "text-center",
      "p-5",
      "rounded-lg",
      "bg-red-600",
      "z-10"
    );
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
  }
};
// Función para evitar que se escriban letras
export const evitarLetras = (input, maximo) => {
  // Variable para almacenar la referencia al elemento de error
  let _span;
  input.addEventListener("keypress", (event) => {
    const regexNumeros = /^[0-9$]/;
    // Si ya existe el mensaje de error, lo elimina
    if (_span) {
      _span.remove();
      _span = null;
    }
    if (!regexNumeros.test(event.key)) {
      event.preventDefault();
      // Crear y mostrar el mensaje de error
      _span = _d.createElement("span");
      _span.textContent = "Solo se permiten números";
      _span.classList.add("text-red-600", "text-end");
      input.closest("label").insertAdjacentElement("afterend", _span);
    }
  });
  input.addEventListener("blur", () => {
    // Eliminar el mensaje de error cuando se pierde el foco
    if (_span) {
      _span.remove();
      _span = null;
    }
  });
};
// Función para evitar que se escriban números
export const evitarNumeros = (input) => {
  // Variable para almacenar la referencia al elemento de error
  let _span;
  input.addEventListener("keypress", (event) => {
    const regexLetras = /^[a-zA-ZàáâãéêíóôõúüñÑ $]/;
    // Si ya existe el mensaje de error, lo elimina
    if (_span) {
      _span.remove();
      _span = null;
    }
    if (!regexLetras.test(event.key)) {
      event.preventDefault();
      // Crear y mostrar el mensaje de error
      _span = _d.createElement("span");
      _span.textContent = "Solo se permiten letras";
      _span.classList.add("text-red-600", "text-end");
      input.closest("label").insertAdjacentElement("afterend", _span);
    }
  });
  input.addEventListener("blur", () => {
    // Eliminar el mensaje de error cuando se pierde el foco
    if (_span) {
      _span.remove();
      _span = null;
    }
  });
};
// Función para validar la longitud máxima
export const longitudMaxima = (input, maximo) => {
  input.addEventListener("keypress", (event) => {
    if (input.value.length >= maximo) {
      event.preventDefault();
    };
  });
};
// Función para verificar la longitud
export const longitudMinima = (input, minimo) => {
  // Encuentra el <label> más cercano al input
  // Intenta encontrar un <span> con la clase 'text-red-600' dentro del <label>
  // Si no existe, intenta encontrar el siguiente hermano adyacente al <label>
  let _span = input.closest("label").nextElementSibling;
  if (input.value.length < minimo) {
    invalido(input);
    // Si el <span> de error no existe o no es un <span>, créalo
    if (!_span || _span.tagName !== "SPAN") {
      _span = document.createElement("span");
      _span.textContent = "Cantidad de carácteres inválida";
      _span.classList.add("text-red-600", "text-end");
      input.closest("label").insertAdjacentElement("afterend", _span);
    }
    return false;
  } else {
    valido(input);
    // Si el <span> de error existe y es un <span>, elimínalo
    if (_span && _span.tagName === "SPAN") {
      _span.remove();
    }
    return true;
  }
};
// Modal para confirma la actualización de los datos
export const modalActualizar = () => {
  return new Promise((resolve, reject) => { // Use Promise for asynchronous confirmation
    const _section = document.createElement("section");
    _section.classList.add(
      "flex",
      "bg-[#1D1D1D60]",
      "fixed",
      "min-h-screen",
      "w-full",
      "justify-center",
      "items-center"
    );
    document.body.appendChild(_section);

    const _modal = document.createElement("div");
    _modal.classList.add(
      "bg-white",
      "w-96",
      "rounded-lg",
      "p-5",
      "text-center",
      "flex",
      "gap-5",
      "flex-col",
      "items-center"
    );
    _modal.textContent = "¿Seguro que desea actualizar los datos?";
    _section.appendChild(_modal);

    const _br = document.createElement("br");
    _modal.appendChild(_br);

    const _buttonContainer = document.createElement("div");
    _modal.appendChild(_buttonContainer);

    const _buttonUpdate = document.createElement("button");
    _buttonUpdate.classList.add(
      "btn",
      "w-14",
      "bg-mdaGreen",
      "text-white",
      "hover:bg-mdaGreen",
      "border-none"
    );
    _buttonUpdate.textContent = "Sí";
    _buttonContainer.appendChild(_buttonUpdate);

    _buttonUpdate.addEventListener("click", () => {
      resolve(true); // Resolve promise with true on confirmation
      document.body.removeChild(_section);
    });

    const _buttonDeclive = document.createElement("button");
    _buttonDeclive.classList.add(
      "btn",
      "w-14",
      "bg-mdaRed",
      "text-white",
      "hover:bg-mdaRed",
      "border-none",
      "ml-2"
    );
    _buttonDeclive.textContent = "No";
    _buttonContainer.appendChild(_buttonDeclive);

    _buttonDeclive.addEventListener("click", () => {
      resolve(false); // Resolve promise with false on decline
      document.body.removeChild(_section);
    });
  });
};
