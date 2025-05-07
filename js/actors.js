//FUNCIÓN PARA CREAR LOS ARTÍCULOS CON LA INFORMACIÓN DE CADA ACTOR AL CARGAR DICHA SECCIÓN ↓↓
const createCardActor = (cast) => {    
    return cast.slice(0, 6).map(({person}) => { // Recorre cada elemento y por "person" que sería cada actor; obtiene la información
        const personArticle = document.createElement('article') 
        personArticle.classList.add('main__article')
        
        const personImg = document.createElement('img')
        personImg.classList.add('article__person-image')
        personImg.src = person.image ? person.image.medium : ''
        personImg.alt = person.name ;
    
        const articleInfo = document.createElement('div') // div contenedor de todo
        articleInfo.classList.add('article__person-info') 
        
        const nameContainer = document.createElement('div') // Contenedor del nombre del actor
        nameContainer.classList.add('person-info__name-container')

        const descrName = document.createElement('p') // Descripción del nombre (Name)
        descrName.classList.add('name-container__descr')
        descrName.textContent = 'Name:'

        const personName = document.createElement('p')  // Contenedor del "strong" con nombre del actor
        personName.classList.add('name-container__name')

        const strong = document.createElement('p') // Nombre del actor
        strong.classList.add('name__strong')
        strong.textContent = person.name

        const originContainer = document.createElement('div') // Contenedor del origen del actor
        originContainer.classList.add('person-info__origin-container')

        const descrOrigin = document.createElement('p') // Descripción del origen (Country)
        descrOrigin.classList.add('origin-container__descr')
        descrOrigin.textContent = 'Country:'

        const origin = document.createElement('p') // Origen del actor
        origin.classList.add('origin-container__origin')
        origin.textContent = person.country.name
        
        const birthAndAge = document.createElement('p') // Contendor del nacimiento y edad del actor
        birthAndAge.classList.add('person-info__birth-age') 
        
        const descrBirth = document.createElement('p') // Descripción del nacimiento y edad del actor
        descrBirth.textContent = 'Birthday / Age:'

        const time = document.createElement('time') // Nacimiento y edad del actor
        time.classList.add('birth-age__birth')
        time.dateTime = person.birthday
        time.textContent = person.birthday

        const span = document.createElement('span')
        span.classList.add('birth-age__age')
        const date = new Date() // Consigue la fecha actual
        const fullYear = date.getFullYear() // ...Sólo el año
        span.textContent = person.birthday ? `(${fullYear - person.birthday.split('-')[0]} years)` : 'No available' 

            // Agrega imagen del actor ↓↓
        personArticle.appendChild(personImg)
            // Arma nombre 
        personName.appendChild(strong)
        nameContainer.appendChild(descrName)
        nameContainer.appendChild(personName)
            // Arma datos de origen
        originContainer.appendChild(descrOrigin)
        originContainer.appendChild(origin)
            // Arma datos de nacimiento 
        birthAndAge.appendChild(descrBirth)
        birthAndAge.appendChild(time)
        birthAndAge.appendChild(span)
            // Combina la información anterior
        articleInfo.appendChild(nameContainer)
        articleInfo.appendChild(originContainer)
        articleInfo.appendChild(birthAndAge)
            // Completa el artículo 
        personArticle.appendChild(articleInfo)
        
        return personArticle 
    })
}

