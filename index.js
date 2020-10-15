'use strict'
import { autoHeight } from './scripts/dom-utility'
import { readDataFromJson } from './scripts/fetch-data'
import { renderChatList, renderNewMessage } from './scripts/render'

let chatData = {
  chatList: [],
  contacts: [],
  activeChat: {},
  userProfile: {},
}

const messageInputElement = document.getElementById('message-input')
const SendButtonElement = document.getElementById('send-message-button')

export function setState(propertyKey, value) {
  chatData = { ...chatData, [propertyKey]: value }
}

readDataFromJson
  .then((result) => {
    const { chatList, contacts, userProfile } = result
    chatData = { ...chatData, chatList, contacts, userProfile }
    renderChatList(chatData)
  })
  .catch((error) => console.error(error))

SendButtonElement.addEventListener('click', () => {
  const newMessageText = messageInputElement.value

  if (newMessageText === '') return

  const { chatList, activeChat } = chatData
  const newChatLists = chatList.map((chat) => {
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

  chatData.chatList = newChatLists
  messageInputElement.value = ''
  messageInputElement.style.height = '23px'

  renderNewMessage(newMessageText)
  console.info('chatData', chatData)
})

messageInputElement.addEventListener('input', () => {
  autoHeight(messageInputElement)
})
