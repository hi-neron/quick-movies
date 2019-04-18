let drawContent = require('./drawContent')

/** 
  OMDb API parameters

  PARAMETER    REQUIRED    VALID OPTIONS       DEFAULT VALUE       DESCRIPTION
  i            Optional*		                   <empty>	           A valid IMDb ID (e.g. tt1285016)
  t	           Optional*		                   <empty>             Movie title to search for.
  type	       No	         movie, series       <empty>	           Type of result to return.
  y	           No	                             <empty>	           Year of release.
  plot	       No	         short, full	       short	             Return short or full plot.
  r	           No	         json, xml	         json	               The data type to return.
  callback	   No		                           <empty>	           JSONP callback name.
  v	           No		                           1	                 API version (reserved for future use).

 * **/


let API = {
  key: 'f7221401',
  get_movies: function (searchString, type, page, cb) {
    searchString = encodeURI(searchString)
    let request = `http://www.omdbapi.com/?apikey=${this.key}&s=${searchString}&type=${type}&page=${page}`
    
    fetch(request)
    .then(function(response) {
      return response.json()
    })
    .then(function(json) {
      cb(json)
    })
    .catch((e) => {
      console.log(e)
    })
  },
  get_single_movie: function (title, cb) {
    title = encodeURI(title)
    let request = `http://www.omdbapi.com/?apikey=${this.key}&t=${title}`
  
    fetch(request)
    .then(function(response) {
      return response.json()
      })
    .then(function(json) {
      cb(json)
    })
    .catch((e) => {
      console.log(e)
    })
  }
}

module.exports = API