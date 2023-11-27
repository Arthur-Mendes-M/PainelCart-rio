import { generateNewsCards, newsAPIManager } from "./api/news.js";
import { weatherAPIManager } from "./api/weather.js";

document.querySelector('video').play()

weatherAPIManager().then(data => {
    const {
        currentDate,
        temperatureInCelsius,
        conditionIcon
    } = data

    const today_fullDate = document.querySelector('.today_fullDate')
    const temperature_image = document.querySelector('.temperature_image')
    const temperature_text = document.querySelector('.temperature_text')
    const today_fullHour = document.querySelector('.today_fullHour')

    today_fullDate.innerHTML = currentDate
    temperature_image.src = conditionIcon
    temperature_text.innerHTML = temperatureInCelsius

    setInterval(() => {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        const novoHorario = `${horas}:${minutos}`;
        
        today_fullHour.innerText = novoHorario;
    }, 1000);
})

newsAPIManager().then(data => {
    const newsContainer = document.querySelector('.news')

    const newsCards = generateNewsCards(data)
    if(!newsCards) return

    newsContainer.innerHTML = ""

    newsContainer.append(...newsCards)

    setInterval(() => {
        newsContainer.innerHTML = ""

        const newsCardsRefrash = generateNewsCards(data)
        if(!newsCardsRefrash) return

        newsContainer.append(...newsCardsRefrash)
    }, 30 * 1000)
})

const currentPasswordElement = document.querySelector('#current .password')
const currentAttendantElement = document.querySelector('#current .attendant')

const recordsPasswords = document.querySelector('#records .passwords .data')
const recordsAttendants = document.querySelector('#records .attendants .data')

const changeCurrentData = document.getElementById('changeCurrentData')

let currentPassword = 0

if(!read_DataOnLocalStorage('lastCalls')) {
    currentPassword = 2310
} else {
    const lastPassword = read_DataOnLocalStorage('lastCalls')[read_DataOnLocalStorage('lastCalls')?.length - 1]?.password?.slice(1)
    const lastPasswordNumber = Number(lastPassword)

    currentPassword = lastPasswordNumber + 1
}


let lastCalls = []

function verifyCurrentPassword() {
    if(!read_DataOnLocalStorage('lastCalls')) {
        currentPassword = 2310
    } else {
        const lastPassword = read_DataOnLocalStorage('lastCalls')[read_DataOnLocalStorage('lastCalls')?.length - 1]?.password?.slice(1)
        const lastPasswordNumber = Number(lastPassword)
    
        currentPassword = lastPasswordNumber + 1
    }   
}

function generateNewPassword(){
    const newPassword = `P${currentPassword}`
    currentPasswordElement.textContent = newPassword
    return newPassword
}

function generateNewAttendant(){
    const attendant =  Math.floor(Math.random() * (7 - 0) + 1)
    currentAttendantElement.textContent = attendant
    return attendant
}

function create_DataOnLocalStorage(variableName, data) {
    localStorage.setItem(variableName, JSON.stringify(data))
}

function read_DataOnLocalStorage(variableName) {
    const foundData = localStorage.getItem(variableName)

    return JSON.parse(foundData)
}


function generateLayoutLastCalls(){
    verifyCurrentPassword()
    const savedData = read_DataOnLocalStorage('lastCalls')

    const attendant = document.createElement('h1')
    const password = document.createElement('h1')

    const currentPassword = generateNewPassword()
    password.innerText = currentPassword

    const currentAttendant = generateNewAttendant()
    attendant.innerText = currentAttendant

    if(savedData?.length > 0) {
        const reversedSavedData = [...savedData].reverse()
        const filtredSavedData = reversedSavedData.filter((_, index) => index < 4)

        filtredSavedData.forEach(call => {
            const olderCall_attendant = document.createElement('h1')
            const olderCall_password = document.createElement('h1')

            olderCall_attendant.innerText = call.attendant
            olderCall_password.innerText = call.password
        
            recordsPasswords.appendChild(olderCall_password)
            recordsAttendants.appendChild(olderCall_attendant)
        })

        create_DataOnLocalStorage('lastCalls', [
            ...savedData,
            {password: password.innerText, attendant: attendant.innerText,}
        ])
    } else {
        create_DataOnLocalStorage('lastCalls', [
            {password: password.innerText, attendant: attendant.innerText,}
        ])
    }
}

generateLayoutLastCalls()


changeCurrentData.addEventListener('click', () => {
    recordsPasswords.innerHTML = ''
    recordsAttendants.innerHTML = ''

    generateLayoutLastCalls()
})