// Importar funciones de herramientas
import agregarMonitor from "../herramientas/agregarMonitor.js";


// Documento
const _d = document;
const _body = _d.body;
let usuario; // Variable para almacenar el usuario actual
let aprendicesEncontrados = []; // Variable para almacenar los resultados de búsqueda

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
});

const _article = _d.getElementById("article");

// Función para traer aprendices
const getAprendiz = () => {
  return fetch("http://localhost:3000/tb_usuarios")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

// Función para traer perfiles
const getPerfil = () => {
  return fetch("http://localhost:3000/tb_perfil")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

const _divPadre = _d.createElement("div");
_divPadre.classList.add("w-full", "bg-mdaWhite", "rounded-lg");
_article.appendChild(_divPadre);

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

// const eliminarMonitor = (nombreMonitor, usuario) => {
//   const _divHijo = _d.createElement("div");
//   _divHijo.classList.add("flex", "justify-between", "items-center", "p-1");
//   _divPadre.appendChild(_divHijo);
//   const _div = _d.createElement("div");
//   _div.classList.add("text-mdaBlack");
//   _divHijo.appendChild(_div);
//   const _icon = _d.createElement("i");
//   _icon.classList.add("fa-solid", "fa-user-minus", "mx-2.5");
//   const _paragraph = _d.createElement("p");
//   _paragraph.classList.add("inline-block");
//   _paragraph.textContent = nombreMonitor;
//   _div.appendChild(_icon);
//   _div.appendChild(_paragraph);
//   const _button = _d.createElement("button");
//   _button.classList.add(
//     "btn",
//     "bg-mdaRed",
//     "border-none",
//     "text-white",
//     "hover:bg-mdaRed"
//   );
//   _button.textContent = "Quitar monitor";
//   _divHijo.appendChild(_button);

//   _button.addEventListener("click", () => {
//     // usuario.idRolFK = "2";
//     // actualizarRol(usuario.id, usuario);
//     mostrarConfirmacionQuitar(nombreMonitor, usuario);
//     // _divPadre.removeChild(_divHijo);
//   });
// };

getAprendiz().then((usuarios) => {
  usuarios.forEach((usuario) => {
    if (usuario.idRolFK === "3") {
      getPerfil().then((perfiles) => {
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
_agregar.addEventListener("click", agregarMonitor);

const mostrarConfirmacionAgregar = (aprendiz) => {
  const _section = _d.createElement("section");
  _section.classList.add(
    "fixed",
    "m-auto",
    "flex",
    "w-full",
    "min-h-screen",
    "justify-center",
    "p-5",
    "gap-5",
    "flex-wrap",
    "content-center",
    "bg-mdaBlack_400",
    "z-10"
  );
  _body.appendChild(_section);

  const _article = _d.createElement("article");
  _article.classList.add(
    "bg-white",
    "w-full",
    "max-w-md",
    "shadow-md",
    "rounded-lg",
    "p-5",
    "flex",
    "flex-col",
    "justify-between",
    "gap-5"
  );
  _section.appendChild(_article);

  const _div = _d.createElement("div");
  _div.classList.add("flex", "w-full", "justify-between");
  _article.appendChild(_div);

  const _h3 = _d.createElement("h3");
  _h3.classList.add("text-mdaBlack", "text-xl");
  _h3.textContent = "Confirmar agregar monitor";
  _div.appendChild(_h3);

  const _buttonCerrar = _d.createElement("button");
  _buttonCerrar.classList.add("btn", "btn-sm", "btn-circle", "btn-ghost", "text-mdaBlack");
  _buttonCerrar.textContent = "✕";
  _buttonCerrar.setAttribute("id", "cerrarConfirmacion");
  _div.appendChild(_buttonCerrar);

  const _divInfo = _d.createElement("div");
  _divInfo.classList.add("flex", "flex-col", "gap-2");
  _article.appendChild(_divInfo);

  const _pNombre = _d.createElement("p");
  _pNombre.textContent = `Nombre: ${aprendiz.nombre} ${aprendiz.apellidos}`;
  _divInfo.appendChild(_pNombre);

  const _pDocumento = _d.createElement("p");
  _pDocumento.textContent = `Documento: ${aprendiz.documento}`;
  _divInfo.appendChild(_pDocumento);

  const _divBtns = _d.createElement("div");
  _divBtns.classList.add("flex", "justify-end", "gap-2");
  _article.appendChild(_divBtns);

  const _btnCancelar = _d.createElement("button");
  _btnCancelar.classList.add("btn", "bg-mdaRed", "border-none", "text-white", "hover:bg-mdaRed");
  _btnCancelar.textContent = "Cancelar";
  _divBtns.appendChild(_btnCancelar);

  const _btnConfirmar = _d.createElement("button");
  _btnConfirmar.classList.add("btn", "bg-mdaGreen", "border-none", "text-white", "hover:bg-mdaGreen");
  _btnConfirmar.textContent = "Confirmar";
  _divBtns.appendChild(_btnConfirmar);

  _btnCancelar.addEventListener("click", () => {
    _body.removeChild(_section);
  });

  _btnConfirmar.addEventListener("click", () => {
    // agregarMonitorAlArticulo(aprendiz);
    getAprendiz().then(usuarios => {
      usuarios.forEach(usuario => {
        if(aprendiz.idUsuarioFk === usuario.id){
          // console.log(usuario.idRolFK);
          usuario.idRolFK = "3";
          actualizarRol(usuario.id, usuario)
        }
      });
    });
    // console.log(aprendiz);
    _body.removeChild(_section);
  });

  _buttonCerrar.addEventListener("click", () => {
    _body.removeChild(_section);
  });
};

const mostrarConfirmacionQuitar = (nombreMonitor, aprendiz) => {
  const _section = _d.createElement("section");
  _section.classList.add(
    "fixed",
    "m-auto",
    "flex",
    "w-full",
    "min-h-screen",
    "justify-center",
    "p-5",
    "gap-5",
    "flex-wrap",
    "content-center",
    "bg-mdaBlack_400",
    "z-10"
  );
  _body.appendChild(_section);

  const _article = _d.createElement("article");
  _article.classList.add(
    "bg-white",
    "w-full",
    "max-w-md",
    "shadow-md",
    "rounded-lg",
    "p-5",
    "flex",
    "flex-col",
    "justify-between",
    "gap-5"
  );
  _section.appendChild(_article);

  const _div = _d.createElement("div");
  _div.classList.add("flex", "w-full", "justify-between");
  _article.appendChild(_div);

  const _h3 = _d.createElement("h3");
  _h3.classList.add("text-mdaBlack", "text-xl");
  _h3.textContent = "Confirmar quitar monitor";
  _div.appendChild(_h3);

  const _buttonCerrar = _d.createElement("button");
  _buttonCerrar.classList.add("btn", "btn-sm", "btn-circle", "btn-ghost", "text-mdaBlack");
  _buttonCerrar.textContent = "✕";
  _buttonCerrar.setAttribute("id", "cerrarConfirmacion");
  _div.appendChild(_buttonCerrar);

  const _divInfo = _d.createElement("div");
  _divInfo.classList.add("flex", "flex-col", "gap-2");
  _article.appendChild(_divInfo);

  const _pNombre = _d.createElement("p");
  _pNombre.textContent = `Nombre: ${nombreMonitor}`;
  _divInfo.appendChild(_pNombre);

  const _divBtns = _d.createElement("div");
  _divBtns.classList.add("flex", "justify-end", "gap-2");
  _article.appendChild(_divBtns);

  const _btnCancelar = _d.createElement("button");
  _btnCancelar.classList.add("btn", "bg-mdaRed", "border-none", "text-white", "hover:bg-mdaRed");
  _btnCancelar.textContent = "Cancelar";
  _divBtns.appendChild(_btnCancelar);

  const _btnConfirmar = _d.createElement("button");
  _btnConfirmar.classList.add("btn", "bg-mdaGreen", "border-none", "text-white", "hover:bg-mdaGreen");
  _btnConfirmar.textContent = "Confirmar";
  _divBtns.appendChild(_btnConfirmar);

  _btnCancelar.addEventListener("click", () => {
    _body.removeChild(_section);
  });

  _btnConfirmar.addEventListener("click", () => {
    getAprendiz().then(usuarios => {
      usuarios.forEach(usuario => {
        if(aprendiz.idUsuarioFk === usuario.id){
          // console.log(usuario.idRolFK);
          usuario.idRolFK = "2";
          actualizarRol(usuario.id, usuario)
        }
      });
    });
    // console.log(aprendiz);
    _body.removeChild(_section);
    // _body.removeChild(_section);
  });

  _buttonCerrar.addEventListener("click", () => {
    _body.removeChild(_section);
  });
};