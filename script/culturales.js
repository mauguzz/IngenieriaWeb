//import {} from './modules.js';
import {culturales_consultar_todos, culturales_eliminar, culturales_modificar, culturales_registrar} from './modules.js';

const btn_culturales_consultar_todos = document.getElementById("btn_culturales_consultar_todos");
const thead_culturales = document.getElementById('thead_culturales');
const tbody_culturales = document.getElementById("tbody_culturales");
const form_culturales_registrar = document.getElementById('f_culturales_registrar');



document.addEventListener("DOMContentLoaded", function(event) {

    culturales_consultar_todos('#t_culturales', true)
    .then(datatable=>{
        new $.fn.dataTable.Buttons(datatable, { 
            buttons: 
                [
                    {
                        text:"Agregar Actividad", 
                        extend: "selectedSingle",
                        attr: {
                            "data-toggle":"modal",
                            "data-target":"//#endregionf_culturales_registrar"
                        },
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0];                       
                        },   
                    },
                    {
                        text:"Modificar Actividad", 
                        extend: "selectedSingle",
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0]; 
                            
                        },   
                    },

                    {
                        text:"Revisar Asistencia", 
                        extend: "selectedSingle",
                        attr: {
                        },
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0]; 
                        }
                    }
                ]
        });
        datatable.buttons().container().appendTo( '#datatable_buttons_container' );  
    })
    .catch(e=>console.log(e));
    //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
});


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