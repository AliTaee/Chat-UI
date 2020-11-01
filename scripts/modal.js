import { getState } from '../index'
import { renderContacts } from './render/render-contacts'
import { elementsIdClassNames } from './elements-id-class-names'

const {
  modal,
  modalClose,
  modalContent,
  profileHeader,
  contactsButton,
} = elementsIdClassNames

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
