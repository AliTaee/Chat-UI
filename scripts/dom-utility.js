export function removeClassFromElement(idName, className) {
  document.getElementById(idName).classList.remove(className)
}

export function removeStyleFromElement(idName, propertie) {
  document.getElementById(idName).style[propertie] = null
}

export function setStyleToElement(idName, propertie, value) {
  document.getElementById(idName).style[propertie] = value
}

export function removeClassFromAllDocument(className) {
  let classElements = document.getElementsByClassName(className)
  while (classElements.length) classElements[0].classList.remove(className)
}

export function addInnerText(idName, value) {
  document.getElementById(idName).innerText = value
}

export function setBackgroundImage(idName, value) {
  document.getElementById(idName).style.backgroundImage = `url(${value})`
}
