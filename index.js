'use strict'
import { readDataFromJson } from './scripts/fetch-data'
import { renderChatList } from './scripts/render'

const chat = {
  list: [],
  activeChat: {},
}

readDataFromJson
  .then((result) => {
    chat.list = result.chatList
    renderChatList(chat.list)
  })
  .catch((error) => console.error(error))
