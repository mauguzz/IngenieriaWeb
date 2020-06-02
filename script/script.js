const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc)
const btn_consultar =document.getElementById('btn_consultar');
const tbody_general= document.getElementById('tbody-general');
const tbody_actividades = document.getElementById('tbody-actividades');
const tbody_trabajos = document.getElementById('tbody-trabajos');
let id =1;


function handleHttpErrors(response) { //Maneja los códigos de error de HTTP cuando se hace una solicitud.
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}



function migrante_consultar(){
    fetch("php/res_migrantes.php", {
        method: 'GET',
        //body: JSON.stringify({id: 1}) //Corregir URL con "php/migrantes_details.php?id="...""
    })
    .then(handleHttpErrors)
    .then(res=>{
        return res.text(); //Cambiar a .text() para pruebas, y a .json() para funcionamiento
    })
    .then(res_json=>{
        console.log(res_json); 

        
        general=res_json.datos_generales;
        trabajos=res_json.trabajos;
        actividades=res_json.actividades_culturales;

        console.log(general);
        console.log(trabajos);
        console.log(actividades);


        Object.entries(general).forEach(([key, value])=>{

            console.log(key + " " + value);
            let row_general = document.createElement('tr');
            let var_general = document.createElement('td');
            let val_general = document.createElement('td');
            
            var_general.innerHTML=`${key}`;
            val_general.innerHTML=`${value}`;
            row_general.appendChild(var_general);
            row_general.appendChild(val_general);
            tbody_general.appendChild(row_general);

        });

        Object.entries(trabajos).forEach(([key,value]) => {
            //console.log(trabajos[n]);
            console.log(key + " " + value);

            tbody_trabajos.innerHTML += `
                <tr>
                    <td>${value['Fecha']}</td>
                    <td>${value['Detalles']}</td>
                    <td>${value['Requisitos']}</td>
                    <td>${value['Direccion']}</td>
                </tr>
            `;
        });

        Object.entries(actividades).forEach(([key, value]) => {
            //console.log(trabajos[n]);
            console.log(key + " " + value);

            tbody_actividades.innerHTML += `
                <tr>
                    <td>${value['Fecha']}</td>
                    <td>${value['Nombre']}</td>
                    <td>${value['Detalles']}</td>
                    <td>${value['Requisitos']}</td>
                    <td>${value['Activo']}</td>
                </tr>
            `;   
        });
        
    })
    .catch(e=>{
        console.log(e);
    })

}

/*
function migrante_consultar_todos(){
    fetch('php/res_migrantes.php')
}
*/

function migrante_registrar(){

}

function migrante_modificar(){

}

btn_consultar.addEventListener("click", ()=>{ 
    migrante_consultar(); 
    console.log("Presionado");
});