<?php
require_once('DataBase.php');




$Conexion= new Database();
$result=$Conexion->Mostrar_Migrante_Detalle($Conexion, 1);

//foreach($result)
echo(json_encode($result));

?>