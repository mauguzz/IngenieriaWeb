<?php

require_once('DataBase.php');

$method=$_SERVER['REQUEST_METHOD']; //Capturar método utilizado
$uri=$_SERVER['REQUEST_URI'];       //Capturar URI utilizada
$result = "";

//MÉTODO HTTP GET
function res_get(){

        session_start();/*Continuamos la sesión*/
        $result=new stdclass();
        if (!empty($_SESSION['USERID']) and !empty($_SESSION['USERNAME'])){
             $result->USERID=$_SESSION['USERID'];
             $result->USERNAME=$_SESSION['USERNAME'];
             $result->POINTID=$_SESSION['POINTID'];
             if(!empty($_SESSION['ADMIN'])){
                $result->ADMIN=$_SESSION['ADMIN'];
             }else{
                 $result->ADMIN=NULL;
             }
             
             
        }else{
            $result->USERID=NULL;
            $result->USERNAME=NULL;
            $result->POINTID=NULL;
            $result->ADMIN=NULL;
            
        }

        return $result;


}
function res_post(){
    //USO: No es necesario pasar argumentos, la función lee el contenido del body de la solicitud HTTP y trata los datos para hacer la inserción en la BD
    //Obtención de datos de la solicitud
    
    if($json=file_get_contents('php://input')){
        $data=json_decode($json);
        $Conexion= new Database();
        $result = [$Conexion->IniciarSesion($Conexion,$data->Usuario,$data->Clave)];
        //return $result; 
    }else{
        $result = ["Error"=>"No se enviaron todos los parametros correctamente"];
        header('HTTP/1.1 400 Bad Request');
        return;
    }
    
    
    return $result;
}


//MÉTODO HTTP PUT
function res_put(){

}

//MÉTODO HTTP DELETE
function res_delete(){

    try {
        session_start();//Continuamos los valroes de sesión
        session_destroy(); //Borramos datos de la sesión
        header("location:http://localhost/IngenieriaWeb/index.html");  
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        return $e->getMessage();
    }
    return ["DELETE"=>"Sesión terminada"];
}

$uri=explode("/",$uri);
$uri=array_slice($uri,3); //Elimina las primeras tres partes irrelevantes de la uri (""/"projectfolder"/"php")
if($uri[0] == 'res_sesion.php'){
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
                $id_specified ? ($result=res_get()) : ($result=res_get());
        break;
        case 'POST':
                $id_specified ? header('HTTP/1.1 400 Bad Request') : ($result = res_post());
        break;
        case 'PUT':
                $id_specified ? ($result=res_put()) : header('HTTP/1.1 400 Bad Request');
        break;
        case 'DELETE':
                $id_specified ? ($result=res_delete()) : ($result=res_delete());
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