<?php

include('DataBase.php');

$Conexion= new Database();
$result=$Conexion->Mostrar_Migrante_Detalle($Conexion, 1);

echo(json_encode($result));

?>