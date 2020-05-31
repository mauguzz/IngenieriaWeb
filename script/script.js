
const content = document.getElementById('content'); //Div del contenido principal (tablas, etc)
const btn_consultar =document.getElementById('btn_consultar');
const tbody_general= document.getElementById('tbody-general');
const tbody_actividades = document.getElementById('tbody-actividades');
const tbody_trabajos = document.getElementById('tbody-trabajos');






function leerMigrante(){
    fetch("php/migrantes_details.php", {
        method: 'GET',
        //body: JSON.stringify({id: 1}) //Corregir URL con "php/migrantes_details.php?id="...""
    })
    .then(res=>{
        return res.json();
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
                    <td>${value.Fecha}</td>
                    <td>${value.Detalles}</td>
                    <td>${value.Requisitos}</td>
                    <td>${value.Direccion}</td>
                </tr>
            `;
        });

        Object.entries(actividades).forEach(([key, value]) => {
            //console.log(trabajos[n]);
            console.log(key + " " + value);

            tbody_actividades.innerHTML += `
                <tr>
                    <td>${value.Fecha}</td>
                    <td>${value.Nombre}</td>
                    <td>${value.Detalles}</td>
                    <td>${value.Requisitos}</td>
                    <td>${value.Activo}</td>
                </tr>
            `;   
        });
        
    })
    .catch(e=>{
        console.log(e);
    })

}




function registrarMigrante(){

}

function modificarMigrante(){

}

btn_consultar.addEventListener("click", ()=>{ 
    leerMigrante(); 
    console.log("Presionado");
});