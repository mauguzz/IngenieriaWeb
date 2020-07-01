import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
    llenar_opciones_selector,Validar_Sesion,Cerrar_Sesion, migrante_seguimiento_todos} from './modules.js';
    
    const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas
    
    
    
    const t_general = document.getElementById('t_general');
    const t_culturales = document.getElementById('t_culturales');
    const t_laborales = document.getElementById('t_laborales');
    const t_registros = document.getElementById('t_registros');

    const form_seguimiento = document.getElementById('form_seguimiento');
    
    
    
    const B_Cerrar_Sesion=document.getElementById('B_Cerrar_Sesion');
    
    let id =0; //Variable de prueba, id de migrante que se aplica la acción
    let llave;
    
    
    document.addEventListener("DOMContentLoaded", function(event) {
    
    });
    
    form_seguimiento.onsubmit = function(e){
        e.preventDefault();

        let formData = new FormData(form_seguimiento);
        console.log(formData.get('migrante_id'))

        migrante_consultar(formData.get('migrante_id'), true, t_general, t_culturales, t_laborales, t_registros)
        .then(response=>{
            llave=true;
            $("#modal_migrantes_details").modal('show')
        })
        .catch(reason=>{
            console.log(reason.message);
            console.log("No especificado LLAVE");
            if(reason=="Unauthorized"){
                
                llave=false;
                alert("Llave incorrecta. Verifique que la llave proporcionada sea correcta.")
                
            }else if(reason=="NoKey"){
                alert("No proporcionó ninguna llave. Ingrese la llave que le proporcionó su familiar o conocido para poder continuar.")
            }
        })
    }
    /////////////////////////////////////////////////////////////////7
    //Para limpiar el formulario, en la ventana modal se puede poner un botón en el cual se pueda dar clic a propia decisión si limpiarlo o no, esto para que sea útil en el caso de modificar
    
    $('#modal_migrantes_details').on('shown.bs.modal', function() { 
        if(!llave){ $("#modal_migrantes_details").modal('hide');}
    })
    
    
    