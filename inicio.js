/*

La idea de mi proyecto sería una app simil market, pero con el fin de canjear mano a mano diferentes libros y juegos.
Tiene como eje principal la "problemática" del elevado costo de los videojuegos, sumado a que, en el 90%
de los casos, una vez terminados tanto los juegos como los libros, quedan en la biblioteca por largos períodos de tiempo.
-- La idea sería ir armando un "market", con opciones para filtrado por genero, por nombre, y por ubicación, ya que el fin sería
    un encuentro con el publicante para el intercambio--
-- Tengo que imaginar cómo serían las funciones de ambas partes, ya que por un lado uno generaría una búsqueda, 
    pero por otro lado, tendría que tener un catálogo personal, a modo de oferta para intercambiar:
    Ejemplo:
    Paso 1, en mi perfil publico mi "portfolio" o "catálogo" de juegos (o libros, pero eso sería en otra sección aparte) personales, los que estoy dispuesto a intercambiar. 
    Paso 2, yo estoy interesado en el juego A, lo busco entre publicaciones de usuarios, preferentemente cercanos.
    Paso 3, al encontrarlo, le enviaría una notificación a dicho usuario, el cual obtendrá acceso a mi portfolio cargado anteriormente.
    Paso 4, si tengo alguno de su interés, podrá responderme la notificación y se procederá a un chat para coordinar.

*/

// Datos de juegos precargados
const juegos = [
    {
        id: 1,
        nombre: "Tomb Raider",
        img: './img/tombraider.jpg',
        ubicacion: "Temperley",
    },
    {
        id: 2,
        nombre: "Fifa 22",
        img: './img/fifa.jpg',
        ubicacion: "Bandfield",
    },
    {
        id: 3,
        nombre: "The Last of Us",
        img: './img/thelastofus.jpg',
        ubicacion: "Capital Federal",
    },
    {
        id: 4,
        nombre: "Crash Bandicoot",
        img: './img/crashbandicoot.jpg',
        ubicacion: "Capital Federal",
    },
    {
        id: 5,
        nombre: "Call of Duty",
        img: './img/callofduty.jpg',
        ubicacion: "Ezeiza",
    },
    {
        id: 6,
        nombre: "Battlefield",
        img: './img/battlefield.jpg',
        ubicacion: "Capital Federal",
    },
    {
        id: 7,
        nombre: "Gran Turismo",
        img: './img/granturismo.jpg',
        ubicacion: "Temperley",
    },
    {
        id: 8,
        nombre: "Uncharted",
        img: './img/uncharted.jpg',
        ubicacion: "Quilmes",
    },


]
//Se declaran los contenedores de juegos y favoritos
const contenedorJuegos = document.querySelector('.contenedor-juegos');
const listadoFavoritos = document.querySelector('.listado-favoritos');
const juegosFavoritos = [];

// Evento que carga los datos al iniciar la página
/* Nota: Todo el contenido de los contenedores está generado
    por código JS, con lo cual no "existe" en el HTML inicial,
    por eso si este evento se elimina, la página resultante estará en blanco"
*/
document.addEventListener('DOMContentLoaded', () => {
    mostrarJuegos();
})
//



//FUNCIONES
//Genera la interfaz HTML para visualizar los objetos de juegos cargados en el array
function mostrarJuegos() {
    juegos.forEach(juego => {
        const divJuego = document.createElement('div');
        divJuego.classList.add('card');

        const imgJuego = document.createElement('img');
        imgJuego.src = juego.img;
        imgJuego.classList.add('imagen-juego');

        const tituloJuego = document.createElement('h3');
        tituloJuego.textContent = juego.nombre;

        //Boton que, al clickearlo, envía una copia de ese elemento a un nuevo array
        const btnFavorito = document.createElement('button');
        btnFavorito.classList.add('btn-favorito');
        btnFavorito.textContent = "Agregar a Favoritos";
        btnFavorito.onclick = () => {
            //  Acá se agrega la funcón de notificaciones de Toastify, está enlazada al botón de "agregarAFavorito"  //
            agregarAFavorito(juego.id)
            Toastify({
                text: "Agregado a favoritos",
                duration: 1000,
                gravity: "bottom",
                style: {
                    fontSyze: "22px",
                    background: "black",
                    color: "white",
                }

            }).showToast();
            //  Fin de la función de Toastify  //
        };

        divJuego.appendChild(imgJuego);
        divJuego.appendChild(tituloJuego);
        divJuego.appendChild(btnFavorito);
        contenedorJuegos.appendChild(divJuego);
    })

};

