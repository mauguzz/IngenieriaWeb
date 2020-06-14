//import {} from './modules.js';
import {laborales_consultar_todos, laborales_eliminar, laborales_modificar, laborales_registrar} from './modules.js';

const btn_laborales_consultar_todos = document.getElementById("btn_laborales_consultar_todos");
const thead_laborales = document.getElementById('thead_laborales');
const tbody_laborales = document.getElementById("tbody_laborales");
const form_laborales_registrar = document.getElementById('f_laborales_registrar');


document.addEventListener("DOMContentLoaded", function(event) {

    laborales_consultar_todos('#t_culturales', true)
    .then(datatable=>{
        new $.fn.dataTable.Buttons(datatable, { 
            buttons: 
                [
                    {
                        text:"Agregar oferta laboral", 
                        extend: "selectedSingle",
                        attr: {
                            "data-toggle":"modal",
                            "data-target":"#f_laborales_registrar"
                        },
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0];                       
                        },   
                    },
                    {
                        text:"Modificar oferta laboral", 
                        extend: "selectedSingle",
                        action: ()=>{
                            id=datatable.rows( { selected: true } ).data()[0][0]; 
                            
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
        datatable.buttons().container().appendTo( '#datatable_buttons_container' );  
    })
    .catch(e=>console.log(e));
    //action requiere una definición de una función, y no una llamada a una función. Por ello se hace una estructura arrow function, es decir ()=>{}
});


form_laborales_registrar.onsubmit = function(e){
    e.preventDefault();

    let formData = new FormData(form_laborales_registrar);
    let formJson = JSON.stringify(Object.fromEntries(formData));
    console.log(formJson);

    laborales_registrar(formJson);
}