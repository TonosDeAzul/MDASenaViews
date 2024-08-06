export default function buscarAprendiz(event) {
  const query = event.target.value.toLowerCase();
  const _okIcon = _d.getElementById("okIcon");
  aprendicesEncontrados = [];
  getAprendiz().then((usuarios) => {
    getPerfil().then((perfiles) => {
      aprendicesEncontrados = perfiles.filter(perfil => {
        const usuario = usuarios.find(user => user.id === perfil.idUsuarioFk && user.idRolFK === "2");
        return usuario !== undefined && perfil.documento.toLowerCase() === query;
      });
      if (aprendicesEncontrados.length > 0) {
        _okIcon.classList.remove("hidden");
      } else {
        _okIcon.classList.add("hidden");
      }
      console.log(aprendicesEncontrados);
    });
  });
};