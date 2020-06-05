<?php
require_once('DataBase.php');

$conexion=DataBase::Conectar();
echo(DataBase::Mostrar_Migrantes_Todos($conexion));



?>