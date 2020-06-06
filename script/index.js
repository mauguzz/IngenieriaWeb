import {Iniciar_Sesion, 
} from './modules.js'; //Falta agregar la función a modules.Js 



const btn_Login = document.getElementById('btn_Login'); //  HTML to JS
    
const User=documet.getElementById('User'); // Extraigo del form el usuario introducido
const Pass=document.getElementById('Pass');// Extraigo del form la contraseña introducida
console.log(User);

btn_Login.addEventListener("click", ()=>{ //Registro el evento a mi objeto botón, en este caso es a un click

    console.log(User);
    console.log(Pass);
    Iniciar_Sesion(User,Pass); //Invoco a la función de Module.Js
});