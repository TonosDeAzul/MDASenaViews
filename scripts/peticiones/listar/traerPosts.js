export default function traerPosts() {
  return fetch(`http://localhost:3000/tb_post`)
    .then((response) => response.json())
    .then((json) => json);
};