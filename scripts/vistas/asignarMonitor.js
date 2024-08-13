// import { evitarLetras } from "./validarInputs.js";
import evitarCaracteres from "../validaciones/evitarCaracteres.js";
import traerPerfiles from "../peticiones/listar/traerPerfiles.js";
import traerUsuarios from "../peticiones/listar/traerUsuarios.js";

import { crearAgregar, crearEliminar, titleAgregarMonitor } from "../herramientas/crearElementos/h3.js";
import { crearButton, crearButtonAgregar, crearButtonCancelar, crearButtonConfirmar, crearButtonDos, crearButtonEliminar  } from "../herramientas/crearElementos/button.js";
import { crearDiv, crearDivBtn, crearDivHijo, crearDivInfo, crearDivNormal, crearDivPadre } from "../herramientas/crearElementos/div.js";
import { crearParrafoNombre, crearParrafoDocumento, crearParrafo } from "../herramientas/crearElementos/parrafos.js";
import { crearArticle, crearArticleDos, crearArticleNormal, crearSection } from "../herramientas/crearElementos/contenedores.js"; 
import { crearIcon, crearIconDos, crearInput, crearLabel, crearOkIcon } from "../herramientas/crearElementos/extras.js";
import editarRol from "../peticiones/editar/editarRol.js";

// Documento
const _d = document;
const _body = _d.body;
let userInstructor; // Variable para almacenar el usuario actual
let aprendicesEncontrados = []; // Variable para almacenar los resultados de búsqueda

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  userInstructor = JSON.parse(localStorage.getItem("usuario"));
});

// Elementos para el buscador
const _input = _d.querySelector("#buscador");
const _article = crearArticleNormal();

const _divPadre = crearDivPadre();
_article.appendChild(_divPadre);

