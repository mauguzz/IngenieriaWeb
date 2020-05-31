
content = document.getElementById('content'); //Div del contenido principal (tablas, etc)
btn_consultar =document.getElementById('btn_consultar').then(
    
);

btn_consultar.addEventListener("click", ()=>{ 
    leerMigrante();
    console.log("Boton presionado");
});

function leerMigrante(){
    fetch("migrantes_details.php", {
        method: 'GET',
        body: JSON.stringify({id: 1})
    })
    .then(res=>{
        return res.json();
    })
    .then(res_json=>{
        general=res_json['datos_generales'];
        trabajos=res_json['trabajos'];
        actividades=res_json['actividades_culturales'];


        tabla_actividades=createElement('div');
        tabla_actividades.setAttribute("id", "tabla_actividades");
        tabla_actividades.setAttribute("class", "tabla_actividades");

        tabla_trabajos=createElement('div');
        tabla_trabajos.setAttribute("id", "tabla_trabajos");
        tabla_trabajos.setAttribute("class", "tabla_trabajos");

        tabla_general = document.createElement('div');
        tabla_general.setAttribute("id", "tabla_general");
        tabla_general.setAttribute("class", "tabla_general");


        Object.keys(general).forEach(n=>{
            dato = document.createElement('span');
            dato.innerHTML=general[n];
            tabla_general.appendChild(dato);

        });

        Object.keys(trabajos).forEach(n => {
            //console.log(trabajos[n]);

            fecha=document.createElement('span');
            detalles=document.createElement('span');
            requisitos=document.createElement('span');
            direccion=document.createElement('span');

            fecha.innerHTML=trabajos[n].fecha;
            detalles.innerHTML=trabajos[n].detalles;
            requisitos.innerHTML=trabajos[n].requisitos;
            direccion.innerHTML=trabajos[n].direccion;
            
            tabla_trabajos.appendChild(fecha);
            tabla_trabajos.appendChild(detalles);
            tabla_trabajos.appendChild(requisitos);
            tabla_trabajos.appendChild(direccion);   
        });

        Object.keys(actividades).forEach(n => {
            //console.log(trabajos[n]);

            fecha=document.createElement('span');
            detalles=document.createElement('span');
            nombre=document.createElement('span');
            direccion=document.createElement('span');
            activo=document.createElement('span');

            fecha.innerHTML=actividades[n].fecha;
            detalles.innerHTML=actividades[n].detalles;
            nombre.innerHTML=actividades[n].nombre;
            direccion.innerHTML=actividades[n].direccion;
            activo.innerHTML=actividades[n].activo;
            
            tabla_actividades.appendChild(fecha);
            tabla_actividades.appendChild(detalles);
            tabla_actividades.appendChild(nombre);
            tabla_actividades.appendChild(direccion);
            tabla_actividades.appendChild(activo);     
        });

        content.appendChild(tabla_general);
        content.appendChild(tabla_actividades);
        content.appendChild(tabla_trabajos);
    })
    .catch(e=>{

    })

}

function registrarMigrante(){

}

function modificarMigrante(){

}