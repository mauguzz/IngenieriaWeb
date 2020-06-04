//FUNCIONES GENERALES//

function handleHttpErrors(response) { //Maneja los códigos de error de HTTP cuando se hace una solicitud.
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function table_consultar_todos(uri, tbody, columnformat, arrayname){
    fetch(uri, {
        method: 'GET'
    })
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(res_json=>{
        console.log(res_json);
        let rows=res_json[arrayname]; 
        console.log(rows);

        tbody.innerHTML="";

        Object.entries(rows).forEach(([key,value]) => {
            //console.log(trabajos[n]);
            console.log(key + " " + value);

            let row = document.createElement('tr');

            Object.keys(columnformat).forEach(function(key){
                console.log(key);
                let col = document.createElement('td');
                col.innerHTML=`${value[key]}`;
                row.appendChild(col);
            })
            tbody.appendChild(row);
        
        });
    })
    .catch(e=>console.log(e))
}

function table_registrar(uri, jsonData){
    fetch(uri, {
        method: 'POST',
        body: jsonData
    })
    .then(handleHttpErrors)
    .then(res=>res.text()) //Cambiar a json() para version final
    .then(res_json=>{
        console.log(res_json);
    })
    .catch(e=>console.log(e))
}

function table_modificar(uri, jsonData){
    fetch(uri, {
        method: 'PUT',
        body: jsonData
    })
    .then(handleHttpErrors)
    .then(res=>res.text()) //Cambiar a json() para version final
    .then(res_json=>{
        console.log(res_json);
    })
    .catch(e=>console.log(e))
}

function table_eliminar(uri){
    fetch(uri, {
        method: 'DELETE',
    })
    .then(handleHttpErrors)
    .then(res=>res.text()) //Cambiar a json() para version final
    .then(res_json=>{
        console.log(res_json);
    })
    .catch(e=>console.log(e))
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
                    <td>${value['Direccion']}</td>
                    <td>${value['Activo']}</td>
                </tr>
            `;   
        });
        
    })
    .catch(e=>console.log(e))

}

export function migrante_consultar_todos(tbody_migrantes){

    table_consultar_todos("php/res_migrantes.php", tbody_migrantes,
        {'Nombre':"", 'Apellido_Paterno':"", 'Apellido_Materno':"", 'Ciudad':""},
        "migrantes"
    )
}

export function migrante_registrar(jsonData){
   table_registrar("php/res_migrantes.php", jsonData);
}

export function migrante_modificar(id, jsonData){
    table_modificar("php/res_migrantes.php/"+id, jsonData);
}


export function migrante_eliminar(id){
    table_eliminar("php/res_migrantes.php/"+id);
}


//FUNCIONES DE ADMINISTRADOR//

//FUNCIONES DE FUNCIONARIOS//




//FUNCIONES DE TRABAJOS//
export function laborales_consultar_todos(tbody_laborales){
    table_consultar_todos("php/res_laborales.php", tbody_laborales,
        {'Fecha':"", 'Detalles':"", 'Requisitos':"", 'Direccion':""},
        "laborales"
    )
}

export function laborales_registrar(jsonData){
    table_registrar("php/res_laborales.php", jsonData);
}

export function laborales_modificar(id, jsonData){
    table_modificar("php/res_laborales/"+id, jsonData);
}

export function laborales_eliminar(id){
    table_eliminar("php/res_laborales.php/"+id);
}



//FUNCIONES DE ACTIVIDADES CULTURALES//
export function culturales_consultar_todos(tbody_culturales){
    table_consultar_todos("php/res_culturales.php", tbody_culturales,
        {'Fecha':"", 'Nombre':"", 'Detalles':"", 'Direccion':""},
        "culturales"
    )
}

export function culturales_registrar(jsonData){
    table_registrar("php/res_culturales.php", jsonData);
}

export function culturales_modificar(id, jsonData){
    table_modificar("php/res_culturales.php/"+id, jsonData);
}

export function culturales_eliminar(id){
    table_eliminar("php/res_culturales.php/"+id);
}