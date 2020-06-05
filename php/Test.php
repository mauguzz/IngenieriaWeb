<?php

include('DataBase.php');

$Conexion= new Database();
$Conexion=$Conexion->Mostrar_Migrantes_Todos($Conexion);



?>