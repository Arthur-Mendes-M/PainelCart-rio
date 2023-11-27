const url = "https://api.weatherapi.com/v1/current.json?q=S%C3%A3o%20Paulo&lang=pt&key=bf855e615dbb47d9ad2213454232611"

export async function weatherAPIManager() {
    return await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then((data) => getCurrentWeatherData(data)).catch(error => {console.log(error)})
}

function getCurrentWeatherData(weatherData) {
    const currentLocationTime = new Date(weatherData?.location?.localtime)
    const currentDate = `${currentLocationTime.getDate()}/${currentLocationTime.getMonth() + 1}/${currentLocationTime.getFullYear()}`

    const temperatureInCelsius = `${weatherData.current.temp_c}ºC`
    const conditionIcon = weatherData.current.condition.icon

    return {
        currentDate,
        temperatureInCelsius,
        conditionIcon
    }
}