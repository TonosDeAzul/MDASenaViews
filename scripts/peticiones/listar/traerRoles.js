export default function traerRoles() {
  return fetch(`http://localhost:3000/tb_rol`)
    .then((response) => response.json())
    .then((json) => json);
};