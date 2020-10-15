import {
  addInnerText,
  setStyleToElement,
  setBackgroundImage,
  removeClassFromElement,
  removeStyleFromElement,
  removeClassFromAllDocument,
} from './dom-utility'

// Chat page main Id and class namess
const chatPage = 'chat-page'
const chatSectionId = 'chat-section'
const activeClassName = 'active-profile'
const startMessaging = 'start-messaging'
const chatListWrapper = document.getElementById('chat-list')

// Chat section main Id and class names
// profile
const profileName = 'profile-name'
const profileAbout = 'profile-about'
const profileAvatar = 'profile-avatar'

function handleActiveChatPage(chatItem) {
  removeClassFromAllDocument(activeClassName)
  chatItem.classList.add(activeClassName)
  removeStyleFromElement(chatSectionId, 'display')
  removeClassFromElement(chatPage, 'center-layout')
  setStyleToElement(startMessaging, 'display', 'none')
}

function setHeaderProfile(avatar, name, about) {
  addInnerText(profileName, name)
  addInnerText(profileAbout, about)
  setBackgroundImage(profileAvatar, avatar)
}

export function renderChatList(chatData) {
  const { list } = chatData

  list.forEach((chat) => {
    const { avatar, name, chats, about } = chat

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
      handleActiveChatPage(chatItem)
      setHeaderProfile(avatar, name, about)
    })

    chatListWrapper.appendChild(chatItem)
  })
}
