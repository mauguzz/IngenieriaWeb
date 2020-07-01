
import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
llenar_opciones_selector,Validar_Sesion,Cerrar_Sesion, registros_registrar, registros_modificar} from './modules.js';

const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas


const t_migrantes = document.getElementById('t_migrantes');
const t_general = document.getElementById('t_general');
const t_culturales = document.getElementById('t_culturales');
const t_laborales = document.getElementById('t_laborales');
const t_registros = document.getElementById('t_registros');


const form_migrantes = document.getElementById('f_migrantes');
const form_migrantes_action = document.getElementById('f_migrantes_action');
const form_migrantes_submit = document.getElementById('f_migrantes_submit');


const B_Cerrar_Sesion=document.getElementById('B_Cerrar_Sesion');

let id =0; //Variable de prueba, id de migrante que se aplica la acción
let show;



document.addEventListener("DOMContentLoaded", function(event) {


        Validar_Sesion()

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
                                registros_registrar(id, JSON.stringify({"id_migrante": id}));
                                
                            },   
                        },

                        {
                            text:"Registrar Salida", 
                            extend: "selectedSingle",
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                registros_modificar(id, JSON.stringify({"id_migrante": id}));
                                
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
                                migrante_consultar(id, false, t_general, t_culturales, t_laborales, t_registros)
                                show=true;
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
                                show=true;
                            }     
                        },

                        /*
                        {
                            text:"Editar Participación en Actividades", 
                            extend: "selectedSingle",
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#migrante_culturales_modal"
                            },
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                edicion_migrante_culturales(id); //Llama a esta función para hacer consultas a la BD. Está implementada en este mismo archivo.
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
                                edicion_migrante_laborales(id); //Llama a esta función para hacer consultas a la BD. Está implementada en este mismo archivo.
                            },   
                        },
                        */

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
                                show=true;
                                
                            }   
                        }
                    ]
            });
            datatable.buttons().container().appendTo( '#datatable_buttons_container' );  
        })
        .catch(e=>console.log(e));
        //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
   
    
});


//En estas funciones se llenará el contenido de las ventanas Modales para editar las asistencias de actividades culturales y ofertas laborales por parte de los migrantes
//Las ventanas modales ya están implementadas en HTML, falta hacer una importación con getElementById de lo necesario.
//Como se puede ver en la página, existen los botones "Editar Seguimiento Laboral", y "Editar Participación en Actividades", la idea es que estas ediciones se abran en la misma página de migrantes
function edicion_migrante_culturales(id){
 
}
function edicion_migrante_laborales(id){
    //Implementar la función "table_consultar_todos(table, init)" importada desde Modules.js donde table es "#t_migrante_laborales_todas" 
   //Implementar la función "table_consultar_por_migrante(table, id, init)" importada desde Modules.js donde table es "#t_migrante_laborales_seleccionadas"  y el id es el pasado a la función
}

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
            
            alert(`Hola ${result['nombre']}, bienvenido a México. La siguiente es su llave de autorización: " ${result['llave_migrante']} ". 
            Cada que cambie de ubicación y se requiera de registrar en otro punto de control, o cuando quiera corregir sus datos 
            se le pedirá dicha clave. Guarde y mantenga esta clave de manera secreta pero envíesela a su familiar para que pueda estar al pendiente de usted`);
            migrante_consultar_todos('#t_migrantes', false);
            show = false;
            
        })
        .catch(e=>{
            show = false;
            
            alert("Error al insertar migrante");
        });
    }else if(form_migrantes_action.value=="modify"){
        migrante_modificar(id, formJson)
        .then(result=>{
            migrante_consultar_todos('#t_migrantes', false);
            show=false;
            
        })
        .catch(e=>{
            show = false;
            
            alert("Error al modificar migrante");
        });
    }
    
}


$("#f_migrantes_submit").submit( function() { 
    $("#modal_migrantes_form").modal('hide');
});




B_Cerrar_Sesion.addEventListener("click", function(event) {
    Cerrar_Sesion();
});
