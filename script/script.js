const mcontent = document.getElementById('content'); //Div del contenido principal (tablas, etc)
const btn_consultar =document.getElementById('btn_consultar');
const btn_todos = document.getElementById('btn_todos');

const tbody_general= document.getElementById('tbody_general');
const tbody_actividades = document.getElementById('tbody_actividades');
const tbody_trabajos = document.getElementById('tbody_trabajos');
const tbody_migrantes = document.getElementById('tbody_migrantes');
let id =1;


function handleHttpErrors(response) { //Maneja los códigos de error de HTTP cuando se hace una solicitud.
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}



function migrante_consultar(){
    fetch("php/res_migrantes.php/"+id, {
        method: 'GET'
    })
    .then(handleHttpErrors)
    .then(res=>res.json()) //Cambiar a .text() para pruebas, y a .json() para funcionamiento
    .then(res_json=>{
        console.log(res_json); 

        
        general=res_json.datos_generales;
        trabajos=res_json.trabajos;
        actividades=res_json.actividades_culturales;

        tbody_general.innerHTML="";
        tbody_actividades.innerHTML="";
        tbody_trabajos.innerHTML="";

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
    .catch(e=>console.log(e))

}


function migrante_consultar_todos(){
    fetch("php/res_migrantes.php", {
        method: 'GET'
    })
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(res_json=>{
        console.log(res_json);
        migrantes=res_json.migrantes;
        console.log(migrantes);

        tbody_migrantes.innerHTML="";

        Object.entries(migrantes).forEach(([key,value]) => {
            //console.log(trabajos[n]);
            console.log(key + " " + value);

            tbody_migrantes.innerHTML += `
                <tr>
                    <td>${value['Nombre']}</td>
                    <td>${value['Apellido_Paterno']}</td>
                    <td>${value['Apellido_Materno']}</td>
                    <td>${value['Ciudad']}</td>
                </tr>
            `;
        });

    })
}


function migrante_registrar(){

}

function migrante_modificar(){

}

btn_consultar.addEventListener("click", ()=>{ 
    migrante_consultar(); 
    console.log("Presionado");
});

btn_todos.addEventListener("click", ()=>{
    migrante_consultar_todos();
    console.log("Presionado");
})