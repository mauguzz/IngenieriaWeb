//import {} from './modules.js';
import {culturales_consultar_todos, culturales_eliminar, culturales_modificar, culturales_registrar} from './modules.js';

const btn_culturales_consultar_todos = document.getElementById("btn_culturales_consultar_todos");
const thead_culturales = document.getElementById('thead_culturales');
const tbody_culturales = document.getElementById("tbody_culturales");
const form_culturales_registrar = document.getElementById('f_culturales_registrar');

btn_culturales_consultar_todos.addEventListener("click", ()=>{
    culturales_consultar_todos(thead_culturales, tbody_culturales);
});

form_culturales_registrar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_culturales_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    culturales_registrar(formJson);
}