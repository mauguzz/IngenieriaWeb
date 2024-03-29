//import {} from './modules.js';
import {laborales_consultar_todos, laborales_eliminar, laborales_modificar, laborales_registrar,
    asistencias_laborales_consultar_todos,Validar_Sesion,Cerrar_Sesion} from './modules.js';

/*------------------------------------------------Tablas------------------------------------------------------*/

const thead_laborales = document.getElementById('thead_laborales');
const tbody_laborales = document.getElementById("tbody_laborales");
/*-----------------------------------------------Contenido----------------------------------------------------*/
const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas

/*--------------------------------------------------Forms-----------------------------------------------------*/
const form_laborales_registrar = document.getElementById('f_laborales_registrar');
const form_laborales_submit = document.getElementById('f_laborales_submit');
const form_laborales_action = document.getElementById('f_laborales_action');

const B_Cerrar_Sesion=document.getElementById('B_Cerrar_Sesion');



let id;

document.addEventListener("DOMContentLoaded", function(event) {

    Validar_Sesion()
    laborales_consultar_todos('#t_laborales', true)
    .then(datatable=>{
        new $.fn.dataTable.Buttons(datatable, { 
            buttons: 
                [
                    {
                        text:"Agregar oferta laboral", 
                        attr: {
                            "data-toggle":"modal",
                            "data-target":"#modal_laborales_form"
                        },
                        action: ()=>{
                            
                            form_laborales_registrar.reset(); //Limpia el formulario
                            form_laborales_action.value="create";
                            form_laborales_submit.value="Registrar";                        
                        },   
                    },
                    {
                        text:"Modificar oferta laboral", 
                        extend: "selectedSingle",
                        attr: {
                            "data-toggle":"modal",
                            "data-target":"#modal_laborales_form"
                        },
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0]; 
                            form_laborales_registrar.reset(); //Limpia el formulario
                            form_laborales_action.value="modify";
                            form_laborales_submit.value="Guardar cambios";    
                        },   
                    },

                    {
                        text:"Revisar Asistencia", 
                        extend: "selectedSingle",
                        attr: {
                            "data-toggle":"modal",
                            "data-target":"#Asistencia_laborales_modal"
                        },
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0];                                                
                            asistencias_laborales_consultar_todos(id,'#t_laborales_Asistencia', true);
                        }
                    },
                    ,
                    {
                        text:"Eliminar", 
                        extend: "selectedSingle",
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0]; 
                            laborales_eliminar(id)
                            .then(result=>{
                                laborales_consultar_todos('#t_laborales', false)
                            })
                        }   
                    }

                ]
        });
        datatable.buttons().container().appendTo( '#datatable_buttons_container' );  
    })
    .catch(
        e=>{console.log(e);
        console.log ('Tabla sin datos');
        }
        );
    //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
});


form_laborales_registrar.onsubmit = function(e){
    e.preventDefault();
    let formData = new FormData(form_laborales_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    if(form_laborales_action.value=="create"){
        laborales_registrar(formJson)
        .then(result=>{            
            $("#modal_laborales_form").modal('hide');
            form_culturales_registrar.reset();
            laborales_consultar_todos('#t_laborales', false)
        })
        .catch(e=>{
           //alert("Error al registrar la actividad");
        });

    }else if(form_laborales_action.value=="modify"){
        laborales_modificar(id, formJson)
        .then(result=>{
            form_culturales_registrar.reset();
            $("#modal_laborales_form").modal('hide');
            laborales_consultar_todos('#t_laborales', false)
        })
        .catch(e=>{            
            //alert("Error al registrar la actividad");
        })
        ;
    }

}

B_Cerrar_Sesion.addEventListener("click", function(event) {
    Cerrar_Sesion();
});
