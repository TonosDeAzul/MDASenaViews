// Importar funciones de peticiones
import posts from "../../peticiones/listar/traerPosts.js";
import traerPerfiles from "../../peticiones/listar/traerPerfiles.js";
import traerUsuarios from "../../peticiones/listar/traerUsuarios.js";

  export default function postPendientes() {
  const _tbody = document.getElementById("pendientes");

  Promise.all([posts(), traerPerfiles(), traerUsuarios()]).then(
    ([postsData, perfilesData, usuariosData]) => {
      postsData.forEach((element) => {
        
        // Encontrar el usuario propietario del post
        const usuario = usuariosData.find(
          (user) => user.id === element.idUsuarioFk
        );

        // Encontrar el perfil del usuario
        const perfil = perfilesData.find(
          (perfil) => perfil.idUsuarioFk === element.idUsuarioFk
        );

        // Encontrar el instructor asignado
        const idInstructorAsign = usuario.idInstructorAsign;
        const instructor = idInstructorAsign
          ? usuariosData.find((user) => user.id === idInstructorAsign)
          : null;

        // Encontrar el perfil del instructor si existe
        const perfilInstructor = instructor
          ? perfilesData.find((perfil) => perfil.idUsuarioFk === instructor.id)
          : null;

        const _tr = document.createElement("tr");
        _tr.classList.add(
          "text-black",
          "hover:bg-mdaGreen_400",
          "cursor-pointer",
          "text-md",
          "text-center"
        );

        if (element.estado === false && element.validacion === false) {
          
          const _fecha = document.createElement("td");
          _fecha.textContent = element.fechaPost;
          _tr.appendChild(_fecha);

          const _nombreMonitor = document.createElement("td");
          _nombreMonitor.textContent = perfil
            ? `${perfil.nombre}  ${perfil.apellidos}`
            : "Desconocido";
          _tr.appendChild(_nombreMonitor);

          const _nombreInstructor = document.createElement("td");
          _nombreInstructor.textContent = perfilInstructor
            ? `${perfilInstructor.nombre} ${perfilInstructor.apellidos}`
            : "Desconocido";
          _tr.appendChild(_nombreInstructor);

          const _titulo = document.createElement("td");
          _titulo.textContent = element.tituloPost;
          _tr.appendChild(_titulo);

          const _cantidadArchivos = document.createElement("td");
          _cantidadArchivos.textContent = element.material;
          _tr.appendChild(_cantidadArchivos);

          _tbody.appendChild(_tr);
        }
      });
    }
  );
}
