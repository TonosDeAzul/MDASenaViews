export default function crearPerfil(perfil) {
  fetch(`http://localhost:3000/tb_perfil`, {
    method: "POST",
    body: JSON.stringify(perfil),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json);
}
