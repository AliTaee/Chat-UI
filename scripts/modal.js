import { renderContacts } from './render'
import { getState } from '../index'

const contactsButton = document.getElementById('contacts-button')
const profileHeader = document.getElementById('profile-header')
const modalContent = document.getElementById('modal-content')
const modalClose = document.getElementById('modal-close')
const modal = document.getElementById('modal')

export function closeModal() {
  modal.style.display = 'none'
}

export function modalFunc() {
  function openModal() {
    modalContent.innerHTML = null
    modal.style.display = 'block'
  }

  profileHeader.onclick = () => {
    modalContent.classList.remove('contacts-wrapper')
    openModal()
  }
  contactsButton.onclick = () => {
    modalContent.classList.add('contacts-wrapper')
    openModal()
    const contacts = getState('contacts')
    renderContacts(contacts)
  }

  modalClose.onclick = closeModal

  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal()
    }
  }
}
