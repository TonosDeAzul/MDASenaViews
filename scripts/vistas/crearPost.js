// Importar funciones de peticiones
import crearPost from "../peticiones/crear/crearPost.js";
import traerUsuarios from "../peticiones/listar/traerUsuarios.js";
import campoVacio from "../validaciones/campos.js";

// Referencias al documento
const _d = document;
let usuario; // Variable para almacenar el usuario actual

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
})

// Referencia a los inputs
const _inputTitle = _d.querySelector("#tituloPost");
const _inputMaterial = _d.querySelector("#materialPost");

// Referencia al formulario
const _form = _d.querySelector("#formPost");

// Funcion para validar el formulario antes de enviarlo
const validarForm = (event) => {

  // Prevenir el envio por defecto del formulario
  event.preventDefault();

  // Validar que los campos no esten vacios
  const inputTitle = campoVacio(_inputTitle);
  const inputMaterial = campoVacio(_inputMaterial);

  // Si alguna validacion falla, salir de la funcion
  if (
    !inputTitle ||
    !inputMaterial
  ) {
    return;
  }

  // Agregar .pdf al final de cada carga de post
  let materialValue = _inputMaterial.value.trim();
  if (materialValue && !materialValue.endsWith(".pdf")) {
    materialValue += ".pdf";
    _inputMaterial.value = materialValue;
  }
  
  // Traer usuarios y crear el post si las validaciones son correctas
  traerUsuarios()
  .then((data) => {
    // Variable para el manejo del id del usuario
    let idUsuarioFk;

    // Variable para obtener la fecha de creacion del post
    let _fecha = new Date();
    
    // Recorrer los usuarios y comparar los correos institucionales
    data.forEach((user) => {
      if (user.correoInstitucional === usuario.correoInstitucional) {
        // Se le asigna el id al idUsuarioFk
        idUsuarioFk = user.id;
      }
    })
      
    // Un objeto post para la creacion del post
    const post = {
      tituloPost: _inputTitle.value,
      fechaPost: `${_fecha.getDate()}/${_fecha.getMonth()+1}/${_fecha.getFullYear()}`,
      estado: false,
      validacion: false,
      observacion: null,
      material: _inputMaterial.value,
      idUsuarioFk: idUsuarioFk
    }
  
    // Crear post en la base de datos
    crearPost(post);
  });
}

// Agregar evento de escucha al formulario para validar el submit
_form.addEventListener("submit", validarForm);