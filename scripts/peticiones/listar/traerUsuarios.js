export default function traerUsuarios() {
  return fetch(`http://localhost:3000/tb_usuarios`)
    .then((response) => response.json())
    .then((json) => json);
};