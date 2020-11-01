import { closeModal } from '../modal'
import { setMessages } from './message'
import { setHeaderProfile } from './profile'
import { setState, getState } from '../../index'
import { removeClassFromAllDocument } from '../dom-utility'
import { elementsIdClassNames } from '../elements-id-class-names'

const {
  chatPageId,
  modalContent,
  chatSectionId,
  activeClassName,
  startMessagingId,
  contactInfoNameId,
  contactInfoAboutId,
  contactInfoAvatarId,
  contactInfoButtonId,
  contactInfoWrapperId,
} = elementsIdClassNames

function renderContactInfo(userContact) {
  const { name, about, avatar } = userContact
  closeModal()
  document.getElementById(chatPageId).style['display'] = 'none'
  document.getElementById(startMessagingId).style['display'] = 'none'
  document.getElementById(chatSectionId).style['display'] = 'block'

  document.getElementById(contactInfoNameId).innerText = name
  document.getElementById(contactInfoAboutId).innerText = about
  document.getElementById(
    contactInfoAvatarId
  ).style.backgroundImage = `url(${avatar})`

  removeClassFromAllDocument(activeClassName)
  document.getElementById(contactInfoWrapperId).style['display'] = 'flex'
  setState('activeChat', userContact)
}

document.getElementById(contactInfoButtonId).addEventListener('click', () => {
  const activeChat = getState('activeChat')
  const userProfile = getState('userProfile')
  const { avatar, name, about, id } = activeChat

  setMessages(id, avatar, userProfile)
  setHeaderProfile(avatar, name, about)
  document.getElementById(chatPageId).style['display'] = 'block'
  document.getElementById(contactInfoWrapperId).style['display'] = 'none'
})

export function renderContacts(contacts) {
  let contactsListElement = document.createElement('ol')
  contactsListElement.classList.add('contacts-list', 'custom-scroll')

  contacts.forEach((chat) => {
    const { avatar, name, about } = chat

    let chatItem = document.createElement('li')
    chatItem.classList.add('chat-listــitem', 'profile', 'profile-area-padding')

    let avatarElement = document.createElement('span')
    avatarElement.classList.add('profile__avatar')
    avatarElement.style.backgroundImage = `url('${avatar}')`

    let infoWrapper = document.createElement('div')
    infoWrapper.classList.add('profile__info')

    let profileName = document.createElement('span')
    profileName.classList.add('profile__name')
    profileName.innerText = name

    let profileAbout = document.createElement('span')
    profileAbout.classList.add('profile__last-message')
    profileAbout.innerText = about

    infoWrapper.appendChild(profileName)
    infoWrapper.appendChild(profileAbout)

    chatItem.appendChild(avatarElement)
    chatItem.appendChild(infoWrapper)

    chatItem.addEventListener('click', () => {
      renderContactInfo(chat)
    })
    contactsListElement.appendChild(chatItem)
  })
  modalContent.appendChild(contactsListElement)
}
