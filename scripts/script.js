const modal = document.getElementById("modal-1");

const showModal = document.getElementById("showModal");
showModal.onclick = function () {
  modal.classList.remove("hidden");
};

const closeModal = document.getElementById("closeModal");
closeModal.onclick = function () {
  modal.classList.add("hidden");
};
