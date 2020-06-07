//import {} from './modules.js';
import {laborales_consultar_todos, laborales_eliminar, laborales_modificar, laborales_registrar} from './modules.js';

const btn_laborales_consultar_todos = document.getElementById("btn_laborales_consultar_todos");
const thead_laborales = document.getElementById('thead_laborales');
const tbody_laborales = document.getElementById("tbody_laborales");
const form_laborales_registrar = document.getElementById('f_laborales_registrar');

btn_laborales_consultar_todos.addEventListener("click", ()=>{
    laborales_consultar_todos(thead_laborales, tbody_laborales);
});

form_laborales_registrar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_laborales_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    laborales_registrar(formJson);
}