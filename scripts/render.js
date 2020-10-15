import {
  addInnerText,
  setStyleToElement,
  setBackgroundImage,
  removeChildElement,
  removeClassFromElement,
  removeStyleFromElement,
  removeClassFromAllDocument,
} from './dom-utility'

import { setState, getState } from '../index'

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
const messageListWrapper = document.getElementById(messageListsId)

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

const createReplySvgIcon = () => {
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  )

  svgElement.setAttribute('width', '24')
  svgElement.setAttribute('height', '24')

  let replyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  replyIcon.setAttribute(
    'd',
    'm23.5 22c-.179 0-.348-.096-.438-.258-2.301-4.159-6.683-6.742-11.435-6.742h-1.627v4.5c0 .2-.119.38-.302.459-.186.081-.397.042-.542-.096l-9-8.5c-.099-.094-.156-.225-.156-.363s.057-.269.156-.363l9-8.5c.146-.137.358-.176.542-.096.183.079.302.259.302.459v4.5c7.726.039 14 6.335 14 14.07v.43c0 .228-.154.427-.375.484-.042.011-.084.016-.125.016zm-14-8h2.127c4.488 0 8.67 2.14 11.301 5.688-.693-6.56-6.258-11.688-12.998-11.688h-.43c-.276 0-.5-.224-.5-.5v-3.84l-7.771 7.34 7.771 7.34v-3.84c0-.276.224-.5.5-.5z'
  )
  replyIcon.setAttribute('fill', '#fefefe')

  // attach it to the container
  svgElement.appendChild(replyIcon)

  return svgElement
}

function setMessages(id, avatar, userProfile) {
  const chatList = getState('chatList')
  const getLastMessages = chatList.filter((chat) => chat.id === id)[0].chats

  removeChildElement(messageListsId)

  getLastMessages.forEach((messageItem) => {
    let avatarImage = ''

    const messageElement = document.createElement('li')
    messageElement.classList.add('chat-page__message')

    const AvatarElement = document.createElement('span')
    const chatTextsWrapper = document.createElement('div')
    const chatText = document.createElement('span')

    chatTextsWrapper.classList.add('chat-page__texts')
    chatText.classList.add('chat-page__text')

    if (messageItem.isFromFriend) {
      avatarImage = avatar
      chatText.classList.add('chat-page__text--freind')
      chatTextsWrapper.classList.add('chat-page__texts--freind')
    } else {
      avatarImage = userProfile.avatar
    }

    AvatarElement.style.backgroundImage = `url('${avatarImage}')`
    AvatarElement.classList.add('profile__avatar', 'profile__avatar--small')

    chatText.innerText = messageItem.message
    chatTextsWrapper.appendChild(chatText)

    const replySvgIcon = createReplySvgIcon()

    messageElement.appendChild(AvatarElement)
    messageElement.appendChild(chatTextsWrapper)
    messageElement.appendChild(replySvgIcon)
    messageListWrapper.appendChild(messageElement)
  })
}

export function renderChatList() {
  const chatList = getState('chatList')
  const userProfile = getState('userProfile')

  chatList.forEach((chat) => {
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
      handleActiveChatPage(chatItem)
      setHeaderProfile(avatar, name, about)
      setMessages(id, avatar, userProfile)
      setState('activeChat', chat)
    })

    chatListWrapper.appendChild(chatItem)
  })
}

export function renderNewMessage(message, userProfile) {
  const messageElement = document.createElement('li')
  messageElement.classList.add('chat-page__message')

  const AvatarElement = document.createElement('span')
  const chatTextsWrapper = document.createElement('div')
  const chatText = document.createElement('span')

  chatTextsWrapper.classList.add('chat-page__texts')
  chatText.classList.add('chat-page__text')

  AvatarElement.style.backgroundImage = `url('${userProfile.avatar}')`
  AvatarElement.classList.add('profile__avatar', 'profile__avatar--small')

  chatText.innerText = message
  chatTextsWrapper.appendChild(chatText)

  messageElement.appendChild(AvatarElement)
  messageElement.appendChild(chatTextsWrapper)
  messageListWrapper.appendChild(messageElement)
}
