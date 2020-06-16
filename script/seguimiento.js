import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
    llenar_opciones_selector,Validar_Sesion,Cerrar_Sesion} from './modules.js';
    
    const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas
    
    
    const t_migrantes = document.getElementById('t_migrantes');
    const t_general = document.getElementById('t_general');
    const t_culturales = document.getElementById('t_culturales');
    const t_laborales = document.getElementById('t_laborales');
    const t_registros = document.getElementById('t_registros');
    
    
    
    const B_Cerrar_Sesion=document.getElementById('B_Cerrar_Sesion');
    
    let id =0; //Variable de prueba, id de migrante que se aplica la acción
    
    
    
    document.addEventListener("DOMContentLoaded", function(event) {
    
        
            migrante_consultar_todos('#t_migrantes', true)
            .then(datatable=>{
                new $.fn.dataTable.Buttons(datatable, { 
                    buttons: 
                        [
    
                            {
                                text:"Ver Detalles", 
                                extend: "selectedSingle",
                                attr: {
                                    "data-toggle":"modal",
                                    "data-target":"#modal_migrantes_details"
                                },
                                action: ()=>{
                                    id=datatable.rows( { selected: true } ).data()[0][0]; 
                                    migrante_consultar(id, true, t_general, t_culturales, t_laborales, t_registros)
                                    .catch(reason=>{
                                        console.log("No especificado LLAVE");
                                        if(reason=="Llave no especificada"){
                                            console.log("No especificado LLAVE")
                                            $('#modal_migrantes_details').on('shown', function() { 
                                                $('#modal_migrantes_details').modal('hide'); 
                                           })
                                        }
                                    })
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
    
    
    
    
    B_Cerrar_Sesion.addEventListener("click", function(event) {
        Cerrar_Sesion();
    });
    