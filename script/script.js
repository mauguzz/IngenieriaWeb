import {migrante_consultar as cons, migrante_consultar_todos as consall} from './modules.js';


const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas
const btn_consultar =document.getElementById('btn_consultar');
const btn_todos = document.getElementById('btn_todos');

/*Script de detalles.html */
const tbody_general= document.getElementById('tbody_general');
const tbody_actividades = document.getElementById('tbody_actividades');
const tbody_trabajos = document.getElementById('tbody_trabajos');

/*Script de migrantes.html */
const tbody_migrantes = document.getElementById('tbody_migrantes');


let id =1; //Variable de prueba





btn_consultar.addEventListener("click", ()=>{ 
    //migrante_consultar(); 
    cons(id,tbody_general,tbody_actividades,tbody_trabajos);

    console.log("Presionado");
});

btn_todos.addEventListener("click", ()=>{
    //migrante_consultar_todos();
    consall(tbody_migrantes);
    console.log("Presionado");
})