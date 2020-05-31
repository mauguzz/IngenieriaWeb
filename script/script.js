
const content = document.getElementById('content'); //Div del contenido principal (tablas, etc)
const btn_consultar =document.getElementById('btn_consultar');
const tbody_general= document.getElementById('tbody-general');
const tbody_actividades = document.getElementById('tbody-actividades');
const tbody_trabajos = document.getElementById('tbody-trabajos');

btn_consultar.addEventListener("click", ()=>{ 
    leerMigrante(); 
});




function leerMigrante(){
    fetch("php/migrantes_details.php", {
        method: 'GET',
        body: JSON.stringify({id: 1})
    })
    .then(res=>{
        return res.text();
    })
    .then(res_json=>{
        console.log(res_json);
        general=res_json['datos_generales'];
        trabajos=res_json['trabajos'];
        actividades=res_json['actividades_culturales'];


        Object.keys(general).forEach((key, value)=>{
            row_general = document.createElement('tr');
            var_general = document.createElement('td');
            val_general = document.createElement('td');
            
            var_general.innerHTML=key.
            val_general.innerHTML=value;
            row_general.innerHTML= `${var_general} ${val_general}`;
            tbody_general.innerHTML += `${row_general}`;

        });

        Object.keys(trabajos).forEach((key,value) => {
            //console.log(trabajos[n]);

            tbody_trabajos.innerHTML += `
                <tr>
                    <td>${value.Fecha}</td>
                    <td>${value.Detalles}</td>
                    <td>${value.Requisitos}</td>
                    <td>${value.Direccion}</td>
                </tr>
            `;
        });

        Object.keys(actividades).forEach((key, value) => {
            //console.log(trabajos[n]);

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

    })

}




function registrarMigrante(){

}

function modificarMigrante(){

}