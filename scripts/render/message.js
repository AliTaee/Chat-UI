import { getState } from '../../index'
import { autoHeight } from '../dom-utility'
import { elementsIdClassNames } from '../elements-id-class-names'
import { scrollToElement, createReplySvgIcon } from '../dom-utility'

const {
  messageListsId,
  SendButtonElement,
  messageListWrapper,
  messageInputElement,
} = elementsIdClassNames

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

  const replySvgIcon = createReplySvgIcon()
  replySvgIcon.classList.add('delay-reply')

  messageElement.appendChild(AvatarElement)
  messageElement.appendChild(chatTextsWrapper)
  messageElement.appendChild(replySvgIcon)
  messageListWrapper.appendChild(messageElement)
}

export function setMessages(id, avatar, userProfile) {
  const contacts = getState('contacts')
  const getLastMessages = contacts.filter((chat) => chat.id === id)[0].chats

  document.getElementById(messageListsId).innerHTML = null

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
      chatText.classList.add('chat-page__text--friend')
      chatTextsWrapper.classList.add('chat-page__texts--friend')
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

  scrollToElement('message-lists')
}

SendButtonElement.addEventListener('click', () => {
  const newMessageText = messageInputElement.value
  messageInputElement.focus()
  if (newMessageText === '') return

  let contacts = getState('contacts')
  const activeChat = getState('activeChat')
  const userProfile = getState('userProfile')

  const newChatLists = contacts.map((chat) => {
    if (chat.id === activeChat.id) {
      return {
        ...chat,
        chats: [
          ...chat.chats,
          { isFromFriend: false, date: null, message: newMessageText },
        ],
      }
    }
    return chat
  })

  contacts = newChatLists
  messageInputElement.value = ''
  messageInputElement.style.height = '23px'

  renderNewMessage(newMessageText, userProfile)
  scrollToElement('message-lists')
})

messageInputElement.addEventListener('input', () => {
  autoHeight(messageInputElement)
})
