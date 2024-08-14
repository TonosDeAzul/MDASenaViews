// Importar funciones de peticiones
import AgregarCentro from "../peticiones/crear/crearCentro.js";
import campoVacio from "../validaciones/campos.js";

// Referencias al documento
const _d = document;
let usuario; // Variable para almacenar el usuario actual

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
})

// Referencia a los inputs
const _inputCentro = _d.querySelector("#nombreCentro");

// Referencia al formulario
const _form = _d.querySelector("#formCentro");

// Funcion para validar el formulario antes de enviarlo
const validarForm = (event) => {

  // Prevenir el envio por defecto del formulario
  event.preventDefault();

  // Validar que los campos no esten vacios
  const inputCentro = campoVacio(_inputCentro);

  // Si alguna validacion falla, salir de la funcion
  if (
    !inputCentro
  ) {
    return;
  }
      
  // Un objeto centro
  const centro = {
    nombreCentro: _inputCentro.value
  };
  
  // Agregar centro
  AgregarCentro(centro);
}

// Agregar evento de escucha al formulario para validar el submit
_form.addEventListener("submit", validarForm);