import {migrante_consultar,Iniciar_Sesion, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
    llenar_opciones_selector,Validar_Sesion,Cerrar_Sesion, migrante_seguimiento_todos} from './modules.js';
    
    const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc), todas las páginas
    
    
    
    const t_general = document.getElementById('t_general');
    const t_culturales = document.getElementById('t_culturales');
    const t_laborales = document.getElementById('t_laborales');
    const t_registros = document.getElementById('t_registros');

    const form_seguimiento = document.getElementById('form_seguimiento');    
    const Form_Iniciar_Sesion = document.getElementById('Form_Iniciar_Sesion');
    const B_Iniciar_Sesion=document.getElementById("B_Iniciar_Sesion");


      

    
    let id =0; //Variable de prueba, id de migrante que se aplica la acción
    let llave;
    
    
    B_Iniciar_Sesion.onclick=function(e) {
        e.preventDefault();
        $("#modal_Iniciar_Sesión").modal('show')
    };
    
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
 
            if(reason.message=="Unauthorized"){
                
                llave=false;
                alert("Llave incorrecta. Verifique que la llave proporcionada sea correcta.")
                
            }else if(reason.message=="NoKey"){
                alert("No proporcionó ninguna llave. Ingrese la llave que le proporcionó su familiar o conocido para poder continuar.")
            }
        })
    }
    /////////////////////////////////////////////////////////////////7
    //Para limpiar el formulario, en la ventana modal se puede poner un botón en el cual se pueda dar clic a propia decisión si limpiarlo o no, esto para que sea útil en el caso de modificar
    
    $('#modal_migrantes_details').on('shown.bs.modal', function() { 
        if(!llave){ $("#modal_migrantes_details").modal('hide');}
    })
    
    Form_Iniciar_Sesion.onsubmit = function(e){ //Registro el evento a mi objeto botón, en este caso es a un click
        e.preventDefault();
        let formData = new FormData(Form_Iniciar_Sesion); //Creo un objeto con la información del form
        let formJson = JSON.stringify(Object.fromEntries(formData)); //Convierto mi objeto a un formato Json
        Iniciar_Sesion(formJson);  
    };
    

    
    