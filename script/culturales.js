//import {} from './modules.js';
import {culturales_consultar_todos, culturales_eliminar, culturales_modificar, culturales_registrar} 
from './modules.js';

/*------------------------------------------------Tablas------------------------------------------------------*/

const t_culturales = document.getElementById('t_culturales');
const thead_culturales = document.getElementById('thead_culturales');
const tbody_culturales = document.getElementById("tbody_culturales");

/*-----------------------------------------------Contenido----------------------------------------------------*/
const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas

/*--------------------------------------------------Forms-----------------------------------------------------*/
const form_culturales_registrar = document.getElementById('f_culturales_registrar');
const form_culturales_submit = document.getElementById('f_culturales_submit');
const form_culturales_action = document.getElementById('f_culturales_submit');

document.addEventListener("DOMContentLoaded", function(event) {

    culturales_consultar_todos('#t_culturales', true)
    .then(datatable=>{
        new $.fn.dataTable.Buttons(datatable, { 
            buttons: 
                [
                    {
                        text:"Agregar Actividad", 
                        attr: {
                            "data-toggle":"modal",
                            "data-target":"#modal_culturales_form"
                        },
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0];   
                            form_culturales_registrar.reset(); //Limpia el formulario
                            form_culturales_action.value="create";
                            form_culturales_submit.value="Registrar";                    
                        },   
                    },
                    {
                        text:"Modificar Actividad", 
                        extend: "selectedSingle",
                        attr: {
                            "data-toggle":"modal",
                            "data-target":"#modal_culturales_form"
                        },
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0]; 
                            form_culturales_registrar.reset(); //Limpia el formulario
                            form_culturales_action.value="modify";
                            form_culturales_submit.value="Guardar cambios";    
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
        datatable.buttons().container().appendTo( '#datatable_buttons_container');  
    })
    .catch(e=>console.log(e));
    //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
});


form_culturales_registrar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_culturales_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    if(form_culturales_action.value=="create"){
        culturales_registrar(formJson)
        .then(result=>{
            culturales_consultar_todos('#t_culturales', false)
        });
    }else if(form_culturales_action.value=="modify"){
        culturales_registrar(formJson)
        .then(result=>{
            culturales_modificar('#t_culturales', false)
        });
    }



}

