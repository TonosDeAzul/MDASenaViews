// Función para las acciones del post
export default function accionPost(idPost, post) {
  fetch(`http://localhost:3000/tb_post/${idPost}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json);
}
