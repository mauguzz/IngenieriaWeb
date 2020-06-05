<?php
require_once('DataBase.php');




$Conexion= new Database();
$result=$Conexion->Mostrar_Migrantes_Todos($Conexion);

//foreach($result)
echo(json_encode($result));

?>