<?php

require_once('DataBase.php');

//Obtención de datos de la solicitud
if($data=file_get_contents('php://input')){
        $id=$data->id;
}else{
        header('HTTP/1.1 400 Bad Request');
        return;
}


//$result=DataBase::Mostrar_Migrante_Detalles($id);

$result=array("datos_generales"=> array("Nombre"=>"Mauricio", "Edad"=>"20", "Punto"=> "2"), 
        "trabajos"=>array("1"=> array("Fecha"=>"30 de mayo de 2020","Detalles"=>"Backend Developer","Requisitos"=>"PHP","Direccion"=>"Jiutepec") ), 
        "actividades_culturales"=>array("1"=> array("Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Requisitos"=>"Ninguno", "Activo"=>"Si")));
echo json_encode(($result),JSON_UNESCAPED_UNICODE);

?>