
import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
} from './modules.js';

const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas


const t_migrantes = document.getElementById('t_migrantes');

const thead_general = document.getElementById('thead_general');
const thead_culturales = document.getElementById('thead_culturales');
const thead_laborales = document.getElementById('thead_laborales');
const thead_migrantes = document.getElementById('thead_migrantes');
const thead_registros = document.getElementById('thead_registros')

const tbody_general= document.getElementById('tbody_general');
const tbody_culturales = document.getElementById('tbody_culturales');
const tbody_laborales = document.getElementById('tbody_laborales');
const tbody_migrantes = document.getElementById('tbody_migrantes');
const tbody_registros = document.getElementById('tbody_registros');

const btn_consultar =document.getElementById('btn_consultar');
const btn_migrante_eliminar = document.getElementById('btn_migrante_eliminar');

const form_migrantes_registrar = document.getElementById('f_migrantes_registrar');
const form_migrantes_modificar = document.getElementById('f_migrantes_modificar');

let id =1; //Variable de prueba, id de migrante que se aplica la acción

console.log(t_migrantes.children['thead'])

btn_consultar.addEventListener("click", ()=>{ 
    migrante_consultar(id,
        thead_general, 
        thead_culturales, 
        thead_laborales, 
        thead_registros, 
        tbody_general,
        tbody_culturales,
        tbody_laborales, 
        tbody_registros
    );
});


document.addEventListener("DOMContentLoaded", function(event) {
    
        migrante_consultar_todos('#t_migrantes');  //thead_migrantes, tbody_migrantes
        //$('#t_migrantes').DataTable();
   
    
});




btn_migrante_eliminar.addEventListener("click", ()=>{
    migrante_eliminar(id);

})

form_migrantes_registrar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_migrantes_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    migrante_registrar(formJson);
}

form_migrantes_modificar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_migrantes_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    migrante_modificar(id, formJson);
}