// Función para eliminar el post
export default function eliminarPost(idPost) {
  fetch(`http://localhost:3000/tb_post/${idPost}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((json) => json);
}
