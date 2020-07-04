
import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
llenar_opciones_selector,Validar_Sesion,Cerrar_Sesion, registros_registrar, registros_modificar,
asistencias_culturales_registrar, asistencias_laborales_registrar} from './modules.js';

const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas


const t_migrantes = document.getElementById('t_migrantes');
const t_general = document.getElementById('t_general');
const t_culturales = document.getElementById('t_culturales');
const t_laborales = document.getElementById('t_laborales');
const t_registros = document.getElementById('t_registros');


const form_migrantes = document.getElementById('f_migrantes');
const form_migrantes_action = document.getElementById('f_migrantes_action');
const form_migrantes_submit = document.getElementById('f_migrantes_submit');
const form_select_actividad_cultural = document.getElementById('form_select_actividad_cultural');
const form_select_actividad_laboral = document.getElementById('form_select_actividad_laboral');


const B_Cerrar_Sesion=document.getElementById('B_Cerrar_Sesion');

let id =0; //Variable de prueba, id de migrante que se aplica la acción
let ids=[];




document.addEventListener("DOMContentLoaded", function(event) {


        Validar_Sesion()

        llenar_opciones_selector(
            [
                'paises_origen',
                'niveles_educativos',
                'causas_migracion',
                'situaciones_familiares',
                'actividades_culturales',
                'actividades_laborales'
            ]
        )
    
        migrante_consultar_todos('#t_migrantes', true)
        .then(datatable=>{




            new $.fn.dataTable.Buttons(datatable, { 
                buttons: 
                    [
                        {
                            text:"Nuevo registro", 
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

            datatable.buttons(0,null).container().appendTo( '#datatable_none_buttons_container' ); 








            new $.fn.dataTable.Buttons(datatable, { 
                buttons: 
                    [
                        {
                            text:"Marcar Entrada", 
                            extend: "selectedSingle",
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                registros_registrar(id, JSON.stringify({"id_migrante": id}));
                                
                            },   
                        },

                        {
                            text:"Marcar Salida", 
                            extend: "selectedSingle",
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                registros_modificar(id, JSON.stringify({"id_migrante": id}));
                                
                            },   
                        },

                        {
                            text:"Detalles", 
                            extend: "selectedSingle",
                            attr: {
                                "data-toggle":"modal",
                                "data-target":"#modal_migrantes_details"
                            },
                            action: ()=>{
                                id=datatable.rows( { selected: true } ).data()[0][0]; 
                                migrante_consultar(id, false, t_general, t_culturales, t_laborales, t_registros)
                            }
                        },

                        {
                            text:"Modificar",
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

                       
                    ]
            });
            datatable.buttons(1, null).container().appendTo( '#datatable_single_buttons_container' );  

            new $.fn.dataTable.Buttons(datatable, { 
                buttons: 
                    [


                        {
                            text:"Actividad cultural +", 
                            extend: "selected",
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#migrante_culturales_modal"
                            },
                            action: ()=>{
                                ids=[];
                                let selected_count= datatable.rows( { selected: true } ).count();                            
                                for(let i=0; i<selected_count; i++){
                                    ids.push(datatable.rows( { selected: true } ).data()[i][0]); 
                                }
                                console.log(ids);

                                
                            },   
                        },

                        {
                            text:"Actividad laboral +", 
                            extend: "selected",
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#migrante_laborales_modal"
                            },
                            action: ()=>{
                                ids=[];
                                let selected_count= datatable.rows( { selected: true } ).count();                            
                                for(let i=0; i<selected_count; i++){
                                    ids.push(datatable.rows( { selected: true } ).data()[i][0]); 
                                }
                                console.log(ids);
                                
                            },   
                        },
                        
                    ]
                });

                datatable.buttons(2,null).container().appendTo( '#datatable_multiple_buttons_container' ); 





        })
        .catch(e=>console.log(e));
        //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
   
    
});


/////////////////////////////////////////////////////////////////7
//Para limpiar el formulario, en la ventana modal se puede poner un botón en el cual se pueda dar clic a propia decisión si limpiarlo o no, esto para que sea útil en el caso de modificar

form_select_actividad_cultural.onsubmit = function(e){
    e.preventDefault();
    let formData = new FormData(form_select_actividad_cultural);
    console.log(formData.get('actividades_culturales'))
    asistencias_culturales_registrar(formData.get('actividades_culturales'), JSON.stringify(ids))
    .then(result=>{
        $("#migrante_culturales_modal").modal('hide');
        alert('Migrante(s) añadido(s) a la lista correctamente');
    })
    .catch(e=>{
        $("#migrante_culturales_modal").modal('hide');
        alert(`
        Uno o varios de los migrantes seleccionados no fueron añadidos a la lista.
        Es posible que algunos de los migrantes seleccionados ya estén en la lista.`);
    })
}
form_select_actividad_laboral.onsubmit = function(e){
    e.preventDefault();
    let formData = new FormData(form_select_actividad_laboral);
    console.log(formData.get('actividades_laborales'))
    asistencias_laborales_registrar(formData.get('actividades_laborales'), JSON.stringify(ids))
    .then(result=>{
        $("#migrante_laborales_modal").modal('hide');
        alert('Migrante(s) añadido(s) a la lista correctamente');
    })
    .catch(e=>{
        $("#migrante_laborales_modal").modal('hide');
        alert(`
        Uno o varios de los migrantes seleccionados no fueron añadidos a la lista.
        Es posible que algunos de los migrantes seleccionados ya estén en la lista.`);
    })
}



form_migrantes.onsubmit = function(e){
    e.preventDefault();

    
    let formData = new FormData(form_migrantes);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    if(form_migrantes_action.value=="create"){
        migrante_registrar(formJson)
        .then(result=>{
            $("#modal_migrantes_form").modal('hide');
            
            alert(`Bienvenido(a) a México ${result['nombre']}. \nSu id es ${result['id']} \nLa siguiente es su llave de autorización: " ${result['llave_migrante']} ". 
            \nCada que cambie de ubicación y se requiera de registrar en otro punto de control, o cuando quiera corregir sus datos se le pedirá dicha clave.
            Guarde y mantenga esta clave de manera secreta pero envíesela a su familiar para que pueda estar al pendiente de usted`);
            migrante_consultar_todos('#t_migrantes', false);
        })
        .catch(e=>{
            alert("Error al insertar migrante");
        });
    }else if(form_migrantes_action.value=="modify"){
        migrante_modificar(id, formJson)
        .then(result=>{
            migrante_consultar_todos('#t_migrantes', false);
        })
        .catch(e=>{
            alert("Error al modificar migrante");
        });
    }
    
}





B_Cerrar_Sesion.addEventListener("click", function(event) {
    Cerrar_Sesion();
});
