<?php

require_once('DataBase.php');

//Obtención de datos de la solicitud
//$json=file_get_contents('php://input');
//$data=json_decode($json);
//$id=$data->id;

//$result=DataBase::Mostrar_Migrante_Detalles($id);

$result=array(["datos generales"=> ["Nombre"=>"Mauricio", "Edad"=>"20", "Punto"=> "2"], 
        "trabajos"=>["Fecha"=>"30 de mayo de 2020","Detalles"=>"Backend Developer","Requisitos"=>"PHP","Direccion"=>"Jiutepec"] , 
        "actividades_culturales"=>["Fecha"=>"23 de mayo de 2020", "Nombre"=> "Guitarra", "Detalles"=>"Clases básicas", "Requisitos"=>"Ninguno", "Activo"=>"Si"]]);
echo json_encode(($result),JSON_UNESCAPED_UNICODE);

?>