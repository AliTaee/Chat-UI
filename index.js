'use strict'
import { modalFunc } from './scripts/modal'
import { autoHeight, scrollToElement } from './scripts/dom-utility'
import {
  renderChatList,
  renderNewMessage,
  renderModalHeaderProfile,
} from './scripts/render'

import dataJson from './assets/data.json'

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

SendButtonElement.addEventListener('click', () => {
  const newMessageText = messageInputElement.value
  messageInputElement.focus()
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
  scrollToElement('message-lists')
})

messageInputElement.addEventListener('input', () => {
  autoHeight(messageInputElement)
})

function afterFetchData() {
  renderChatList()
  modalFunc()
  renderModalHeaderProfile()
}

function readDataFromJson() {
  const { contacts, userProfile } = dataJson
  chatData = { ...chatData, contacts, userProfile }
  afterFetchData()
}

readDataFromJson()
