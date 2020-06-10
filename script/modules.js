//FUNCIONES GENERALES//

function handleHttpErrors(response) { //Maneja los códigos de error de HTTP cuando se hace una solicitud.
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function table_simple_fetch(uri, parameters){
    fetch(uri, parameters)
    .then(handleHttpErrors)
    .then(res=>res.text()) //Cambiar a json() para version final
    .then(res_json=>{
        console.log(res_json);
    })
    .catch(e=>console.log(e))
}

function table_generate_rowsandcols(thead, tbody, rows, columns){
    //Object:={key: value, key: value, key:value}
    //Esta función crea los nombres de columnas de las tablas y llena el contenido de la tabla.
    let th_row;
    let first;
    thead.innerHTML="";
    tbody.innerHTML="";
    Object.entries(rows).forEach(([rowname,row]) => { //rowname es un key de Object, row es un value de Object
        if(th_row===undefined){
            th_row= document.createElement('tr');
            first=true;
        }else{
            first=false;
        } 
        let td_row = document.createElement('tr');

        Object.entries(columns).forEach(([colname,col])=>{ //colname es un key de Object, col es un value de Object
            if(first){
                let th_col = document.createElement('th');
                th_col.innerHTML=`${colname}`;
                th_row.appendChild(th_col);
            }
            let td_col = document.createElement('td');
            td_col.innerHTML=`${row[col]}`;
            td_row.appendChild(td_col);
        })
        if(first)thead.appendChild(th_row);
        tbody.appendChild(td_row);
    });
    
}

//function table_generate(tablename, rows, columns)

function table_consultar_todos(uri, thead, tbody, columns, rowsindex){
    fetch(uri, {
        method: 'GET'
    })
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(res_json=>{
        let rows=res_json[rowsindex]; 

        //Prueba
        console.log(rows);
        let result = [];
        rows.forEach((valor, clave)=>{
            //console.log(valor);
            for(var i in valor){
                result.push(valor[i]);
            }
            console.log(result);
        })
        


        table_generate_rowsandcols(thead, tbody, rows, columns);
    })
    .catch(e=>console.log(e))
}



function table_registrar(uri, jsonData){
    table_simple_fetch(uri, {method: 'POST', body: jsonData})
}

function table_modificar(uri, jsonData){
    table_simple_fetch(uri, {method: 'PUT', body: jsonData}) 
}

function table_eliminar(uri){
   table_simple_fetch(uri, {method: 'DELETE'});
}







//FUNCIONES DE MIGRANTE//
export function migrante_consultar(id, thead_general, thead_culturales, thead_laborales, thead_registros, tbody_general, tbody_culturales, tbody_laborales, tbody_registros){
    fetch("php/res_migrantes.php/"+id, {
        method: 'GET'
    })
    .then(handleHttpErrors)
    .then(res=>res.json()) //Cambiar a .text() para pruebas, y a .json() para funcionamiento
    .then(res_json=>{
 
        let general=res_json.general[0];
        let laborales=res_json.laborales;
        let culturales=res_json.culturales;
        let registros=res_json.registros;

        tbody_general.innerHTML="";

        //Object:={key: value, key: value, key:value}
        Object.entries(general).forEach(([key, value])=>{
            let row_general = document.createElement('tr');
            let var_general = document.createElement('td');
            let val_general = document.createElement('td');
            
            var_general.innerHTML=`${key}`;
            val_general.innerHTML=`${value}`;
            row_general.appendChild(var_general);
            row_general.appendChild(val_general);
            tbody_general.appendChild(row_general);
        });
        
        

        
    
        table_generate_rowsandcols(thead_laborales, tbody_laborales, laborales, {
            'Fecha':'Fecha', 
            'Trabajo':'Actividad',  
            'Direccion':'Direccion'
        });

        table_generate_rowsandcols(thead_culturales, tbody_culturales, culturales, {
            'Fecha':'fecha', 
            'Actividad Cultural':'Actividad', 
            'Direccion':'Direccion', 
        })

        table_generate_rowsandcols(thead_registros, tbody_registros, registros, {
            'Punto de control':'Punto de_control', 
            'Fecha de Entrada':'Fecha_Entrada', 
            'Fecha de salida': 'Fecha_Salida', 
            'Alimentación':'Alimentacion'
        })
    })
    .catch(e=>console.log(e));

}

export function migrante_consultar_todos(thead_migrantes, tbody_migrantes){

    table_consultar_todos("php/res_migrantes.php", thead_migrantes, tbody_migrantes,{
       
        'Nombre':'Nombre', 
        'Apellido Paterno':'Apellido_Paterno', 
        'Apellido Materno':'Apellido_Materno', 
        'Pais':'Pais', 
        'Punto de Control':'Punto_de_Control', 
        'Estado':'Estado'
    },
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

//FUNCIONES DE TABLA MIGRANTES-CULTURALES//

//FUNCIONES DE TABLA MIGRANTES-LABORALES//

//FUNCIONES DE TABLA MIGRANTES-PUNTO DE CONTROL//


//FUNCIONES DE ACTIVIDADES LABORALES//
export function laborales_consultar_todos(thead_laborales, tbody_laborales){
    table_consultar_todos("php/res_laborales.php", thead_laborales, tbody_laborales,{
        'ID':'Id_Trabajo',
        'Detalles':'Detalles', 
        'Requisitos':'Requisitos', 
        'Direccion':'Direccion'
    },
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
export function culturales_consultar_todos(thead_culturales, tbody_culturales){
    table_consultar_todos("php/res_culturales.php", thead_culturales, tbody_culturales,{
        'ID': 'Id_Actividad',
        'Fecha':'Fecha', 
        'Nombre':'Nombre', 
        'Dirección':'Direccion',
        'Detalles':'Detalles',
        'Activo': 'Activo' 
        
    },
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


/*------------------------------------------------Sesiones----------------------------------------------------*/

export function Iniciar_Sesion(formJson){
    console.log(formJson);//Imprimo mi Json
    fetch("php/res_sesion.php/",{method: 'POST', body: formJson})   ///
    .then(handleHttpErrors)
    .then(response=>{
        if (response.redirected) {
            window.location.href = response.url;
        }
    })
    .catch(e=>{
        console.log(e);
        console.log("Catching");
    })  
    //.then(handleHttpErrors)

}
