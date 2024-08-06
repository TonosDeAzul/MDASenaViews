// Función para cambiar contraseña
export default function cambiarContrasena(idUsuario, contrasena) {
  fetch(`http://localhost:3000/tb_usuarios/${idUsuario}`, {
    method: "PUT",
    body: JSON.stringify(contrasena),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((window.location.href = "login.html"));
}
