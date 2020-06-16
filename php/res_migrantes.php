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
        //Se pasó el id. //CASO: Obtener detalles de un migrante
        if(isset($_SESSION['USERID'])){ //$sesion->USERID!=NULL
            $result=$conexion->Mostrar_Migrante_Detalle($conexion, $args[0], false); //Descomentar para version final
        }elseif (isset($_SERVER['PHP_AUTH_PW'])) {
            //Antes de ejecutar lo siguiente, se tiene que verificar que para el usuario args[0] tiene la llave correcta
            $result=$conexion->Consultar_Llave_Migrante($conexion,$args[0]);
            if($result["migrante"][0]["Llave"]==$_SERVER['PHP_AUTH_PW']){
                $result=$conexion->Mostrar_Migrante_Detalle($conexion, $args[0], true); //Como ya se hizo la conexión previamente, con el valor true se le indica que ya no se vuelva a conectar (ver implementación en DataBase.php)
            }else{
                header("HTTP/1.1 401 Unauthorized");
            }
            
        }else{
            header("HTTP/1.1 401 Unauthorized");
        }

        
        
    }else{
        //No se pasó el id. //CASO: Obtener todos los migrantes
        $result = $conexion->Mostrar_Migrantes_Todos($conexion);
    }
          

return $result;
}

//MÉTODO HTTP POST
function res_post(){
    //USO: No es necesario pasar argumentos, la función lee el contenido del body de la solicitud HTTP y trata los datos para hacer la inserción en la BD
    //Obtención de datos de la solicitud
    if($json=file_get_contents('php://input')){
        $data=json_decode($json);
        $conexion= new Database();

        $permitted_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $Llave=substr(str_shuffle($permitted_chars), 0, 10);

        //$Llave = "123456"; //Crear una llave de migrante aleatoria
        //Datos derivados en la BD, que no es necesario insertar: ID_Migrante, Edad, Id_Estado (migrando o establecido).

        $result = $conexion->Crear_Migrante(
            $conexion,
            $data->nombre, 
            $data->apellido_paterno, 
            $data->apellido_materno, 
            $data->fecha_nacimiento, 
            $data->ciudad, 
            $data->pais, 
            $data->oficio, 
            $data->contacto_telefono, 
            $data->nivel_educativo, 
            $data->situacion_familiar, 
            $data->causa_migracion, 
            $Llave
        );
    }else{
        $result = ["Error"=>"No se enviaron todos los parametros correctamente"];
        header('HTTP/1.1 400 Bad Request');
        return;
    }
    
    return $result;
}

//MÉTODO HTTP PUT
function res_put($id){
    //USO: Es necesario pasar un único argumento $id, para conocer cual row se va a modificar.
    if($json=file_get_contents('php://input')){
        $data=json_decode($json);
        $conexion= new Database();

        $result = $conexion->Modificar_Migrante(
            $conexion,
            $id,
            $data->nombre, 
            $data->apellido_paterno, 
            $data->apellido_materno, 
            $data->fecha_nacimiento, 
            $data->Edad,
            $data->ciudad, 
            $data->pais, 
            $data->oficio, 
            $data->contacto_telefono, 
            $data->nivel_educativo, 
            $data->situacion_familiar, 
            $data->causa_migracion, 
            $Llave
        );

    }else{
        $result = ["Error"=>"No se enviaron todos los parametros correctamente"];
        header('HTTP/1.1 400 Bad Request');
        return;
    }
    
    //Datos derivados en la BD, que no es necesario insertar: ID_Migrante, Edad, Id_Estado (migrando o establecido).

    //A diferencia de DataBase::Crear_Migrante(), se pasa adicionalmente un ID
    //DataBase::Modificar_Migrante($id, $Nombre, $Apellido_Paterno, $Apellido_Materno, $Fecha_Nacimiento, $Ciudad, $Pais, $Oficio, $Contacto_Telefono, $Nivel_Educativo, $Situacion_Familiar, $Causa_Migracion, $Llave);

    return $result;
}

//MÉTODO HTTP DELETE
function res_delete($id){
    $conexion= new Database();

    $result = $conexion->Eliminar_Migrante(
        $conexion,
        $id
    );
}


session_start();/*Continuamos la sesión*/
$sesion=new stdclass();
if (!empty($_SESSION['USERID']) and !empty($_SESSION['USERNAME'])){
        $sesion->USERID=$_SESSION['USERID'];
        $sesion->USERNAME=$_SESSION['USERNAME'];
        $sesion->POINTID=$_SESSION['POINTID'];  
}else{
    $sesion->USERID=NULL;
}

//CÓDIGO EJECUTADO AL MOMENTO DE LLAMAR AL ARCHIVO PHP


$uri=explode("/",$uri);
$uri=array_slice($uri,3); //Elimina las primeras tres partes irrelevantes de la uri (""/"projectfolder"/"php")
if($uri[0] == 'res_migrantes.php'){
    if($uri=array_slice($uri,1)){ //Si después de eliminar el primer elemento ("res_migrantes.php"), el array no está vacío, entonces
        if($uri[0]==""){ //Si no se especificó un id pero si se puso un slash al final de la uri ("...ntes.php/")
            header('HTTP/1.1 400 Bad Request');
            return;
        } else { //Si se especificó un id en la uri ("...ntes.php/1")
            $id=$uri[0];
            $id_specified=TRUE;   
        }
    }else{ //Si no se especificó un id en la uri ("...ntes.php")
       $id_specified=FALSE;
    }
    
    switch($method){
        case 'GET':
                $id_specified ? ($result=res_get($id)) : ($result=res_get());
        break;
        case 'POST':
                $id_specified ? header('HTTP/1.1 400 Bad Request') : ($result = res_post());
        break;
        case 'PUT':
                $id_specified ? ($result=res_put($id)) : header('HTTP/1.1 400 Bad Request');
        break;
        case 'DELETE':
                $id_specified ? ($result=res_delete($id)) : header('HTTP/1.1 400 Bad Request');
        break;
        default:
                header('HTTP/1.1 405 Method not allowed');
                header('Allow: GET, POST, PUT, DELETE');
        break;
    }
        
} else {
    // Sólo se aceptan resources desde 'clients'
    header('HTTP/1.1 404 Not Found');
}





echo json_encode(($result),JSON_UNESCAPED_UNICODE);

?>