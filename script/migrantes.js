
import {migrante_consultar, migrante_consultar_todos, migrante_registrar, migrante_modificar, migrante_eliminar, 
} from './modules.js';

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

//Prueba
fetch('php/res_options.php/niveles_educativos', {
    method: 'GET'
})
.then(res=>res.text())
.then(resjson=>{
    console.log(resjson);
})


document.addEventListener("DOMContentLoaded", function(event) {
    
        migrante_consultar_todos('#t_migrantes',
            t_general,
            t_culturales,
            t_laborales,
            t_registros
        )
        .then(datatable=>{
            new $.fn.dataTable.Buttons(datatable, { 
                buttons: 
                    [
                        {
                            text:"Detalles", 
                            action: ()=>{
                                console.log(datatable.rows( { selected: true } ).data()[0]); 
                                id=1;
                                //De la línea anterior, hay que sacar el ID, y remplazar en la función de abajo el 1 por el ID sacado
                                migrante_consultar(1, t_general, t_culturales, t_laborales, t_registros)
                            }, 
                            extend: "selectedSingle",
                            attr: {
                                "data-toggle":"modal",
                                "data-target":"#modal_migrantes_details"
                            }
                        },
                        {
                            text:"Eliminar", 
                            action: ()=>{
                                console.log(datatable.rows( { selected: true } ).data()[0]); 
                                id=1;
                                //De la línea anterior, hay que sacar el ID, y remplazar en la función de abajo el 1 por el ID sacado
                                migrante_eliminar(1)
                            }, 
                            extend: "selectedSingle",
                            
                        },
                        {
                            text:"Modificar", 
                            action: ()=>{
                                console.log(datatable.rows( { selected: true } ).data()[0]);
                                id=1; 
                                //De la línea anterior, hay que sacar el ID, y remplazar en la función de abajo el 1 por el ID sacado
                                form_migrantes_action.value="modify";
                                form_migrantes_submit.value="Guardar cambios";
                            }, 
                            extend: "selectedSingle",
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#modal_migrantes_form"
                            }
                            
                        },
                        {
                            text:"Añadir", 
                            action: ()=>{
                                console.log(datatable.rows( { selected: true } ).data()[0]); 
                                form_migrantes_action.value="create";
                                form_migrantes_submit.value="Registrar";
                                
                                //De la línea anterior, hay que sacar el ID, y remplazar en la función de abajo el 1 por el ID sacado
                                
                            }, 
                            //extend: "selectedSingle",
                            attr:{
                                "data-toggle": "modal",
                                "data-target": "#modal_migrantes_form"
                            }
                            
                        }
                    ]
            });
            datatable.buttons().container().appendTo( '#datatable_buttons_container' );  
        })
        .catch(e=>console.log(e));
        //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
   
    
});


form_migrantes.onsubmit = function(e){
    e.preventDefault();

    
    let formData = new FormData(form_migrantes);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    if(form_migrantes_action.value=="create"){
        migrante_registrar(formJson);
    }else if(form_migrantes_action.value=="modify"){
        migrante_modificar(id, formJson);
    }
    
}



