// Función para validar la longitud máxima
export default function longitudMaxima(input, maximo) {
  input.addEventListener("keypress", (event) => {
    if (input.value.length >= maximo) {
      event.preventDefault();
    }
  });
}
