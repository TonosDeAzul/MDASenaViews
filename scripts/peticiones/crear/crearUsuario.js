export default function crearUsuario(usuario) {
  fetch(`http://localhost:3000/tb_usuarios`, {
    method: "POST",
    body: JSON.stringify(usuario),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json);
}
