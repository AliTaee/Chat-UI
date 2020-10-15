function removeClassFromAllDocument(className) {
  let classElements = document.getElementsByClassName(className)
  while (classElements.length) classElements[0].classList.remove(className)
}

export function renderChatList(chatList) {
  const chatListWrapper = document.getElementById('chat-list')
  const activeClassName = 'active-profile'

  chatList.forEach((chat) => {
    const { avatar, name, chats } = chat

    let chatItem = document.createElement('li')
    chatItem.classList.add('chat-listــitem', 'profile', 'profile-area-padding')

    chatItem.addEventListener('click', () => {
      removeClassFromAllDocument(activeClassName)
      chatItem.classList.add(activeClassName)
    })

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

    chatListWrapper.appendChild(chatItem)
  })
}
