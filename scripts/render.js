import {
  addInnerText,
  setStyleToElement,
  setBackgroundImage,
  removeChildElement,
  removeClassFromElement,
  removeStyleFromElement,
  removeClassFromAllDocument,
} from './dom-utility'

import { setState } from '../index'

// Chat page main Id and class namess
const chatPageId = 'chat-page'
const chatSectionId = 'chat-section'
const activeClassName = 'active-profile'
const startMessagingId = 'start-messaging'
const chatListWrapper = document.getElementById('chat-list')

// Chat section main Id and class names
// profile
const profileNameId = 'profile-name'
const profileAboutId = 'profile-about'
const profileAvatarId = 'profile-avatar'

// Chat messages
const messageListsId = 'message-lists'

function handleActiveChatPage(chatItem) {
  removeClassFromAllDocument(activeClassName)
  chatItem.classList.add(activeClassName)
  removeStyleFromElement(chatSectionId, 'display')
  removeClassFromElement(chatPageId, 'center-layout')
  setStyleToElement(startMessagingId, 'display', 'none')
}

function setHeaderProfile(avatar, name, about) {
  addInnerText(profileNameId, name)
  addInnerText(profileAboutId, about)
  setBackgroundImage(profileAvatarId, avatar)
}

function setMessages(messages, avatar, userProfile) {
  const messageListWrapper = document.getElementById(messageListsId)
  removeChildElement(messageListsId)

  messages.forEach((messageItem) => {
    let avatarImage = ''

    const messageElement = document.createElement('li')
    messageElement.classList.add('chat-page__message')

    const AvatarElement = document.createElement('span')
    const chatTextsWrapper = document.createElement('div')
    const chatText = document.createElement('span')

    chatTextsWrapper.classList.add('chat-page__texts')
    chatText.classList.add('chat-page__text')

    if (messageItem.isFromFriend) {
      avatarImage = userProfile.avatar
      chatText.classList.add('chat-page__text--freind')
      chatTextsWrapper.classList.add('chat-page__texts--freind')
    } else {
      avatarImage = avatar
    }

    AvatarElement.style.backgroundImage = `url('${avatarImage}')`
    AvatarElement.classList.add('profile__avatar', 'profile__avatar--small')

    chatText.innerText = messageItem.message
    chatTextsWrapper.appendChild(chatText)

    messageElement.appendChild(AvatarElement)
    messageElement.appendChild(chatTextsWrapper)
    messageListWrapper.appendChild(messageElement)
  })
}

export function renderChatList(chatData) {
  const { chatList, userProfile } = chatData

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
      setMessages(chats, avatar, userProfile)
      setState('activeChat', chat)
    })

    chatListWrapper.appendChild(chatItem)
  })
}

export function renderNewMessage(message) {
  console.info('new message', message)
}
