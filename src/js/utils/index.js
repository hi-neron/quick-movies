// busca elementos en DOM
function getElements (list, cb) {
  let domList = {}
  for (let i = 0; i < list.length; i++){
    let element = document.getElementsByName(list[i])
    if (element[0] === undefined) element = document.getElementById(list[i])
    domList[list[i]] = element
  }
  cb(domList)
}

// Limpia objetos del DOM
function cleanElement (element) {
  if (!(element instanceof HTMLElement)) {
    throw new TypeError('Expected an element')
  }
  let node
  while ((node = element.lastChild)) element.removeChild(node)
  return element
}

module.exports = {
  getElements,
  cleanElement
}