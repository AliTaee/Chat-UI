import { setMessages } from './message'
import { setHeaderProfile } from './profile'
import { setState, getState } from '../../index'
import { elementsIdClassNames } from '../elements-id-class-names'
import { removeClassFromAllDocument } from '../dom-utility'

const {
  chatPageId,
  chatSectionId,
  activeClassName,
  chatListWrapper,
  startMessagingId,
  messageInputElement,
  contactInfoWrapperId,
} = elementsIdClassNames

function handleActiveChatPage(chatItem) {
  removeClassFromAllDocument(activeClassName)
  chatItem.classList.add(activeClassName)
  document.getElementById(chatSectionId).style['display'] = null
  document
    .getElementById(elementsIdClassNames.chatPageId)
    .classList.remove('center-layout')
  document.getElementById(startMessagingId).style['display'] = 'none'
}

export function renderChatList() {
  const contacts = getState('contacts')
  const userProfile = getState('userProfile')

  contacts.forEach((chat) => {
    const { avatar, name, chats, about, id } = chat

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

    let profileLastMessage = document.createElement('span')
    profileLastMessage.classList.add('profile__last-message')

    const lastProfileMessage = chats[chats.length - 1].message
    profileLastMessage.innerText = lastProfileMessage

    infoWrapper.appendChild(profileName)
    infoWrapper.appendChild(profileLastMessage)

    chatItem.appendChild(avatarElement)
    chatItem.appendChild(infoWrapper)

    chatItem.addEventListener('click', () => {
      document.getElementById(chatPageId).style['display'] = 'block'
      document.getElementById(contactInfoWrapperId).style['display'] = 'none'
      handleActiveChatPage(chatItem)
      setHeaderProfile(avatar, name, about)
      setMessages(id, avatar, userProfile)
      setState('activeChat', chat)
      messageInputElement.focus()
    })

    chatListWrapper.appendChild(chatItem)
  })
}
