// Importar funciones de peticiones
import posts from "../../peticiones/listar/traerPosts.js";
import traerPerfiles from "../../peticiones/listar/traerPerfiles.js";
import traerUsuarios from "../../peticiones/listar/traerUsuarios.js";
import eliminarPost from "../../peticiones/eliminar/eliminarPost.js";

// Importar funciones de herramientas
import modal from "../../herramientas/modal.js";
import modalAfirmar from "../../herramientas/modalAfirmacion.js";

export default function postPendientes(idInstructor) {
  const _tbody = document.getElementById("rechazados");

  // Supongamos que tienes el ID del instructor actual, por ejemplo:
  const instructorId = idInstructor; // Reemplaza con el ID del instructor actual

  Promise.all([posts(), traerPerfiles(), traerUsuarios()]).then(
    ([postsData, perfilesData, usuariosData]) => {
      postsData.forEach((element) => {
        // Encontrar el usuario propietario del post
        const usuario = usuariosData.find(
          (user) => user.id === element.idUsuarioFk
        );

        // Verificar si el usuario tiene asignado el instructor actual
        if (usuario && usuario.idInstructorAsign === instructorId) {
          const _tr = document.createElement("tr");
          _tr.classList.add(
            "text-black",
            "hover:bg-mdaGreen_400",
            "cursor-pointer",
            "text-md",
            "text-center"
          );

          if (element.estado === false && element.validacion === true) {
            const perfil = perfilesData.find(
              (perfil) => perfil.idUsuarioFk === element.idUsuarioFk
            );

            const _fecha = document.createElement("td");
            _fecha.textContent = element.fechaPost;
            _tr.appendChild(_fecha);

            const _nombreMonitor = document.createElement("td");
            _nombreMonitor.textContent = perfil
              ? `${perfil.nombre}  ${perfil.apellidos}`
              : "Desconocido";
            _tr.appendChild(_nombreMonitor);

            const _titulo = document.createElement("td");
            _titulo.textContent = element.tituloPost;
            _tr.appendChild(_titulo);

            const _cantidadArchivos = document.createElement("td");
            _cantidadArchivos.textContent = element.material;
            _tr.appendChild(_cantidadArchivos);

            const _observacion = document.createElement("td");
            _observacion.textContent = element.observacion;
            _tr.appendChild(_observacion);

            const _acciones = document.createElement("td");
            _tr.appendChild(_acciones);

            const _rechazar = document.createElement("button");
            _rechazar.textContent = "Borrar";
            _rechazar.classList.add(
              "btn",
              "btn-sm",
              "bg-white",
              "text-mdaRed",
              "border-mdaRed",
              "hover:bg-mdaRed",
              "hover:border-mdaRed",
              "hover:text-white"
            )
            _acciones.appendChild(_rechazar);
            _rechazar.addEventListener("click", 
              () => modal()
                .then((confirmado) => {
                  if(confirmado) {
                    setTimeout(() => {
                      eliminarPost(element.id)
                      location.reload();
                    }, 1000)
                    modalAfirmar("Se ha eliminado el post", "Eliminar post")
                  } else {
                    console.log("Se canceló la acción");
                  }
                })
              );

            _tbody.appendChild(_tr);
          }
        }
      });
    }
  );
}
