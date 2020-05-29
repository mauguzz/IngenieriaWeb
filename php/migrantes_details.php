<?php

require_once('php/DataBase.php');

//Obtención de datos de la solicitud
$json=file_get_contents('php://input');
$data=json_decode($json);
$id=$data->id;

$result=DataBase::Mostrar_Migrante_Detalles($id);
echo json_encode(($result),JSON_UNESCAPED_UNICODE);

?>