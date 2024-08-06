// Función para generar un código aleatorio de 6 dígitos
export default function generarCodigo() {
  const numero = Math.floor(100000 + Math.random() * 900000);
  return numero.toString();
};