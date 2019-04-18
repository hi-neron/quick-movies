'use strict'

let API = require('./libs/api')
let { getElements } = require('./utils')

window.onload = function () {
  let list = ['type', 'search-title', 'cards-container', 'header-container']

  getElements (list, (domList) => {
    let searchInput = domList['search-title']
    let cards = domList['cards-container']
    let headerContainer = domList['header-container']
    let types = Array.apply(null, domList['type'])
    
    searchInput[0].addEventListener('keyup', (e) => {
      let { cleanElement } = require('./utils')
      let drawContent  = require('./libs/drawContent')

      let input = e.target
      let searchString = input.value
      
      let type = types.filter (e => e.checked)

      let typeString = type[0].value

      if (searchString.length >= 3) {
        let page = 1
        API.get_movies(searchString, typeString, page, (json) => {
          drawContent(json, typeString)
        })
        headerContainer.classList.add('header-small')
        cards.classList.add('cards-full')
      } else {
        headerContainer.classList.remove('header-small')
        cards.classList.remove('cards-full')
        cleanElement(cards)
      }
    })
  })
}
