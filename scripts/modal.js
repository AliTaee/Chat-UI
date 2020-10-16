const profileHeader = document.getElementById('profile-header')
const modalClose = document.getElementById('modal-close')
const modal = document.getElementById('modal')

export function modalFunc() {
  profileHeader.onclick = function () {
    modal.style.display = 'block'
  }

  modalClose.onclick = function () {
    modal.style.display = 'none'
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
}
