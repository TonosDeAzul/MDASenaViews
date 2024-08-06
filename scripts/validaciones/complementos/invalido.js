// Cambiar a rojo el borde del input
export default function invalido(input) {
  input.closest("label").classList.add(
    "border-red-600", 
    "border-2"
  );
};