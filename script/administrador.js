//import {} from './modules.js';
import {funcionarios_consultar, funcionarios_registrar,Validar_SesionA,Cerrar_Sesion} 
from './modules.js';

/*------------------------------------------------Tablas------------------------------------------------------*/

const t_funcionarios = document.getElementById('t_funcionarios');
const thead_funcionarios = document.getElementById('thead_funcionarios');
const tbody_funcionarios = document.getElementById("tbody_funcionarios");

/*-----------------------------------------------Contenido----------------------------------------------------*/
const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas

/*--------------------------------------------------Forms-----------------------------------------------------*/
const form_funcionarios_registrar = document.getElementById('f_funcionarios_registrar');
const form_funcionarios_submit = document.getElementById('f_funcionarios_submit');
const form_funcionarios_action = document.getElementById('f_funcionarios_submit');

const B_Cerrar_Sesion=document.getElementById('B_Cerrar_Sesion');

document.addEventListener("DOMContentLoaded", function(event) {
    
    Validar_SesionA()

    funcionarios_consultar('#t_funcionarios', true)
    .then(datatable=>{
        new $.fn.dataTable.Buttons(datatable, { 
            buttons: 
                [
                    {
                        text:"Agregar Funcionario", 
                        attr: {
                            "data-toggle":"modal",
                            "data-target":"#modal_funcionarios_form"
                        },
                        action: ()=>{
                            form_funcionarios_registrar.reset();
                            form_funcionarios_registrar.reset(); //Limpia el formulario
                            form_funcionarios_action.value="create";                    
                        }   
                    }
                ]
        });
        datatable.buttons().container().appendTo( '#datatable_buttons_container');  
    })
    .catch(e=>console.log(e));
    //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
});


form_funcionarios_registrar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_funcionarios_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);
    funcionarios_registrar(formJson)
    .then(e=>{
        funcionarios_consultar('#t_funcionarios', false);
    });
 
    }


B_Cerrar_Sesion.addEventListener("click", function(event) {
    Cerrar_Sesion();
});
