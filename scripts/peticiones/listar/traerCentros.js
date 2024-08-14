export default function traerCentros() {
  return fetch(`http://localhost:3000/tb_centro`)
    .then((response) => response.json())
    .then((json) => json);
};