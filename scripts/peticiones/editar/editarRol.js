export default function editarRol(idUser, data){
  return fetch (`http://localhost:3000/tb_usuarios/${idUser}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((datos) => datos)
    .catch((error) => console.log(`Error actualizando el rol ${error}`))
}