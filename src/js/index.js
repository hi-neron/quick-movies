'use strict'

let API = require('./libs/api')
let { getElements } = require('./utils')

window.onload = function () {
  let list = ['type', 'search-title', 'cards-container']

  getElements (list, (domList) => {
    let searchInput = domList['search-title']
    let cards = domList['cards-container']
    let types = Array.apply(null, domList['type'])
  
    searchInput[0].addEventListener('keyup', (e) => {
      let { cleanElement } = require('./utils')

      let input = e.target
      let searchString = input.value
      
      let type = types.filter (e => e.checked)
      
      if (searchString.length >= 3) {
        API.get_movies(searchString, type[0].value)
      } else {
        cleanElement(cards)
      }
    })
  })
}
