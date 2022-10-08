//Formulario de registro de usuario
let registro_formulario = document.getElementById("registro");
let input_usuario = document.getElementById("registro_usuario");
let input_clave = document.getElementById("registro_clave");
let usuarios = [];
class Usuario {
    constructor(usuario, clave) {
        this.usuario = usuario;
        this.clave = clave

    }
}


registro_formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (input_usuario.value != "" && input_clave.value != "") {
        let nuevo_usuario = new Usuario(input_usuario.value, input_clave.value);
        usuarios.push(nuevo_usuario);
        console.log(usuarios)
        alert("El usuario " + input_usuario.value + " se creó correctamente");        
        localStorage.setItem("usuario", input_usuario.value);
        window.location.href = "index.html";
    
}

})




