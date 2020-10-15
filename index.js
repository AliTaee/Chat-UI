'use strict'
import { readDataFromJson } from './scripts/fetch-data'
import { renderChatList } from './scripts/render'

let chatData = {
  chatList: [],
  contacts: [],
  userProfile: {},
}

readDataFromJson
  .then((result) => {
    const { chatList, contacts, userProfile } = result
    chatData = { ...chatData, chatList, contacts, userProfile }
    console.info('chatData', chatData)
    renderChatList(chatData)
  })
  .catch((error) => console.error(error))
