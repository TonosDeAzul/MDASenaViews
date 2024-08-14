// Importar funciones de peticiones
import traerPerfiles from "../../peticiones/listar/traerPerfiles.js";
import traerUsuarios from "../../peticiones/listar/traerUsuarios.js";
import traerRoles from "../../peticiones/listar/traerRoles.js";
import estadoUsuario from "../../peticiones/editar/estadoUsuario.js";

// Importar funciones de herramientas
import modal from "../../herramientas/modal.js";

export default function usuariosActivos() {
  const _tbody = document.getElementById("activos");

  Promise.all([traerPerfiles(), traerUsuarios(), traerRoles()]).then(
    ([perfilesData, usuariosData, rolesData]) => {
      usuariosData.forEach((element) => {

        // Encontrar el perfil del usuario
        const perfil = perfilesData.find(
          (perfil) => perfil.idUsuarioFk === element.id
        );

        // Encontrar el rol del usuario
        const rol = rolesData.find(
          (rol) => rol.id === element.idRolFK
        );

        const _tr = document.createElement("tr");
        _tr.classList.add(
          "text-black",
          "hover:bg-mdaGreen_400",
          "cursor-pointer",
          "text-md",
          "text-center"
        );

        if (element.estado === true) {

          const _nombreUsuario = document.createElement("td");
          _nombreUsuario.textContent = perfil
            ? `${perfil.nombre}  ${perfil.apellidos}`
            : "Desconocido";
          _tr.appendChild(_nombreUsuario);

          const _correo = document.createElement("td");
          _correo.textContent = element.correoInstitucional;
          _tr.appendChild(_correo);

          const _cantidadArchivos = document.createElement("td");
          _cantidadArchivos.textContent = rol.nombreRol;
          _tr.appendChild(_cantidadArchivos);

          if (rol.nombreRol !== "Administrador") {
            const _acciones = document.createElement("td");
            _tr.appendChild(_acciones);
  
            const _rechazar = document.createElement("button");
            _rechazar.textContent = "Desactivar";
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
                  if (confirmado) {
                    element.estado = false;
                    console.log(element.id, element);
                    
                    estadoUsuario(element.id, element);
                  } else {
                    console.log("Se canceló la acción");
                  }
                })
            );
          }


          _tbody.appendChild(_tr);
        }
      });
    }
  );
}
