<?php

require_once('DataBase.php');

$method=$_SERVER['REQUEST_METHOD']; //Capturar método utilizado
$uri=$_SERVER['REQUEST_URI'];       //Capturar URI utilizada
$result = "";


//MÉTODO HTTP GET
function res_get(){
    //USO: Pasar un único argumento entero id si se va a aplicar la acción a un elemento específico
    //Si no, no es necesario pasar argumentos.
    $args=func_get_args();
    $conexion= new Database();

    if (count($args)==1){
        //Se pasó el id. //CASO: Obtener una única actividad cultural
        $result=$conexion->Mostrar_Asistencia_Oferta_Laboral($conexion);
        
    }else{
        //No se pasó el id. //CASO: Obtener todos las actividades culturales
        $result=$conexion->Mostrar_Asistencia_Oferta_Laboral($conexion);
        
    }

return $result;
}

//MÉTODO HTTP POST
function res_post($id){
    //USO: No es necesario pasar argumentos, la función lee el contenido del body de la solicitud HTTP y trata los datos para hacer la inserción en la BD
    //Obtención de datos de la solicitud
    if($json=file_get_contents('php://input')){
        $data=json_decode($json);

        $conexion= new Database();


        //Id_Punto_Control,'Punto de control',Fecha_Entrada,Fecha_Salida,Alimentacion
        foreach($data as $value){
            $result = $conexion->Crear_Asistencia_Oferta_Laboral(
                $conexion,
                $value, //ID DE MIGRANTE
                $id //ID DE ACTIVIDAD
            );
        }
        
        
        //$result=$data;

    }else{
        $result = ["Error"=>"No se enviaron todos los parametros correctamente"];
        header('HTTP/1.1 400 Bad Request');
        return;
    }


    return $result;

}



//MÉTODO HTTP DELETE
function res_delete($id){

    if($json=file_get_contents('php://input')){
        $data=json_decode($json);

        $conexion= new Database();


        //Id_Punto_Control,'Punto de control',Fecha_Entrada,Fecha_Salida,Alimentacion
        /*
        $result = $conexion->Eliminar_Asistencia_Oferta_Laboral (
            $conexion,
            $id //ID DE MIGRANTE
        );
        */

    }else{
        $result = ["Error"=>"No se enviaron todos los parametros correctamente"];
        header('HTTP/1.1 400 Bad Request');
        return;
    }

  
    
    return $result;
}


//CÓDIGO EJECUTADO AL MOMENTO DE LLAMAR AL ARCHIVO PHP
$uri=explode("/",$uri);
$uri=array_slice($uri,3); //Elimina las primeras tres partes irrelevantes de la uri (""/"projectfolder"/"php")
if($uri[0] == 'res_asistencias_laborales.php'){
    
    if($uri=array_slice($uri,1)){ //Si después de eliminar el primer elemento ("res_culturales.php"), el array no está vacío, entonces
        if($uri[0]=='actividad'){
            if($uri=array_slice($uri,1)){
                if($uri[0]==""){ //Si no se especificó un id pero si se puso un slash al final de la uri ("...ntes.php/")
                    header('HTTP/1.1 400 Bad Request');
                    return;
                } else { //Si se especificó un id en la uri ("...rales.php/1")
                    $id=$uri[0];
                    $id_specified=TRUE;   
                }
            }
        }
        
    }else{ //Si no se especificó un id en la uri ("...rales.php")
       $id_specified=FALSE;
    }
    
    switch($method){
        case 'GET':
            $id_specified ? ($result=res_get($id)) : ($result=res_get());
        break;
        case 'POST':
            $id_specified ? ($result=res_post($id)) : header('HTTP/1.1 400 Bad Request');
        break;
        case 'DELETE':
            $id_specified ? ($result=res_delete($id)) : header('HTTP/1.1 400 Bad Request');
        break;
        default:
                header('HTTP/1.1 405 Method not allowed');
                header('Allow: GET, POST, DELETE');
        break;
    }
        
} else {
    // Sólo se aceptan resources desde 'clients'
    header('HTTP/1.1 404 Not Found');
}






echo json_encode(($result),JSON_UNESCAPED_UNICODE);

?>