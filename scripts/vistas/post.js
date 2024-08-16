// Documento
const _d = document;

let usuario;

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  // console.log(usuario);
});

// Atrapar el input del buscador
const _input = _d.querySelector("#buscador");
const _inputDos = _d.querySelector("#buscador2");


// Contenedor de los posts
const _postContainer = _d.getElementById("postContainer");

// Obtener posts
const getPosts = () => {
  return fetch(`http://localhost:3000/tb_post`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

// Obtener perfiles
const getPerfiles = () => {
  return fetch(`http://localhost:3000/tb_perfil`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

const getDocumentos = () => {
  return fetch(`http://localhost:3000/tb_documento`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}

// Imprimir posts
Promise.all([getPosts(), getPerfiles()])
  .then(([posts, perfiles]) => {
    posts.forEach(post => {
      // Contenedor informarció artículo
      const _article = _d.createElement("article");
      _article.classList.add(
        "bg-white",
        "w-full",
        "max-w-2xl",
        "h-40",
        "shadow-md",
        "rounded-lg",
        "p-5",
        "flex",
        "flex-col",
        "justify-between"
      );
      _article.setAttribute("id", "articulos");

      // Nombre aprendiz
      const _p = _d.createElement("p");
      _p.classList.add(
        "text-mdaBlack", 
        "text-sm", 
        "font-bold"
      );

      // Buscar el perfil del usuario del post
      const perfil = perfiles.find(p => p.idUsuarioFk === post.idUsuarioFk);
      // console.log(perfiles);
      if (perfil) {
        _p.textContent = `${perfil.nombre} ${perfil.apellidos}`;
      }

      // Contenedor título y documento
      const _div = _d.createElement("div");
      _div.classList.add("text-mdaGreen");

      // Título
      const _h2 = _d.createElement("h2");
      _h2.classList.add(
        "text-4xl", 
        "mb-2", 
        "truncate",
        "font-bold"
      );
      _h2.title = post.tituloPost;
      _h2.textContent = post.tituloPost;

      // Documento
      const _a = _d.createElement("a");
      _a.href = "#";
      _a.textContent = post.material;
      _a.classList.add("text-base", "hover:underline");
      const _i = _d.createElement("i");
      _i.classList.add("fa-solid", "fa-arrow-down");

      if (post.estado === true) {
        // Agregar al HTML
        _postContainer.appendChild(_article);
        _article.appendChild(_p);
        _article.appendChild(_div);
        _div.appendChild(_h2);
        _div.appendChild(_a);
        _a.appendChild(_i); 
      }
    });

    // Capturar cantidad de articulsos
    const _articulos = _d.querySelectorAll("#articulos");

    // Evento para el buscador
    _input.addEventListener("input", () => {
      const _valor = _input.value.toLowerCase();
      _articulos.forEach((_post) => {
          const _titlePost = _post.textContent.toLowerCase();
          if (_titlePost.includes(_valor)) {
            _post.classList.remove("hidden");
            _post.classList.add("block");
          }
          else {
            _post.classList.remove("block");
            _post.classList.add("hidden");
          }
        }
      )
    })

    _inputDos.addEventListener("input", () => {
      const _valor = _inputDos.value.toLowerCase();
      _articulos.forEach((_post) => {
          const _titlePost = _post.textContent.toLowerCase();
          if (_titlePost.includes(_valor)) {
            _post.classList.remove("hidden");
            _post.classList.add("block");
          }
          else {
            _post.classList.remove("block");
            _post.classList.add("hidden");
          }
        }
      )
    })
  });


