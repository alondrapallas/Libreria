import Handlebars from 'handlebars';
import template from './template.html';
import swal from 'sweetalert2';
let iniciar= '';

let database;

export default (_database) => {
    database = _database;
    render();
  };

const iniciarSesion = (ev) => {
    var config = {
    apiKey: "AIzaSyDvZwcJBqSlXO4V-RknC0bcGUfdi0GWhxE",
    authDomain: "proyecto-javascript.firebaseapp.com",
    databaseURL: "https://proyecto-javascript.firebaseio.com",
    projectId: "proyecto-javascript",
    storageBucket: "proyecto-javascript.appspot.com",
    messagingSenderId: "373326143996"

    };
    ev.preventDefault();
    const email = document.getElementById('txtEmail').value;
    const password = document.getElementById('txtPassword').value;
    console.log(email, password);
    firebase.auth().onAuthStateChanged( firebaseUser => {
        if(firebaseUser) {
          console.log(firebaseUser);
          btnLogin.classList.remove('hide');
        } else {
          console.log('no logeado');
          btnLogin.classList.add('hide');
        }
      });
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
           alert("BIENVENIDO/A");
            render();
        }).catch(function (error) {
            alert("USUARIO Y/O CONTRASEÑA INCORRECTO");
            render();
        }, false);
    
    
}

const render = () => {
    const t = Handlebars.compile(template);
    const appDOM = document.getElementById("main");
    appDOM.innerHTML = t({iniciar});
    document.getElementById('btnLogin').addEventListener("click", iniciarSesion); 
}