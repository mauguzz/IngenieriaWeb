<?php

require_once('DataBase.php');

if($json=file_get_contents('php://input')){
    $data=json_decode($json);
}else{
    header('HTTP/1.1 400 Bad Request');
    return;
}

$data=json_decode($json);
$Conexion= new Database();
$result = [$Conexion->IniciarSesion($Conexion,$data->Usuario,$data->Clave)];
return $result;


?>