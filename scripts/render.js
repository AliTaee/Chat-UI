import {
  addInnerText,
  setStyleToElement,
  setBackgroundImage,
  removeChildElement,
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

// Chat messages
const messageLists = 'message-lists'

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

function setMessages(messages, avatar) {
  const messageListWrapper = document.getElementById(messageLists)
  removeChildElement(messageLists)

  const messageElement = document.createElement('li')
  messageElement.classList.add('chat-page__message')

  const AvatarElement = document.createElement('span')
  AvatarElement.classList.add('profile__avatar', 'profile__avatar--small')
  AvatarElement.style.backgroundImage = `url('${avatar}')`

  const chatTextsWrapper = document.createElement('div')
  chatTextsWrapper.classList.add('chat-page__texts')

  messages.forEach((messageItem) => {
    const chatText = document.createElement('span')
    chatText.classList.add('chat-page__text')
    chatText.innerText = messageItem.message
    chatTextsWrapper.appendChild(chatText)
  })
  messageElement.appendChild(AvatarElement)
  messageElement.appendChild(chatTextsWrapper)
  messageListWrapper.appendChild(messageElement)
}

export function renderChatList(chatData) {
  const { chatList } = chatData

  chatList.forEach((chat) => {
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
      setMessages(chats, avatar)
    })

    chatListWrapper.appendChild(chatItem)
  })
}