// Funcion para actualizar el rol de dicho usuario
const actualizarRol = (idUsuario, data) => {
  fetch(`http://localhost:3000/tb_usuarios/${idUsuario}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
}

// Funcion para eliminar el rol monitor de dicho usuario
const eliminarMonitor = (nombreMonitor, usuario) => {
  const _divHijo = crearDivHijo();
  const _div = crearDivNormal();
  const _icon = crearIconDos();
  const _paragraph = crearParrafo(nombreMonitor)
  const _button = crearButtonEliminar();

  _divPadre.appendChild(_divHijo);
  _divHijo.appendChild(_div);

  _div.appendChild(_icon);
  _div.appendChild(_paragraph);

  _divHijo.appendChild(_button);

  _button.addEventListener("click", () => {
    mostrarConfirmacionQuitar(nombreMonitor, usuario);
  });

  // Apartado del buscador
  const _monitores = _d.querySelectorAll("#monitor");
  _input.addEventListener("input", () => {
    const _valor = _input.value.toLowerCase();
    _monitores.forEach((_element) => {
      const _nombreMonitor = _element.querySelector("div > p").textContent.toLowerCase();
      if (_nombreMonitor.includes(_valor)) {
        _element.classList.remove("hidden");
        _element.classList.add("block");
      }
      else {
        _element.classList.remove("block");
        _element.classList.add("hidden");
      }
    })
  })
};

traerUsuarios().then((usuarios) => {
  usuarios.forEach((usuario) => {
    if (usuario.idRolFK === "3" && usuario.idInstructorAsign === userInstructor.id) {
      traerPerfiles().then((perfiles) => {
        const perfilUsuario = perfiles.find(
          (perfil) => perfil.idUsuarioFk === usuario.id
        );
        console.log(perfilUsuario);
        eliminarMonitor(`${perfilUsuario.nombre} ${perfilUsuario.apellidos}`, perfilUsuario);
      });
    }
  });
});

const _agregar = _d.getElementById("agregar");
const agregarMonitor = () => {
  const _section = crearSection();
  const _article = crearArticleDos();
  const _div = crearDiv();
  const _divSearch = crearDivNormal();
  const _h3 = titleAgregarMonitor();
  const _button = crearButtonDos();
  const _agregarMonitor = crearButtonAgregar();
  const _label = crearLabel();
  const _icon = crearIcon();
  const _input = crearInput();
  const _okIcon = crearOkIcon();

  _body.appendChild(_section);
  _section.appendChild(_article);

  _div.appendChild(_h3);
  _div.appendChild(_button);
  
  _label.appendChild(_icon);
  _label.appendChild(_input);
  _label.appendChild(_okIcon);
  
  _divSearch.appendChild(_label);
  _divSearch.appendChild(_agregarMonitor);

  _article.appendChild(_div);
  _article.appendChild(_divSearch);
  
  evitarCaracteres(_input, "numeros");

  // Agregar evento de búsqueda
  _input.addEventListener("input", buscarAprendiz);

  // Agregar evento de agregar monitor
  _agregarMonitor.addEventListener("click", () => {
    if (aprendicesEncontrados.length > 0) {
      mostrarConfirmacionAgregar(aprendicesEncontrados[0]);
    }
  });

  // Llamar a cerrarModal después de crear el modal
  cerrarModal(_section);
};

_agregar.addEventListener("click", agregarMonitor);

const cerrarModal = (_section) => {
  const _cerrarModal = _d.getElementById("cerrarModal");
  console.log(_cerrarModal);
  _cerrarModal.addEventListener("click", () => {
    _body.removeChild(_section);
  });
};

const buscarAprendiz = (event) => {
  const query = event.target.value.toLowerCase();
  const _okIcon = _d.getElementById("okIcon");
  aprendicesEncontrados = [];
  traerUsuarios().then((usuarios) => {
    traerPerfiles().then((perfiles) => {
      aprendicesEncontrados = perfiles.filter(perfil => {
        const usuario = usuarios.find(user => user.id === perfil.idUsuarioFk && user.idRolFK === "2");
        return usuario !== undefined && perfil.documento.toLowerCase() === query;
      });
      if (aprendicesEncontrados.length > 0) {
        _okIcon.classList.remove("hidden");
      } else {
        _okIcon.classList.add("hidden");
      }
      console.log(aprendicesEncontrados);
    });
  });
};

const mostrarConfirmacionAgregar = (aprendiz) => {
  const _section = crearSection();
  const _article = crearArticle();
  const _div = crearDiv();
  const _divInfo = crearDivInfo();
  const _divBtns = crearDivBtn();
  const _btnCancelar = crearButtonCancelar();
  const _btnConfirmar = crearButtonConfirmar();
  
  _body.appendChild(_section);

  _section.appendChild(_article);
  
  _div.appendChild(crearAgregar());
  _div.appendChild(crearButton());
  
  _divInfo.appendChild(crearParrafoNombre(aprendiz));
  _divInfo.appendChild(crearParrafoDocumento(aprendiz));
  
  _article.appendChild(_div);
  _article.appendChild(_divInfo);
  _article.appendChild(_divBtns);

  _divBtns.appendChild(_btnCancelar);
  _divBtns.appendChild(_btnConfirmar);

  _btnCancelar.addEventListener("click", () => {
    _body.removeChild(_section);
  });

  _btnConfirmar.addEventListener("click", () => {
    traerUsuarios().then(usuarios => {
      usuarios.forEach(usuario => {
        if(aprendiz.idUsuarioFk === usuario.id){
          usuario.idRolFK = "3";
          usuario.idInstructorAsign = userInstructor.id;
          actualizarRol(usuario.id, usuario)
        }
      });
    });
    _body.removeChild(_section);
  });

  _buttonCerrar.addEventListener("click", () => {
    _body.removeChild(_section);
  });
};

const mostrarConfirmacionQuitar = (nombreMonitor, aprendiz) => {
  const _section = crearSection();
  const _article = crearArticle();
  const _div = crearDiv();
  const _divInfo = crearDivInfo();
  const _divBtns = crearDivBtn();
  const _h3 = crearEliminar();
  const _pNombre = crearParrafoNombre(aprendiz);
  const _buttonCerrar = crearButton();
  const _btnCancelar = crearButtonCancelar();
  const _btnConfirmar = crearButtonConfirmar();
  
  _body.appendChild(_section);
  
  _section.appendChild(_article);
  
  _div.appendChild(_h3);
  _div.appendChild(_buttonCerrar);
  
  _divBtns.appendChild(_btnCancelar);
  _divBtns.appendChild(_btnConfirmar);
  
  _divInfo.appendChild(_pNombre);

  _article.appendChild(_div);
  _article.appendChild(_divInfo);
  _article.appendChild(_divBtns);

  _btnCancelar.addEventListener("click", () => {
    _body.removeChild(_section);
  });

  _btnConfirmar.addEventListener("click", () => {
    traerUsuarios().then(usuarios => {
      usuarios.forEach(usuario => {
        if(aprendiz.idUsuarioFk === usuario.id){
          usuario.idRolFK = "2";
          usuario.idInstructorAsign = null;
          actualizarRol(usuario.id, usuario);
        }
      });
    });
    _body.removeChild(_section);
  });

  _buttonCerrar.addEventListener("click", () => {
    _body.removeChild(_section);
  });
};