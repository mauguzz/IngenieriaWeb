//import {} from './modules.js';
import {laborales_consultar_todos, laborales_eliminar, laborales_modificar, laborales_registrar} from './modules.js';

const btn_laborales_consultar_todos = document.getElementById("btn_laborales_consultar_todos");
const tbody_laborales = document.getElementById("tbody_laborales");

btn_laborales_consultar_todos.addEventListener("click", ()=>{
    laborales_consultar_todos(tbody_laborales);
});