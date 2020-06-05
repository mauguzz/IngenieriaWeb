<?php
require_once('DataBase.php');




$Conexion= new Database();
$result=$Conexion->Mostrar_Migrantes_Todos($Conexion);

echo($result);

?>