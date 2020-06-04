

function handleHttpErrors(response) { //Maneja los códigos de error de HTTP cuando se hace una solicitud.
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


//FUNCIONES DE MIGRANTE//
export function migrante_consultar(id, tbody_general, tbody_actividades, tbody_trabajos){
    fetch("php/res_migrantes.php/"+id, {
        method: 'GET'
    })
    .then(handleHttpErrors)
    .then(res=>res.json()) //Cambiar a .text() para pruebas, y a .json() para funcionamiento
    .then(res_json=>{
        console.log(res_json); 

        
        let general=res_json.datos_generales;
        let trabajos=res_json.trabajos;
        let actividades=res_json.actividades_culturales;

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


export function migrante_consultar_todos(tbody_migrantes){
    fetch("php/res_migrantes.php", {
        method: 'GET'
    })
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(res_json=>{
        console.log(res_json);
        let migrantes=res_json.migrantes;
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
    .catch(e=>console.log(e))
}


export function migrante_registrar(jsonData){
    fetch("php/res_migrantes.php", {
        method: 'POST',
        body: jsonData
    })
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(res_json=>{
        console.log(res_json);
    })
    .catch(e=>console.log(e))
}

export function migrante_modificar(id, jsonData){
    fetch("php/res_migrantes.php/"+id, {
        method: 'PUT',
        body: jsonData
    })
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(res_json=>{
        console.log(res_json);
    })
    .catch(e=>console.log(e))
}

export function migrante_eliminar(id){
    fetch("php/res_migrantes.php/"+id, {
        method: 'DELETE',
    })
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(res_json=>{
        console.log(res_json);
    })
    .catch(e=>console.log(e))
}



//FUNCIONES DE ADMINISTRADOR//

//FUNCIONES DE FUNCIONARIOS//

//FUNCIONES DE TRABAJOS//


//FUNCIONES DE ACTIVIDADES CULTURALES//