//FUNCIÓN PARA CREAR LOS ARTÍCULOS CON LA BÚSQUEDA DE UN ACTOR ↓↓
//---- Se crean los mismo elementos que en la función anterior
const personSearch = (person) => {  
    const personArticle = document.createElement('article') 
    personArticle.classList.add('main__article')
    
    const personImg = document.createElement('img')
    personImg.classList.add('article__person-image')
    personImg.src = person.image ? person.image.medium : ''
    personImg.alt = person.name ;

    const articleInfo = document.createElement('div') 
    articleInfo.classList.add('article__person-info') 
    
    const nameContainer = document.createElement('div') 
    nameContainer.classList.add('person-info__name-container')

    const descrName = document.createElement('p') 
    descrName.classList.add('name-container__descr')
    descrName.textContent = 'Name:'

    const personName = document.createElement('p')
    personName.classList.add('name-container__name')

    const strong = document.createElement('p')
    strong.classList.add('name__strong')
    strong.textContent = person.name

    const originContainer = document.createElement('div')
    originContainer.classList.add('person-info__origin-container')

    const descrOrigin = document.createElement('p')
    descrOrigin.classList.add('origin-container__descr')
    descrOrigin.textContent = 'Country:'

    const origin = document.createElement('p') 
    origin.classList.add('origin-container__origin')
    origin.textContent = person.country.name
    
    const birthAndAge = document.createElement('p') 
    birthAndAge.classList.add('person-info__birth-age') 
    
    const descrBirth = document.createElement('p') 
    descrBirth.textContent = 'Birthday / Age:'

    const time = document.createElement('time')
    time.classList.add('birth-age__birth')
    time.dateTime = person.birthday
    time.textContent = person.birthday

    const span = document.createElement('span')
    span.classList.add('birth-age__age')
    const date = new Date()
    const fullYear = date.getFullYear() 
    span.textContent = person.birthday ? `(${fullYear - person.birthday.split('-')[0]} years)` : 'No available' 


    personArticle.appendChild(personImg)
    personName.appendChild(strong)
    nameContainer.appendChild(descrName)
    nameContainer.appendChild(personName)
    originContainer.appendChild(descrOrigin)
    originContainer.appendChild(origin)
    birthAndAge.appendChild(descrBirth)
    birthAndAge.appendChild(time)
    birthAndAge.appendChild(span)
    articleInfo.appendChild(nameContainer)
    articleInfo.appendChild(originContainer)
    articleInfo.appendChild(birthAndAge)
    personArticle.appendChild(articleInfo)
    
    return personArticle 
}

//FUNCIÓN PARA EL MENSAJE DE ERROR ↓↓
const errorMessage = (error) => {
    const msgContainer = document.getElementById('msgContainer')
    const message = document.getElementById('error-message')
    
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
    }, 7000)
}

//FUNCIÓN DE BÚSQUEDA DE UN ACTOR ↓↓
const searchShow = async () => {
    const searchInput = document.getElementById('search__input').value.toLowerCase()
    
    if (searchInput) {
        try {
            const answer = await axios.get(`https://api.tvmaze.com/search/people?q=${searchInput}`)
            const results = answer.data
            
            if (results.length === 0) {
                console.log(`No show found`) 
                errorMessage(`No show found`) 
                section.style.height = '40.5vh'
                return
            }
            const section = document.getElementById('articles')
            document.getElementById('main__title').textContent = 'Results'
            section.innerHTML = ''
            section.style.height = 'auto'

            const found = results[0]
            const person = found.person
            const article = personSearch(person) 
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

//FUNCIÓN DE CARGA POR DEFECTO DE LOS SEIS PRIMEROS ACTORES ↓↓
const loadingActors = async () => {
    const section = document.getElementById('articles')
    section.innerHTML = ''

    try {
        const answer = await axios.get(`https://api.tvmaze.com/shows`) 
        const results = answer.data

        if (results.length === 0) {
            console.error(`No API results`) 
            errorMessage('No API results')
            return 
        }

        const found = results[0]
        const detailsAnswer = await axios.get(`https://api.tvmaze.com/shows/${found.id}?embed=cast`)

        const newResult = detailsAnswer.data
        const cast = newResult._embedded.cast 
        const article = createCardActor(cast) // Llama a la función "creatCardActor"
        article.forEach(article => section.appendChild(article)) // Cada tarjeta creada se agrega al "section"
    }
    catch (error) {
        console.error('FETCH ERROR:', error)
        errorMessage('No API results')
    }
}
loadingActors() 