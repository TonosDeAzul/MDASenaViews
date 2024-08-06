// Función para editar perfil
export default function editarPerfil(idPerfil, perfil) {
  fetch(`http://localhost:3000/tb_perfil/${idPerfil}`, {
    method: "PUT",
    body: JSON.stringify(perfil),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json);
}
