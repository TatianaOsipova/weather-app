const apiKey = '3410acad2961490d9ca203750232701';

//api.weatherapi.com/v1/current.json?key=3410acad2961490d9ca203750232701&q=London

// Elements on the page

const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');


// Listen to form submission
form.onsubmit = function (e) {
    // Cancel form submission
    e.preventDefault();
    

    // Take value from input, trim spaces
    let city = input.value.trim();

    // Making a request to the server

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            // Check for error
            if (data.error) {
                // Delete previous card
                const prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();

                // If have an error - show it
                const html = `<div class="card">${data.error.message}</div>`;

                // Display a card on the page    
                header.insertAdjacentHTML('afterend', html);               
                
            } else {
                // If haven't error -show card
                // Display receiveed data in a card
                // Delete previous card
                const prevCard = document.querySelector('.card');
                if (prevCard) prevCard.remove();
                
                // Markup for the card
                const html = `<div class="card">
                                <h2 class="card-city">${data.location.name}
                                    <span>${data.location.country}</span>
                                </h2>
    
                                <div class="card-weather">
                                    <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                                    <img class="card-img" src="./img/icon.png" alt="sun and cloud">
                                </div>
    
                                <div class="card-description">${data.current.condition.text}</div>
                            </div>`;
            
                // Display a card on the page    
                header.insertAdjacentHTML('afterend', html);
            }              
        });
}