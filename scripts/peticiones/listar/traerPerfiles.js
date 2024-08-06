export default function traerPerfiles() {
  return fetch(`http://localhost:3000/tb_perfil`)
    .then((response) => response.json())
    .then((json) => json);
};