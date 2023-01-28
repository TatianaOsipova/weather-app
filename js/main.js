const apiKey = '3410acad2961490d9ca203750232701';

//api.weatherapi.com/v1/current.json?key=3410acad2961490d9ca203750232701&q=London

// We need to get the name of the city

const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');
let city;

// Listen to form submission
form.onsubmit = function (e) {
    // Cancel form submission
    e.preventDefault();
    

    // Take value from input, trim spaces
    city = input.value.trim();

    // Making a request to the server

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data.location.name);
            console.log(data.location.country);
            console.log(data.current.temp_c);

        });

}