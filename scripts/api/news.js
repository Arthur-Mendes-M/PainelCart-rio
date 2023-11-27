// const url = 'https://newsapi.org/v2/everything?q=tesla&from=2023-10-26&sortBy=publishedAt&language=pt&apiKey=8b36cbdba3aa412ba93c9cfb674ad220'
// const secondUrl = 'https://api.thenewsapi.com/v1/news/all?language=pt&api_token=n4vnEcYQgLUnfLLHlXicbSVvGtUAVxRqEprFQwSK'

const url = "https://gnews.io/api/v4/top-headlines?lang=pt&category=general&apikey=9d230aef210f37757aea9c6f616bb23d"

export async function newsAPIManager() {
    // return Promise.race([
    //     fetch(secondUrl)
    //     .then(result => result.json())
    //     .then(data => articlesManagerFromTheNewsAPI(data.data))
    //     .catch(error => {console.log(error)}),
    //     fetch(url)
    //     .then(result => result.json())
    //     .then(data => articlesManagerFromNewsAPI(data.articles))
    //     .catch(error => {console.log(error)})
    // ]).catch(error => {
    //     Promise.all([
    //         fetch(secondUrl)
    //         .then(result => result.json())
    //         .then(data => articlesManagerFromTheNewsAPI(data.data))
    //         .catch(error => {console.log(error)}),
    //         fetch(url)
    //         .then(result => result.json())
    //         .then(data => articlesManagerFromNewsAPI(data.articles))
    //         .catch(error => {console.log(error)})
    //     ])
    // })

    return await fetch(url)
        .then(result => result.json())
        .then(data => articlesManagerFromNewsAPI(data.articles))
        .catch(error => {console.log(error)})      
}

// function articlesManagerFromTheNewsAPI(data) {
//     const filteredArticles = data
//     .map(article => {return {
//         title: article.title,
//         image: article.image_url,
//         description: article.description
//     }})

//     return filteredArticles
// }


function articlesManagerFromNewsAPI(articles) {
    // const securtyFonts = ["Ig.com.br", "Terra.com.br"]

    const filteredArticles = articles
    // ?.filter(article => securtyFonts.includes(article.source.name))
    ?.map(article => {return {
        title: article.title,
        // image: article.urlToImage,
        image: article.image,
        description: article.description
    }})

    return filteredArticles
}

export function generateNewsCards(data) {
    let allElemntes = []
    if(!data || data === undefined || data.length == 0) return

    for(let i = 0; i < 1; i++) {
        const randomNews = data[Math.floor(Math.random() * data.length)]

        const newsCardContainer = document.createElement('div')
        newsCardContainer.className = 'card'
    
        const newsImageContainer = document.createElement('div')
        newsImageContainer.className = 'image'
    
        const newsImageElement = document.createElement('img')
        newsImageElement.src = randomNews.image

        newsImageContainer.appendChild(newsImageElement)

        const newsContentContainer = document.createElement('div')
        newsContentContainer.className = 'content'
    
        const newsTitleContainer = document.createElement('div')
        newsTitleContainer.className = 'title'
        newsTitleContainer.innerText = randomNews.title
    
        const newsDescrptionContainer = document.createElement('div')
        newsDescrptionContainer.className = 'descrption'
        newsDescrptionContainer.innerText = randomNews.description

        newsContentContainer.append(newsTitleContainer, newsDescrptionContainer)

        newsCardContainer.append(newsImageContainer, newsContentContainer)

        allElemntes.push(newsCardContainer)
    }

    return allElemntes
}