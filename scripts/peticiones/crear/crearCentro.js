export default function crearCentro(centro) {
  fetch(`http://localhost:3000/tb_centro`, {
    method: "POST",
    body: JSON.stringify(centro),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json);
}
