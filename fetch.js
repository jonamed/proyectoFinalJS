/*
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log(data))
*/


let contenedor = document.getElementById("clima");

fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&units=metric&appid=c0bb10baf25de6afb6a362bd2577e9fd")
    .then(response => response.json())
    .then(data => {
        contenedor.innerHTML = `<span> Ciudad:  ${data.name}</span>
                               <span> // Temperatura actual: ${data.main.temp}</span>`
    }) 