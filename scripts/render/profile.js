import { getState } from '../../index'
import { elementsIdClassNames } from '../elements-id-class-names'

export function setHeaderProfile(avatar, name, about) {
  document.getElementById(elementsIdClassNames.profileNameId).innerText = name
  document.getElementById(elementsIdClassNames.profileAboutId).innerText = about
  document.getElementById(
    elementsIdClassNames.profileAvatarId
  ).style.backgroundImage = `url(${avatar})`
}

export function renderModalHeaderProfile() {
  const headerProfile = document.getElementById(
    elementsIdClassNames.profileHeaderId
  )

  headerProfile.addEventListener('click', () => {
    const activeUserChat = getState('activeChat')

    let profileWrapper = document.createElement('div')
    profileWrapper.classList.add('profile-about', 'profile')

    const avatarElement = document.createElement('span')
    avatarElement.style.backgroundImage = `url('${activeUserChat.avatar}')`
    avatarElement.classList.add('profile__avatar', 'center-img')

    const aboutElement = document.createElement('span')
    aboutElement.classList.add('about-user-modal', 'custom-scroll')
    aboutElement.innerText = `About: ${activeUserChat.about}`

    const userNameElement = document.createElement('span')
    userNameElement.innerText = `User name: ${activeUserChat.userName}`

    const userTellElement = document.createElement('span')
    userTellElement.innerText = `Tell: ${activeUserChat.tell}`

    profileWrapper.appendChild(avatarElement)
    profileWrapper.appendChild(aboutElement)
    profileWrapper.appendChild(userNameElement)
    profileWrapper.appendChild(userTellElement)
    elementsIdClassNames.modalContent.appendChild(profileWrapper)
  })
}
