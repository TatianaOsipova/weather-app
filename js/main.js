const apiKey = '3410acad2961490d9ca203750232701';

//api.weatherapi.com/v1/current.json?key=3410acad2961490d9ca203750232701&q=London

const query = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;

fetch(query).then((response) => {
    return response.json()
}).then((data) => {
    console.log(data);
})