export default function crearPost(post) {
  fetch(`http://localhost:3000/tb_post`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => `Sucedio algun error creando el post ${error}`);
}