//  Acá agregué la recomendación que me indicaste para agregar la cantidad a los juegos favoritos   //
const agregarAFavorito = (itemId) => {
    const juegoSeleccionado = juegosFavoritos.find((prod) => prod.id === itemId)

    if (juegoSeleccionado) {
        juegoSeleccionado.cantidad++
        console.log("+1 cantidad")
    } else {
        const prod = juegos.find((prod) => prod.id === itemId)

        juegosFavoritos.push({
            id: prod.id,
            nombre: prod.nombre,
            img: prod.img,
            cantidad: 1
        })
        console.log("Sumado a Favoritos")
    }
    mostrarJuegosFavoritos(juegosFavoritos)

}

// Se genera la interfaz de cada elemento guardado en favoritos
function mostrarJuegosFavoritos(favoritos) {
    listadoFavoritos.innerHTML = "";

    favoritos.forEach(juego => {
        const divJuego = document.createElement('div');
        divJuego.classList.add('card');

        const imgJuego = document.createElement('img');
        imgJuego.src = juego.img;
        imgJuego.classList.add('imagen-juego');

        const tituloJuego = document.createElement('h3');
        tituloJuego.textContent = juego.nombre;
        tituloJuego.style.color = "black";

        const cantidad = document.createElement('p');
        cantidad.innerHTML = `<p>Cantidad: ${juego.cantidad}</p>`
        cantidad.style.color = "black";

        const btn_eliminar = document.createElement("button");
        btn_eliminar.textContent = "borrar";
        btn_eliminar.classList.add("borrar");

        divJuego.appendChild(imgJuego);
        divJuego.appendChild(tituloJuego);
        divJuego.append(cantidad);
        divJuego.appendChild(btn_eliminar)

        listadoFavoritos.appendChild(divJuego);
    })
    let botones_borrar = document.getElementsByClassName("borrar");
    for (let btn of botones_borrar) {
      btn.addEventListener("click", eliminar);
    }
};
//////////////////////
function eliminar(e) {
    let target = e.target.parentNode;
    let nombres = e.target.parentNode.getElementsByClassName("borrar");
  
    juegosFavoritos = JSON.parse(localStorage.getItem("juegosFavoritos"));
  
    for (let p of favoritos) {
      for (let nombre of nombres) {
        if (p.cantidad > 1 && p.nombre === nombre.innerText) {
          p.cantidad--;
          localStorage.setItem("juegosFavoritos", JSON.stringify(juegosFavoritos));
          juegosFavoritos.innerHTML = "";
          mostrarJuegosFavoritos(favoritos);
        } else if (p.cantidad === 1 && p.nombre === nombre.innerText) {
          target.remove();
          juegosFavoritos = JSON.parse(localStorage.getItem("juegosFavoritos"));
          juegosFavoritos = juegosFavoritos.filter((e) => e.nombre !== nombre.innerText);
          agregarAFavorito();
          localStorage.setItem("juegosFavoritos", JSON.stringify(juegosFavoritos));
          juegosFavoritos.innerHTML = "";
          mostrarJuegosFavoritos(juegosFavoritos)
          return mostrarJuegosFavoritos;
        }
      }
    }
  }
///////////////////////

// Función para filtrar por ubicacion "Capital Federal"
function filtrarUbicacion(juego) {
    return juego.ubicacion == "Capital Federal";
}
let juegosFiltrados = juegos.filter(filtrarUbicacion);
console.log(juegosFiltrados);


swal({
    title: "Bienvenido a nuestra plataforma!",    
    icon: "success",
    button: "Comenzar",
  });




