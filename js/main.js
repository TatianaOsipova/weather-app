const apiKey = '3410acad2961490d9ca203750232701';

//api.weatherapi.com/v1/current.json?key=3410acad2961490d9ca203750232701&q=London

// Elements on the page

const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

function removeCard() {
    const prevCard = document.querySelector('.card');
    if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
    // If have an error - show it
    const html = `<div class="card">${errorMessage}</div>`;

    // Display a card on the page    
    header.insertAdjacentHTML('afterend', html);   
}

function showCard({name, country, temp, condition}) {
    // Markup for the card
    const html = `<div class="card">
                <h2 class="card-city">${name}
                    <span>${country}</span>
                </h2>

                <div class="card-weather">
                    <div class="card-value">${temp}<sup>°c</sup></div>
                    <img class="card-img" src="./img/icon.png" alt="sun and cloud">
                </div>

                <div class="card-description">${condition}</div>
            </div>`;

    // Display a card on the page    
    header.insertAdjacentHTML('afterend', html);                    
}

async function getWeather(city) {
    // Making a request to the server
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;    
}  


// Listen to form submission
form.onsubmit = async function (e) {
    // Cancel form submission
    e.preventDefault();
    

    // Take value from input, trim spaces
    let city = input.value.trim();

    // Get data from server
    const data = await getWeather(city);      

    // Check for error
    if (data.error) {
        // Delete previous card
        removeCard();

        // Show a card with an error
        showError(data.error.message);            
        
    } else {
        // If haven't error -show card
        // Display receiveed data in a card
        // Delete previous card
        removeCard();

        const weatherData = {
            name: data.location.name,
            country: data.location.country,
            temp: data.current.temp_c,
            condition: data.current.condition.text,
        };

        showCard(weatherData);                               
    }      

    

    // fetch(url)
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         console.log(data);

    //         // Check for error
    //         if (data.error) {
    //             // Delete previous card
    //             removeCard();

    //             // Show a card with an error
    //             showError(data.error.message);            
                
    //         } else {
    //             // If haven't error -show card
    //             // Display receiveed data in a card
    //             // Delete previous card
    //             removeCard();

    //             showCard(
    //                 data.location.name,
    //                 data.location.country,
    //                 data.current.temp_c,
    //                 data.current.condition.text
    //             );                             
    //         }              
    //     });
}