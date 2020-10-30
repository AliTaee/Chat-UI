export function removeClassFromAllDocument(className) {
  let classElements = document.getElementsByClassName(className)
  while (classElements.length) classElements[0].classList.remove(className)
}

export function autoHeight(element) {
  element.style.height = '1px'
  element.style.height = element.scrollHeight + 'px'
}

export function scrollToElement(elementId) {
  const element = document.getElementById(elementId)
  element.scrollTop = element.scrollHeight
}

export const createReplySvgIcon = () => {
  const svgElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  )

  svgElement.setAttribute('width', '24')
  svgElement.setAttribute('height', '24')

  let replyIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  replyIcon.setAttribute(
    'd',
    'm23.5 22c-.179 0-.348-.096-.438-.258-2.301-4.159-6.683-6.742-11.435-6.742h-1.627v4.5c0 .2-.119.38-.302.459-.186.081-.397.042-.542-.096l-9-8.5c-.099-.094-.156-.225-.156-.363s.057-.269.156-.363l9-8.5c.146-.137.358-.176.542-.096.183.079.302.259.302.459v4.5c7.726.039 14 6.335 14 14.07v.43c0 .228-.154.427-.375.484-.042.011-.084.016-.125.016zm-14-8h2.127c4.488 0 8.67 2.14 11.301 5.688-.693-6.56-6.258-11.688-12.998-11.688h-.43c-.276 0-.5-.224-.5-.5v-3.84l-7.771 7.34 7.771 7.34v-3.84c0-.276.224-.5.5-.5z'
  )
  replyIcon.setAttribute('fill', '#fefefe')

  svgElement.appendChild(replyIcon)

  return svgElement
}
