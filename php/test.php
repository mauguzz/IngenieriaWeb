<?php
require_once('DataBase.php');




$Conexion= new Database();
$result=$Conexion->Mostrar_Migrante_Detalle($Conexion, $id);

//foreach($result)
echo(json_encode($result));

?>