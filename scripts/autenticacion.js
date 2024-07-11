// Documento
const _d = document;

let usuario; // Variable para almacenar el usuario actual

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
});

// Input de código
const _inputCodigo = _d.getElementById("codigo");

// Formulario
const _form = _d.getElementById("form");

// Evitar letras y más de 6 números, permitir espacio
_inputCodigo.addEventListener("keypress", (event) => {
  // Permitir Enter
  if (event.charCode === 13) {
    return;
  }
  // Permitir solo números y restringir la longitud
  if (
    event.charCode < 48 || 
    event.charCode > 57 || 
    _inputCodigo.value.length >= 6
  ) {
    event.preventDefault();
  }
});

// Función para generar un código aleatorio de 6 dígitos
const generarCodigo = () => {
  const numero = Math.floor(100000 + Math.random() * 900000);
  return numero.toString(); 
};

// Almacenar el código generado cuando se carga la página
const codigoGenerado = generarCodigo();
console.log(codigoGenerado);

// Validar código ingresado por el usuario
const validarCodigo = () => {
  const regexEspacio = /^(?!\s*$).+/;
  if (_inputCodigo.value === "" || !regexEspacio.test(_inputCodigo.value) || codigoGenerado !== getCodigo()) {
    _inputCodigo.closest("label").classList.add("border-red-600", "border-2");
    return false;
  } else {
    _inputCodigo.closest("label").classList.remove("border-red-600", "border-2");
    return true;
  }
};

// Obtener el código ingresado por el usuario
const getCodigo = () => {
  return _inputCodigo.value;
};

// Función para cambiar a la vista de creación de perfil si el código es válido
const autenticarCodigo = () => {
  _form.reset(); // Reiniciar el formulario
  localStorage.setItem("usuario", JSON.stringify(usuario)); // Almacenar el usuario en localStorage
  window.location.href = "crearPerfil.html"; // Redireccionar a la página de creación de perfil
};

// Validar el formulario antes de enviarlo
const validarForm = (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe automáticamente

  // Validar el código ingresado por el usuario
  if(validarCodigo() === false){
    return; // Si el código no es válido, detener el proceso
  }
  
  // Si el código es válido, autenticar y cambiar a la vista de creación de perfil
  autenticarCodigo();
};

// Agregar evento de escucha al formulario para validar el código
_form.addEventListener("submit", validarForm);
