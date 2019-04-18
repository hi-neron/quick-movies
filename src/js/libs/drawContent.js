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
  let results = movies.totalResults

  if (movies.Response == "False") {
    resultQ = yo`
      <div class="cards-message">
        <h2>${movies.Error}</h2>
      </div>
    `
  } else {
    resultQ = yo`
      <div class="cards-message">
        <p> Se han encontrado <span class="cards-message-number">${results}</span> ${typeSpanish[type]}</p>
      </div>
    `
    let tenMovies = movies.Search

    tenMovies.forEach((movie) => {

      let cardLoader = yo`<div class="article-loader">
        <div className="article-message">Loading</div>
      </div>`

      let img = yo`<img src="${movie.Poster}" alt="" class="article-top-image" />`

      img.onload = function() {
        cardLoader.style.display = "none"
      }

      img.onerror = function() {
        let newMessage = yo`
          <div class="article-loader">
            <div className="article-message-alert">No encontramos una imagen, <br/> seguro que no es de las ${typeSpanish[type]} buenas<br>😝</div>
          </div>
        `
        cleanElement(cardLoader).appendChild(newMessage)
      }

      cardTemplate = yo`
        <article class="article-card" data-title="${movie.Title}">
          <div class="article-wrapper">
            ${cardLoader}
            <div class="article-content">
              <div class="article-top">
                ${img}
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

          modalContainer.onclick = function (e) {
            this.classList.remove('modal-show')
          }

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
                  <div className="modal-right-year">${jsonMovie.Year}</div>
                  <div className="modal-right-score">${jsonMovie.Metascore}</div>
                  <div className="modal-right-genre">${jsonMovie.Genre}</div>
                  <div className="modal-right-actors">${jsonMovie.Actors}</div>
                  <div className="modal-right-review">${jsonMovie.Plot}</div>
                </div>
              </div>
            `
            modalContainer.classList.add('modal-show')
            cleanElement(modalContainer).appendChild(singleMovieTemplate)
          })
        })
      }

      cardsWrapper.appendChild(cardTemplate)
    })
  }

  cardsContainer.appendChild(resultQ)
  cardsContainer.appendChild(cardsWrapper)

  // infinite scroll
  document.addEventListener('scroll', (e) => {
    let document = this
    let scrollLimit = document.scrollY + 200 + cardsContainer.clientHeight
    console.log(scrollLimit)

    if(cardsContainer.scrollTop + cardsContainer.clientHeight >= cardsContainer.scrollHeight) {
      console.log(cardsContainer.scrollTop, cardsContainer.clientHeight, cardsContainer.scrollHeight)
    }
  })

  })
}

module.exports = drawContent
