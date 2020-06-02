<?php

require_once('DataBase.php');

$method=$_SERVER['REQUEST_METHOD']; //Capturar método utilizado
$uri=$_SERVER['REQUEST_URI']; //Capturar URI utilizada


//MÉTODO HTTP GET
function res_get($uri){
    $uri=explode("/",$uri);
    array_shift($uri); // primer slash
    array_shift($uri); // ingenieriaweb
    array_shift($uri); // php
        
    if($uri[0] == 'res_migrantes.php'){
        array_shift($uri);
        if($uri){
            if($uri[0]==""){ //Si no se especifica un id pero si se puso un slash
                header('HTTP/1.1 400 Bad Request');       
            } else { //Si se especifica un id
                //CASO: Obtener detalles de un migrante
                $result=array("uri"=>$uri,"datos_generales"=> array("Nombre"=>"Mauricio", "Edad"=>"20", "Punto"=> "2"), 
                "trabajos"=>array("1"=> array("Fecha"=>"30 de mayo de 2020","Detalles"=>"Backend Developer","Requisitos"=>"PHP","Direccion"=>"Jiutepec") ), 
                "actividades_culturales"=>array("1"=> array("Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Requisitos"=>"Ninguno", "Activo"=>"Si")));
            }
        }else{
            //CASO: Obtener todos los migrantes
            $result=["migrantes"=>"todos"];
        }
            
    } else {
        // Sólo se aceptan resources desde 'clients'
        header('HTTP/1.1 404 Not Found');
    }
    return $result;
}

//MÉTODO HTTP POST
function res_post($uri){

}

//MÉTODO HTTP PUT
function res_put($uri){

}

//MÉTODO HTTP DELETE
function res_delete($uri){

}


//
switch($method){
        case 'GET':
                $result=res_get($uri);
        break;
        case 'POST':
                res_post($uri);
        break;
        case 'PUT':
                res_put($uri);
        break;
        case 'DELETE':
                res_delete($uri);
        break;
        default:
                header('HTTP/1.1 405 Method not allowed');
                header('Allow: GET, POST, PUT, DELETE');
        break;
}

/*
//Obtención de datos de la solicitud
if($data=file_get_contents('php://input')){
        $id=$data->id;
}else{
        header('HTTP/1.1 400 Bad Request');
        return;
}
*/

//$result=DataBase::Mostrar_Migrante_Detalles($id);


echo json_encode(($result),JSON_UNESCAPED_UNICODE);

?>