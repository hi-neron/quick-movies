let yo = require('yo-yo')
let { getElements, cleanElement } = require('../utils')
let API = require('./api')

function drawContent (movies, type) {
  let typeSpanish = {
    "movie": "péliculas",
    "series": "series",
  }

  getElements (['cards-container'], (container) => {
  let cardsContainer = container['cards-container']

  cleanElement(cardsContainer)
  let cardsWrapper = document.createElement('div')
  cardsWrapper.setAttribute('class', 'cards-wrapper')

  let cardTemplate, resultQ

  if (movies.Response == "False") {
    resultQ = yo`
      <div class="cards-message">
        <h2>${movies.Error}</h2>
      </div>
    `
  } else {
    resultQ = yo`
      <div class="cards-message">
        <p> Se han encontrado <span class="cards-message-number">${movies.totalResults}</span> ${typeSpanish[type]} </p>
      </div>
    `
    let tenMovies = movies.Search

    tenMovies.forEach((movie) => {

      let cardLoader = yo`<div class="article-loader"></div>`

      cardTemplate = yo`
        <article data-title="${movie.Title}">
          <div class="article-wrapper">
            ${cardLoader}
            <div class="article-content">
              <div class="article-top">
                <img src="${movie.Poster}" alt="" class="article-top-image">
              </div>
              <div class="article-bottom">
                <div class="article-bottom-title">${movie.Title}</div>
                <div class="article-bottom-date">${movie.Year}</div>
              </div>
            </div>
          </div>
        </article>`

      cardTemplate.onclick = function (e) {
        let title = this.getAttribute('data-title')
        let container = ['modal-single-movie']

        getElements(container, (elements) => {
          let API = require('./api')
          
          let modalContainer = elements[container[0]]

          API.get_single_movie(title, (jsonMovie) => {
            let singleMovieTemplate = yo`
              <div className="modal-movie-wrapper">
                <div className="modal-left">
                  <div className="modal-img">
                    <img src="${jsonMovie.Poster}" alt=""/>
                  </div>
                </div>
                <div className="modal-right">
                  <h1 className="modal-right-title">${jsonMovie.Title}</h1>
                  <h1 className="modal-right-year">${jsonMovie.Year}</h1>
                  <h1 className="modal-right-score">${jsonMovie.Metascore}</h1>
                  <h1 className="modal-right-genre">${jsonMovie.Genre}</h1>
                  <h1 className="modal-right-actors">${jsonMovie.Actors}</h1>
                  <h1 className="modal-right-review">${jsonMovie.Plot}</h1>
                </div>
              </div>
            `
            
            cleanElement(modalContainer).appendChild(singleMovieTemplate)
          })
        })
      }

      cardsWrapper.appendChild(cardTemplate)
    })

  }

  cardsContainer.appendChild(resultQ)
  cardsContainer.appendChild(cardsWrapper)
  })
}

module.exports = drawContent
