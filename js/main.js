//FUNCIÓN PARA CREAR LOS ARTÍCULOS CON LA INFORMACIÓN DE CADA SHOW ↓↓
const createCardShow = (show, cast) => {
    const showArticle = document.createElement('article') 
    showArticle.classList.add('main__article')

    const showInfo = document.createElement('div')
    showInfo.classList.add('article__info')

    const showName = document.createElement('h3') 
    showName.classList.add('info__title')
    showName.textContent = show.name 

    const showDate = document.createElement('span')
    showDate.classList.add('title__year')
    showDate.textContent = show.premiered ? `(${show.premiered.split('-')[0]})` : 'No available'
        // ${show.premiered.split('-')[0]} separa la fecha: "2025-12-12" por cada guión y toma sólo el primer valor con [0] = "2025"
    const showSummary = document.createElement('p')
    showSummary.classList.add('info__para')
    showSummary.innerHTML = show.summary || 'No summary available'

    const showBlockCharacters = document.createElement('div')
    showBlockCharacters.classList.add('info__characters')

    // Se toma sólo 3 elementos para los actores de cada show
    cast.slice(0, 3).forEach(({person}) => { // "person" es desestructuración, como hacer esto: "cast[i].person" cada elemento "person" de "cast"...
        const showCharacter = document.createElement('figure')
        showCharacter.classList.add('characters__character')
        
        const showCharacterImg = document.createElement('img')
        showCharacterImg.classList.add('character__image')
        showCharacterImg.src = person.image ? person.image.medium : ''
        showCharacterImg.alt = person.name ;
        
        const showCharacterName = document.createElement('figcaption')
        showCharacterName.classList.add('character__name')
        showCharacterName.textContent = person.name

        showCharacter.appendChild(showCharacterImg)
        showCharacter.appendChild(showCharacterName)
        showBlockCharacters.appendChild(showCharacter)
    })

    const showPosterBlock = document.createElement('div')
    showPosterBlock.classList.add('article__image')

    const showPosterImg = document.createElement('img')
    showPosterImg.classList.add('image__movie-img')
    showPosterImg.src = show.image ? show.image.medium : ''
    showPosterImg.alt = show.name

    // Arma todos los elementos ↓↓
    showName.appendChild(showDate)
    showInfo.appendChild(showName)
    showInfo.appendChild(showSummary) 
    showInfo.appendChild(showBlockCharacters)
    showPosterBlock.appendChild(showPosterImg)
    showArticle.appendChild(showInfo)
    showArticle.appendChild(showPosterBlock)

    return showArticle
}

//FUNCIÓN PARA EL MENSAJE DE ERROR
const errorMessage = (error) => {
    const msgContainer = document.getElementById('msgContainer')
    const message = document.getElementById('error-message')
    
    // Agrega clases y quita según cada elemento
    message.classList.add('error-message')
    msgContainer.classList.add('msgContainer')
    msgContainer.style.opacity = '1'
    message.textContent = error 

    setTimeout(() => {
        msgContainer.style.transition = 'opacity 300ms linear'
        msgContainer.style.opacity = '0'
        setTimeout(() => {
            message.classList.remove('error-message')
            msgContainer.classList.remove('error-message')

        }, 500)
    }, 6000)
}

//FUNCIÓN DE BÚSQUEDA ↓↓
const searchShow = async () => {
    const searchInput = document.getElementById('search__input').value.toLowerCase()
    
    if (searchInput) { // Si hay valor en el "input"...
        try {
            const answer = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchInput}`)
            const results = answer.data
            
            if (results.length === 0) {
                console.log(`No show found`) 
                errorMessage(`No show found`) 
                return
            }
            const section = document.getElementById('articles')
            document.getElementById('main__title').textContent = 'Results'
            section.innerHTML = ''
            section.style.height = 'auto'

            const showFound = results[0].show

            const answerDetails = await axios.get(`https://api.tvmaze.com/shows/${showFound.id}?embed=cast`)
            const showResults = answerDetails.data
            const cast = showResults._embedded.cast 

            const article = createCardShow(showResults, cast)
            section.appendChild(article)

        } catch (error) {
            console.log('Error :', error)
            errorMessage(`No show found`) 
        }
    }
}
document.getElementById('search__icon').addEventListener('click', searchShow)
document.getElementById('search__input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchShow()
    }
})

//FUNCIÓN DE CARGA POR DEFECTO DE SERIES AL AZAR ↓↓
const loadingShows = async () => {
    const section = document.getElementById('articles')
    section.innerHTML = ''

    try {
        const answer = await axios.get(`https://api.tvmaze.com/shows`) 
        const results = answer.data
        //console.log(results)

        if (results.length === 0) {
            console.error(`No API results`) //ABRIR UN MENSAJE EN CASO DE ERROR
            errorMessage('No API results')
            return 
        }

        const randomShows = []
        const isEqual = new Set() 

        while (randomShows.length < 6) {
            const chooseRandomShow = Math.floor(Math.random() * results.length)
            if (!isEqual.has(chooseRandomShow)) { // Comprueba que no se repita ninguna selección aleatoria
                isEqual.add(chooseRandomShow) // Lo agrega para seguir comparando
                randomShows.push(results[chooseRandomShow]) //Manda el elemento (show) tomado de results
            }
        }

        const detailsPromises = randomShows.map(show => 
            axios.get(`https://api.tvmaze.com/shows/${show.id}?embed=cast`)
        )
        const detailsAnswers = await Promise.all(detailsPromises)
  
        detailsAnswers.forEach(response => {
            const show = response.data
            const cast = show._embedded.cast            
            const article = createCardShow(show, cast)
            section.appendChild(article)
        })
    }
    catch (error) {
        console.error('FETCH ERROR:', error)
        errorMessage('No API results')
    }
}
loadingShows() 

/* -- PRUEBA --
fetch('https://api.tvmaze.com/search/shows?q=girls')
  .then(res => res.json())
  .then(data => console.log(data))
*/

/* // ---- ¿Math.min(3, cast.length) ---- //
    En resumen, quiere decir, que de toda la cantidad de 
    "cast.length" sólo se quiere tomar 3...

    Compara dos valores: "3" y "cast.length" y devuelve el número menor: "3",
    por lo que para la ejecución de la función en contexto, tomará sólo 
    tres actores de todos los que pueda haber.

    ej. for (let i = 0; i < Math.min(3, element.length); i++;) { ... }
*/
