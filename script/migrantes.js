
import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
} from './modules.js';

const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas


const t_migrantes = document.getElementById('t_migrantes');
const t_general = document.getElementById('t_general');
const t_culturales = document.getElementById('t_culturales');
const t_laborales = document.getElementById('t_laborales');
const t_registros = document.getElementById('t_registros');


const btn_consultar =document.getElementById('btn_consultar');
const btn_migrante_eliminar = document.getElementById('btn_migrante_eliminar');

const form_migrantes_registrar = document.getElementById('f_migrantes_registrar');
const form_migrantes_modificar = document.getElementById('f_migrantes_modificar');

let id =1; //Variable de prueba, id de migrante que se aplica la acción

console.log(t_registros.children['thead_registros'])

btn_consultar.addEventListener("click", ()=>{ 
    migrante_consultar(id,
        t_general.children['thead'], 
        t_culturales.children['thead'], 
        t_laborales.children['thead'], 
        t_registros.children['thead'],
        t_general.children['tbody'],
        t_culturales.children['tbody'],
        t_laborales.children['tbody'], 
        t_registros.children['tbody']
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