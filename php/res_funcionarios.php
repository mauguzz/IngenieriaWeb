<?php

require_once('DataBase.php');

//Obtención de datos de la solicitud
//$json=file_get_contents('php://input');
//$data=json_decode($json);
//$id=$data->id;

//Obtención de datos de la solicitud
if($data=file_get_contents('php://input')){
    $id=$data->id;
}else{
    header('HTTP/1.1 400 Bad Request');
    return;
}


?>