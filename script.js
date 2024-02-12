const btnSearch = document.querySelector(".search-input")
btnSearch.addEventListener("keydown", (event) => keyPressed(event) )

function keyPressed(event) {
     if (event.key === 'Enter') {
        const nameMovie = btnSearch.value
        showMovie(nameMovie)
     }
}

async function searchMovie(nameMovie) {
    const movieArray = nameMovie.split(' ');
    // Join the substrings with the plus symbol
    const movieWithPlus = movieArray.join('+');
    const url = 'http://www.omdbapi.com/?apikey=API_KEY&t=' + movieWithPlus
    try {
        const response = await fetch(url)
        const result = await response.text()
        if(result.includes('"Response":"False"')) {
            throw new Error(`Failed to fetch data`);
        }
        return ["OK", result] 
    } catch(error){
        return ["NOTOK", error]
    }
    
}

showMovie()

const divPosterMovie = document.querySelector(".div-poster-movie")
const divInfoMovie = document.querySelector(".div-info-movie")
const movieNotFound = document.querySelector(".movie-not-found")

async function showMovie(nameMovie = "Avatar:The" ) {
    const [state, movie] = await searchMovie(nameMovie)

    if(state == "OK") {
        divPosterMovie.style.display = 'flex'
        divInfoMovie.style.display = 'flex'
        movieNotFound.style.display = 'none'
        handleData(movie)
    }  else {
        divPosterMovie.style.display = 'none'
        divInfoMovie.style.display = 'none'
        movieNotFound.style.display = 'block'
    } 
}

const posterImgMovie = document.getElementById("poster-movie")
const titleMovie = document.querySelector(".title-movie")
const tagsMovie = document.querySelector(".list-tags")
const plotMovie = document.querySelector(".plot-movie")
const directorMovie = document.getElementById("director-movie")
const writersMovie = document.getElementById("writers-movie")
const starsMovie = document.getElementById("stars-movie")
const ratingMovie = document.getElementById("rating-movie")
const votesMovie = document.getElementById("votes-movie")


function handleData(movie) {

    const movieObject = JSON.parse(movie)

    posterImgMovie.setAttribute("src", movieObject.Poster)
    titleMovie.innerHTML = movieObject.Title
    tagsMovie.innerHTML = ""
    const genres = movieObject.Genre.split(",")
    
    genres.map( genre => {
      tagsMovie.innerHTML += `<small class="tag-genre">`+ genre.trim() +`</small>`
    })

    plotMovie.innerHTML = movieObject.Plot
    directorMovie.innerHTML = movieObject.Director
    writersMovie.innerHTML = movieObject.Writer
    starsMovie.innerHTML = movieObject.Actors
    ratingMovie.innerHTML = movieObject.imdbRating + "/10"
    votesMovie.innerHTML = movieObject.imdbVotes

}

