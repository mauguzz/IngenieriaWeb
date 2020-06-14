
import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
llenar_opciones_selector} from './modules.js';

const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas


const t_migrantes = document.getElementById('t_migrantes');
const t_general = document.getElementById('t_general');
const t_culturales = document.getElementById('t_culturales');
const t_laborales = document.getElementById('t_laborales');
const t_registros = document.getElementById('t_registros');


const form_migrantes = document.getElementById('f_migrantes');
const form_migrantes_action = document.getElementById('f_migrantes_action');
const form_migrantes_submit = document.getElementById('f_migrantes_submit');

let id =0; //Variable de prueba, id de migrante que se aplica la acción




document.addEventListener("DOMContentLoaded", function(event) {

        llenar_opciones_selector(
            [
                'paises_origen',
                'niveles_educativos',
                'causas_migracion',
                'situaciones_familiares'
            ]
        )
    
        migrante_consultar_todos('#t_migrantes', true)
        .then(datatable=>{
            new $.fn.dataTable.Buttons(datatable, { 
                buttons: 
                    [
                        {
                            text:"Registrar Entrada", 
                            extend: "selectedSingle",
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                
                            },   
                        },

                        {
                            text:"Registrar Salida", 
                            extend: "selectedSingle",
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                
                            },   
                        },

                        {
                            text:"Ver Detalles", 
                            extend: "selectedSingle",
                            attr: {
                                "data-toggle":"modal",
                                "data-target":"#modal_migrantes_details"
                            },
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                migrante_consultar(id, t_general, t_culturales, t_laborales, t_registros)
                            }
                        },

                        {
                            text:"Modificar Datos Generales",
                            extend: "selectedSingle",
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#modal_migrantes_form"
                            },
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                form_migrantes_action.value="modify";
                                form_migrantes_submit.value="Guardar cambios";
                            }     
                        },

                        {
                            text:"Editar Participación en Actividades", 
                            extend: "selectedSingle",
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#migrante_culturales_modal"
                            },
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                
                            },   
                        },

                        {
                            text:"Editar Seguimiento Laboral", 
                            extend: "selectedSingle",
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#migrante_laborales_modal"
                            },
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                
                            },   
                        },

                        {
                            text:"Eliminar", 
                            extend: "selectedSingle",
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                migrante_eliminar(id)
                                .then(result=>{
                                    migrante_consultar_todos('#t_migrantes', false)
                                })
                            },   
                        },

                        {
                            text:"Añadir Migrante", 
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#modal_migrantes_form"
                            },
                            action: ()=>{
                                form_migrantes.reset(); //Limpia el formulario
                                form_migrantes_action.value="create";
                                form_migrantes_submit.value="Registrar";
                                
                            }   
                        }
                    ]
            });
            datatable.buttons().container().appendTo( '#datatable_buttons_container' );  
        })
        .catch(e=>console.log(e));
        //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
   
    
});

/////////////////////////////////////////////////////////////////7
//Para limpiar el formulario, en la ventana modal se puede poner un botón en el cual se pueda dar clic a propia decisión si limpiarlo o no, esto para que sea útil en el caso de modificar

form_migrantes.onsubmit = function(e){
    e.preventDefault();

    
    let formData = new FormData(form_migrantes);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    if(form_migrantes_action.value=="create"){
        migrante_registrar(formJson)
        .then(result=>{
            migrante_consultar_todos('#t_migrantes', false)
        });
    }else if(form_migrantes_action.value=="modify"){
        migrante_modificar(id, formJson)
        .then(result=>{
            migrante_consultar_todos('#t_migrantes', false)
        });
    }
    
}



