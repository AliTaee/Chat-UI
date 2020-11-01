'use strict'
import { modalFunc } from './scripts/modal'
import { renderChatList } from './scripts/render/render-chat-list'
import { renderModalHeaderProfile } from './scripts/render/profile'

import dataJson from './assets/data.json'

let chatData = {
  contacts: [],
  activeChat: {},
  userProfile: {},
}

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

function readDataFromJson() {
  const { contacts, userProfile } = dataJson
  chatData = { ...chatData, contacts, userProfile }
  afterFetchData()
}

readDataFromJson()
