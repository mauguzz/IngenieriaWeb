<?php

require_once('DataBase.php');

$method=$_SERVER['REQUEST_METHOD'];
$uri=$_SERVER['REQUEST_URI'];

$result=["Data"=>"error"]; //Borrar


function res_get($uri){
        $uri=explode("/",$uri);
        $resource = array_shift($uri);
        //$resource = array_shift($uri);
        if($resource == 'res_migrantes.php'){
            $id = array_shift($uri);
            if(empty($id)){ //Si no se especifica un id
                 header('HTTP/1.1 400 Bad Request'); //De manera temporal       
            } else { //Si se especifica un id
                    $result=array("datos_generales"=> array("Nombre"=>"Mauricio", "Edad"=>"20", "Punto"=> "2"), 
                    "trabajos"=>array("1"=> array("Fecha"=>"30 de mayo de 2020","Detalles"=>"Backend Developer","Requisitos"=>"PHP","Direccion"=>"Jiutepec") ), 
                    "actividades_culturales"=>array("1"=> array("Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Requisitos"=>"Ninguno", "Activo"=>"Si")));
                }
        } else {
            // Sólo se aceptan resources desde 'clients'
            $result=["uri"=>$resource];
            //header('HTTP/1.1 404 Not Found');
        }
}
function res_post($uri){

}
function res_put($uri){

}
function res_delete($uri){

}



switch($method){
        case 'GET':
                res_get($uri);
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