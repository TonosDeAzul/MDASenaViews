// Quitar el rojo del borde del input
export default function valido(input) {
  input.closest("label").classList.remove(
    "border-red-600", 
    "border-2"
  );
};