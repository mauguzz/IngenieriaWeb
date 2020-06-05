
import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
} from './modules.js';

const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas



/*Script de detalles.html */
const btn_consultar =document.getElementById('btn_consultar');
const tbody_general= document.getElementById('tbody_general');
const tbody_culturales = document.getElementById('tbody_culturales');
const tbody_laborales = document.getElementById('tbody_laborales');

/*Script de migrantes.html */
const btn_todos = document.getElementById('btn_todos');
const btn_migrante_eliminar = document.getElementById('btn_migrante_eliminar');
const tbody_migrantes = document.getElementById('tbody_migrantes');


/*Script de registrarmigrantes.html */
const form_migrantes_registrar = document.getElementById('f_migrantes_registrar');

/*Script de modificarmigrantes.html */
const form_migrantes_modificar = document.getElementById('f_migrantes_modificar');



let id =1; //Variable de prueba, id de migrante que se aplica la acción




/*Script de detalles.html */
btn_consultar.addEventListener("click", ()=>{ 
    migrante_consultar(id,tbody_general,tbody_culturales,tbody_laborales);
    console.log("Presionado");
});


/*Script de migrantes.html */
btn_todos.addEventListener("click", ()=>{
    migrante_consultar_todos(tbody_migrantes);
    console.log("Presionado");
})
btn_migrante_eliminar.addEventListener("click", ()=>{
    migrante_eliminar(id);
})


/*Script de registrarmigrantes.html */
form_migrantes_registrar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_migrantes_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    migrante_registrar(formJson);
}

/*Script de modificarmigrantes.html */
form_migrantes_modificar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_migrantes_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    migrante_modificar(id, formJson);
}