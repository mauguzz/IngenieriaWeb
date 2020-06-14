import {Iniciar_Sesion, 
} from './modules.js';



const btn_Login = document.getElementById('btn_Login'); //  HTML to JS
const Form_Iniciar_Sesion = document.getElementById('Form_Iniciar_Sesion');

Form_Iniciar_Sesion.onsubmit = function(e){ //Registro el evento a mi objeto botón, en este caso es a un click
    e.preventDefault();
    let formData = new FormData(Form_Iniciar_Sesion); //Creo un objeto con la información del form
    let formJson = JSON.stringify(Object.fromEntries(formData)); //Convierto mi objeto a un formato Json
    Iniciar_Sesion(formJson);
    
};