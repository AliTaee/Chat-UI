'use strict'
import { modalFunc } from './scripts/modal'
import { autoHeight } from './scripts/dom-utility'
import { readDataFromJson } from './scripts/fetch-data'
import {
  renderChatList,
  renderNewMessage,
  renderModalHeaderProfile,
} from './scripts/render'

let chatData = {
  contacts: [],
  activeChat: {},
  userProfile: {},
}

const messageInputElement = document.getElementById('message-input')
const SendButtonElement = document.getElementById('send-message-button')

export function setState(propertyKey, value) {
  chatData = { ...chatData, [propertyKey]: value }
}

export const getState = (propertyKey) => {
  return chatData[propertyKey]
}

function afterFetchData() {
  renderChatList()
  modalFunc()
  renderModalHeaderProfile()
}

readDataFromJson
  .then((result) => {
    const { contacts, userProfile } = result
    chatData = { ...chatData, contacts, userProfile }
    afterFetchData()
  })
  .catch((error) => console.error(error))

SendButtonElement.addEventListener('click', () => {
  const newMessageText = messageInputElement.value

  if (newMessageText === '') return

  const { contacts, activeChat } = chatData
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

  chatData.contacts = newChatLists
  messageInputElement.value = ''
  messageInputElement.style.height = '23px'

  renderNewMessage(newMessageText, chatData.userProfile)
  // For test and development
  console.info('updated chat data', chatData)
})

messageInputElement.addEventListener('input', () => {
  autoHeight(messageInputElement)
})
