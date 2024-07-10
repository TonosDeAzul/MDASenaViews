// Documento
const _d = document;

// Inputs
const _inputCorreo = _d.getElementById("correo");
const _inputContrasena = _d.getElementById("contrasena");
const _inputConfirmarContrasena = _d.getElementById("confirmarContrasena");

export const validarCorreo = () => {
    const regexEspacio = /^(?!\s*$).+/;
    const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
    const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;
    if (
        _inputCorreo.value === "" || 
        !regexEspacio.test(_inputCorreo.value) || 
        !regexAprendiz.test(_inputCorreo.value) ||
        !regexInstructor.test(_inputCorreo.value)) {
        console.log("Xde")
    }
}