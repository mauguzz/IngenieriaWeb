let id;

//FUNCIONES GENERALES//

function handleHttpErrors(response) { //Maneja los códigos de error de HTTP cuando se hace una solicitud.
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

//Usado para las operaciones que no requieren de respuesta  
function table_simple_fetch(uri, parameters){  
    return new Promise((resolve, reject)=>{
        fetch(uri, parameters)
        .then(handleHttpErrors)
        .then(res=>res.json()) //Cambiar a json() para version final
        .then(res_json=>{
            console.log(res_json);
            resolve(res_json);
        })
        .catch(e=>{
            console.log(e);
            reject(e);
        })
    })
}

/*
function table_generate_rowsandcols(thead, tbody, rows, columns, columnwidths){
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

        Object.entries(columns).forEach(([colname,col],ind)=>{ //colname es un key de Object, col es un value de Object
            if(first){
                let th_col = document.createElement('th');
                th_col.setAttribute('class',columnwidths[ind])
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
*/



function table_generate_rowsandcols(thead, tbody, rows, columns, columnwidths){
    //Object:={key: value, key: value, key:value}
    //Esta función crea los nombres de columnas de las tablas y llena el contenido de la tabla.
    let th_row;
    let th_col=[];
    let first;
    thead.innerHTML="";
    tbody.innerHTML="";


    
        
    th_row= document.createElement('tr');
    th_row.setAttribute('class','row');
    thead.appendChild(th_row);
    
       
        

    Object.entries(columns).forEach(([colname,col],ind)=>{ //colname es un key de Object, col es un value de Object
        
            th_col.push(document.createElement('th'));
            th_col[ind].setAttribute('class',columnwidths[ind])
            th_col[ind].innerHTML=`${colname}`;
            th_row.appendChild(th_col[ind]);  
    })
    
   






    Object.entries(rows).forEach(([rowname,row]) => { //rowname es un key de Object, row es un value de Object
         
        let td_row = document.createElement('tr');
        td_row.setAttribute('class','row')

        Object.entries(columns).forEach(([colname,col],ind)=>{ //colname es un key de Object, col es un value de Object
            
            let td_col = document.createElement('td');
            td_col.setAttribute('class',columnwidths[ind]);
            td_col.innerHTML=`${row[col]}`;
            td_row.appendChild(td_col);
        })
        
        tbody.appendChild(td_row);
    });
    

    

}





function table_generate_datatables(tablename, init, rows, cols){
    //cols={"Apellido Paterno" : "Apellido_P", "Apellido Materno" : "Apellido_M", "ind" : "value"}
    let datatable;
    let dataSet = [];
    let customCols = [];
 
    rows.forEach((row)=>{
        let result = [];
        Object.entries(cols).forEach(([ind, value])=>{
            result.push(row[value]); 
        })
        dataSet.push(result);
    })
    Object.entries(cols).forEach(([ind, value])=>{
        customCols.push({title: ind})
    })
     
    if(init){
        datatable = $(tablename).DataTable( {
            select: true,//{style: 'multi'},
            data: dataSet,
            columns: customCols,
            dom: "frtip"
        });
    }else{ //Caso de solo actualización
        datatable = $(tablename).DataTable();
        datatable.clear();
        datatable.rows.add(dataSet);
        datatable.draw();
    }
    return datatable;
}


//Es posible que pueda usar la función simple fetch
function table_consultar_todos(uri, thead, tbody, columns, rowsindex){
    fetch(uri, {
        method: 'GET'
    })
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(res_json=>{
        let rows=res_json[rowsindex]; 
        table_generate_rowsandcols(thead, tbody, rows, columns);
    })
    .catch(e=>console.log(e))
}

//Es posible que pueda usar la función simple fetch
function datatable_consultar_todos(uri, rowsindex, table, init, columns){
    let datatable;
    return new Promise((resolve, reject)=>{
        fetch(uri, {
            method: 'GET'
        })
        .then(handleHttpErrors)
        .then(res=>res.json())
        .then(res_json=>{
            let rows=res_json[rowsindex]; 
            console.log(res_json);
            datatable=table_generate_datatables(table, init, rows, columns);
            resolve(datatable);
        })
        .catch(e=>{console.log(e); reject(e);})
    })
     
}



function table_registrar(uri, jsonData){
    return new Promise((resolve, reject)=>{
        table_simple_fetch(uri, {method: 'POST', body: jsonData})
        .then(result => resolve(result))
        .catch(result => reject(result));
    })
}

function table_modificar(uri, jsonData){
    return new Promise((resolve, reject)=>{
        table_simple_fetch(uri, {method: 'PUT', body: jsonData})
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
}

function table_eliminar(uri){
    return new Promise((resolve, reject)=>{
        table_simple_fetch(uri, {method: 'DELETE'})
        .then(result=> resolve(result))
        .catch(result=>reject(result));
    })
}







//FUNCIONES DE MIGRANTE//
export function migrante_consultar(id, prompt, t_general, t_culturales, t_laborales, t_registros){ //thead_general, thead_culturales, thead_laborales, thead_registros, tbody_general, tbody_culturales, tbody_laborales, tbody_registros
    let request;
    let llave="";
    t_general.children['tbody'].innerHTML="";
    t_culturales.children['tbody'].innerHTML="";
    t_laborales.children['tbody'].innerHTML="";
    t_registros.children['tbody'].innerHTML="";
    t_general.children['thead'].innerHTML="";
    t_culturales.children['thead'].innerHTML="";
    t_laborales.children['thead'].innerHTML="";
    t_registros.children['thead'].innerHTML="";

    return new Promise((resolve,reject)=>{
        if(prompt){ 
            let header = new Headers();

            llave = window.prompt("Ingrese la llave que le proporcionó su familiar", "");
            if (llave == null || llave == "") {reject(new Error("NoKey")); return;};
            
            header.set('Authorization', 'Basic ' + btoa("familiar:" + llave));
            request = new Request('php/res_migrantes.php/'+id,{
                method: 'GET',
                headers: header
            });
        }else{
            request = new Request('php/res_migrantes.php/'+id,{
                method: 'GET',
            });
        }
        fetch(request)
        .then(handleHttpErrors)
        .then(res=>res.json()) //Cambiar a .text() para pruebas, y a .json() para funcionamiento
        .then(res_json=>{
            console.log(res_json);
     
            let general=res_json.general[0];
            let laborales=res_json.laborales;
            let culturales=res_json.culturales;
            let registros=res_json.registros;
    
            t_general.children['tbody'].innerHTML="";
    
            let fieldNames=['Id del migrante:', 'Nombre(s):', 'Apellido Paterno:', 'Apellido Materno:', 'País de origen:', 'Ciudad de origen:', 'Edad:', 'Nivel educativo:', 'Teléfono de contacto:', 'Causa de migración:'];
            Object.entries(general).forEach(([key, value],ind)=>{
                let row_general = document.createElement('tr');
                let var_general = document.createElement('td');
                let val_general = document.createElement('td');
                
                var_general.innerHTML=`${fieldNames[ind]}`; //`${key}`
                val_general.innerHTML=`${value}`;
                row_general.appendChild(var_general);
                row_general.appendChild(val_general);
                t_general.children['tbody'].appendChild(row_general);
            });
            
            table_generate_rowsandcols(t_laborales.children['thead'], t_laborales.children['tbody'], laborales, {
                'Fecha':'Fecha', 
                'Trabajo':'Actividad',  
                'Direccion':'Direccion'
            }, ['col-sm-2', 'col-sm-4', 'col-sm-6']);
    
            table_generate_rowsandcols(t_culturales.children['thead'], t_culturales.children['tbody'], culturales, {
                'Fecha':'Fecha', 
                'Actividad Cultural':'Actividad', 
                'Direccion':'Direccion', 
            },['col-sm-2', 'col-sm-4', 'col-sm-6'])
    
            table_generate_rowsandcols(t_registros.children['thead'], t_registros.children['tbody'], registros, {
                'Punto de control':'Punto_de_Control', 
                'Fecha de Entrada':'Fecha_Entrada', 
                'Fecha de salida': 'Fecha_Salida', 
                'Alimentación':'Alimentacion'
            }, ['col-sm-6', 'col-sm-2', 'col-sm-2', 'col-sm-2'])
            resolve("Consulta correcta");
        })
        .catch(e=>reject(e));
    });
    
}

export function migrante_consultar_todos(table, init){  //thead_migrantes, tbody_migrantes
    return new Promise((resolve, reject)=>{
        datatable_consultar_todos("php/res_migrantes.php", "migrantes", table, init, {
            //Hace falta obtener el ID desde el View de MySQL, para poder hacer tratamientos posteriores
            'ID' : "Id_Migrante",
            'Nombre':'Nombre', 
            'Apellido Paterno':'Apellido_Paterno', 
            'Apellido Materno':'Apellido_Materno', 
            'Pais':'Pais', 
            'Punto de Control':'Punto_de_Control', 
            'Estado':'Estado'
        })
        .then(datatable=>{resolve(datatable)})
        .catch(e=>{reject(e)})
    })
}

export function migrante_seguimiento_todos(table, init){  //thead_migrantes, tbody_migrantes
    return new Promise((resolve, reject)=>{
        datatable_consultar_todos("php/res_migrantes.php", "migrantes", table, init, {
            //Hace falta obtener el ID desde el View de MySQL, para poder hacer tratamientos posteriores
            'ID' : "Id_Migrante",
            'Nombre':'Nombre', 
            'Apellido Paterno':'Apellido_Paterno', 
            'Apellido Materno':'Apellido_Materno', 
            'Origen':'Pais', 
        })
        .then(datatable=>{resolve(datatable)})
        .catch(e=>{reject(e)})
    })
}


export function migrante_registrar(jsonData){
    return new Promise((resolve, reject)=>{
        table_registrar("php/res_migrantes.php", jsonData)
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
   
}

export function migrante_modificar(id, jsonData){
    return new Promise((resolve, reject)=>{
        table_modificar("php/res_migrantes.php/"+id, jsonData)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}


export function migrante_eliminar(id){
    return new Promise((resolve, reject)=>{
        table_eliminar("php/res_migrantes.php/"+id)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}


//FUNCIONES DE ADMINISTRADOR//
export function funcionarios_registrar(jsonData){
    return new Promise((resolve, reject)=>{
        table_registrar("php/res_administrador.php", jsonData)
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
   
}

export function funcionarios_consultar(table, init){  //thead_culturales, tbody_culturales
    return new Promise((resolve, reject)=>{
        datatable_consultar_todos("php/res_administrador.php", "Funcionario", table, init, {
            'ID Funcionario': 'Id_Funcionario',
            'ID Punto de Control':'Id_Punto_Control',
            'Punto de Control':'Punto_De_Control',
            'Estado':'Estado', 
            'Nombre':'Nombre', 
            'Apellido Paterno':'Apellido_Paterno',
            'Apellido Materno':'Apellido_Materno',
            'Correo Electronico': 'Correo_electronico'
        })
        .then(datatable=>{resolve(datatable)})
        .catch(e=>{reject(e)})
    })
}

//FUNCIONES DE FUNCIONARIOS//

//FUNCIONES DE TABLA MIGRANTES-CULTURALES//
export function asistencias_culturales_consultar_todos(table, init){  //thead_migrantes, tbody_migrantes
    return new Promise((resolve, reject)=>{
        datatable_consultar_todos("php/res_asistencias_culturales.php", "asistencias_culturales", table, init, {
            //Hace falta obtener el ID desde el View de MySQL, para poder hacer tratamientos posteriores
            'ID Actividad' : "Id_Actividad",
            'Nombre Actividad':'Actividad', 
            'Dirección Actividad':'Direccion', 
            'ID Asistente':'Id_Migrante', 
            'Nombre Asistente':'Nombre', 
            'Apellido Paterno':'Apellido_Paterno', 
            'Apellido Materno':'Apellido_Materno',
            'Fecha de Registro':'Fecha', 
        })
        .then(datatable=>{resolve(datatable)})
        .catch(e=>{reject(e)})
    })
}


export function asistencias_culturales_registrar(id_actividad, ids_migrantes){
    return new Promise((resolve, reject)=>{        
        table_registrar("php/res_asistencias_culturales.php/actividad/"+id_actividad, ids_migrantes)
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
   
}

export function asistencias_culturales_modificar(id, jsonData){
    return new Promise((resolve, reject)=>{
        table_modificar("php/res_asistencias_culturales.php/"+id, jsonData)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}


export function asistencias_culturales_eliminar(id){
    return new Promise((resolve, reject)=>{
        table_eliminar("php/res_asistencias_culturales.php/"+id)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}

//FUNCIONES DE TABLA MIGRANTES-LABORALES//
export function asistencias_laborales_consultar_todos(table, init){  //thead_migrantes, tbody_migrantes
    return new Promise((resolve, reject)=>{
        datatable_consultar_todos("php/res_asistencias_laborales.php", "asistencias_laborales", table, init, {
            //Hace falta obtener el ID desde el View de MySQL, para poder hacer tratamientos posteriores
            'ID Actividad' : "Id_Trabajo",
            'Nombre Actividad':'Actividad', 
            'Dirección Actividad':'Direccion',
            'ID Asistente':'Id_Migrante', 
            'Nombre Asistente':'Nombre', 
            'Apellido Paterno':'Apellido_Paterno', 
            'Apellido Materno':'Apellido_Materno',
            'Fecha de Registro':'Fecha', 
            
        })
        .then(datatable=>{resolve(datatable)})
        .catch(e=>{reject(e)})
    })
}

export function asistencias_laborales_registrar(id_actividad, ids_migrantes){
    return new Promise((resolve, reject)=>{
        table_registrar("php/res_asistencias_laborales.php/actividad/"+id_actividad, ids_migrantes)
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
   
}

export function asistencias_laborales_modificar(id, jsonData){
    return new Promise((resolve, reject)=>{
        table_modificar("php/res_asistencias_laborales.php/"+id, jsonData)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}


export function asistencias_laborales_eliminar(id){
    return new Promise((resolve, reject)=>{
        table_eliminar("php/res_asistencias_laborales.php/"+id)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}

//FUNCIONES DE TABLA MIGRANTES-PUNTO DE CONTROL//
export function registros_consultar_todos(table, init){  //thead_migrantes, tbody_migrantes
    return new Promise((resolve, reject)=>{
        datatable_consultar_todos("php/res_registros.php", "registros", table, init, {
            //Hace falta obtener el ID desde el View de MySQL, para poder hacer tratamientos posteriores
            'ID Punto de Control' : "Id_Punto_Control",
            'Nombre Punto de Control':'Punto_de_Control', 
            'Fecha de entrada':'Fecha_Entrada', 
            'Fecha de salida':'Fecha_Salida', 
            'Alimentación':'Alimentacion', 
        })
        .then(datatable=>{resolve(datatable)})
        .catch(e=>{reject(e)})
    })
}
export function registros_registrar(id,jsonData){
    return new Promise((resolve, reject)=>{
        table_registrar("php/res_registros.php/migrante/"+id, jsonData)
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
   
}

export function registros_modificar(id, jsonData){
    return new Promise((resolve, reject)=>{
        table_modificar("php/res_registros.php/migrante/"+id, jsonData)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}


export function registros_eliminar(id){
    return new Promise((resolve, reject)=>{
        table_eliminar("php/res_registros.php/migrante/"+id)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}



//FUNCIONES DE ACTIVIDADES LABORALES//

export function laborales_consultar_todos(table, init){  //thead_culturales, tbody_culturales
    return new Promise((resolve, reject)=>{
        datatable_consultar_todos("php/res_laborales.php", "laborales", table, init, {
            //Hace falta obtener el ID desde el View de MySQL, para poder hacer tratamientos posteriores
            'ID':'Id_Trabajo',
            'Detalles':'Detalles', 
            'Requisitos':'Requisitos', 
            'Direccion':'Direccion'
        })
        .then(datatable=>{resolve(datatable)})
        .catch(e=>{reject(e)})
    })
}



//Convertir lo anterior a modo DataTables como en el caso de migrantes (Ver más arriba, cómo se regresa un Promise y se llama a datatables_consultar_todos())

//Aparte construir otra función que se llame "table_consultar_por_migrante(table, id, init)"
//En res_laborales.php permitir la ruta "php/res_laborales.php/migrante/#" que es la opción que entregará las actividades laborales filtradas por migrante
//Para implementar lo anterior, usar la View "Asistencia_Oferta_Laboral_View" que también es usada para los detalles del migrante.
//Desde "table_consultar_por_migrante(table, id, init)" usar la dirección "php/res_laborales.php/migrante/"+id en la función datatables_consultar_todos()

//Verificar en la BD que la tabla registros, asistencia_actividad_cultural, asistencia_oferta_laboral, tengan un primary key binario (id de migrante e id de cultural/laboral/punto)

//Repetir lo anterior para Actividades Culturales

export function laborales_registrar(jsonData){
    return new Promise((resolve, reject)=>{
        table_registrar("php/res_laborales.php", jsonData)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}

export function laborales_modificar(id, jsonData){
    return new Promise((resolve, reject)=>{
        table_modificar("php/res_laborales.php/"+id, jsonData)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}

export function laborales_eliminar(id){
    return new Promise((resolve, reject)=>{
        table_eliminar("php/res_laborales.php/"+id)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}



//FUNCIONES DE ACTIVIDADES CULTURALES//
export function culturales_consultar_todos(table, init){  //thead_culturales, tbody_culturales
    return new Promise((resolve, reject)=>{
        datatable_consultar_todos("php/res_culturales.php", "culturales", table, init, {
            'ID': 'Id_Actividad',
            'Fecha':'Fecha', 
            'Nombre':'Nombre', 
            'Dirección':'Direccion',
            'Detalles':'Detalles',
            'Activo': 'Activo'
        })
        .then(datatable=>{resolve(datatable)})
        .catch(e=>{reject(e)})
    })
}




export function culturales_registrar(jsonData){
    return new Promise((resolve, reject)=>{
        table_registrar("php/res_culturales.php", jsonData)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}

export function culturales_modificar(id, jsonData){
    return new Promise((resolve, reject)=>{
        table_modificar("php/res_culturales.php/"+id, jsonData)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}

export function culturales_eliminar(id){
    return new Promise((resolve, reject)=>{
        table_eliminar("php/res_culturales.php/"+id)    
        .then(result=>resolve(result))
        .catch(result=>reject(result));
    })
    
}

//FUNCIONES DE OPCIONES
export function llenar_opciones_selector(selectors_ids){
    let ids;
    for(ids of selectors_ids){
        let selector = document.getElementById(ids);
        fetch('php/res_options.php/'+ids, {
            method: 'GET'
        })
        .then(res=>res.json())
        .then(resjson=>{
            Object.entries(resjson).forEach(([ind, value])=>{
                let option = document.createElement('option');
                option.setAttribute("value",value[Object.keys(value)[0]]); //Se refiere al id
                option.innerHTML=value[Object.keys(value)[1]]; //Se refiere al texto que aparece en la opción.
                selector.appendChild(option); //Agrega las opciones al selector
            })  
        })      
    }   
}

/*------------------------------------------------Sesiones----------------------------------------------------*/

export function Iniciar_Sesion(formJson){
    fetch("php/res_sesion.php",{method: 'POST', body: formJson})   ///
    .then(handleHttpErrors)
    .then(response=>{
        console.log(response);
        console.log("F 2");
        if (response.redirected) {
            console.log("F 1");
            window.location.href = response.url;
        }
        return response.text();
    })
    .then(json=>{
        console.log(json);
    })
    .catch(e=>{
        console.log(e);
        console.log("Catching");
    })  
}

export function Validar_Sesion(){
    fetch("php/res_sesion.php",{ method: 'GET'})
    .then(handleHttpErrors)
    .then(res=>res.text())
    .then(resjson=>{
        console.log(resjson);
        if (resjson.USERID==null){       
            alert("Primero Inicie sesión");
            window.location.href ="http://localhost/IngenieriaWeb/index.html";
        }else{
            
            console.log("Bienvenido,");
        }
        
            document.getElementById('UserName').innerHTML=resjson.USERNAME;
            document.getElementById('ControlPointName').innerHTML=resjson.POINTNAME;
    })
    .catch(e=>{
        console.log(e);
    }) 
}

export function Validar_SesionA(){
    fetch("php/res_sesion.php",{ method: 'GET'})
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(resjson=>{
        console.log(resjson);
        
        if (resjson.ADMIN==null){
            
            console.log(resjson); 
            window.location.href ="http://localhost/IngenieriaWeb/index.html";
            alert("Primero Inicie sesión");  
        }else{
            console.log("Bienvenido A"); 
            console.log(resjson);             
        }
        
    })
    .catch(e=>{
        console.log(e);
    }) 
}



export function Cerrar_Sesion(){
    fetch("php/res_sesion.php",{ method:'DELETE'})
    .then(handleHttpErrors)
    .then(res=>res.json())
    .then(resjson=>{
        console.log('Sesión finalizada')
    })
    .catch(e=>{
        console.log(e);
    }) 
}