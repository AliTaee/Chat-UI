'use strict'
import { readDataFromJson } from './scripts/fetch-data'
import { renderChatList } from './scripts/render'

const chatData = {
  list: [],
  contacts: [],
}

readDataFromJson
  .then((result) => {
    chatData.list = result.chatList
    renderChatList(chatData)
  })
  .catch((error) => console.error(error))
